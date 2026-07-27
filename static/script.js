// Load tasks when page opens
window.onload = function () {
    loadTasks();
};

// ------------------------
// Load Tasks
// ------------------------
function loadTasks() {

    fetch("/tasks")
        .then(response => response.json())
        .then(data => {

            const list = document.getElementById("taskList");
            list.innerHTML = "";

            data.forEach(task => {

                const li = document.createElement("li");

                // Left Side
                const taskDiv = document.createElement("div");
                taskDiv.className = "task";

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = task.completed;

                const span = document.createElement("span");
                span.innerText = task.task;

                if (task.completed)
                    span.classList.add("completed");

                checkbox.onchange = function () {
                    updateTask(task.id, checkbox.checked, span);
                };

                taskDiv.appendChild(checkbox);
                taskDiv.appendChild(span);

                // Right Side Buttons
                const buttons = document.createElement("div");
                buttons.className = "buttons";

                const del = document.createElement("button");
                del.innerText = "Delete";
                del.className = "delete";

                del.onclick = function () {
                    deleteTask(task.id);
                };

                buttons.appendChild(del);

                li.appendChild(taskDiv);
                li.appendChild(buttons);

                list.appendChild(li);

            });

        });

}

// ------------------------
// Add Task
// ------------------------

function addTask() {

    const task = document.getElementById("taskInput").value.trim();

    if (task === "") {

        alert("Please enter a task.");

        return;
    }

    const reminder = document.getElementById("reminderCheck").checked;

    const time = document.getElementById("reminderTime").value;

    fetch("/add", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            task: task,

            reminder: reminder,

            time: time

        })

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        if (reminder && time !== "") {

            scheduleReminder(task, time);

        }

        document.getElementById("taskInput").value = "";

        document.getElementById("reminderCheck").checked = false;

        document.getElementById("reminderTime").value = "";

        loadTasks();

    });

}

// ------------------------
// Delete Task
// ------------------------

function deleteTask(id) {

    fetch("/delete/" + id, {

        method: "DELETE"

    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        loadTasks();

    });

}

// ------------------------
// Update Completion
// ------------------------

function updateTask(id, completed, span) {

    fetch("/complete/" + id, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            completed: completed

        })

    })

    .then(response => response.json())

    .then(data => {

        if (completed)

            span.classList.add("completed");

        else

            span.classList.remove("completed");

    });

}

// ------------------------
// ML Prediction
// ------------------------

function predictReminder() {

    const task = document.getElementById("taskInput").value.trim();

    if (task === "") {

        alert("Enter a task first.");

        return;

    }

    const hour = new Date().getHours();

    fetch("/predict", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            task: task,

            hour: hour

        })

    })

    .then(response => response.json())

    .then(data => {

        const box = document.getElementById("predictionBox");

        if (data.prediction === 1) {

            box.className = "success";

            box.innerHTML = "🤖 ML Suggestion: A reminder is recommended.";

        }

        else {

            box.className = "warning";

            box.innerHTML = "🤖 ML Suggestion: A reminder is optional.";

        }

    });

}

// ------------------------
// Reminder
// ------------------------

function scheduleReminder(task, reminderTime) {

    const now = new Date().getTime();

    const reminder = new Date(reminderTime).getTime();

    const delay = reminder - now;

    if (delay > 0) {

        setTimeout(function () {

            alert("⏰ Reminder!\n\nTask: " + task);

        }, delay);

    }

}
