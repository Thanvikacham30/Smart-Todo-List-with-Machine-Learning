import joblib
from sklearn.tree import DecisionTreeClassifier

# Training Data
# [Task Length, Hour]
X = [
    [3, 8],
    [5, 9],
    [8, 10],
    [12, 11],
    [15, 13],
    [20, 15],
    [25, 18],
    [30, 20],
    [4, 21],
    [2, 22],
    [18, 17],
    [10, 19],
    [6, 7],
    [9, 14],
    [22, 16],
    [28, 23]
]

# 1 = Reminder Suggested
# 0 = No Reminder

y = [
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1
]

model = DecisionTreeClassifier()

model.fit(X, y)

joblib.dump(model, "model.pkl")

print("Model trained successfully.")