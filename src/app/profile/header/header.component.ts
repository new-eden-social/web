import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input('image')
  image?: string;

  @Input('title')
  title?: string;

  @Input('tag')
  tag?: string;

  @Input('type')
  type?: string;

  @Input('subheader')
  subheader?: {
    link: string,
    text: string,
  };

}
