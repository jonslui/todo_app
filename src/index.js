import load_initial_page from './initial_page_load.js';
import create_new_child from './create_todo.js';
import create_form from './form.js';

let task_array = get_tasks_array();
console.log(task_array);
load_initial_page(task_array);

// Container/New Task button were created in "inital_page_load," following code attaches them to the form.js module
let task_form_container = document.getElementById('form_container')
let create_new_task_button = document.getElementById('create_new_task_button');
create_new_task_button.addEventListener('click', function(){
    show_task_form(task_form_container, create_new_task_button);
});

function show_task_form(container, button){
    // clear the div underneath hidden form
    let task_info_container = document.getElementById('task_info_container');
    task_info_container.innerHTML = '';

    // if the form hasn't been created yet, create it. Otherwise, make it visible. -- the forms cancel button will rehide it if canceled.
    if(container.hasChildNodes() == false){
        create_form(container, button, task_array, create_new_child);
    } else {
        container.style.display = "";
    }
    // hides the submit button when form is open, there's a cancel button in the form that makes this button visible again when it is closed.
    create_new_task_button.style.display = "none";
}

// if the task array exists in localStorage, return it. Otherwise, return an empty array.
function get_tasks_array(){
    if (!localStorage.getItem('task_array')){
        return [];
    } else {
        return JSON.parse(localStorage.getItem('task_array'));
    }
}