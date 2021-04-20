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

    // create div for each child
    parent_array.forEach((item, index) => render_task_link(item, index, parent_array, titles_container));

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

    // create container to display task's subtasks
    let subtask_display_container = document.createElement('div');
    subtask_display_container.setAttribute('id', 'subtask_display_container');
    container.appendChild(subtask_display_container);
};


function render_task_link(child, index, array, container) {
    let link_to_child = document.createElement('div');
    link_to_child.setAttribute('class', 'link_to_child');
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
        render_task_info(child)
    });

    container.appendChild(link_to_child);
    container.appendChild(remove_this_child);
}

function remove_child_from_array(child, array){
    // splice from parent_array
    let index = array.indexOf(child);
    array.splice(index, 1);

    // update localStorage -- parent array variable already set
    localStorage.setItem('task_array', JSON.stringify(parent_array));
    
    // refresh page
    console.log(JSON.parse(localStorage.getItem('task_array')));
}

function render_task_info(child){
    // hide/show create new task info
    let form_container = document.getElementById('form_container');
    form_container.style.display = 'none';
    let create_new_task_button = document.getElementById('create_new_task_button');
    create_new_task_button.style.display = '';

    let container = document.getElementById('task_info_container');
    
    // clear container of previously rendered information
    container.innerHTML = ''

    // render new info
    let task_title = document.createElement('div');
    task_title.innerHTML = "Title: " + child.state.title;  
    container.appendChild(task_title);

    let task_description = document.createElement('div');
    task_description.innerHTML = "Description: " + child.state.description;
    container.appendChild(task_description);

    let task_due_date = document.createElement('div');
    task_due_date.innerHTML = "Due date: " + child.state.due_date;
    container.appendChild(task_due_date);
};

// if the task array exists in localStorage, return it. Otherwise, return an empty array.
function get_tasks_array(){
    if (!localStorage.getItem('task_array')){
        return [];
    } else {
        return JSON.parse(localStorage.getItem('task_array'));
    }
}

export default load_initial_page;