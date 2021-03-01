import {Component, Input, OnInit} from '@angular/core';
import {Apartment} from '../../../model/apartment.model';
import {MatDialog} from '@angular/material/dialog';
import {ApartmentGalleryDialogComponent} from './apartment-gallery-dialog/apartment-gallery-dialog.component';

@Component({
  selector: 'app-apartment-gallery',
  templateUrl: './apartment-gallery.component.html',
  styleUrls: ['./apartment-gallery.component.scss']
})
export class ApartmentGalleryComponent implements OnInit {
  @Input() apartment!: Apartment;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openImageGallery(images: string[], index: number): void {
    const dialogRef = this.dialog.open(ApartmentGalleryDialogComponent, {
      data: {
        images,
        currentIndex: index
      }
    });
  }
}
