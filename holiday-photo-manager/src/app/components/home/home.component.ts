import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UploadFilesService } from '../../services/upload-files.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  @ViewChild("fileUpload", { static: false }) fileUpload!: ElementRef;
  files: any[] = [];
  constructor(private uploadFilesService: UploadFilesService) { }

  ngOnInit(): void {

  }
  uploadFile(file: any) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.uploadFilesService.upload(formData).subscribe((response: any) => {
      debugger;
      });
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }
}
