Demo: https://jonslui.github.io/todo_app/dist/index.html

## My Todo App

My aim when creating this project was to create a todo app that could:
1. Support infinitely deep tasks (e.g. main task -> subtask -> subtask -> subtask, etc.)
2. To be able to view a task's subtasks and the subtask's children at the same time.
3. Be able to sort my tasks by priority and due date.
4. Be able to create new tasks, edit older tasks, and delete tasks.
5. Update screen display when a change is made, without having to refresh the whole page.
6. Be pleasant to look at and easy to use.

https://user-images.githubusercontent.com/34390833/121590623-c25d5880-c9f5-11eb-84b1-8bd89ee3bfb0.mov

## Usage
1. Follow this link to demo: https://jonslui.github.io/todo_app/dist/index.html
2. Click "New Task," fill out the information in the form, submit.
3. To view a task, click on the task title.
4. After clicking on a task title, view its contents and create subtasks by following steps 1 and 2 in the new column.
5. If you have multiple tasks and would like to view them in terms of priority or due date, simply click one of the two sort buttons.
6. Enjoy!

## Accomplishing Project Goals

1. Answering Aim 1 and Aim 2 (Support infinitely deep tasks, be able to view a task's subtasks and the subtask's children at the same time): 
    - This application stores its data in localStorage. Upon loading, if no past data is found, an array is created. 
    - Whenever a new task is created in the furthest left-hand column, an object is created, and it is stored inside this first array. Then its link is rendered inside that column.
    - When a task from this array is clicked, the column on its right is populated with the data from that task. 
    - In this new column, new tasks can be created and then opened, creating another column to the right of that. (When new tasks are created, a todo object is created and added to the "children" property of their parent array.)
    - This pattern can be followed as deep as the task requires.

2. Answering Aim 3, Aim 4, and Aim 5 (Be able to sort subtasks, be able to create/delete/update tasks, update the display without the need to refresh when any of these actions are taken)
    - Sorting: When a column is populated, two buttons are created which are attached event listeners that sort that column's children according to the button, update localStorage, and then re-render the new data. Sorting by due_date utilizes the date_fns module for comparison and interpretation of date data.
    - Creating: Clicking the "New Task" button triggers the attached eventLister and runs the create_form() function from the form.js module. The form is then rendered inside that column with 4 fields: title, description, priority, and due date. Upon submission, localStorage is updated and the title container is cleared and then rerendered with the new information. The onsubmit function for the form returns false, so that submission will not refresh the whole page.
    - Editing: When a task title is clicked and its information is rendered in the column to the right, it can be edited by clicking the "Edit Task" button. This button runs the edit_content function which hides the tasks information and appends a container div with input fields. Upon submission, the new data is saved to localStorage, the temp container is removed, the title link is rerendered with the new information, and the opened tasks information is updated.
    - Deleting: When the title link for each task is rendered, it is placed into a grid with an 'X' button next to it. When this button is clicked, its corresponding task is spliced from the array, localStorage is updated, and the two elements are removed from the grid.

3. Answering Aim 6 (Be pleasant to look at and easy to use):
    - Since my main goal for this project was to have infinite task depth, I knew that I wanted to be able to few a task and its subtasks at the same time. I decided that the best way to do this was to have subtasks open out onto the right. To get this effect I used a flexbox and had each task/subtask append a column to this container when clicked. One problem I ran into was if too many subtasks were open, then the data would squeeze to fit in, making it hard to read. I decided to combat this by giving each column a min-width value and making the parent container (#content) overflow-x, making it scrollable with a mask of 4 tasks fitting on the screen at once. I also made opening a new column auto-scroll to that column's location if it was off the screen, making it easier to follow.
