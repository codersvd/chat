import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {UsersComponent} from './components/users/users.component';
import {LoginComponent} from './components/login/login.component';
import {ChatModule} from "./components/chat/chat.module";
import {ReactiveFormsModule} from "@angular/forms";

const config: SocketIoConfig = {url: 'http://localhost:3000', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
