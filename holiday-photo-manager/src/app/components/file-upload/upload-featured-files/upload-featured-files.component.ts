import { Component, OnInit } from '@angular/core';
import { ErrorModalService } from 'src/app/services/error/error-modal.service';
import { PhotoService } from 'src/app/services/photo/photo.service';
import ServiceResponse from 'src/app/shared/models/service-response.interface';

@Component({
	selector: 'app-upload-featured-files',
	templateUrl: './upload-featured-files.component.html',
	styleUrls: ['./upload-featured-files.component.css']
})
export class UploadFeaturedFilesComponent implements OnInit {

	message: string = '';
	urls: string[] = [];

	constructor(private photoService: PhotoService,
		private errorModalService: ErrorModalService) { }

	ngOnInit() {
	}

	uploadFeaturedFile = (files: any, type: number) => {
		if (files.length === 0) {
			return;
		}

		let filesToUpload: File[] = files;
		let formData = new FormData();

		Array.from(filesToUpload).map((file, index) => {
			return formData.append('file' + index, file, file.name);
		});

		this.photoService.upload(formData, type).subscribe(
			{
				next: (response: ServiceResponse) => {

					this.message = response.message;
					this.urls.push(...response.data);
				},
				error: (error: any) => {
					this.errorModalService.show(error.message, error);
				},
				complete() {

				},
			});

	}

}
