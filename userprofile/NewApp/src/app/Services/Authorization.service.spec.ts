/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthorizationService } from './Authorization.service';

describe('Service: Authorization', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationService]
    });
  });

  it('should ...', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service).toBeTruthy();
  }));
});
