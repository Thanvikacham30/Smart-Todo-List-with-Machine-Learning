import mysql.connector

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="*****",      # Put your MySQL password here
    database="smart_todo"
)

cursor = connection.cursor(dictionary=True)
