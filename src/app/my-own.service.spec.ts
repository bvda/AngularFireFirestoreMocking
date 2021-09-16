import { } from '@angular/compiler/src/util';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, of } from 'rxjs';

import { MyOwnService } from './my-own.service';

describe('MyOwnService', () => {
  let service: MyOwnService;
  
  const collectionStub = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([{ name: 'test'}]))
  }

  const firestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: firestoreStub}]
    });
    service = TestBed.inject(MyOwnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve data', (done: DoneFn) => {
      service.getStuff().subscribe(value => {
        expect(value).toEqual([{ name: 'test'}])
        done();
      });
  })
  
  it('should wait for promise', waitForAsync(() => {
    expect(service.getPromiseValue().then(value => expect(value).toBe('promise value')))
  }))
});
