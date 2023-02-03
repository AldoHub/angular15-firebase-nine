import { inject, Injectable } from '@angular/core';
import { Firestore, collectionData, collection, CollectionReference, query, where} from '@angular/fire/firestore';
import { Observable, of, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: Firestore,
  ) { }
 
  collection: CollectionReference<any>= collection(this.firestore, 'posts');
  posts$: Observable<any> = collectionData(this.collection, { idField: 'id'}); //appends the id


  //get the collection instance on load
  getAllPosts(): Observable<any>{
    return this.posts$;  
  }  

  getpostById(postId: any): Observable<any> {

      const docRef = collection(this.firestore, "posts");
      // if we wanted to use an id we would need to add it onto the doc propperties
      // just like the title
      const _query = query(docRef, where("title", "==", postId));

      return collectionData(_query);



  }

}
