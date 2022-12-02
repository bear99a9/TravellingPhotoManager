import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/upload/upload-files.service';

@Component({
  selector: 'app-photo-display',
  templateUrl: './photo-display.component.html',
  styleUrls: ['./photo-display.component.css']
})
export class PhotoDisplayComponent implements OnInit {

  constructor(private photoService: PhotoService) { }

  

  ngOnInit(): void {

  }

}
