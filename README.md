# 🌸 Smart Todo List with Machine Learning

A Smart Todo List web application developed using **Flask**, **HTML**, **CSS**, **JavaScript**, **MySQL**, and **Scikit-Learn**.

---

## Features

- Add Tasks
- Delete Tasks
- Mark Tasks as Completed
- Reminder with Date & Time
- Machine Learning Reminder Suggestion
- Beautiful Baby Pink & Pastel Blue UI
- Responsive Design
- MySQL Database

---

## Technologies Used

- Python
- Flask
- HTML5
- CSS3
- JavaScript
- MySQL
- Scikit-learn
- Joblib

---

## Installation

### Install Packages

pip install -r requirements.txt

### Create Database

CREATE DATABASE smart_todo;

USE smart_todo;

CREATE TABLE tasks(
id INT AUTO_INCREMENT PRIMARY KEY,
task VARCHAR(255),
completed BOOLEAN,
reminder BOOLEAN,
reminder_time DATETIME
);

### Train Model

python train_model.py

### Run Project

python app.py

Open browser:

http://127.0.0.1:5000

---

## Project Flow

User
↓

Enter Task
↓

ML Prediction
↓

Reminder Selection
↓

Save in MySQL
↓

Display Tasks
↓

Complete/Delete Task

