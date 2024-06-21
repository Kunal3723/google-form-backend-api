# Submission Backend Server

This project is an Express application written in TypeScript that serves as a backend for a form submission system. The backend uses a JSON file as a database to store submissions.

## Features

- Ping endpoint to check server status.
- Submit new form submissions.
- Read saved submissions.
- Delete submissions.
- Edit submissions.
- Error handling middleware.

## Requirements

- Node.js (v12 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository to your local machine:


2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm run start
    ```

## API Endpoints

### Ping

- **URL:** `/ping`
- **Method:** `GET`
- **Description:** Checks if the server is running.
- **Response:**

    ```json
    true
    ```

### Submit

- **URL:** `/submit`
- **Method:** `POST`
- **Description:** Submits a new form entry.
- **Request Body:**

    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "github_link": "https://github.com/johndoe",
        "stopwatch_time": "00:12:34"
    }
    ```

- **Response:**

    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "github_link": "https://github.com/johndoe",
        "stopwatch_time": "00:12:34"
    }
    ```

### Read

- **URL:** `/read`
- **Method:** `GET`
- **Description:** Reads a saved submission.
- **Query Parameters:**

    - `index` (number, required): The index of the submission to read.

- **Response:**

    ```json
    {
        "count": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "github_link": "https://github.com/johndoe",
        "stopwatch_time": "00:12:34"
    }
    ```

### Delete

- **URL:** `/delete`
- **Method:** `DELETE`
- **Description:** Deletes a submission.
- **Query Parameters:**

    - `index` (number, required): The index of the submission to delete.

- **Response:**

    ```json
    {
        "message": "Submission deleted",
        "deleted": {
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "1234567890",
            "github_link": "https://github.com/johndoe",
            "stopwatch_time": "00:12:34"
        }
    }
    ```

### Edit

- **URL:** `/edit`
- **Method:** `PUT`
- **Description:** Edits a submission.
- **Query Parameters:**

    - `index` (number, required): The index of the submission to edit.

- **Request Body:**

    ```json
    {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "0987654321",
        "github_link": "https://github.com/janedoe",
        "stopwatch_time": "00:45:12"
    }
    ```

- **Response:**

    ```json
    {
        "message": "Submission edited",
        "submission": {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "phone": "0987654321",
            "github_link": "https://github.com/janedoe",
            "stopwatch_time": "00:45:12"
        }
    }
    ```

## Error Handling

Any errors that occur during the request handling are processed by the error handling middleware. The middleware returns a JSON response with a 500 status code and an error message:

```json
{
    "error": "Internal Server Error"
}
