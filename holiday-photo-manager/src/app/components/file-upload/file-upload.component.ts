import { OnInit, Component } from '@angular/core';
import ServiceResponse from '../../shared/models/service-response.interface';
import { PhotoService } from 'src/app/services/photo/photo.service';

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

	progress: number = 0;
	message: string = '';
	urls: string[] = [];
	featuredUrls: string[] = [];

	constructor(private photoService: PhotoService) { }

	ngOnInit() {
	}

	uploadFile = (files: any, type: number) => {
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
				error: (err: any) => console.log(err)
			});

	}

	uploadFeaturedFile = (files: any, type: number) => {
		if (files.length === 0) {
			return;
		}

		debugger;

		let filesToUpload: File[] = files;
		let formData = new FormData();

		Array.from(filesToUpload).map((file, index) => {
			return formData.append('file' + index, file, file.name);
		});

		this.photoService.upload(formData, type).subscribe(
			{
				next: (response: ServiceResponse) => {

					this.message = response.message;
					this.featuredUrls.push(...response.data);
				},
				error: (err: any) => console.log(err)
			});

	}

}
