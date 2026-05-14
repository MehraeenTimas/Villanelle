// personal-assistant-frontend/src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TodoService } from '../../core/services/todo.service';
import { ChatService } from '../../core/services/chat.service';
import { Todo } from '../../shared/models/todo.model';
import { ChatMessage } from '../../shared/models/chat.model';

type View = 'todos' | 'chat' | 'profile';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  currentView: View = 'todos';
  
  // Todos
  todos: Todo[] = [];
  newTodoTitle = '';
  newTodoDescription = '';
  editingTodo: Todo | null = null;
  
  // Chat
  chatMessages: ChatMessage[] = [];
  newMessage = '';
  sendingMessage = false;
  
  // User
  username = '';

  constructor(
    private authService: AuthService,
    private todoService: TodoService,
    private chatService: ChatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.username = user?.username || 'Dancer';
    });
    this.loadTodos();
    this.loadChatMessages();
  }

  // Navigation
  setView(view: View): void {
    this.currentView = view;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Todos
  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      },
      error: (err) => console.error('Failed to load todos', err)
    });
  }

  addTodo(): void {
    if (!this.newTodoTitle.trim()) return;

    this.todoService.createTodo({
      title: this.newTodoTitle,
      description: this.newTodoDescription || undefined
    }).subscribe({
      next: () => {
        this.newTodoTitle = '';
        this.newTodoDescription = '';
        this.loadTodos();
      },
      error: (err) => console.error('Failed to create todo', err)
    });
  }

  toggleTodo(todo: Todo): void {
    this.todoService.updateTodo(todo.id, { completed: !todo.completed }).subscribe({
      next: () => this.loadTodos(),
      error: (err) => console.error('Failed to update todo', err)
    });
  }

  deleteTodo(id: number): void {
    if (!confirm('Delete this task?')) return;
    
    this.todoService.deleteTodo(id).subscribe({
      next: () => this.loadTodos(),
      error: (err) => console.error('Failed to delete todo', err)
    });
  }

  // Chat
  loadChatMessages(): void {
    this.chatService.getMessages().subscribe({
      next: (messages) => {
        this.chatMessages = messages;
      },
      error: (err) => console.error('Failed to load messages', err)
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || this.sendingMessage) return;

    this.sendingMessage = true;
    this.chatService.sendMessage({ message: this.newMessage }).subscribe({
      next: (message) => {
        this.chatMessages.push(message);
        this.newMessage = '';
        this.sendingMessage = false;
      },
      error: (err) => {
        console.error('Failed to send message', err);
        this.sendingMessage = false;
      }
    });
  }
}
