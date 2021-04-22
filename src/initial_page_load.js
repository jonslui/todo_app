import create_new_child from './create_todo.js';
import create_form from './form.js';


let localStorage_array = get_localStorage_array();

function initial_page_load(){
    let container = document.getElementById('content');

    let first_column = document.createElement('div');
    first_column.id = 0;
    first_column.setAttribute('class', 'column');
    container.appendChild(first_column);

    populate_column(first_column, localStorage_array);
}

function populate_column(old_column, array){
    // create new column for this columns form/children render
    let new_column = create_column(old_column);

    // create containers for this column
    let titles_container = create_title_container(old_column);


    // create button and append to old column
    let button = create_button(old_column);
    button.innerHTML = 'New Task';
    button.addEventListener('click', function(){  
        // checks the corresponding column to see if a form_container has already been created (length will == 1 if it has been), 
        // if not, run the following functions to create form_container, form, and add onsubmit function(gets form data and updates local storage) to it.
        if(new_column.getElementsByClassName('form_container').length == 0){
            let form_container = create_form_container(new_column)

            new_task_button_events(form_container, button, array);
        }
    });

    // render titles/add links to each/inside onclick function run populate column
    array.forEach(function(child){
        let title = render_title(child, titles_container);
        title.addEventListener('click', function(){

            // should clear column be here?
            clear_column(new_column);

            render_title_information(child, new_column);
            populate_column(new_column, child.state.children);
        });
    });
}

function new_task_button_events(form_container, button, array){      
        let form_data = create_form(form_container, button, create_new_child, array);
    
        form_data.form.onsubmit = function (){
            get_form_data(form_data.fields_array, create_new_child, array)
            update_localStorage_array();
        }

        // button.style.display = 'none';
}

function create_form_container(column){
    // create form 
    let form_container = document.createElement('div');
    form_container.setAttribute('class','form_container');
    column.appendChild(form_container);
    
    return form_container;
}

// remove content from column
// currently called by rendering form info, need to think about that and change/add more
// add clear_column to info rendering form again right after this one
function clear_later_columns(column){
    let last_column_id = document.getElementById('content').lastChild.id;

    // maybe until column == .lastChild, delete? while column!=...
    while(column.id + 1 < last_column_id){
        document.getElementById(last_column_id).remove();

        last_column_id -= 1;
    }
}

function clear_column(column){
    column.innerHTML = '';
}

// creates a new column
// fix whats going on with the id
function create_column(old_column){
    let container = document.getElementById('content');
    let new_id = parseInt(old_column.id) + 1;
    let new_column = document.createElement('div');
    new_column.setAttribute('id', new_id);
    new_column.setAttribute('class', 'column');
    container.appendChild(new_column);

    return new_column
}


function create_button(old_column) {
    let button = document.createElement('button');
    old_column.appendChild(button);

    return button;
}


function create_title_container(column){
    let titles_container = document.createElement('div');
    titles_container.setAttribute('class','titles_container');
    column.appendChild(titles_container);

    return titles_container;
}


function render_title(child, titles_container){
    let title = document.createElement('div');
    title.setAttribute('class', 'title');
    title.innerHTML = child.state.title;

    titles_container.appendChild(title);

    return title;
}


function create_info_container(column){
    let info_container = document.createElement('div');
    info_container.setAttribute('class', 'info_container');
    column.appendChild(info_container);

    return info_container;
}

function render_title_information(child, column){
    // create info container
    clear_later_columns(column);

    let info_container = create_info_container(column);

    // create divs inside info container to hold data
    let title = document.createElement('div');
    title.innerHTML = child.state.title;
    info_container.appendChild(title);

    let description = document.createElement('div');
    description.innerHTML = child.state.description;
    info_container.appendChild(description);

    let priority = document.createElement('div');
    priority.innerHTML = child.state.priority;
    info_container.appendChild(priority);
}

// get info from form and update localeStorage //
function get_form_data(fields_array, create_child_function, array){
    // fields array contains links to input field
    let title = fields_array[0].value;
    let description = fields_array[1].value;
    let priority = fields_array[2].value;
    
    // create a child with field data and then add it to the parent array and update localeStorage
    let child = create_child_function(title, description, priority);

    array.push(child);
}


function get_localStorage_array(){
    let array = JSON.parse(localStorage.getItem('task_array'));

    if(array == null){
        return [];
    }

    return array;
}

function update_localStorage_array(array){
    localStorage.setItem('task_array', JSON.stringify(localStorage_array));
}

export default initial_page_load;
