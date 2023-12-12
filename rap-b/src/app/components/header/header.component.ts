import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  chatType = '   '

  constructor(private chatService: ChatService) {
    this.chatService.chatType$.subscribe(res => {
      if(res) {
        this.chatType = ' - ' + res
      }
    })
  }

}
