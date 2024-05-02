from flask import Flask, request, jsonify, make_response
from functools import wraps
import requests
from dotenv import load_dotenv
import os

from auth import authenticate
from error_handlers import handle_error
from utils import log_request

# Load environment variables
load_dotenv('.env')

# Initialize Flask app
app = Flask(__name__)

# External API URL from environment variable
EXTERNAL_API_URL = os.getenv('EXTERNAL_API_URL')

# Decorator for requiring authentication
def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        api_key = request.headers.get('x-api-key')
        if not auth or not api_key or not authenticate(auth.username, auth.password, api_key):
            return make_response('Could not verify your access level for that URL.\n'
                                 'You have to login with proper credentials', 401,
                                 {'WWW-Authenticate': 'Basic realm="Login Required"'})
        return f(*args, **kwargs)
    return decorated

# Proxy GET request
@app.route('/proxy', methods=['GET'])
@require_auth
def proxy_get():
    try:
        response = requests.get(EXTERNAL_API_URL, params=request.args)
        log_request(request, response)
        return jsonify(response.json()), response.status_code
    except Exception as e:
        handle_error(e)
        return jsonify({'error': 'An error occurred while processing your request'}), 500

# Proxy POST request
@app.route('/proxy', methods=['POST'])
@require_auth
def proxy_post():
    try:
        response = requests.post(EXTERNAL_API_URL, json=request.json)
        log_request(request, response)
        return jsonify(response.json()), response.status_code
    except Exception as e:
        handle_error(e)
        return jsonify({'error': 'An error occurred while processing your request'}), 500

if __name__ == '__main__':
    app.run(debug=True)