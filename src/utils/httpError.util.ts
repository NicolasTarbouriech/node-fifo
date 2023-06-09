class HttpErrorBase extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: number,
    public previous?: Error
  ) {
    super(message);
  }
}

export interface HttpErrorParams {
  code?: number;
  previous?: Error;
}

export function HttpError(
  statusCode: number,
  message: string,
  params?: HttpErrorParams
) {
  return new HttpErrorBase(statusCode, message, params?.code, params?.previous);
}

export function HttpInternalServerError(
  message: string,
  params?: HttpErrorParams
) {
  return HttpError(500, message, params);
}

export function HttpUnauthorizedError(
  message: string,
  params?: HttpErrorParams
) {
  return HttpError(401, message, params);
}

export function HttpNotFoundError(message: string, params?: HttpErrorParams) {
  return HttpError(404, message, params);
}
