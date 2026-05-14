import { Request, Response } from 'express';
import pool from '../../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const getTodos = async (req: Request, res: Response) => {
  try {
    const [todos] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC',
      [req.userId]
    );

    res.json(todos);
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)',
      [req.userId, title, description || '']
    );

    const [newTodo] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM todos WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newTodo[0]);
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ? AND user_id = ?',
      [title, description, completed, id, req.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const [updatedTodo] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM todos WHERE id = ?',
      [id]
    );

    res.json(updatedTodo[0]);
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM todos WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
