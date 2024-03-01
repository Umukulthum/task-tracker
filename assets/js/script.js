// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;
const statuses = ["todo", "in-progress", "done"];

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const cardDiv = $('<div class="card my-3 draggable">');
    const cardBodyDiv = $('<div class="card-body">');

    const taskTitleEl = $('<h5 class="card-header">');
    taskTitleEl.text(task.title);

    const taskDescEl = $('<p class="card-text">');
    taskDescEl.text(task.description);

    const taskDueDateEl = $('<p class="card-text">');
    taskDueDateEl.text(task.dueDate);

    const delButton = $('<button class="btn btn-danger delete-btn">');
    delButton.attr('data-task-id', task.id);
    delButton.text('Delete');

    cardBodyDiv.append(taskDescEl);
    cardBodyDiv.append(taskDueDateEl);
    cardBodyDiv.append(delButton);

    cardDiv.attr('id', task.id);
    cardDiv.append(taskTitleEl);
    cardDiv.append(cardBodyDiv);

    return cardDiv
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const toDoDiv = $('#todo-cards');
    const inProgressDiv = $('#in-progress-cards');
    const doneDiv = $('#done-cards');

    taskList.forEach(task => {
        let card = createTaskCard(task);

        if (task.status === statuses[2]) {
            doneDiv.append(card);
        }

        else if (task.status === statuses[1]) {
            inProgressDiv.append(card);
        }

        else {
            toDoDiv.append(card);
        }
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    //Prevent the default behaviour
    event.preventDefault();

    let taskTitle = $("input[name=taskTitle]").val();
    let taskDueDate = $("input[name=taskDueDate]").val();
    let taskDescription = $("textarea[name=taskDescription]").val();

    taskList.push({ id: nextId, title: taskTitle, description: taskDescription, dueDate: taskDueDate, status: statuses[0] });
    localStorage.setItem("tasks", JSON.stringify(taskList));

    localStorage.setItem("nextId", ++nextId);

    //Clear Input fields
    $("input[type=text]").val("");
    $("textarea[name=taskDescription]").val("");

    location.reload();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    //Prevent the default behaviour
    event.preventDefault();

    const taskId = $(this).attr("data-task-id");
    console.log(taskId);
    taskList = taskList.filter(x => x.id != taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    location.reload()
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    let id = ui.draggable.attr('id');
    let taskCard = event.target.children[1].firstElementChild.getAttribute("id");

    let index = taskList.findIndex(x => x.id == id);
    let task = taskList[index];

    //innerCard.append(ui.draggable);

    if (taskCard === `${statuses[0]}-cards`) { task.status = statuses[0]; }

    else if (taskCard === `${statuses[1]}-cards`) { task.status = statuses[1]; }

    else if (taskCard === `${statuses[2]}-cards`) { task.status = statuses[2]; }

    else { return; }

    taskList[index] = task;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    location.reload();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    renderTaskList();

    $("#taskDueDate").datepicker();
    $("#formModal").on("submit", handleAddTask);
    $(".delete-btn").on("click", handleDeleteTask)

    $(".draggable").draggable();
    $(".droppable").droppable();
    $(".droppable").on("drop", handleDrop);

});
