import joblib

model = joblib.load("model.pkl")

task = input("Enter Task : ")

hour = int(input("Current Hour : "))

length = len(task)

prediction = model.predict([[length, hour]])

if prediction[0] == 1:

    print("\nReminder Recommended")

else:

    print("\nReminder Optional")