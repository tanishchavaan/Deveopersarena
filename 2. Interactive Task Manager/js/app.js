import { saveTasks, loadTasks } from "./storage.js";
import { generateID } from "./utils.js";
import { renderTasks, updateStats } from "./ui.js";

class TaskManager {
   constructor() {
    this.tasks = [
        { id: 1, text: "Task 1", completed: true },
        { id: 2, text: "Task 2", completed: true },
        { id: 3, text: "Task 3", completed: true },
        { id: 4, text: "Task 4", completed: true },
        { id: 5, text: "Task 5", completed: true },

        { id: 6, text: "Task 6", completed: false },
        { id: 7, text: "Task 7", completed: false },
        { id: 8, text: "Task 8", completed: false },
        { id: 9, text: "Task 9", completed: false },
        { id: 10, text: "Task 10", completed: false },
        { id: 11, text: "Task 11", completed: false },
        { id: 12, text: "Task 12", completed: false },
        { id: 13, text: "Task 13", completed: false },
        { id: 14, text: "Task 14", completed: false },
        { id: 15, text: "Task 15", completed: false }
    ];

    this.filter = "all";
    this.init();
}

    init() {
        this.render();

        document.getElementById("taskForm")
            .addEventListener("submit", (e) => {
                e.preventDefault();
                this.addTask();
            });

        document.querySelectorAll(".filters button")
            .forEach(btn => {
                btn.addEventListener("click", () => {
                    document.querySelectorAll(".filters button")
                        .forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                    this.filter = btn.dataset.filter;
                    this.render();
                });
            });

        document.getElementById("clearCompleted")
            .addEventListener("click", () => {
                this.tasks = this.tasks.filter(t => !t.completed);
                this.saveAndRender();
            });

        document.getElementById("themeToggle")
            .addEventListener("click", () => {
                document.body.classList.toggle("dark");
            });
    }

    addTask() {
        const input = document.getElementById("taskInput");
        const priority = document.getElementById("prioritySelect").value;
        const dueDate = document.getElementById("dueDate").value;

        if (!input.value.trim()) return;

        this.tasks.push({
            id: generateID(),
            text: input.value.trim(),
            completed: false,
            priority,
            dueDate
        });

        input.value = "";
        this.saveAndRender();
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
        this.saveAndRender();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveAndRender();
    }

    getFilteredTasks() {
        if (this.filter === "active")
            return this.tasks.filter(t => !t.completed);
        if (this.filter === "completed")
            return this.tasks.filter(t => t.completed);
        return this.tasks;
    }

    saveAndRender() {
        saveTasks(this.tasks);
        this.render();
    }

    render() {
        renderTasks(this.getFilteredTasks(), {
            toggle: this.toggleTask.bind(this),
            delete: this.deleteTask.bind(this)
        });

        updateStats(this.tasks);
    }
}

new TaskManager();