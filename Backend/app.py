from flask import Flask
from flask_cors import CORS
from database.db import db

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///smarthealth.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

from routes.case_routes import case_bp
from routes.water_routes import water_bp
from routes.predict_routes import predict_bp
from routes.alert_routes import alert_bp
from routes.public_routes import public_bp
from models.prediction import Prediction
from models.alert import Alert

app.register_blueprint(case_bp)
app.register_blueprint(water_bp)
app.register_blueprint(predict_bp)
app.register_blueprint(alert_bp)
app.register_blueprint(public_bp)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
