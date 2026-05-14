import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

type ValidationRule = {
  field: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
};

export const validate = (rules: ValidationRule[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    for (const rule of rules) {
      const value = req.body[rule.field];

      if (rule.required && (!value || value.toString().trim() === '')) {
        errors.push(`${rule.field} is required`);
        continue;
      }

      if (value) {
        if (rule.minLength && value.length < rule.minLength) {
          errors.push(`${rule.field} must be at least ${rule.minLength} characters`);
        }

        if (rule.maxLength && value.length > rule.maxLength) {
          errors.push(`${rule.field} must not exceed ${rule.maxLength} characters`);
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errors.push(`${rule.field} format is invalid`);
        }

        if (rule.custom && !rule.custom(value)) {
          errors.push(`${rule.field} validation failed`);
        }
      }
    }

    if (errors.length > 0) {
      throw new AppError(errors.join(', '), 400);
    }

    next();
  };
};
