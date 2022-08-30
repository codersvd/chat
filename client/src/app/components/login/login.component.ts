import {Component, OnInit} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ChatService} from "../chat/chat.service";
import {UsersService} from "../users/users.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private socket: Socket,
    private formBuilder: FormBuilder,
    protected readonly router: Router,
    private chatService: ChatService,
    private usersService: UsersService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {nickname: ["", Validators.required]}
    )
  }

  sendNickname(): void {
    if (this.loginForm.get("nickname")?.value) {
      this.socket.emit('enterUsername', {nickname: this.loginForm.get("nickname")?.value});
      window.localStorage.setItem("user", this.loginForm.get("nickname")?.value);
      this.socket.on('userConnected', (username: any) => {
        this.chatService.getMessages();
        this.usersService.getUsers();
        this.router.navigate(['/chat']);
      })
    }
  }

}
