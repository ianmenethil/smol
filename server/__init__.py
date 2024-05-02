```python
from flask import Flask
from .views import configure_routes
from .auth import configure_auth
from .error_handlers import configure_error_handlers

def create_app():
    app = Flask(__name__)

    # Load environment variables
    app.config.from_pyfile('config.py')

    # Configure authentication
    configure_auth(app)

    # Configure routes for proxy handling
    configure_routes(app)

    # Configure custom error handlers
    configure_error_handlers(app)

    return app
```