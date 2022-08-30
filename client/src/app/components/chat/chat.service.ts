import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Socket} from "ngx-socket-io";

interface IMessage {
  date: string;
  message: string;
  nickname: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages$: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);

  constructor(private socket: Socket) {
  }

  getNewMessage(): void{
    this.socket.on('newMessage', (data: any) => {
      console.log(data);
      this.messages$.value.push(data);
    })
  }

  getMessages(): void {
    this.socket.on('initChat', (data: any) => {
      this.messages$.next(data.messages);
    })
  }
}
