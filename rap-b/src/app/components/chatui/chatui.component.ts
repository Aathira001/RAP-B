import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, scan } from 'rxjs';
import { MessageDTO } from 'src/app/dto/messageDTO';
import { Sender } from 'src/app/enum/sender';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chatui',
  templateUrl: './chatui.component.html',
  styleUrls: ['./chatui.component.scss']
})
export class ChatuiComponent implements OnInit{
  public userMessage: string = '';
  conversation = new BehaviorSubject<MessageDTO[]>([]);
  public messages!: Observable<MessageDTO[]>;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
      this.messages = this.conversation.asObservable().pipe(scan((acc, val) => acc.concat(val) ))
  }

  update(msg: MessageDTO) {
    console.log(msg)
    this.conversation.next([msg]);
  }

  sendMessage() {
    if (this.userMessage.trim() !== '') {
      const message = { text: this.userMessage, sender: Sender.user }
      this.userMessage = ''; 
      this.update(message)
      this.chatService.sendQuery(message)
      .subscribe(res => this.update(res))
    }
  }
}
