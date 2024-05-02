import logging
from flask import request, jsonify
from server.error_handlers import handle_error

# Configure logging
logging.basicConfig(filename='server/logs.log', level=logging.INFO, format='%(asctime)s %(levelname)s:%(message)s')

def log_request(response):
    """
    Log the details of the incoming request and the outgoing response.
    """
    logging.info(f"Request: {request.method} {request.url} Data: {request.get_data()} Headers: {request.headers}")
    logging.info(f"Response: {response.status_code} {response.content}")

def proxy_request(method, url, headers=None, data=None, params=None):
    """
    Forward the incoming request to the external API and return the response.
    """
    import requests

    try:
        if method == 'GET':
            response = requests.get(url, headers=headers, params=params)
        elif method == 'POST':
            response = requests.post(url, headers=headers, data=data, params=params)
        else:
            return handle_error("Unsupported method", 405)

        # Log the request and response
        log_request(response)

        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        # Log the exception and return an error response
        logging.error(f"Request failed: {e}")
        return handle_error(str(e), 500)