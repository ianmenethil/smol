# Flask Proxy API Server with React Frontend

This repository contains the code for a Flask Proxy API Server integrated with a React Frontend. The Flask server acts as a proxy, forwarding GET and POST requests to an external API and returning the responses. The React frontend is responsible for displaying logs and handling user authentication.

## Getting Started

To get the server running:

1. Navigate to the `server` directory:

    ```
    cd server
    ```

2. Install the required packages:

    ```
    pip install -r requirements.txt
    ```

3. Set up your environment variables in `.env` file:

    ```
    FLASK_APP=app.py
    FLASK_ENV=development
    API_KEY=your_api_key
    ```

4. Run the Flask server:

    ```
    flask run
    ```

To get the frontend running:

1. Navigate to the `client` directory:

    ```
    cd client
    ```

2. Install the required packages:

    ```
    npm install
    ```

3. Set up your environment variables in `.env` file:

    ```
    REACT_APP_API_URL=http://localhost:5000
    ```

4. Start the React development server:

    ```
    npm start
    ```

## Features

### Flask Proxy API Server

- **Proxy Handling**: The server can handle GET and POST requests, forwarding them to an external API.
- **Access Control**: API endpoints are secured with basic access authentication.
- **Error Handling**: Robust error handling is implemented to manage and log errors.

### React Frontend

- **Display Logs**: Logs of API requests and responses are displayed in a user-friendly interface.
- **Interactive UI**: Users can navigate and view detailed logs easily.
- **Login System**: Firebase Authentication is used for managing user access.

## File Structure

- `server/`
  - `app.py`: The main entry point for the Flask application.
  - `requirements.txt`: Contains all the Python dependencies.
  - `.env`: Environment variables for the server.
  - `views.py`: Defines the routes and proxy handling logic.
  - `auth.py`: Handles the authentication logic.
  - `error_handlers.py`: Contains error handling functions.
  - `logs.log`: Log file for recording API requests and responses.
- `client/`
  - `package.json`: Contains all the npm dependencies.
  - `tsconfig.json`: TypeScript configuration file.
  - `public/`: Contains static files like `index.html` and `favicon.ico`.
  - `src/`: Contains all the TypeScript and React code for the frontend.

## Deployment

Ensure that both the Flask API and React frontend are properly configured to communicate with each other. The Flask server should be running and accessible by the React application.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.