import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {BehaviorSubject} from "rxjs";

interface IUser{
  id: string,
  nickname: string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  constructor(private socket: Socket) { }

  getUsers(): void{
    this.socket.on("getUsers", (data: {users: IUser[]})=>{
      this.users$.next(data['users']);
    })
  }
}
