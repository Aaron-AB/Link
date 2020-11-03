import { TestBed } from '@angular/core/testing';

import { FriendhelperService } from './friendhelper.service';

describe('FriendhelperService', () => {
  let service: FriendhelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendhelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
