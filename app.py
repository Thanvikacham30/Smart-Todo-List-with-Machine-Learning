from flask import Flask, render_template, request, jsonify
from database.mysql_db import connection, cursor
import joblib

app = Flask(__name__)

try:
    model = joblib.load("model.pkl")
except:
    model = None


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/tasks")
def get_tasks():

    cursor.execute("SELECT * FROM tasks")

    tasks = cursor.fetchall()

    return jsonify(tasks)


@app.route("/add", methods=["POST"])
def add_task():

    data = request.json

    sql = """
    INSERT INTO tasks(task, completed, reminder, reminder_time)
    VALUES(%s,%s,%s,%s)
    """

    values = (
        data["task"],
        False,
        data["reminder"],
        data["time"]
    )

    cursor.execute(sql, values)

    connection.commit()

    return jsonify({"message":"Task Added"})


@app.route("/delete/<int:id>", methods=["DELETE"])
def delete(id):

    cursor.execute(
        "DELETE FROM tasks WHERE id=%s",
        (id,)
    )

    connection.commit()

    return jsonify({"message":"Deleted"})


@app.route("/complete/<int:id>", methods=["PUT"])
def complete(id):

    data = request.json

    cursor.execute(
        "UPDATE tasks SET completed=%s WHERE id=%s",
        (data["completed"], id)
    )

    connection.commit()

    return jsonify({"message":"Updated"})


@app.route("/predict", methods=["POST"])
def predict():

    if model is None:
        return jsonify({"prediction":0})

    data = request.json

    length = len(data["task"])

    hour = int(data["hour"])

    prediction = model.predict([[length, hour]])

    return jsonify({
        "prediction": int(prediction[0])
    })


if __name__ == "__main__":
    app.run(debug=True)