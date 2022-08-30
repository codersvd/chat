import { Component, OnInit } from '@angular/core';
import {UsersService} from "./users.service";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  nickname: string | null = null;
  constructor(
    public usersService: UsersService,
    private socket: Socket
  ) { }

  ngOnInit(): void {
    this.nickname =  window.localStorage.getItem("user");
    if(this.nickname) {
      this.socket.emit('enterUsername', {nickname: this.nickname});
    }
    this.usersService.getUsers();
  }

}
