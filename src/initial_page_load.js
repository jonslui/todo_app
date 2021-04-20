// initial loadout, includes the title column (labels/list of projects/new project button/etc)

function load_initial_page(){
    let container = document.getElementById('content');   

    // create the naviagtional bar down the left side of the screen
    let titles_container = document.createElement('div');
    titles_container.setAttribute('id', 'titles_container');
    titles_container.setAttribute('class', 'column');
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
};

export default load_initial_page;