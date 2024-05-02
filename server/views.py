from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from .auth import require_api_key
from .utils import log_request
from .error_handlers import handle_error
import requests
import os

views = Blueprint('views', __name__)

EXTERNAL_API_URL = os.getenv('EXTERNAL_API_URL')

@views.route('/proxy', methods=['GET', 'POST'])
@require_api_key
def proxy():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return handle_error('Missing authorization header', 401)

    username, password, api_key = auth_header.split(':')
    if not check_password_hash(os.getenv('PROXY_USER_PASSWORD_HASH'), password):
        return handle_error('Invalid credentials', 403)

    try:
        if request.method == 'GET':
            response = requests.get(EXTERNAL_API_URL, params=request.args)
        elif request.method == 'POST':
            response = requests.post(EXTERNAL_API_URL, json=request.json)
        
        log_request(request.method, EXTERNAL_API_URL, response.status_code)
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        log_request(request.method, EXTERNAL_API_URL, 'Failed')
        return handle_error(str(e), 500)