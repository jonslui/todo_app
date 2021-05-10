## My Todo App

My goal for creating this application was to be able to create projects that could have an infinite depth of tasks. I wanted to be able to be able to create plans for large projects that I could then break down into an infinte number of smaller tasks. For example, in the below video, I create the task "", which then breaks down into "", "", and "". These subtasks can then be opened up and broken down into their corresponding subtasks and so on.

I also wanted to able to assign priority/due dates to tasks, I handle this by coloring tasks accoridng to their priority (green for low, yellow for medium, red for high, and grey for none). I also provided two sort buttons for each task, one for priority and one for date. This allows the user to have one task's subtasks sorted by priority, but another's sorted by date according to the users preference.

Another thing that was important to me was that I wanted to be able to delete tasks, create new tasks, and sort tasks, without having to reload the entire page. In order to do this, I updated the information in localStorage each time, but also manipulated the corresponding DOM elements with Javascript when a form was submitted, or a button was pressed, instead of reloading the page from scratch with each change. 

## Usage

