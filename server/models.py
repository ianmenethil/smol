from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class LogEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    request_method = db.Column(db.String(10))
    request_path = db.Column(db.String(100))
    request_body = db.Column(db.Text)
    response_status = db.Column(db.Integer)
    response_body = db.Column(db.Text)

    def __init__(self, request_method, request_path, request_body, response_status, response_body):
        self.request_method = request_method
        self.request_path = request_path
        self.request_body = request_body
        self.response_status = response_status
        self.response_body = response_body

    def to_dict(self):
        return {
            'id': self.id,
            'timestamp': self.timestamp.isoformat(),
            'request_method': self.request_method,
            'request_path': self.request_path,
            'request_body': self.request_body,
            'response_status': self.response_status,
            'response_body': self.response_body
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    api_key = db.Column(db.String(128), unique=True, nullable=False)

    def __init__(self, username, password_hash, api_key):
        self.username = username
        self.password_hash = password_hash
        self.api_key = api_key

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'api_key': self.api_key
        }