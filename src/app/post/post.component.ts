import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DPost } from '../services/post/post.dto';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnInit {

  @Input()
  post: DPost;

  name: string;
  link: any[];
  tag: string;
  image: string;
  content: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.post.character) {
      this.name = this.post.character.name;
      this.tag = this.post.character.name.replace(' ', '_');
      this.link = ['/character', this.post.character.id];
      this.image = this.post.character.portrait.px64x64;
    }
    if (this.post.corporation) {
      this.name = this.post.corporation.name;
      this.tag = this.post.corporation.name.replace(' ', '_');
      this.link = ['/corporation', this.post.corporation.id];
      this.image = this.post.corporation.icon.px64x64;
    }
    if (this.post.alliance) {
      this.name = this.post.alliance.name;
      this.tag = this.post.alliance.name.replace(' ', '_');
      this.link = ['/alliance', this.post.alliance.id];
      this.image = this.post.alliance.icon.px64x64;
    }

    this.content = this.post.content.replace(
      /#(\w*[0-9a-zA-Z]+\w*[0-9a-zA-Z])/g,
      (hashtag) => `<a href="" class="text-link">${hashtag}</a>`);
  }

  openItem() {
    this.router.navigate(this.link);
  }

}