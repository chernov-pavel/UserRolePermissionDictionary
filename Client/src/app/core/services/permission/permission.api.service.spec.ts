import { TestBed } from '@angular/core/testing';

import { PermissionApiService } from './permission.api.service';

describe('Permission.ApiService', () => {
  let service: PermissionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
