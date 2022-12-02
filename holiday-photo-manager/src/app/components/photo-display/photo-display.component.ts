import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import ServiceResponse from 'src/app/shared/models/service-response.interface';

import { PhotoService } from '../../services/photo/photo.service';
import photoInterface from '../../shared/models/photo.interface';

@Component({
  selector: 'app-photo-display',
  templateUrl: './photo-display.component.html',
  styleUrls: ['./photo-display.component.css']
})
export class PhotoDisplayComponent implements OnInit {

  images: photoInterface[] = [];


  constructor(private photoService: PhotoService) { }

  slideIndex = 0;

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.photoService.GetPhotos()
      .subscribe({
        next: (response: ServiceResponse) =>{
          this.images.push(...response.data);
          debugger;
        }
      });
  }
  openModal() {
    document.getElementById('imgModal')!.style.display = "block";
  }
  closeModal() {
    document.getElementById('imgModal')!.style.display = "none";
  }
  plusSlides(n: any) {
    this.showSlides(this.slideIndex += n);
  }
  currentSlide(n: any) {
    this.showSlides(this.slideIndex = n);
  }
  showSlides(n: any) {
    let i;
    const slides = document.getElementsByClassName("img-slides") as HTMLCollectionOf<HTMLElement>;
    const dots = document.getElementsByClassName("images") as HTMLCollectionOf<HTMLElement>;
    if (n > slides.length) {
      this.slideIndex = 1
    }
    if (n < 1) {
      this.slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    if (dots && dots.length > 0) {
      dots[this.slideIndex - 1].className += " active";
    }
  }
}
