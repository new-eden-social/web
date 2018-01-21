import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character.component';
import { CharacterService } from '../services/character/character.service';
import { MatButtonModule, MatCardModule, MatListModule } from '@angular/material';
import { PostFormModule } from '../post-form/post-form.module';
import { PostModule } from '../post/post.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    PostFormModule,
    PostModule,
  ],
  providers: [CharacterService],
  declarations: [CharacterComponent],
  exports: [CharacterComponent],
})
export class CharacterModule {
}
