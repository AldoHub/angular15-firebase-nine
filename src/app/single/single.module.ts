import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { SingleRoutingModule } from './single-routing.module';
import { SingleComponent } from './single.component';

@NgModule({
    imports: [
     CommonModule,
     SingleRoutingModule,
    ],
    declarations: [SingleComponent] 
})

export class SingleModule { }