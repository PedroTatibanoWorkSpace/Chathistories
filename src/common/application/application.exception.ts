export class ApplicationException extends Error {
  public statusCode: number = 400;

  constructor(message: string) {
    super(message);
  }
}
