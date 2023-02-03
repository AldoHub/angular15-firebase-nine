import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ActivatedRoute, Router } from "@angular/router";

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

  getPostById(){
    this.firebaseService.getpostById(this.currentId).subscribe(post => {
      this.post = post[0];
    });
  }


  ngOnInit(): void {
    this.getPostById();
  }
}
