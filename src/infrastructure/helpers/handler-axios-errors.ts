import { AxiosError } from 'axios';
import { injectable } from 'inversify';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

@injectable()
export class HandleAxiosErrors {
  public handle(error: AxiosError): { message: string; statusCode: number } {
    if (error?.response?.data) {
      const errorMessage = error?.response?.data as string;

      return {
        message: errorMessage ?? getReasonPhrase(error.response.status),
        statusCode: error.response.status,
      };
    }

    return {
      message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
}
