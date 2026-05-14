import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './auth.repository';
import { RegisterDto, LoginDto, AuthResponse } from './auth.types';
import { AppError } from '../../common/middleware/errorHandler';
import { config } from '../../config/app.config';

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(data: RegisterDto): Promise<AuthResponse> {
    const { username, password } = data;

    const existingUser = await this.authRepository.findByUsername(username);
    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, config.bcryptRounds);
    const userId = await this.authRepository.createUser(username, hashedPassword);

    const token = this.generateToken(userId);

    return {
      message: 'User registered successfully',
      token,
      user: { id: userId, username }
    };
  }

  async login(data: LoginDto): Promise<AuthResponse> {
    const { username, password } = data;

    const user = await this.authRepository.findByUsername(username);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = this.generateToken(user.id);

    return {
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username }
    };
  }

  private generateToken(userId: number): string {
    return jwt.sign(
      { userId },
      config.jwtSecret,
      { expiresIn: config.jwtExpiry }
    );
  }
}
