module.exports = async (request, reply, done) => {
  if (!request.session.user) {
    reply.status(403).send('Not authenticated!');
  }
  done();
};
