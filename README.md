# Comments API

## Features ✨

- REST APIs in MVC pattern for fetching and posting comments/upvotes
- Comments support 1-level nesting
- Realtime events when new comments and votes are added
- Database schema migration setup
- Simple deploy script

## Technologies 🧰

- Node as the JS runtime
- Express as the web application framework
- PostgreSQL for database
- Knex as the SQL query builder and schema migration tool
- Server Sent Events for real time event notification

# Documentation

## Standard Response

All API endpoints returns the following standard response. `success` indicates whether the operation was successful or not. `data` will contain result of the API call and `error` will contain the error object when the operation fails.

```
{
  "success": < true / false > ,
  "data": {
    ...
  },
  "error": {
    ...
  }
}
```

## Routes

### 1. Fetch Comments

Fetches all comments and author's details. `upvotes` and `downvotes` will contain the vote statistics. `replies` will contain the replies of the comment. `parent` will contain the identifier of the parent comment.

#### Sample Success Response

```
GET /comments
{
  "success": true,
  "data": {
    "comments": [{
        "id": 200,
        "content": "Why not?",
        "upvotes": 0,
        "downvotes": 0,
        "created_at": "2022-06-29T03:49:44.044Z",
        "updated_at": "2022-06-29T03:49:44.044Z",
        "parent": -1,
        "author": {
          "id": 4,
          "fname": "Niamh",
          "sname": "Muir",
          "display_picture": "https://res.cloudinary.com/liveweb/image/upload/ghost/4.jpg"
        },
        "replies": null
      },
      {
        "id": 180,
        "content": "Hello",
        "upvotes": 2,
        "downvotes": 0,
        "created_at": "2022-06-28T06:44:27.170Z",
        "updated_at": "2022-06-28T06:44:27.170Z",
        "parent": -1,
        "author": {
          "id": 9,
          "fname": "Hammad",
          "sname": "Lynn",
          "display_picture": "https://res.cloudinary.com/liveweb/image/upload/ghost/9.jpg"
        },
        "replies": [{
          "id": 181,
          "content": "hello",
          "created_at": "2022-06-28T06:44:40.498439+00:00",
          "updated_at": "2022-06-28T06:44:40.498439+00:00",
          "parent": 180,
          "upvotes": 1,
          "downvotes": 0,
          "author": {
            "id": 10,
            "fname": "Solomon",
            "sname": "Osborne",
            "display_picture": "https://res.cloudinary.com/liveweb/image/upload/ghost/10.jpg"
          }
        }]
      },

    ]
  },
  "error": null
}
```

### 2. Post Comment

Posts a comment from a user.

#### Sample Request Body

Ideally `user_id` will be derived from the authentication headers of the request. However, since that is out of scope, we just have to pass it as one of the body params. `content` is the actual comment data. `parent` should be set appropriately.

```
{
  "user_id": 1,
  "content": "",
  "parent": -1
}
```

#### Sample Success Response

`id` is the comment identifier of the newly added comment.

```
{
  "success": true,
  "data": {
    "id": 1,
  },
  "error": null
}
```

### 3. Post Vote

Records the upvote/downvote against a comment.

#### Sample Request Body

`user_id` is the identifier of the voter. `comment_id` is the identifier of the comment. `type` can either be `upvote` or `downvote`.

```
{
  "user_id": 5,
  "comment_id": 9,
  "type": "upvote"
}
```

#### Sample Success Response

`id` is the identifier of the newly added vote.

```
{
  "success": true,
  "data": {
    "id": 3
  },
  "error": null
}
```

### 4. Events

Streams the `comment_added` and `vote_added` events to subscribed client using Server Sent Events.

#### Testing

Use the following `curl` command to open up the connection to `/events` endpoint. And, add a new comment or an upvote to see the new event that was sent by the server

```
curl -H Accept:text/event-stream https://api.thoughtscoop.com/events
```
