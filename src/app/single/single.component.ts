import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
  ){}

  post: any;
  public currentId: any = this.route.snapshot.paramMap.get("id");  
  public image:any = null; //list of files
  public busy: boolean = false;

  updateForm = new FormGroup({
    title: new FormControl<string | null>("", {validators:[Validators.required], nonNullable: true}),
    content: new FormControl<string | null>("", {validators:[Validators.required], nonNullable: true}),
    oldcover: new FormControl<string | null>("", {validators:[Validators.required], nonNullable: true}),  
  });

  public handleInput($event: any){
    //getting the image or files
    this.image = $event.target["files"];
    console.log(this.image[0]);
  }


  async getPostById(){
    this.post = await this.firebaseService.getpostById(this.currentId);
    this.updateForm.setValue({
      title: this.post.title,
      content: this.post.content,
      oldcover: this.post.cover,
    })
  
  }


  async updatePost(){

    //get the form data
    let post = {
      title: this.updateForm.value.title,
      content: this.updateForm.value.content,
      cover: this.updateForm.value.oldcover,
    }

     await this.firebaseService.updatePost(post, this.image, this.currentId);
  }


  async removePost(){
    //remove the post
    await this.firebaseService.deletePost(this.currentId, this.post.cover);
  }

  ngOnInit(): void {
    this.getPostById();
  }
}
