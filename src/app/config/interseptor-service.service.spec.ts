import { TestBed } from '@angular/core/testing';

import { InterseptorServiceService } from './interseptor-service.service';

describe('InterseptorServiceService', () => {
  let service: InterseptorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterseptorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
