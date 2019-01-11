# Anwesenheitsliste Docs

## Rest Api

### Objects

#### Attendance Object

```json
{
  "id": "INTEGER",
  "eventId": "INTEGER",
  "personId": "INTEGER",
  "state": "STRING: absent|present|excused"
}
```

#### Event Object

```json
{
  "id": "INTEGER",
  "date": "DATE",
  "teamId": "INTEGER"
}
```

#### Person Object

```json
{
  "id": "INTEGER",
  "name": "STRING",
  "teamId": "INTEGER",
  "team": "<Team Object>",
  "events": ["<Event Object>"],
  "attendance": ["<Attendance Object>"]
}
```

[Attendance Object](#Attendance%20Object)

#### Team Object

```json
{
  "id": "INTEGER",
  "name": "STRING",
  "events": [
    <Event Object>
  ],
  "persons": [
    <Person Object>
  ]
}
```

- [Person Object](#Person%20Object)
- [Event Object](Event%20Object)

### Endpoints

#### GET /teams/

##### Arguments

- `day` DATE default: today
- `length` INTEGER default 1

##### Returns

Array of [Team Objects](#Team%20Object)

- _without events field_
- _without people field_

#### GET /teams/:teamId

##### Arguments

- `day` DATE default: today
- `length` INTEGER default 1

##### Returns

[Team Object](#Team%20Object)

#### GET /people/

##### Returns

[Person Object](#Person%20Object)

- _without attendance field_

#### GET /people/:personId

##### Arguments

- `day` DATE default: today
- `length` INTEGER default 1

##### Returns

[Person Object](#Person%20Object)
