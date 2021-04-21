import create_new_child from './create_todo.js';
import create_form from './form.js';

// initial loadout, includes the title column (labels/list of projects/new project button/etc)
let parent_array = get_tasks_array();

function load_initial_page(){
    let container = document.getElementById('content');   

    // create the naviagtional bar down the left side of the screen
    let titles_container = document.createElement('div');
    titles_container.setAttribute('id', 'titles_container');
    container.appendChild(titles_container);

    // button for creating new tasks
    let create_new_task_button = document.createElement('button');
    create_new_task_button.innerHTML = "New Task"
    create_new_task_button.setAttribute('id','create_new_task_button');
    titles_container.appendChild(create_new_task_button);

    // create container for task titles
    let task_titles_container = document.createElement('div');
    task_titles_container.setAttribute('id','task_titles_container');
    titles_container.appendChild(task_titles_container);

    // create container that will display clicked upon todo value
    let task_display_container = document.createElement('div');
    task_display_container.setAttribute('id', 'task_display_container');
    container.appendChild(task_display_container);

    // container that will render/clear its contents when the create_new_task_button is clicked.
    let form_container = document.createElement('div');
    form_container.setAttribute('id','form_container');
    task_display_container.appendChild(form_container);

    // container for task info
    let task_info_container = document.createElement('div');
    task_info_container.setAttribute('id', "task_info_container");
    task_display_container.appendChild(task_info_container);

    // create div for each child and append to task_titles_container, in titles_container
    parent_array.forEach(item => render_task_link(item, parent_array, task_titles_container, task_info_container, form_container, create_new_task_button));


    // CHANGE LOCATION LATER
    create_new_task_button.addEventListener('click', function(){
        show_task_form(form_container, task_info_container, create_new_task_button);
    });




    // create container to display task's subtasks
    let subtask_display_container = document.createElement('div');
    subtask_display_container.setAttribute('id', 'subtask_display_container');
    container.appendChild(subtask_display_container);

    let subtask_form_container = document.createElement('div');
    subtask_form_container.setAttribute('id', 'subtask_form_container');
    subtask_display_container.appendChild(subtask_form_container);

    let subtask_info_container = document.createElement('div');
    subtask_info_container.setAttribute('id', 'subtask_info_container');
    subtask_display_container.appendChild(subtask_info_container);
};

function render_task_link(child, array, container, info_container, form_container, button) {
    let link_to_child = document.createElement('div');
    link_to_child.setAttribute('class', 'task_title');
    link_to_child.innerHTML = child.state.title;

    let remove_this_child = document.createElement('div');
    remove_this_child.setAttribute('class', 'remove_child');
    remove_this_child.innerHTML = 'X';
    remove_this_child.addEventListener('click', function(){
        // remove child from parent array and update localStorage
        remove_child_from_array(child, array);
    
        // remove child's div from left column
        link_to_child.remove();
        remove_this_child.remove();
    });

    // When clicked, render that tasks information into the corresponding div
    link_to_child.addEventListener('click', function(){
        render_task_info(child, info_container, form_container, button)
    });

    container.appendChild(link_to_child);
    container.appendChild(remove_this_child);
}

function remove_child_from_array(child, array){    
    // splice from parent_array
    let index = array.indexOf(child);
    array.splice(index, 1);

    // update localStorage -- parent array variable already set
    console.log(index);
    console.log(array);
    localStorage.setItem('task_array', JSON.stringify(parent_array));
}

// add button to create children here/call display children/remove children functions inside
function render_task_info(child, info_container, form_container, button){
    // hide/show create new task info
    form_container.style.display = 'none';
    button.style.display = '';
    
    // clear container of previously rendered information
    info_container.innerHTML = ''

    // render new info
    let task_title = document.createElement('div');
    task_title.innerHTML = "Title: " + child.state.title;  
    info_container.appendChild(task_title);

    let task_description = document.createElement('div');
    task_description.innerHTML = "Description: " + child.state.description;
    info_container.appendChild(task_description);

    let task_due_date = document.createElement('div');
    task_due_date.innerHTML = "Due date: " + child.state.due_date;
    info_container.appendChild(task_due_date);

    let subtask_link_container = document.createElement('div');
    subtask_link_container.setAttribute('id','subtask_link_container');
    info_container.appendChild(subtask_link_container);

    // this button will open the form to create subtasks/add to the objects children array
    let create_new_subtask_button = document.createElement('button');
    create_new_subtask_button.innerHTML = "New Subtask"
    create_new_subtask_button.setAttribute('id','create_new_subtask_button');
    info_container.appendChild(create_new_subtask_button);

    let subtask_form_container = document.getElementById('subtask_form_container');
    let subtask_info_container = document.getElementById('subtask_info_container');
    create_new_subtask_button.addEventListener('click', function(){
        show_task_form(subtask_form_container, subtask_info_container, create_new_subtask_button, parent_array.indexOf(child));
    });

    // add a links to each subtask/info
    child.state.children.forEach(object => render_task_link(object, child.state.children, subtask_link_container, subtask_info_container, subtask_form_container, create_new_subtask_button));
};

function show_task_form(container, other_container_in_parent_div, button, test_variable){
    // clear the div underneath hidden form
    other_container_in_parent_div.innerHTML = '';

    // if the form hasn't been created yet, create it. Otherwise, make it visible. -- the forms cancel button will rehide it if canceled.
    if(container.hasChildNodes() == false){
        create_form(container, button, create_new_child, test_variable);
        container.style.display = "";
    } else {
        container.style.display = "";
    }
    // hides the submit button when form is open, there's a cancel button in the form that makes this button visible again when it is closed.
    button.style.display = "none";
}


// if the task array exists in localStorage, return it. Otherwise, return an empty array.
function get_tasks_array(){
    if (localStorage.getItem('task_array') == null){
        // set task array to 
        localStorage.setItem('task_array', JSON.stringify([]));
    }
        
    return JSON.parse(localStorage.getItem('task_array'));
}

export default load_initial_page;