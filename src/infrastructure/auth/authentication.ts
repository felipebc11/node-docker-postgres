import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import { UnauthorizedException } from '../../domain/exceptions/Exceptions';
import { DefaultErrorMessages } from '../../domain/enums/default-messages/default-error-messages';

export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]) {
  if (securityName === 'jwt') {
    const token = request.headers.authorization;
    const bearerToken = token?.split(' ')[1];
    const secret = process.env.JWT_SECRET ?? 'secret';

    return new Promise((resolve, reject) => {
      if (!bearerToken) {
        reject(new UnauthorizedException(DefaultErrorMessages.MISSING_TOKEN_IN_HEADER));
      }

      jwt.verify(bearerToken as string, secret, function (error: any, decoded: any) {
        if (error) {
          reject(new UnauthorizedException(DefaultErrorMessages.INVALID_TOKEN));
        } else {
          scopes?.forEach((scope) => {
            if (!decoded.scopes.includes(scope)) {
              reject(new UnauthorizedException(DefaultErrorMessages.USER_HAS_NOT_NECESSARY_PERMISSIONS));
            }
          });
          resolve(decoded);
        }
      });
    });
  }
  return Promise.reject(new Error(DefaultErrorMessages.MISSING_TOKEN_IN_HEADER));
}
