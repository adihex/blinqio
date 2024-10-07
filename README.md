# Assignment Submission
`Name: Aditya Balakrishnan`

## Implementation details

### Frontend

- I have used React.js with TypeScript for the frontend. Vite was used in the scaffolding.
- React-Router-Dom enables the client side routing. 
- React hooks have been used extensively to handle state management and route protection.

### Backend

- I have used Expree.js to create a server and MongoDB with Mongoose ODM to enable persistence through a database.
- The server uses middlewares extensively to check if the user is authenticated.

### Data flow:

When the user enters details and presses register, the details are sent to the backend server. The server then uses bcrypt and hashes the password and stores it in the database after performing essential validations.

When the user signs in, the password is retrieved from the database and then compared to the given one. If successful, a JWT is sent to the client which is stored into its localStorage.

This jwt is used as a bearer token to access the protected routes.

I have implemented CRUD operations in the backend for users and tasks, however in the frontend, options for only logging in and out and creating and deleting tasks are there. The requirements did not specify creating interfaces for all CRUD functionalities and I had a time crunch.


## Steps to run the application:

1. Clone the repository
```bash
2. cd blinqio
```
3. Create two terminals. In each terminal, run:
```bash
4. cd frontend/backend
5. yarn install
6. yarn dev
```
7. Go to http://localhost:5173 to see the application

## Steps to test the application

I have added unit tests for the backend.

1. cd backend
2. yarn test

## Acknowledgment

Thank you for giving this opportunity, I was able to learn more about unit testing with jest.

Kindly let me know if there's any queries about my submission.