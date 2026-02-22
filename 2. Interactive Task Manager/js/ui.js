export function renderTasks(tasks, handlers) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? "completed" : ""}`;

        li.innerHTML = `
            <div class="task-details">
                <span>${task.text}</span>
                <small class="priority-${task.priority}">
                    Priority: ${task.priority} | Due: ${task.dueDate || "N/A"}
                </small>
            </div>
            <div>
                <button class="complete-btn">✔</button>
                <button class="delete-btn">✖</button>
            </div>
        `;

        li.querySelector(".complete-btn")
            .addEventListener("click", () => handlers.toggle(task.id));

        li.querySelector(".delete-btn")
            .addEventListener("click", () => handlers.delete(task.id));

        taskList.appendChild(li);
    });
}

export function updateStats(tasks) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("activeTasks").textContent = total - completed;
}