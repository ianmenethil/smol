from werkzeug.security import check_password_hash
from functools import wraps
from flask import request, Response
import os

def check_auth(username, password, api_key):
    """This function is called to check if a username, password and api_key combination is valid."""
    stored_username = os.environ.get('AUTH_USERNAME')
    stored_password_hash = os.environ.get('AUTH_PASSWORD_HASH')
    stored_api_key = os.environ.get('API_KEY')
    return username == stored_username and check_password_hash(stored_password_hash, password) and api_key == stored_api_key

def authenticate():
    """Sends a 401 response that enables basic auth"""
    return Response(
    'Could not verify your access level for that URL.\n'
    'You have to login with proper credentials', 401,
    {'WWW-Authenticate': 'Basic realm="Login Required"'})

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        api_key = request.headers.get('X-API-KEY')
        if not auth or not api_key or not check_auth(auth.username, auth.password, api_key):
            return authenticate()
        return f(*args, **kwargs)
    return decorated
