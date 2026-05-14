// personal-assistant-frontend/src/app/models/user.model.ts
export interface User {
    id: number;
    username: string;
    
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }
  
  export interface LoginRequest {
   username: string;
    password: string;
  }
  
  export interface RegisterRequest {
    username: string;
    password: string;
  }
  