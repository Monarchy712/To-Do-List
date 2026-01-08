document.addEventListener("DOMContentLoaded", function () {
    const todoTask = document.getElementById("todo-input");
    const addTask = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks"))|| [];
    tasks.forEach((task) => renderTask(task));

    addTask.addEventListener("click", function () {
        const taskText = todoTask.value.trim();
        if (taskText === "") return;
        
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }
        tasks.push(newTask);
        todoTask.value = "";
        saveTask();
        renderTask(newTask);
    })

    function saveTask() {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute('data-id', task.id);
        if(task.completed) li.classList.toggle("completed");
        li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `;
        todoList.append(li);

        li.addEventListener("click", function(e){
            if(e.target.tagName === "BUTTON"){
                e.stopPropagation();
                tasks = tasks.filter((t) => t.id!== task.id);
                li.remove();
                saveTask();
                return;
            }
            task.completed = !task.completed;
            li.classList.toggle("completed");
        })
    }

})