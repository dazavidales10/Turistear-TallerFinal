import { TestBed } from '@angular/core/testing';
import { Vuelos } from './vuelos';

describe('Vuelos', () => {
  let service: Vuelos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Vuelos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
