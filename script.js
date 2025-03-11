document.addEventListener('DOMContentLoaded', () => {
    const addTaskInput = document.getElementById('addTask');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load and display tasks from localStorage when the page loads
    renderTasks();

    // Add task when button is clicked
    addTaskButton.addEventListener('click', addTask);

    // Allow adding a task by pressing "Enter" key
    addTaskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') addTask();
    });

    // Add a new task
    function addTask() {
        const taskText = addTaskInput.value.trim(); // Remove unnecessary spaces
        if (!taskText) return; // Prevent empty tasks

        const tasks = getTasksFromStorage();
        tasks.push({ text: taskText, completed: false }); // Add new task object
        saveTasksToStorage(tasks); // Saves update

        addTaskInput.value = ''; // Clear input field
        renderTasks();
    }

    // Display tasks from localStorage
    function renderTasks() {
        const tasks = getTasksFromStorage();
        taskList.innerHTML = ''; // Clear existing task list

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : ''; // Add class if task is completed
            
            // Checkbox and delete button
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
            tasks[index].completed = !tasks[index].completed; // Completion status
        } else if (event.target.matches('.delete')) {
            tasks.splice(index, 1); // Remove task from array
        }

        saveTasksToStorage(tasks); // Save updated list to localStorage
        renderTasks(); 
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
