import { Component } from '@angular/core';

@Component({
  selector: 'app-chatui',
  templateUrl: './chatui.component.html',
  styleUrls: ['./chatui.component.scss']
})
export class ChatuiComponent {
  public userMessage: string = '';
  public messages: any[] = [
    { text: "Hello! How can I help you", sender: 'Bot'}]

  sendMessage() {
    if (this.userMessage.trim() !== '') {
      this.messages.push({ text: this.userMessage, sender: 'User' });
      this.userMessage = '';  // Clear the input
      
      // Add a mock response from the bot after a delay
      setTimeout(() => {
        this.messages.push({ text: "I'm just a mock bot, but thanks for the message!", sender: 'Bot' });
      }, 1000);
    }
  }
}
