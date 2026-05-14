import pool from '../../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { User } from './auth.types';

export class AuthRepository {
  async findByUsername(username: string): Promise<User | null> {
    const [users] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    return users.length > 0 ? (users[0] as User) : null;
  }

  async createUser(username: string, hashedPassword: string): Promise<number> {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    return result.insertId;
  }

  async findById(id: number): Promise<User | null> {
    const [users] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    return users.length > 0 ? (users[0] as User) : null;
  }
}
