import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DPost } from '../../services/post/post.dto';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input()
  post: DPost;

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log(this.post);
  }


  showCharacter() {
    this.router.navigate(['/character', this.post.character.id]);
  }
}
