import { FileUploadService } from '../file-upload.service';
import { OnInit, Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import ServiceResponse from '../models/service-response.interface';

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

	constructor(private http: HttpClient) { }

	ngOnInit() {
	}

	uploadFile = (files: any) => {
		if (files.length === 0) {
			return;
		}

		let filesToUpload: File[] = files;
		const formData = new FormData();

		Array.from(filesToUpload).map((file, index) => {
			return formData.append('file' + index, file, file.name);
		});

		this.http.post('https://localhost:1989/api/blog', formData, { reportProgress: true, observe: 'events' })
			.subscribe(
				{
					next: (event) => {
						if (event.type === HttpEventType.UploadProgress)
							this.progress = Math.round(100 * event.loaded / event.total!);
						else if (event.type === HttpEventType.Response) {
							this.message = 'Upload success.';
							const response: ServiceResponse = event.body as ServiceResponse
							this.urls = response.data;
							this.onUploadFinished.emit(event.body);
						}
					},
					error: (err: HttpErrorResponse) => console.log(err)
				});
	}
}
