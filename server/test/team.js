const { server } = require('./common');

describe('Team', async () => {
  describe('/GET book', async () => {
    it('should GET all the teams but none should exist', async () => {
      const res = await server.inject({
        method: 'GET',
        url: '/api/teams/',
      });
      res.statusCode.should.equal(200);
      const body = JSON.parse(res.payload);
      body.should.have.length(0);
    });

    it('should PUT some teams in', async () => {
      const res = await server.inject({
        method: 'PUT',
        url: '/api/teams/',
        payload: { name: 'Team 1' },
      });

      res.statusCode.should.equal(201);
      const body = JSON.parse(res.payload);

      body.name.should.equal('Team 1');
    });
  });
});
