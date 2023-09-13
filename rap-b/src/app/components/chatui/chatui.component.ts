import { Component } from '@angular/core';
import { MessageDTO } from 'src/app/dto/messageDTO';

@Component({
  selector: 'app-chatui',
  templateUrl: './chatui.component.html',
  styleUrls: ['./chatui.component.scss']
})
export class ChatuiComponent {
  public userMessage: string = '';
  public messages:MessageDTO[] = [
    { text: "Hello! How can I help you", sender: Sender.bot}]

  sendMessage() {
    if (this.userMessage.trim() !== '') {
      this.messages.push({ text: this.userMessage, sender: Sender.user });
      this.userMessage = '';  
      setTimeout(() => {
        this.messages.push({ text: "I'm just a mock bot, but thanks for the message!", sender: Sender.bot });
      }, 1000);
    }
  }
}
