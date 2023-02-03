import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-create',
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  public image:any = null; //list of files
  public busy: boolean = false;

  postForm = new FormGroup({
    title: new FormControl<string | null>("", {validators:[Validators.required], nonNullable: true}),
    content: new FormControl<string | null>("", {validators:[Validators.required], nonNullable: true}),
    cover: new FormControl<string | null>("", {validators:[Validators.required], nonNullable: true}),  
  });

  public handleInput($event: any){
    //getting the image or files
    this.image = $event.target["files"];
    console.log(this.image[0]);
  }

  addPost(value: any){
    //get the form values
    console.log(this.postForm.value);
   
  }
}
