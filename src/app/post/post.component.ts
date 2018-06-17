import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DPost } from '../services/post/post.dto';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
import { DComment, DCommentList } from '../services/comment/comment.dto';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../app.store';
import { Latest } from '../services/comment/comment.actions';
import { DCharacterShort } from '../services/character/character.dto';
import { DCorporationShort } from '../services/corporation/corporation.dto';
import { DAllianceShort } from '../services/alliance/alliance.dto';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnInit {

  @Input()
  post: DPost;

  allComments$: Observable<{}>;

  comments: DComment[] = [];
  moreComments = false;
  commentsPage = 0;
  commentsPerPage = 3;

  author: {
    name: string;
    link: any[];
    handle: string;
    image: string;
  } = { name: null, link: [], handle: null, image: null };
  wall: {
    name: string;
    link: any[];
    handle: string;
    image: string;
  };

  content: string | SafeHtml;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
    this.allComments$ = this.store.pipe(select('comment', 'list'));
  }

  ngOnInit() {
    // get initial comments
    this.store.dispatch(new Latest({
      postId: this.post.id,
      page: this.commentsPage,
      limit: this.commentsPerPage,
    }));
    // subscribe on comments
    this.allComments$.subscribe((allComments) => {
      const postCommentData: DCommentList = allComments[this.post.id];
      if (!postCommentData) return;

      this.comments = postCommentData.data;
      this.moreComments = postCommentData.page < (postCommentData.pages - 1);
    });

    if (this.post.character) {
      this.author = this.getInfoDependingOnType(this.post.character, 'character');
    }
    if (this.post.corporation) {
      this.author = this.getInfoDependingOnType(this.post.corporation, 'corporation');
    }
    if (this.post.alliance) {
      this.author = this.getInfoDependingOnType(this.post.alliance, 'alliance');
    }

    if (this.post.characterWall) {
      this.wall = this.getInfoDependingOnType(this.post.characterWall, 'character');
    }
    if (this.post.corporationWall) {
      this.wall = this.getInfoDependingOnType(this.post.corporationWall, 'corporation');
    }
    if (this.post.allianceWall) {
      this.wall = this.getInfoDependingOnType(this.post.allianceWall, 'alliance');
    }

    const html = this.post.content.replace(
      /#(\w*[0-9a-zA-Z]+\w*[0-9a-zA-Z])/g,
      (hashtag) =>
        `<a href="/hashtag/${hashtag.replace('#', '')}" class="text-link">${hashtag}</a>`);

    this.content = this.sanitizer.bypassSecurityTrustHtml(html);
  }

  loadMoreComments() {
    // load comments
    this.commentsPage++;
    this.store.dispatch(new Latest({
      postId: this.post.id,
      page: this.commentsPage,
      limit: this.commentsPerPage,
    }));
  }

  private getInfoDependingOnType(
    item: any,
    type: 'character' | 'corporation' | 'alliance',
  ) {
    switch (type) {
      case 'character':
        return {
          name: item.name,
          handle: item.handle,
          link: ['/character', item.id],
          image: item.portrait.px64x64,
        };
      case 'corporation':
        return {
          name: item.name,
          handle: item.handle,
          link: ['/corporation', item.id],
          image: item.icon.px64x64,
        };
      case 'alliance':
        return {
          name: item.name,
          handle: item.handle,
          link: ['/alliance', item.id],
          image: item.icon.px64x64,
        };
    }
  }
}
