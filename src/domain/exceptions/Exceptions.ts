import { DefaultException } from './DefaultException';

export class NotFoundException extends DefaultException {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export class UnauthorizedException extends DefaultException {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export class ForbiddenException extends DefaultException {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export class BadRequestException extends DefaultException {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
