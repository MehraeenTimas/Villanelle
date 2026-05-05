// personal-assistant-frontend/src/app/models/chat.model.ts
export interface ChatMessage {
    id: number;
    user_id: number;
    message: string;
    response: string;
    created_at: string;
  }
  
  export interface SendMessageRequest {
    message: string;
  }
  