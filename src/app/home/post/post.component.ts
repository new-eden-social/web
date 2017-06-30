import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPostResponse } from '../../services/post/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input()
  post: IPostResponse;

  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log(this.post)
  }


  showCharacter() {
    this.router.navigate(['/character', this.post.character.id])
  }
}
