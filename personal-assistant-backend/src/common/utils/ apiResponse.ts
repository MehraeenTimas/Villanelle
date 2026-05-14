export class ApiResponse {
    static success(data: any, message: string = 'Success', statusCode: number = 200) {
      return {
        success: true,
        message,
        data,
        statusCode
      };
    }
  
    static error(message: string, statusCode: number = 500, errors?: any) {
      return {
        success: false,
        message,
        errors,
        statusCode
      };
    }
  }
  