const { storage } = require('./common');

describe('Team', async () => {
  it('should get all the teams but none should exist', async () => {
    const res = await storage.team.getAll();
    res.should.have.length(0);
  });

  it('should insert team', async () => {
    const team = { name: 'Team 1' };
    const res = await storage.team.upsert(team);

    res.name.should.equal(team.name);
    res.active.should.equal(true);
    res.should.have.property('id');
  });

  it('should insert team and get it again', async () => {
    const team = { name: 'TestTeam' };
    const res = await storage.team.upsert(team);
    const res2 = await storage.team.getAll();
    res2.should.deep.include(res);
  });

  it('should insert and deactivate team', async () => {
    const team = { name: 'TestTeam' };
    const res = await storage.team.upsert(team);
    await storage.team.deactivate(res.id);
    const res2 = await storage.team.getAll();
    res2.should.have.length(0);
  });

  it('should get person in team', async () => {
    const team = { name: 'TestTeam' };
    const res = await storage.team.upsert(team);
    const person = {
      name: 'Michael',
      teamId: res.id,
    };
    const res2 = await storage.person.upsert(person);
    const res3 = await storage.mixed.personForTeam(res.id);
    res3.should.have.length(1);
    res3.should.deep.include(res2);
  });

  it('shoud get events of team', async () => {
    const team = { name: 'TestTeam' };
    const res = await storage.team.upsert(team);
    const event = {
      date: new Date(),
      teamId: res.id,
    };
    const res2 = await storage.event.upsert(event);
    const res3 = await storage.mixed.eventForTeam(res.id);
    res3.should.have.length(1);
    res3.should.deep.include(res2);
  });
});
