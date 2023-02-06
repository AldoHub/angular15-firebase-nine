import { inject, Injectable } from '@angular/core';
import { Firestore, collectionData, collection, CollectionReference, query, where, addDoc, DocumentData} from '@angular/fire/firestore';
import { Observable, of, map, BehaviorSubject, lastValueFrom } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: Firestore,
    private storage: AngularFireStorage,
  ) { }
 
  collection: CollectionReference<any>= collection(this.firestore, 'posts');
  posts$: Observable<any> = collectionData(this.collection, { idField: 'id'}); //appends the id
  public percentage!: any;
  public percentageChanges: BehaviorSubject<any> = new BehaviorSubject<any>(this.percentage);


  setPercentage(percent: any): void{
    this.percentage = percent;
    this.percentageChanges.next(percent);
  }


  uploadPercent!: Observable<number | undefined>;
  downloadURL!: Observable<string>;

  //get the collection instance on load
  getAllPosts(): Observable<any>{
    return this.posts$;  
  }  

  //gest the post using the id provided
  getpostById(postId: any): Observable<any> {

      const docRef = collection(this.firestore, "posts");
      // if we wanted to use an id we would need to add it onto the doc propperties
      // just like the title
      const _query = query(docRef, where("title", "==", postId));

      return collectionData(_query);
  }

  
  //upload the image to firebase storage
  async uploadImage(image: any){
    console.log("try to upload the image: ", image)
    
    const file = image[0];
    const filePath = Date.now() + "-" + image[0]["name"];
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

   // observe percentage changes
   this.uploadPercent = task.percentageChanges();
   
   this.uploadPercent.subscribe((perc: any) => {
    console.log(perc)
    //subscrie on the component to see the changes
    this.setPercentage(Math.trunc(perc));
   });

  
   let upload = await lastValueFrom(task.snapshotChanges());
   this.downloadURL = await lastValueFrom(fileRef.getDownloadURL());
  }


  //add the post data to the collection 'posts'
  async addPost(post: any, cover: any): Promise<any> {

    console.log(post, cover);

    //wait for the image to be uploaded fisrt
    await this.uploadImage(cover);

    //process the post data and create the object to upload
    let _post = {
      title: post.title,
      content: post.content,
      cover: this.downloadURL
    }

    //upload the post
    const collectionRef = collection(this.firestore, 'posts');
    return addDoc(collectionRef, _post);
  
  }

}
