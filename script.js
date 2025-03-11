document.addEventListener('DOMContentLoaded', () => {
    const addTask = document.getElementById('addTask');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load and display tasks from localStorage when the page loads
    renderTasks();

    // Add task when button is clicked
    addTaskButton.addEventListener('click', () => addTask());

    // Allow adding a task by pressing "Enter" key
    addTask.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') addTask();
    });

    // Function to add a new task
    function addTask() {
        const taskText = addTask.value.trim(); // Remove unnecessary spaces
        if (!taskText) return; // Prevent empty tasks

        const tasks = getTasksFromStorage();
        tasks.push({ text: taskText, completed: false }); // Add new task object
        saveTasksToStorage(tasks); // Save updated tasks list

        addTask.value = ''; // Clear input field
        renderTasks(); // Update the task list on UI
    }

    // Function to display tasks from localStorage
    function renderTasks() {
        const tasks = getTasksFromStorage();
        taskList.innerHTML = ''; // Clear existing task list

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : ''; // Add class if task is completed
            
            // Task structure with checkbox and delete button
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                <span class="task-text">${task.text}</span>
                <button class="delete" data-index="${index}">Delete</button>
            `;

            taskList.appendChild(li);
        });
    }

    // Task completion and deletion
    taskList.addEventListener('click', (event) => {
        const index = event.target.dataset.index; // Get index of clicked task
        if (index === undefined) return; 

        let tasks = getTasksFromStorage();

        if (event.target.matches('input[type="checkbox"]')) {
            tasks[index].completed = !tasks[index].completed; // completion status
        } else if (event.target.matches('.delete')) {
            tasks.splice(index, 1); // Remove task from array
        }

        saveTasksToStorage(tasks); // Save updated list to localStorage
        renderTasks(); // Refresh UI
    });

    // Retrieve tasks from localStorage
    function getTasksFromStorage() {
        return JSON.parse(localStorage.getItem('tasks')) || []; // Return empty array if no data found
    }

    // Save tasks to localStorage
    function saveTasksToStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Convert array to string and store
    }
});
