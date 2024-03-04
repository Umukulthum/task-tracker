// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

//Predefined array for task status
const statuses = ["todo", "in-progress", "done"];

// Todo: create a function to create a task card
function createTaskCard(task) {
    const cardDiv = $('<div class="card my-3 draggable">');

    //day.js library for getting tasks' timeline status
    let difference = dayjs(task.dueDate).diff(dayjs(), "day");

    //Conditions for the color-coded cards based on due date and task status
    if (difference == 0 && [statuses[0], statuses[1]].includes(task.status)) {
        cardDiv.addClass("bg-warning");
    }

    if (difference < 0 && [statuses[0], statuses[1]].includes(task.status)) {
        cardDiv.addClass("bg-danger");
    }

    //Used jQuery for creating and styling the card elements
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
    //Declared the div element container for easch of the task category
    const toDoDiv = $('#todo-cards');
    const inProgressDiv = $('#in-progress-cards');
    const doneDiv = $('#done-cards');

    //Looped through the list of task in the browser's local storage and placed them into 
    //their respective categories based on the task's status
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

    //Get and store user's inputs into variables
    let taskTitle = $("input[name=taskTitle]").val();
    let taskDueDate = $("input[name=taskDueDate]").val();
    let taskDescription = $("textarea[name=taskDescription]").val();

    if (!taskTitle && !taskDueDate) {
        alert("Please input values in the fields to add a task");
        return;
    }

    //Created an object from the inputs and stored it into the browser's local storage
    taskList.push({ id: nextId, title: taskTitle, description: taskDescription, dueDate: taskDueDate, status: statuses[0] });
    localStorage.setItem("tasks", JSON.stringify(taskList));

    localStorage.setItem("nextId", ++nextId);

    //Clear Input fields
    $("input[type=text]").val("");
    $("textarea[name=taskDescription]").val("");

    //Reload page to reflect the newly added task
    location.reload();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    //Prevent the default behaviour
    event.preventDefault();

    //Get the id attached to a task
    const taskId = $(this).attr("data-task-id");

    //Used the filter method to remove the selected task and store the newly returned array into the browsers local storage
    taskList = taskList.filter(x => x.id != taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));

    //Reload page to reflect changes
    location.reload()
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    //Get and store the id of the card being dragged
    let id = ui.draggable.attr('id');

    //Get the value of the id attribute for dropped div element container
    let taskCard = event.target.children[1].firstElementChild.getAttribute("id");

    //Get the dragged task from local storage
    let index = taskList.findIndex(x => x.id == id);
    let task = taskList[index];

    //Set the new status of dragged task
    if (taskCard === `${statuses[0]}-cards`) { task.status = statuses[0]; }

    else if (taskCard === `${statuses[1]}-cards`) { task.status = statuses[1]; }

    else if (taskCard === `${statuses[2]}-cards`) { task.status = statuses[2]; }

    else { return; }

    //Store the updated task into the browser's local storage
    taskList[index] = task;
    localStorage.setItem("tasks", JSON.stringify(taskList));

    //Reload to reflect changes
    location.reload();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    //Present the user with the list of tasks stored in local storage
    renderTaskList();

    //Implemented JQuery UI Datepicker
    $("#taskDueDate").datepicker();

    //JQuery Event listener on submission of the task details
    $("#formModal").on("submit", handleAddTask);

    //JQuery Event listener on click of the delete button on a task card
    $(".delete-btn").on("click", handleDeleteTask)

    //On drag, set the task card opacity and made it visible above other elements
    $(".draggable").draggable({ opacity: 0.8, zIndex: 100 });

    //Listens to the on drop event to call handleDrop function
    $(".droppable").droppable();
    $(".droppable").on("drop", handleDrop);

});
