import {NgModule} from '@angular/core';
import { FavIconComponent } from './components/fav-icon/fav-icon.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [MatIconModule],
  exports: [FavIconComponent, MatIconModule],
  declarations: [FavIconComponent],
})
export class SharedModule {}
