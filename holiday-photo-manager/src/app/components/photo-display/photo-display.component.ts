import { Component, OnInit, } from '@angular/core';
import ServiceResponse from 'src/app/shared/models/service-response.interface';
import { PhotoService } from '../../services/photo/photo.service';
import photoInterface from '../../shared/models/photo.interface';
import { Router } from '@angular/router';
import { ErrorModalService } from 'src/app/services/error/error-modal.service';

@Component({
  selector: 'app-photo-display',
  templateUrl: './photo-display.component.html',
  styleUrls: ['./photo-display.component.css']
})
export class PhotoDisplayComponent implements OnInit {

  images: photoInterface[] = [];
  allImages: photoInterface[] = [];

  page = 0;
  size = 25;


  constructor(private photoService: PhotoService,
    private router: Router,
    private errorModalService: ErrorModalService ) { }

  slideIndex = 0;

  ngOnInit(): void {
    if (this.router.url.includes('manage')) {
      this.loadAllImages();
    }
    else{
      this.loadFeaturedImages();
    }
  }

  paginateData(obj: any) {
    let index=0,
        startingIndex=obj.pageIndex * obj.pageSize,
        endingIndex=startingIndex + obj.pageSize;

    this.images = this.allImages.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
  }

  loadAllImages(): void {
    this.photoService.FetchAllPhotos()
      .subscribe({
        next: (response: ServiceResponse) => {
          this.allImages.push(...response.data);
          this.paginateData({pageIndex: this.page, pageSize: this.size});
        },
        error: (error: any) => {
          if(error.status !== 0){
            this.errorModalService.show(error.message, error);
          }
        },
        complete() {
  
        },  
      });
  }

  loadFeaturedImages(): void {
    this.photoService.FetchFeaturedPhotos()
      .subscribe({
        next: (response: ServiceResponse) => {
          this.allImages.push(...response.data);
          this.paginateData({pageIndex: this.page, pageSize: this.size});
        },
        error: (error: any) => {
          if(error.status !== 0){
            this.errorModalService.show(error.message, error);
          }
        },
        complete() {
  
        },  
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
