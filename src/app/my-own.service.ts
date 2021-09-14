import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyOwnService {

  constructor(private firestore: AngularFirestore) { }

  getStuff(): Observable<MyOwnDocument[]> {
    return this.firestore.collection<MyOwnDocument>('stuff').valueChanges()
  }
}

export interface MyOwnDocument {
  name: string;
}
