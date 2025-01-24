import { TestBed } from '@angular/core/testing';

import { LandingFacade } from './landing.facade';

describe('LandingFacade', () => {
  let service: LandingFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandingFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
