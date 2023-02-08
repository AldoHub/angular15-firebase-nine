import { inject, Injectable } from '@angular/core';
import { Firestore, collectionData, collection, CollectionReference, query, where, addDoc, getDocs, doc, updateDoc, getDoc, deleteDoc} from '@angular/fire/firestore';
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
  async getpostById(postId: any){

      let docRef = doc(this.firestore, "posts", postId)
      let p = await getDoc(docRef);
      return p.data();
    }

  
  //upload the image to firebase storage
  async uploadImage(image: any){
        
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

  
   await lastValueFrom(task.snapshotChanges());
   this.downloadURL = await lastValueFrom(fileRef.getDownloadURL());
  }


  //add the post data to the collection 'posts'
  async addPost(post: any, cover: any): Promise<any> {

    //wait for the image to be uploaded fisrt
    await this.uploadImage(cover);

    //process the post data and create the object to upload
    let _post = {
      title: post.title,
      content: post.content,
      cover: this.downloadURL
    }

    //upload the post
    return addDoc(this.collection, _post);
  
  }


  async updatePost(post: any, image: any, postId: any){
      
    if(image == null){
      //no new cover, continue
      console.log("NO NEW COVER TO UPLOAD")
    }else{
      //new cover, needs to be uploaded
      await this.uploadImage(image);
      
      //remove the old cover
      let fileRef = this.storage.refFromURL(post.cover);
      let d = lastValueFrom(fileRef.delete());
      console.log(d)

      //set the new cover
      post["cover"] = this.downloadURL;

    }

    let docRef = doc(this.firestore, "posts", postId);
    await updateDoc(docRef,{
      title: post.title,
      content: post.content,
      cover: post.cover 
     })

  }



  async deletePost(postId: string, cover: string){
    let docRef = doc(this.firestore, "posts", postId);
    //delete post
    await deleteDoc(docRef);
    //delete image
    let fileRef = this.storage.refFromURL(cover);
    let d = lastValueFrom(fileRef.delete());

    console.log("POST & IMAGE DELETED")

  }
}
