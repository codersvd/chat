import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatComponent} from "./chat.component";
import {FormsModule} from "@angular/forms";
import {UsersComponent} from "../users/users.component";

@NgModule({
  declarations: [
    ChatComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ChatModule { }
