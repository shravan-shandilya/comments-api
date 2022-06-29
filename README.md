# Comments API

## Standard Response

All API endpoints returns the following standard response. `success` indicates whether the operation was successful or not. `data` will contain result of the API call and `error` will contain the error object when the operation fails.

```
{
	"success": <true/false>,
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

Fetches all comments and author's details.

#### Sample Success Response

```
GET /comments
{
  "success": true,
  "data": {
    "comments": [{
        "id": 50,
        "content": "test 134",
        "author": {
          "id": 1,
          "fname": "Issa",
          "sname": "Odonnell",
          "display_picture": "https://res.cloudinary.com/liveweb/image/upload/ghost/1.jpg"
        },
        "created_at": "2022-06-29T06:45:57.180Z",
        "updated_at": "2022-06-29T06:45:57.180Z"
      },
      {
        "id": 49,
        "content": "test 134",
        "author": {
          "id": 1,
          "fname": "Issa",
          "sname": "Odonnell",
          "display_picture": "https://res.cloudinary.com/liveweb/image/upload/ghost/1.jpg"
        },
        "created_at": "2022-06-29T06:45:40.784Z",
        "updated_at": "2022-06-29T06:45:40.784Z"
      },

    ]
  },
  "error": null
}
```

### 2. Post Comment

Posts a comment from a user.

#### Sample Request Body

Ideally `user_id` will be derived from the authentication headers of the request. However, since that is out of scope, we just have to pass it as one of the body params. `content` is the actual comment data. `parent` should always be set to `-1` as we currently dont support nesting.

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
