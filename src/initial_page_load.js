import create_new_child from './create_todo.js';
import {create_form, create_input_field, create_date_field, create_select_field} from './form.js';
import {compareAsc, parseISO, format} from 'date-fns';

let localStorage_array = get_localStorage_array();

function initial_page_load(){
    // get main container, all columns will be appended to this grid
    let container = document.getElementById('content');

    // create the first column, give it an id of 0, all other columns will incremenet the id off the previous number, 0,1,2,3...
    let first_column = document.createElement('div');
    first_column.id = 0;
    first_column.setAttribute('class', 'column');
    container.appendChild(first_column);

    // create next column, any actions from the old column (creating new task, 
    // opening a task from that column, will appear in the column created from this one)
    populate_column(first_column, localStorage_array);
}

function populate_column(old_column, array){

    let new_column = create_column(old_column);

    create_sort_buttons(old_column, new_column, array);

    let titles_container = create_title_container(old_column);
    let button = create_button(old_column);
    
    button.addEventListener('click', function(){  
        // checks the corresponding column to see if a form_container has already been created (length will == 1 if it has been), 
        // if not, run the following functions to create form_container, form, and add onsubmit function(gets form data and updates local storage) to it.
        if(old_column.getElementsByClassName('form_container').length == 0){
            let form_container = create_form_container(old_column);
            new_task_button_events(form_container, button, array, titles_container, new_column);
        }
    });

    // create container for titles and delete buttons, then populate with children
    create_title_and_remove_button_container(array, titles_container, new_column);

}


// create and populate individual containers for each child containing title and delete button
function create_title_and_remove_button_container(array, parent_container, new_column, reset_is_displayed = true){
    array.forEach(function(child){

        // make sure no child's is_displayed property is set to true
        // if this is called after sorting an array, do not reset because that tasks child on the right should still be displayed after render
        if(reset_is_displayed == true){
            child.state.is_displayed = false;
        }
        
        let container = document.createElement('div');
        
        set_priority_class(child, container);

        let title = render_title(child, container);
        title.addEventListener('click', function(){
            clear_column(new_column);

            // update which child is currently displayed on the right hand side
            change_is_displayed(array, child);

            create_close_column_button(new_column);

            render_title_information(child, new_column);
            populate_column(new_column, child.state.children);

            // sets/resets opacity on click 
            set_opacity(container, parent_container.children)
        });

        let button = render_delete_button(container);
        button.addEventListener('click', function(){
            // check if the child to be delete is currently displayed in the column on the right,
            // if it is, clear the right hand columns.
            check_if_displayed(new_column, child);

            remove_child_from_array(child, array);

            // removes title/button from form container without having to reload page
            title.remove();
            button.remove();
        })

        parent_container.appendChild(container)
    });
}

function set_priority_class(child, container){
    if(child.state.priority == "1"){
        container.setAttribute('class', 'title_and_delete_button_container high_priority')
    }else if(child.state.priority == "2"){
        container.setAttribute('class','title_and_delete_button_container medium_priority');
    }else if(child.state.priority == "3"){
        container.setAttribute('class','title_and_delete_button_container low_priority');
    }else{
        container.setAttribute('class','title_and_delete_button_container');
    }
}

function check_if_displayed(column, child){
    if(child.state.is_displayed == true){
        // remove right hand column
        clear_later_columns(column.id);
        clear_column(column);   
    }
}

// change all to false each time column is rendered?
function change_is_displayed(array, child){
    array.forEach(function(element){
        element.state.is_displayed = false;
    });

    child.state.is_displayed = true;
}

// changes opacity of tabs when clicked to allow for a friendlier user interface
function set_opacity(child, parent_array){
    for(let i = 0; i < parent_array.length; i++){
        parent_array[i].style.opacity = 0.68;
    }
    
    child.style.opacity = 1;
}


function create_sort_buttons(old_column, new_column, array){

    // Don't want it to reload initial page, just call populate_column() w that current array/column
    let sort_by_date_button = document.createElement('button');
    sort_by_date_button.setAttribute('class', 'sort_button');
    sort_by_date_button.addEventListener('click', function(){
        sort_by_date(array)
       
        // get titles contianer and clear it of previous data
        let container = old_column.getElementsByClassName('titles_container');
        container[0].innerHTML = '';
        
        // render newly sorted titles and their corresponding buttons
        create_title_and_remove_button_container(array, container[0], new_column, false);
    });
    sort_by_date_button.innerHTML = 'Sort by Date';
    old_column.appendChild(sort_by_date_button);

    let sort_by_priority_button = document.createElement('button');
    sort_by_priority_button.setAttribute('class', 'sort_button')
    sort_by_priority_button.addEventListener('click', function(){
        sort_by_priority(array)

        // get titles contianer and clear it of previous data
        let container = old_column.getElementsByClassName('titles_container');
        container[0].innerHTML = '';
        
        // render newly sorted titles and their corresponding buttons
        create_title_and_remove_button_container(array, container[0], new_column, false);
    });
    sort_by_priority_button.innerHTML = 'Sort by Priority';
    old_column.appendChild(sort_by_priority_button);
}

// allows closing of current column and later columns
function create_close_column_button(column){
    let close_column_button = document.createElement('button');
    close_column_button.innerHTML = "Close Tab";
    close_column_button.setAttribute('class','close_column_button')
    close_column_button.addEventListener('click', function(){
        clear_later_columns(column.id);
        clear_column(column)

    })

    column.appendChild(close_column_button);
}

function render_delete_button(container){
    let button = document.createElement('a');
    button.innerHTML = 'X';
    button.setAttribute('class','delete_button');

    container.appendChild(button);

    return button;
}

function remove_child_from_array(child, array){
    let index = array.indexOf(child);
    array.splice(index, 1);
    update_localStorage_array();
}

function new_task_button_events(form_container, button, array, titles_container, new_column){     
    let form_data = create_form(form_container, button);

    form_data.form.onsubmit = function (){
        get_form_data_and_create_child(form_data.fields_array, create_new_child, array)
        update_localStorage_array();

        // clears form from display
        form_container.remove();

        // clears past titles/remove buttons from inside titles_container
        titles_container.innerHTML = '';

        // repopulate with new info
        create_title_and_remove_button_container(array, titles_container, new_column, false);

        // stops auto reload of page
        return false;
    }
}

function create_form_container(column){
    // create form 
    let form_container = document.createElement('div');
    form_container.setAttribute('class','form_container');
    column.appendChild(form_container);
    
    return form_container;
}

// 1. getsHTMLcollection of all columns
// 2. deleted ones later than the column_id
// This function is used to clear all columns after the one the user just clicked, to help make viewing interface clearer
function clear_later_columns(column_id){
    let main_container = document.getElementById('content');
    let columns_as_HTMLcollection = main_container.getElementsByClassName('column');

    for(let i = columns_as_HTMLcollection.length - 1; i > column_id; i--){
        columns_as_HTMLcollection[i].remove();
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


    container.scrollLeft = container.scrollWidth;


    return new_column
}


function create_button(old_column) {
    let button = document.createElement('button');
    button.setAttribute('class','new_task_button');
    button.innerHTML = 'New Task';
    old_column.appendChild(button);

    return button;
}


function create_title_container(column){
    let titles_container = document.createElement('div');
    titles_container.setAttribute('class','titles_container');
    column.appendChild(titles_container);

    return titles_container;
}


function render_title(child, container){
    let title = document.createElement('div');
    title.setAttribute('class','title');
    title.innerHTML = child.state.title;
    container.appendChild(title);

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
    clear_later_columns(column.id);

    let info_container = create_info_container(column);

    // create divs inside info container to hold data
    let title = document.createElement('div');
    title.setAttribute('class','info_container_title')
    title.innerHTML = child.state.title;
    info_container.appendChild(title);

    let description = document.createElement('div');
    description.setAttribute('class','info_container_description')
    description.innerHTML = child.state.description;
    info_container.appendChild(description);

    let priority = document.createElement('div');
    priority.innerHTML = "Priority: " + return_priority_level(child.state.priority);
    info_container.appendChild(priority);

    let due_date = document.createElement('div');
    info_container.appendChild(due_date);
    if(child.state.due_date != "" ){
        // format and parseISO are two functions from date-fns, format manipulates how the date data is displayed, parseISO makes data readable for format.
        due_date.innerHTML = "Due Date: " + format(parseISO(child.state.due_date), 'MM/dd/yyyy');
    }

    let edit_button = document.createElement('button');
    edit_button.innerHTML = 'Edit';
    edit_button.setAttribute('class', 'edit_button');
    edit_button.addEventListener('click', function(){
        if(info_container.style.display != 'none'){
            edit_content(column, info_container, child, edit_button);
        }
    })
    column.appendChild(edit_button);
}

function edit_content(column, container, child, edit_button){
    let temp_container = document.createElement('div');

    edit_button.style.display = 'none';
    container.style.display = 'none';
    let container_children = container.children
    column.appendChild(temp_container);

    let title_input = create_input_field(container_children[0].innerHTML, true);
    temp_container.appendChild(title_input);
    let description_input = create_input_field('Description: ' + container_children[1].innerHTML, false);
    temp_container.appendChild(description_input);
    let priority_input = create_select_field(false);
    priority_input.value = child.state.priority;
    temp_container.appendChild(priority_input);
    let date_field = create_date_field(false);
    date_field.value = child.state.due_date;
    temp_container.appendChild(date_field);

    column.insertBefore(temp_container, container);

    let submit_button = document.createElement('button');
    submit_button.innerHTML = 'Submit';
    submit_button.setAttribute('class','form_button');
    submit_button.addEventListener('click', function(){
        cancel_button.remove();
        if(title_input.value != ''){
            child.state.title = title_input.value;
            container_children[0].innerHTML = title_input.value;

            // function to find is_displayed child and change its div
            let title_delete_container = find_displayed_title_and_delete_button_container(column.id);
            let title = title_delete_container.getElementsByClassName('title')[0]
            title.innerHTML = title_input.value;
        }
        if(description_input.value != ''){
            child.state.description = description_input.value;
            container_children[1].innerHTML = description_input.value;
        }
        if(priority_input.value != ''){
            child.state.priority = priority_input.value;
            container_children[2].innerHTML = "Priority: " + return_priority_level(priority_input.value)
            let displayed = find_displayed_title_and_delete_button_container(column.id);
            set_priority_class(child, displayed);
        }
        if(date_field.value != ''){
            // format and parseISO are two functions from date-fns, format manipulates how the date data is displayed, parseISO makes data readable for format.
            child.state.due_date = date_field.value;
            container_children[3].innerHTML = "Due Date: " + format(parseISO(child.state.due_date), 'MM/dd/yyyy');
        }

        // show original and updated container
        container.style.display = '';
        // remove edit container
        temp_container.remove();
        // update with new data
        update_localStorage_array();

        edit_button.style.display = '';

        cancel_button.remove();
        submit_button.remove();
    });
    column.insertBefore(submit_button, edit_button);

    let cancel_button = document.createElement('button');
    cancel_button.setAttribute('class', 'form_button');
    cancel_button.innerHTML = 'Cancel';
    cancel_button.addEventListener('click', function(){
        container.style.display = '';
        temp_container.remove();
        edit_button.style.display = '';

        temp_container.remove();
        submit_button.remove();
        cancel_button.remove();
    });
    column.insertBefore(cancel_button, submit_button);
}


function find_displayed_title_and_delete_button_container(column_id){
    let title_column = document.getElementById(column_id - 1);
    let array = title_column.getElementsByClassName('title_and_delete_button_container')
    let displayed_title_container = '';

    for(let i = 0; i < array.length; i++){
        if(array[i].style.opacity == 1){
           displayed_title_container = array[i];
        }
    };

    return displayed_title_container;
}


function return_priority_level(priority_number){
    if(priority_number == '1'){
        return "High";
    } else if (priority_number == '2'){
        return "Medium";
    } else if (priority_number == '3'){
        return "Low";
    } else {
        return "None";
    }
    

}

// get info from form and update localeStorage //
function get_form_data_and_create_child(fields_array, create_child_function, array){
    // fields array contains links to input field
    let title = fields_array[0].value;
    let description = fields_array[1].value;
    let priority = fields_array[2].value;
    let due_date = fields_array[3].value;
    
    // create a child with field data and then add it to the parent array and update localeStorage
    let child = create_child_function(title, description, priority, due_date);

    array.push(child);
}

function sort_by_date(array){
    array.sort(function(a,b){
        if(a.state.due_date == '' && b.state.due_date != ''){
            return 1;
        }else if(b.state.due_date == '' && a.state.due_date != ''){
            return -1;
        }else if(b.state.due_date == '' && b.state.due_date == ''){
            return 0;
        }else{
            return compareAsc(parseISO(a.state.due_date), parseISO(b.state.due_date));
        }
        
     });

     update_localStorage_array();
}

function sort_by_priority(array){
    array.sort(function(a,b){
        return parseInt(a.state.priority) - parseInt(b.state.priority)
    });

    update_localStorage_array();
}


function get_localStorage_array(){
    let array = JSON.parse(localStorage.getItem('task_array'));

    if(array == null){
        return [];
    }

    return array;
}

function update_localStorage_array(){
    localStorage.setItem('task_array', JSON.stringify(localStorage_array));
}

export default initial_page_load;
