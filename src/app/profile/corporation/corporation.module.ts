import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporationComponent } from './corporation.component';
import { FooterModule } from '../../footer/footer.module';
import { LoadingModule } from '../../loading/loading.module';
import { ProfileHeaderModule } from '../header/header.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    LoadingModule,
    ProfileHeaderModule,
    RouterModule,
  ],
  declarations: [CorporationComponent],
  exports: [CorporationComponent],
})
export class CorporationModule {
}
