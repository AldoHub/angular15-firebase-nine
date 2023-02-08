import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { SingleRoutingModule } from './single-routing.module';
import { SingleComponent } from './single.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
     CommonModule,
     SingleRoutingModule,
     ReactiveFormsModule,
    ],
    declarations: [SingleComponent] 
})

export class SingleModule { }