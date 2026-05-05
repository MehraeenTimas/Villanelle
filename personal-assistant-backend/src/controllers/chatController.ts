import { Request, Response } from 'express';
import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Simple AI response logic (you can integrate with OpenAI API later)
    let response = 'I received your message. How can I help you?';
    let todoCreated = false;

    // Check if message contains todo-related keywords
    const todoKeywords = ['add todo', 'create todo', 'new task', 'add task', 'remind me'];
    const lowerMessage = message.toLowerCase();

    if (todoKeywords.some(keyword => lowerMessage.includes(keyword))) {
      // Extract todo title from message
      const title = message.replace(/add todo|create todo|new task|add task|remind me to/gi, '').trim();

      if (title) {
        await pool.query<ResultSetHeader>(
          'INSERT INTO todos (user_id, title) VALUES (?, ?)',
          [req.userId, title]
        );
        response = `I've added "${title}" to your todo list!`;
        todoCreated = true;
      }
    }

    // Save chat message
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO chat_messages (user_id, message, response) VALUES (?, ?, ?)',
      [req.userId, message, response]
    );

    res.json({
      id: result.insertId,
      message,
      response,
      todoCreated,
      created_at: new Date()
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const [messages] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM chat_messages WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
      [req.userId]
    );

    res.json(messages);
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
