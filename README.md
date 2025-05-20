# Book Review API

A RESTful backend API built with Node.js, Express, and PostgreSQL for managing books and user reviews. It supports user authentication using JWT, CRUD operations for books and reviews, and follows a modular structure using Sequelize ORM.

---

## Project Setup Instructions

1. **Clone the repository**

        git clone https://github.com/Sensie2102/books-magic.git

        cd book-review-api

2. **Install dependencies**

        npm install

3. **Configure environment variables**

        Create a .env file in the root directory with the following content:
            PORT=3000
            DB_NAME=bookreview
            DB_USER=postgres
            DB_PASS=yourpassword
            SECRET_KEY=your_jwt_secret_key

4. **Start the development server**

        npm run dev

    IMPORTANT: Make sure PostgreSQL is running locally and that a database named bookreview exists.

## How to Run Locally

Ensure PostgreSQL is installed and the database is set up.

Start the server using npm run dev.

The API will be available at http://localhost:3000/.

## Example API Requests

### Signup - Create User

Endpoint:

    POST /auth/signup

Request:

    curl --location 'http://localhost:3000/auth/signup' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "username": "sensie",
    "email": "sensie@example.com",
    "password": "test123"
    }'

Expected Response:

    {
        "message": "User created successfully",
        "id": "<UUID>"
    }

### Login - Authenticate User

Endpoint:

    POST /auth/login

Request:

    curl --location 'http://localhost:3000/auth/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "email": "sensie@example.com",
    "password": "test123"
    }'


Expected Response:

    {
        "message": "User authenticated successfully",
        "token": <JWT_TOKEN>
    }

### GET - Get All Books

Endpoint:

    POST /books/

Request:

    curl --location 'http://localhost:3000/books'

    curl --location 'http://localhost:3000/books?page=2&limit=10'

    curl --location 'http://localhost:3000/books?genre=Programming'


Expected Response:

    {
        "total": TOTAL_BOOKS,
        "page": CURRENT_PAGE,
        "totalPages": TOTAL_PAGES,
        "data": [BOOKS]
    }

### GET - Get Book by ID

Endpoint:

    POST /books/:id

Request:

    curl --location 'http://localhost:3000/books/<BOOK_ID>'


Expected Response:

    {
        "book": {<BOOK>},
        "reviews": [<REVIEWS>],
        "totalReviews": <TOTAL_REVIEWS>,
        "page": <CURRENT_PAGE>,
        "totalPages": <TOTAL_PAGES>
    }

### POST - Add new book

Endpoint:

    GET /books/

Request:

    curl --location 'http://localhost:3000/books' \
    --header 'Authorization: Bearer <TOKEN>' \
    --header 'Content-Type: application/json' \
    --data '{
    "title": "The Software Craftsman",
    "author": "Sandro Mancuso",
    "genre": "Programming"
    }'


Expected Response:

    {
        "message": "Book created successfully",
        "bookId": "<BOOK_ID>"
    }

## Design Decisions and Assumptions