import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MessageDTO } from '../dto/messageDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiURL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public sendQuery(data: MessageDTO): Observable<MessageDTO> {
    return this.http.post<MessageDTO>(this.apiURL+'query/', data.text)
  }
}
