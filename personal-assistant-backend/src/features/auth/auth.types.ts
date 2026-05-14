export interface RegisterDto {
    username: string;
    password: string;
  }
  
  export interface LoginDto {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    message: string;
    token: string;
    user: {
      id: number;
      username: string;
    };
  }
  
  export interface User {
    id: number;
    username: string;
    password: string;
    created_at: Date;
  }
  