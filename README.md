# NotePal Backend

A REST API backend application that can be used to manage personal notes in a multi-user environment.

## Installation
To use the application please make sure to clone the package, open terminal and then follow the instruction below.

### Install the packages
```
npm i
```

### Setup the environment varibles (create an .env on the root of the folder)
```
PORT=3000

DB_HOST="YOUR_DB_HOST"
DB_PORT="YOUR_DB_PORT"
DB_DATABASE="YOUR_DB_DATABASE"
DB_USER="YOUR_DB_USER"
DB_PASSWORD="YOUR_DB_PASSWORD"

PASSWORD_HASH_SALT="YOUR_PASSWORD_HASH_SALT"
```
### Running the tests
```
npm run test
```
### Running in DEV environment
```
npm run dev
```
### Running in PROD environment
```
npm start
```

## Usage and Instructions
To use the application run the DEV or PROD command from above. It is also recommended to run all the test cases.
There are 2 main endpoints within the server and they are the `users` and `notes`.
<br />
Please see the table below to see their endpoints, method and the description. 
An example endpoint may look like this ```localhost:3000/users/:id``` 
<br />
Please note the `:id` should be the dynmaic id from the database.
<br />
In some instances, a body is required such when creating or updating an user or note. Please see below for an body example.

### Body Example
```json
{
  "first_name": "adiul",
  "last_name": "alam",
  "email": "adiulalam@gmail.com",
  "password": "password123"
}
```

### Users Endpoint
| Endpoint | Method | Description |
| ----------- | ----------- | ----------- | 
| /users | GET | This fetches all the users from the database | 
| /users | POST | This creates a new user on the database. Body is REQUIRED. | 
| /users/:id | GET | This fetches a user by id from the database |
| /users/:id | PUT | This updates a user by id on the database. Body is REQUIRED. |
| /users/:id | DELETE | This deletes a user by id on the database |
| /users/:id/notes | GET | This fetches all the posts by user id from the database |

### Note Endpoint
| Endpoint | Method | Description |
| ----------- | ----------- | ----------- | 
| /notes | GET | This fetches all the notes from the database | 
| /notes | POST | This creates a new note on the database. Body is REQUIRED. | 
| /notes/:id | GET | This fetches a note by id from the database |
| /notes/:id | PUT | This updates a note by id on the database. Body is REQUIRED. |
| /notes/:id | DELETE | This deletes a note by id on the database |
| /notes/isArchived | GET | This fetches all the notes if they are archived from the database |
| /notes/isNotArchived | GET | This fetches all the notes if they NOT are archived from the database |
| /notes/setArchived/:id | PUT | This updates a note by id on the database and sets them to archived. |
| /notes/setNotArchived/:id | PUT | This updates a note by id on the database and sets them to NOT archived. |
| /notes/:id/user | GET | This fetches user by notes id from the database |

## Thought Process
Node and Express were used mainly due to how popular the framework is, and also there are alot of documentations available and also an massive active community. There were also other advanatages such as easily manipulate JSON to JS Object, amazing package manager, fast hot loading with Nodemon.
<br>
SQL was used for the database mostly because it's amazing performance, and scalability. It's also very easy to learn, understand, and flexible. 

## To Improve
- Use UUID rather than id (number).
- Implement Authentication and Authorization when requesting data.
- Use JWT token and Session ID to achive Authentication and Authorization.
- Implement more tests
- Convert it to TypeScript for better error handling.
- Add GraphQL support
- Research more into security, scalability, and performance. Then implment the best practices. 