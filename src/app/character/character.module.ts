import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character.component';
import { CharacterService } from '../services/character/character.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [CharacterService],
  declarations: [CharacterComponent],
  exports: [CharacterComponent],
})
export class CharacterModule {
}
