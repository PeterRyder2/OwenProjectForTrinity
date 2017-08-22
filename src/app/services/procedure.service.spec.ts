import { TestBed, inject } from '@angular/core/testing';

import { ProcedureService } from './procedure.service';

describe('ProcedureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcedureService]
    });
  });

  it('should ...', inject([ProcedureService], (service: ProcedureService) => {
    expect(service).toBeTruthy();
  }));
});
