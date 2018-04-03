import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DPost } from '../services/post/post.dto';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommentService } from '../services/comment/comment.service';
import { Observable } from 'rxjs/Rx';
import { select } from '@angular-redux/store';
import { ICommentState } from '../services/comment/comment.interface';
import { DComment, DCommentList } from '../services/comment/comment.dto';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnInit {

  @Input()
  post: DPost;

  @select(['comment', 'list'])
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
    private router: Router,
    private sanitizer: DomSanitizer,
    private commentService: CommentService,
  ) {
  }

  ngOnInit() {
    // get initial comments
    this.commentService.latest(this.post.id, 0, this.commentsPerPage);
    // subscribe on comments
    this.allComments$.subscribe((allComments) => {
      const postCommentData: DCommentList = allComments[this.post.id];
      if (!postCommentData) return;

      this.comments = postCommentData.data;
      console.log(postCommentData.page, postCommentData.pages, postCommentData.page != postCommentData.pages);
      this.moreComments = postCommentData.page != (postCommentData.pages - 1);
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
    this.commentService.latest(this.post.id, this.commentsPage, this.commentsPerPage);
  }

}
