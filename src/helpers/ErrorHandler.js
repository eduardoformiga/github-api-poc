import messages from './messages'

export class ErrorHandler {
  constructor(error) {
    this._error = error
  }

  statusCode() {
    if (this._error.response) {
      return this._error.response.status || 500
    }
    return 500
  }

  handleMessage() {
    return messages.errors[this.statusCode()] || messages.errors.default
  }
}
