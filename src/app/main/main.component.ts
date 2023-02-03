import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
  ){}

  posts$: any = ""; 


  //use firebase to get the first set of posts on start
  getAllFirebasePosts(){
    this.posts$ = this.firebaseService.getAllPosts();
  } 


  ngOnInit(): void {
    //get all posts
    this.getAllFirebasePosts();
  
  }



}
