import { inject, injectable } from 'inversify';
import { AxiosError, isAxiosError } from 'axios';
import { Response as ExResponse } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { ValidateError } from 'tsoa';

import { HandleAxiosErrors } from './handler-axios-errors';
import { NotFoundException, UnauthorizedException, BadRequestException } from '../../domain/exceptions/Exceptions';
import { DefaultErrorMessages } from '../../domain/enums/default-messages/default-error-messages';

@injectable()
export class HandleGeneralErrors {
  constructor(@inject(HandleAxiosErrors) private readonly handleAxiosErrors: HandleAxiosErrors) {}

  public handleError(error: AxiosError | Error, res: ExResponse): ExResponse | void {
    if (error instanceof ValidateError) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        message: DefaultErrorMessages.VALIDATION_FIELDS_ERROR,
        details: error?.fields,
      });
    }

    if (isAxiosError(error)) {
      const { message, statusCode } = this.handleAxiosErrors.handle(error);
      return res.status(statusCode).json(message);
    }

    if (error instanceof BadRequestException) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: error.message,
      });
    } else if (error instanceof UnauthorizedException) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: error.message,
      });
    } else if (error instanceof NotFoundException) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: error.message,
      });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
}
