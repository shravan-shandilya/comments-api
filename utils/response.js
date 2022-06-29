function createResponse(success, data, error) {
  return {
    success,
    data: success ? data : null,
    error: success ? null : error,
  };
}

export { createResponse };
