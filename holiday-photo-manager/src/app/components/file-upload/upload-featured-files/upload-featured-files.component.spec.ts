import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFeaturedFilesComponent } from './upload-featured-files.component';

describe('UploadFeaturedFilesComponent', () => {
  let component: UploadFeaturedFilesComponent;
  let fixture: ComponentFixture<UploadFeaturedFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFeaturedFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadFeaturedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
