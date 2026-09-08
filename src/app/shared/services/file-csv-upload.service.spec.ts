import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { FileCsvUploadService } from './file-csv-upload.service';

describe('FileCsvUploadService', () => {
  let service: FileCsvUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(FileCsvUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
