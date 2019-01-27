const { server, http } = require('./common');

describe('Team', async () => {
  it('should GET all the teams but none should exist', async () => {
    const res = await http.get('/api/teams/');
    res.statusCode.should.equal(200);
    res.body.should.have.length(0);
  });

  it('should PUT some teams in', async () => {
    const res = await http.put('/api/teams/', { name: 'Team 1' });

    res.statusCode.should.equal(201);
    res.body.name.should.equal('Team 1');
  });

  it('should PUT some teams in and GET them again', async () => {
    const res = await http.put('/api/teams/', { name: 'TestTeam' });
    const res2 = await http.get('/api/teams/');
    res2.body.should.deep.include(res.body);
  });

  it('should DELETE team', async () => {
    const res = await http.put('/api/teams/', { name: 'TestTeam' });
    await http.delete(`/api/teams/${res.body.id}`);
    const res2 = await http.get('/api/teams/');
    res2.body.should.have.length(0);
  });

  it('should GET persons of team', async () => {
    const team = await http.put('/api/teams', { name: 'Team1' });
    const person = await http.put('/api/persons', {
      name: 'Michael Jackson',
      teamId: team.body.id,
    });
    const res = await http.get(`/api/teams/${team.body.id}/persons`);
    res.body.should.have.length(1);
    res.body.should.deep.include(team.body);
  });

  it('shoud GET events of team', async () => {
    const team = await http.put('/api/teams', { name: 'Team1' });
    const event = await http.put('/api/events', {
      date: new Date(),
      teamId: team.body.id,
    });
    const res = await http.get(`/api/teams/${team.body.id}/events`);
    res.body.should.have.length(1);
    res.body.should.deep.include(team.body);
  });
});
