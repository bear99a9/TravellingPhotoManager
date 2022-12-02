import { TestBed } from '@angular/core/testing';

import { PhotoService } from './upload-files.service';

describe('UploadFilesService', () => {
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
