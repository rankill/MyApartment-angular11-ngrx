import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-apartment-gallery-dialog',
  styleUrls: ['./apartment-gallery-dialog.component.scss'],
  templateUrl: './apartment-gallery-dialog.component.html',
})
export class ApartmentGalleryDialogComponent {
  selectedImageIndex: number;
  imagesAmount: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {images: string[], currentIndex: number}) {
    this.selectedImageIndex = this.data.currentIndex;
    this.imagesAmount = this.data.images.length - 1;
  }

  goPrev(): void {
    if (this.selectedImageIndex === 0) {
      this.selectedImageIndex = this.imagesAmount;
    } else {
      this.selectedImageIndex++;
    }
  }

  goNext(): void {
    if (this.selectedImageIndex === this.imagesAmount) {
      this.selectedImageIndex = 0;
    } else {
      this.selectedImageIndex++;
    }
  }
}
