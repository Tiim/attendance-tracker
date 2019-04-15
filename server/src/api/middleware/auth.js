module.exports = (request, reply, done) => {
  if (!request.session.user) {
    reply.unauthorized();
  }
  done();
};
