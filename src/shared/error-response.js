export function sendError(reply, statusCode, code, message, details = null) {
  const requestId = reply.request.id;

  return reply.status(statusCode).send({
    ok: false,
    error: {
      code,
      message,
      details,
    },
    requestId,
  });
}
