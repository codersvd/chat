import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "./chat.service";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterContentInit {

  @ViewChild('chatView') chatView!: ElementRef;
  msg: string = "";

  constructor(
    public chatService: ChatService,
    private socket: Socket,
  ) {
  }

  ngOnInit(): void {

  }

  ngAfterContentInit() {
    this.chatService.getMessages();
  }

  onSend(value: string): void {
    if(value) {
      this.socket.emit("newMessage", {message: value});
      this.chatService.getNewMessage();
      this.msg = '';
      setTimeout(() => {
        this.chatView.nativeElement.scrollTo(0, this.chatView.nativeElement.scrollHeight);
      }, 100);
    }
  }

}
