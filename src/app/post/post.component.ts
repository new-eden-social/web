import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DPost } from '../services/post/post.dto';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
import { DComment, DCommentList } from '../services/comment/comment.dto';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../app.store';
import { Latest } from '../services/comment/comment.actions';

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

  name: string;
  link: any[];
  handle: string;
  image: string;
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
      this.name = this.post.character.name;
      this.handle = this.post.character.handle;
      this.link = ['/character', this.post.character.id];
      this.image = this.post.character.portrait.px64x64;
    }
    if (this.post.corporation) {
      this.name = this.post.corporation.name;
      this.handle = this.post.corporation.handle;
      this.link = ['/corporation', this.post.corporation.id];
      this.image = this.post.corporation.icon.px64x64;
    }
    if (this.post.alliance) {
      this.name = this.post.alliance.name;
      this.handle = this.post.alliance.handle;
      this.link = ['/alliance', this.post.alliance.id];
      this.image = this.post.alliance.icon.px64x64;
    }

    const html = this.post.content.replace(
      /#(\w*[0-9a-zA-Z]+\w*[0-9a-zA-Z])/g,
      (hashtag) =>
        `<a href="/hashtag/${hashtag.replace('#', '')}" class="text-link">${hashtag}</a>`);

    this.content = this.sanitizer.bypassSecurityTrustHtml(html);
  }

  openItem() {
    this.router.navigate(this.link);
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

}
