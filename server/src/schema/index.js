const schema = [
  {
    $id: 'attendance',
    type: 'object',
    required: ['eventId', 'personId', 'state'],
    properties: {
      id: { type: 'integer', description: 'The id of this object' },
      eventId: { type: 'integer', description: 'The id of the parent event' },
      personId: { type: 'integer', description: 'The id of the parent person' },
      state: {
        type: 'string',
        enum: ['absent', 'present', 'excused'],
        description: 'the attendance state',
      },
    },
  },
  {
    $id: 'race-result',
    type: 'object',
    required: [
      'id',
      'personId',
      'date',
      'distance',
      'style',
      'pool',
      'time',
      'notes',
      'splits',
      'official',
      'meet',
    ],
    properties: {
      id: { type: 'integer', description: 'time result id' },
      personId: { type: 'integer', description: 'The id of the person' },
      date: {
        type: 'string',
        format: 'date',
        description: 'date when the result was achieved',
      },
      distance: { type: 'integer', description: 'distance in pool unit' },
      style: { type: 'string', description: 'swim style' },
      pool: {
        type: 'string',
        enum: [
          'LCM',
          'SCM',
          'SCY',
          'SCM16',
          'SCM20',
          'SCM33',
          'SCY20',
          'SCY27',
          'SCY33',
          'SCY36',
          'OPENM',
          'OPENY',
        ],
        description: 'pool length',
      },
      time: { type: 'integer', description: 'time in ms' },
      notes: { type: 'string', description: 'notes to the result' },
      splits: { type: 'array', description: 'time splits' }, //TODO: validate better [{from: <distance>, to:<distance>, time: <time_in_ms>}]
      official: {
        type: 'boolean',
        description: 'is this a officially recorded time',
      },
      meet: { type: 'object', description: 'meet meta data' }, // TODO: validate better
    },
  },
  {
    $id: 'event',
    type: 'object',
    required: ['date', 'teamId'],
    properties: {
      id: { type: 'integer', description: 'The id of this object' },
      date: {
        type: 'string',
        format: 'date-time',
        description: 'When the event starts',
      },
      teamId: { type: 'integer', description: 'The id of the parent team' },
      attendances: {
        type: 'array',
        items: 'attendance#',
        description: 'All attendance data of this event',
      },
    },
  },
  {
    $id: 'login',
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', description: 'user email address' },
      password: { type: 'string', description: 'user password' },
    },
  },
  {
    $id: 'person',
    type: 'object',
    required: ['name', 'teamId'],
    properties: {
      id: { type: 'integer', description: 'The id of this object' },
      name: { type: 'string', description: 'The name of the person' },
      teamId: { type: 'integer', description: 'The id of the parent team' },
      active: {
        type: 'boolean',
        description: 'The status if this person is still active',
      },
    },
  },
  {
    $id: 'team',
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'integer', description: 'The id of this object' },
      name: { type: 'string', description: 'The name of the team' },
      active: {
        type: 'boolean',
        description: 'The status if this team is still active',
      },
    },
  },
];

const addSchema = (fastify) => {
  schema.forEach((s) => fastify.addSchema(s));
};

module.exports = { addSchema };
