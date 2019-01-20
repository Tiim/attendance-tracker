/* eslint-disable node/no-unpublished-require */
const { knex } = require('../src/db');
const knexCleaner = require('knex-cleaner');

const { attendance, event, person, team } = require('../src/storage');

knexCleaner
  .clean(knex)
  .then(async () => {
    console.log('inserting teams');
    const team1 = await team.insert('Hyenas');
    const team2 = await team.insert('Baboons');

    console.log('inserting persons');
    const person1 = await person.insert('Brenden Wilks', team1);
    const person2 = await person.insert('Irv Nardell', team1);
    await person.insert('Ashli Welpy', team2);
    await person.insert('Maxine Leung', team2);

    console.log('inserting events');
    const event1 = await event.insert(new Date(2019, 1, 1), team1);
    const event2 = await event.insert(new Date(2019, 1, 2), team1);
    await event.insert(new Date(2019, 2, 2), team2);

    console.log('inserting attendance');
    await attendance.insert(event1, person1, 'present');
    await attendance.insert(event2, person1, 'present');
    await attendance.insert(event1, person2, 'present');
    await attendance.insert(event2, person2, 'present');
  })
  .then(() => {
    console.log('done.. waiting for connection to close');
  });
