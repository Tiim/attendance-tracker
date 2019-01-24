# Docs

<!-- markdownlint-disable MD024 -->

## Objects

### Attendance Object

```js
{
  "id": "INTEGER",
  "eventId": "INTEGER",
  "personId": "INTEGER",
  "state": "STRING: absent|present|excused",
}
```

### Event Object

```js
{
  "id": "INTEGER",
  "date": "DATE",
  "teamId": "INTEGER",
  "attendance": [
    {ATTENDANCE OBJECT}
  ],
}
```

### Person Object

```js
{
  "id": "INTEGER",
  "name": "STRING",
  "teamId": "INTEGER",
}
```

### Team Object

```js
{
  "id": "INTEGER",
  "name": "STRING",
}
```

## Endpoints

### Teams

#### GET /teams/

Returns an array of [Team Object](#Team Object).

#### PUT /teams/

Creates or updates a team.
Expects a [Team Object](#Team Object) in the body. The id property should be left blank if a new team should be created.

#### DELETE /teams/:teamId

Delete the team with id `teamId`.

#### GET /teams/:teamId/persons

Returns an array of [Person Object](#Person Object) for the team.

#### GET /teams/:teamId/events

Returns an array of [Event Object](#Event Object) for the team.

### Persons

#### GET /persons/

Returns an array of [Person Object](#Person Object).

#### PUT /persons/

Creates or updates a person.
Expects a [Person Object](#Person Object) in the body. The id property should be left blank if a new person should be created.

#### GET /persons/:personId

Returns the [Person Object](#Person Object)

#### DELETE /persons/:personId

Deletes the person with the id `personId`

#### GET /persons/:personId/events

Returns an array of [Event Object](#Event Object) for the person.

### Events

#### PUT /events/

Creates or updates an event.
Expects an [Event Object](#Event Object) in the body. The id property should be left blank if a new event should be created.

#### GET /events/:eventId

Returns the [Events Object](#Events Object)

#### DELETE /events/:eventId

Deletes the event with the id `eventId`
