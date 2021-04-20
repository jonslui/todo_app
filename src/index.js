import load_initial_page from './initial_page_load.js';
import create_new_child from './create_todo.js';
import create_form from './form.js';


load_initial_page();
let parent_array = [];

let task_form_container = document.getElementById('form_container')
let create_new_task_button = document.getElementById('create_new_task_button');
create_new_task_button.addEventListener('click', show_task_form);


create_new_task_button.addEventListener('click', test2);
create_new_task_button.addEventListener('click', test);

// new populate titles function?
function test(){
    console.log(parent_array);
}

function test2(){
    create_new_child("1","2","3", parent_array)
}



function show_task_form(){
    // does anything else need to happen?
    // form.visibility?
    create_form(task_form_container);
    // hide button?
    create_new_task_button.style.display = "none";
}

