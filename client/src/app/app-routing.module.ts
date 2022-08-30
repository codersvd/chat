import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatComponent} from "./components/chat/chat.component";
import {AuthGuard} from "./auth.guard";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'chat', pathMatch: 'full'
  },
  {
    path: 'chat', component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '/404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
