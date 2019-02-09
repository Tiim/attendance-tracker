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
    required: ['date', 'teamId', 'attendance'],
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
    },
  },
  {
    $id: 'team',
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'integer', description: 'The id of this object' },
      name: { type: 'string', description: 'The name of the team' },
    },
  },
];

const addSchema = (fastify) => {
  schema.forEach((s) => fastify.addSchema(s));
};

module.exports = { addSchema };
