import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MessageDTO } from '../dto/messageDTO';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiURL = environment.apiUrl;
  private chatType = new Subject<string>();
  chatType$ = this.chatType.asObservable();

  constructor(
    private http: HttpClient
  ) { 
  }

  public sendQuery(data: MessageDTO): Observable<MessageDTO> {
    return this.http.post<MessageDTO>(this.apiURL+'query/', data.text)
  }

  public sendRagQuery(data: MessageDTO): Observable<any> {
    return this.http.post<MessageDTO>(this.apiURL+'ragquery/', data.text)
  }

  setChatType(chatType: string) {
    this.chatType.next(chatType)
  }
}
