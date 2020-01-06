class UnknownError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnknownError';
  }
}

export default UnknownError;
