export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;

  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean = true,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this);
  }
}

//Not Found Error
export class NotFoundError extends AppError {
  constructor(message = "Resources not found") {
    super(message, 404);
  }
}

//Validate Error (use for Joi/zod/react-hook-form validation errors)
export class ValidationError extends AppError {
  constructor(message = "Invalid request data", details?: any) {
    super(message, 400, true, details);
  }
}

//Authentication Error
export class AuthenticationError extends AppError {
  constructor(message = "Unauthorizes") {
    super(message, 401);
  }
}

//Forbidden Error (For Insufficient Permissions)
export class ForbiddenError extends AppError {
  constructor(message = "Forbidden access") {
    super(message, 403);
  }
}

//Database Error (For MongoDB/Postgres Error)
export class DatabaseError extends AppError {
  constructor(message = "Database error", details?: any) {
    super(message, 500, true, details);
  }
}

//Rate limit Error (If user exceeds Api Limit Error)
export class RatelimitError extends AppError {
  constructor(message = "Too many request, please try again later") {
    super(message, 429);
  }
}
