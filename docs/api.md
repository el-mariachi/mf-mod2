# Handles

## Theme

### getAll _GET_ /api/themes

`Status 200 OK`

```json
[
  {
    "id": 2,
    "theme": "default",
    "description": null
  },
  {
    "id": 3,
    "theme": "acid",
    "description": null
  },
  {
    "id": 4,
    "theme": "doomer",
    "description": null
  },
  {
    "id": 5,
    "theme": "frozen",
    "description": null
  },
  {
    "id": 6,
    "theme": "mint",
    "description": null
  }
]
```

### find _GET_ /api/theme/:id

`Status 200 OK`

```json
{
  "id": 4,
  "theme": "production",
  "description": null
}
```

`Status 400 Bad request, {"reason": string}`
`Status 404 Not Found, "Theme not found"`

### create _POST_ /api/theme { theme: string, description?: string }

`Status 201 Created, "Success"`
`Status 400 Bad Request, {"reason": string}`

### delete _DELETE_ /api/theme { id: number }

`Status 200 OK, "Success. Deleted 1 record(s)"`
`Status 404 Not Found, "No such theme"`
`Status 400 Bad Request, {"reason": string}`

## User

### getAll _GET_ /api/users

```json
[
  {
    "yandex_id": 5,
    "login": "vasya",
    "user_theme": null
  }
]
```

### find _GET_ /api/user/:id

`Status 200 OK`
если у юзера не выставлена тема

```json
{
  "yandex_id": 5,
  "login": "vasya",
  "user_theme": null
}
```

или если у юзера прописана тема

```json
{
  "yandex_id": 5,
  "login": "vasya",
  "user_theme": {
    "id": 1,
    "theme_id": 4,
    "theme": {
      "theme": "doomer",
      "description": null
    }
  }
}
```

### create _POST_ /api/user {yandex_id: number, login: string, theme?: string}

// название темы, можно частично ("doom"), можно опустить

`Status 201 Created, "Success"`
`Status 400 Bad Request, {"reason": string}`

### delete _DELETE_ /api/user {yandex_id: number}

`Status 200 OK, "Success. Deleted 1 record(s)"`
`Status 404 Not Found, "No such user"`
`Status 400 Bad Request, {"reason": string}`

### set theme _POST_ /api/user/:id/theme {id: number}

`Status 200 OK, "Success. Updated 1 record(s)"`
`Status 404 Not Found, "No such user"`
`Status 404 Not Found, "No such theme"`
`Status 400 Bad Request, {"reason": string}`
