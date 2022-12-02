import { OnInit, Component } from '@angular/core';
import ServiceResponse from '../../shared/models/service-response.interface';
import { PhotoService } from 'src/app/services/upload/upload-files.service';

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

	progress: number = 0;
	message: string = '';
	urls: string[] = [];

	constructor(private photoService: PhotoService) { }

	ngOnInit() {
	}

	uploadFile = (files: any) => {
		if (files.length === 0) {
			return;
		}

		let filesToUpload: File[] = files;
		let formData = new FormData();

		Array.from(filesToUpload).map((file, index) => {
			return formData.append('file' + index, file, file.name);
		});

		this.photoService.upload(formData).subscribe(
			{
				next: (response: ServiceResponse) => {

					this.message = response.message;
					this.urls.push(...response.data);
				},
				error: (err: any) => console.log(err)
			});
	}
}
