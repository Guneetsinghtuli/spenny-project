# Spenny

It's the assignment for the Backend Role in Spenny, Hope you will like it.

## Technology

- JavaScript is the major language in the project
- MongoDB for storing user data.
- Node.JS for the Server side.

## About DB

I have used 2 Models/Collections for storing data.

1. User Model where the
   - email and passwords are stored of the user as well as
   - the Object Id of the people whom the user follows

1. Tweets Model where
   - The user ID or Object ID of the user with
   - List of all the tweets that are made by the user

To Get much more idea you can have a look at the Models Folder. We can obviously make changes that will make it more effecient.

## How to Use

I have shared the Postman Link where in it will make it much more easier to check the API's.

1. First you need to hit the Signup API at `/api/v1/user/signup`. You will have to enter 2 things in the body
   - email
   - password

2. You can try Logging in by hitting the `/api/v1/user/login`.  You will have to enter 2 things in the body
   - email
   - password
     - In response if your credentials are correct you will receive an `auth-token` and `id` make sure to copy it as you are going to use this eaxct same in most of the other API's.

3. In order to make a Tweet (max 140 char), you need to include the `auth-token` in the header and in the body you can write your tweet in.
   - msg

```json
{
    "msg":"Write your tweet over here"
}
```

4. To follow someone you need to hit `/api/v1/user/login/follow`. Make sure to include the `auth-token` in the header. you need to mention the Object ID of the user you want to follow in the body with the name
   - follow

```json
{
    "follow":"ID of the user you want to follow"
}
```

5. If the user want to see all of there own tweets. you can hit `/api/v1/feed/get`. Make sure to include the `auth-token` in the header.

6. To see the latest feed, you need to hit `/api/v1/feed/`. Make sure to include the `auth-token` in the header.
