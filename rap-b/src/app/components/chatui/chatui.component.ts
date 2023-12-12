import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, scan } from 'rxjs';
import { MessageDTO } from 'src/app/dto/messageDTO';
import { Sender } from 'src/app/enum/sender';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chatui',
  templateUrl: './chatui.component.html',
  styleUrls: ['./chatui.component.scss']
})
export class ChatuiComponent implements OnInit, OnDestroy{
  public userMessage: string = '';
  private routeSub!: Subscription;
  conversation = new BehaviorSubject<MessageDTO[]>([]);
  public messages!: Observable<MessageDTO[]>;
  public chatType: string = 'rag'

  constructor(private chatService: ChatService, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.messages = this.conversation.asObservable().pipe(scan((acc, val) => acc.concat(val) ))
      this.routeSub = this.route.params.subscribe(params => {
        this.chatType = params['type'];
        this.chatService.setChatType(this.chatType)
        console.log(this.chatType)
      });
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
      this.chatType == 'sentiment' ? this.sentimentQuery(message) : this.ragQuery(message)
    }
  }

  sentimentQuery(message: MessageDTO) {
    this.chatService.sendQuery(message)
      .subscribe(res => this.update(res))
  }

  ragQuery(message: MessageDTO) {
    this.chatService.sendRagQuery(message)
      .subscribe((res) => {
        this.update(res)
      })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe(); // Don't forget to unsubscribe
  }
}
