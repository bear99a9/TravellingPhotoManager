import { OnInit, Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import ServiceResponse from '../../models/service-response.interface';
import { UploadFilesService } from 'src/app/services/upload/upload-files.service';

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

	progress: number = 0;
	message: string = '';
	urls: string[] = [];
	@Output() public onUploadFinished = new EventEmitter();

	constructor(private http: HttpClient,
		private uploadFilesService: UploadFilesService) { }

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

		this.uploadFilesService.upload(formData).subscribe(
			{
				next: (response: ServiceResponse) => {

					this.message = response.message;
					this.urls = response.data;
					this.onUploadFinished.emit(response);

				},
				error: (err: HttpErrorResponse) => console.log(err)
			});
	}
}
