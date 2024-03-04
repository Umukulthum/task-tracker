# task-tracker
Tracks tasks with date using JQuery

## Description
This project is a  task board web application that allows a user add tasks, manage their state of progress and track overall task progress accordingly. It was built using HTML, CSS, Bootstrap, Javascript, jQuery as well as other third party libraries

## Implementation
1. Upon launching the application, a task board is displayed to manage tasks.

2. The button 'Add Task' at the top of the page pops up a modal for the user to input task details.

3. Using jQuery, HTML elements are created from the user's input with a default task status and stored in the browser's local storage.

4. The user is then redirected back to the main page with the inputted task displayed in a card accordingly.

5. The displayed task card is color-coded, that is, the background color of a card changes based on the due date and current status of the task. (Yellow color for an unfinished task nearing deadline and red when overdue).

6. A third-party library, day.js was used in computing the tasks' timeline status.

7. JQuery UI API, Draggable/Droppable was another library that was utilized. The user is able to drag task cards and drop them in any of the task category(To-do, In Progress, Completed) which then gets updated in the browser's local storage.

8. The delete button on each task card allows the user to remove the task from the list of displayed tasks which also get deleted in the browser's local storage


## Mock-Up
The screen shot below demonstrates the application functionality:

![A user tracks tasks][page-1]


## Live
[Click here](https://umukulthum.github.io/task-tracker) for the deployed url 


## Repository
[Click here](https://github.com/Umukulthum/task-tracker) for the project's GitHub repository


[page-1]: assets/images/05-third-party-apis-homework-demo.gif





