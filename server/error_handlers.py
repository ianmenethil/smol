from flask import jsonify
from werkzeug.exceptions import HTTPException

def init_error_handlers(app):

    @app.errorhandler(HTTPException)
    def handle_http_exception(e):
        response = e.get_response()
        response.data = jsonify({
            "code": e.code,
            "name": e.name,
            "description": e.description,
        })
        response.content_type = "application/json"
        return response

    @app.errorhandler(Exception)
    def handle_exception(e):
        # Log the error before sending a response
        app.logger.error(f'Unhandled Exception: {str(e)}')

        # You can add more sophisticated error handling here...
        return jsonify({
            "code": 500,
            "name": "Internal Server Error",
            "description": "An unexpected error occurred."
        }), 500

    # Add more custom error handlers as needed
    # Example: app.errorhandler(CustomError)(custom_error_handler)