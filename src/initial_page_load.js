// initial loadout, includes the title column (labels/list of projects/new project button/etc)

function load_initial_page(array){
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

    // container that will render/clear its contents when the create_new_task_button is clicked.
    let form_container = document.createElement('div');
    form_container.setAttribute('id','form_container');
    titles_container.appendChild(form_container);

    // create div for each child
    array.forEach(item => render_task_link(item, titles_container));

    // create container that will display clicked upon todo value
    let task_display_container = document.createElement('div');
    task_display_container.setAttribute('id', 'task_display_container');
    container.appendChild(task_display_container);
    
};


function render_task_link(child, container) {
    let link_to_child = document.createElement('div');
    link_to_child.setAttribute('class', 'link_to_child');
    link_to_child.innerHTML = child.state.title;

    // When clicked, render that tasks information into the corresponding div
    link_to_child.addEventListener('click', function(){
        render_task_info(child)
    });

    container.appendChild(link_to_child);
}


function render_task_info(child){
    let container = document.getElementById('task_display_container');
    
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

export default load_initial_page;