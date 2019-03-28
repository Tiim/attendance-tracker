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

  {
    $id: 'login',
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', description: 'user email address' },
      password: { type: 'string', description: 'user password' },
    },
  },
];

const addSchema = (fastify) => {
  schema.forEach((s) => fastify.addSchema(s));
};

module.exports = { addSchema };
