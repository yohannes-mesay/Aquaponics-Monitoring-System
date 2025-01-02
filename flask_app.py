import aqua
from flask import Flask, jsonify

app = Flask(__name__)
ser = aqua.Serial('COM13', 9600)  # Replace 'COM3' with your Arduino's serial port

@app.route('/data', methods=['GET'])
def get_data():
    if ser.in_waiting > 0:
        sensor_value = ser.readline().decode('utf-8').strip()
        return jsonify({"sensor_value": sensor_value})
    return jsonify({"sensor_value": "No data"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
