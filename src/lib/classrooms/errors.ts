export class AuthorizationError extends Error {
  constructor(message = "No autorizado") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class NotFoundError extends Error {
  constructor(message = "No encontrado") {
    super(message);
    this.name = "NotFoundError";
  }
}
