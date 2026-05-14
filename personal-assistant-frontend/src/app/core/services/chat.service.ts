// personal-assistant-frontend/src/app/services/chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { ChatMessage, SendMessageRequest } from '../../shared/models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {}

  getMessages(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${environment.apiUrl}/chat/messages`);
  }

  sendMessage(data: SendMessageRequest): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${environment.apiUrl}/chat/send`, data);
  }
}
