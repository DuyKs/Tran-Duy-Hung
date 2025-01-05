# ExpressJS CRUD with TypeScript
This project sets up a backend server utilizing ExpressJS and TypeScript. It offers CRUD operations that interact with a SQLite database through the Prisma ORM.

## Features
1. Add Token: Insert a new token into the database.
2. View Tokens: Retrieve a list of all tokens with simple filtering options.
3. Fetch Resource Info: Get the details of a specific resource by its ID.
4. Edit Token: Update an existing token's information.
5. Remove Token: Delete a token from the database.

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Thunder Client (optional, for testing)

## Setup
1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

2. Install Dependencies

```bash
npm install
```

3. Start the Server
Start the development server:
```bash
npm run dev
```
The server will start on http://localhost:3000.

## Tests
- POST /tokens to create a new token.
- GET /tokens to fetch all tokens.
- GET /tokens/:id to fetch a token by ID.
- PUT /tokens/:id to update a token.
- DELETE /tokens/:id to delete a token.