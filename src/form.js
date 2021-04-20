// check if form already exists,
// if it does, check that it means submission requirements and submit
// if it doesn't populate it
function create_form(container, button, parent_array, create_child_function){
    // create form
    let form = document.createElement('form');
    
    // create form fields
    let title_input = document.createElement('input');
    title_input.setAttribute('type','text');
    title_input.setAttribute('class','title_input');
    title_input.placeholder = "Title";
    title_input.required = true;

    let description_input = document.createElement('input');
    description_input.setAttribute('type','text');
    description_input.setAttribute('class','description_input');
    description_input.placeholder = 'Description';
    description_input.required = true;

    let due_date_input = document.createElement('input');
    due_date_input.setAttribute('type','text');
    due_date_input.setAttribute('class','due_date_input');
    due_date_input.placeholder = 'Due date';

    form.appendChild(title_input);
    form.appendChild(description_input);
    form.appendChild(due_date_input);

    let cancel_button = document.createElement('button');
    cancel_button.setAttribute('type','button');
    cancel_button.setAttribute('class','form_button')
    cancel_button.innerHTML = "Cancel";
    cancel_button.addEventListener('click', function(){
        cancel_form(container, button);
    });

    let submit_button = document.createElement('button');
    submit_button.setAttribute('type','submit');
    submit_button.setAttribute('class','form_button')
    submit_button.innerHTML = "Submit";

    form.appendChild(submit_button);
    form.appendChild(cancel_button);


    let fields_array = [title_input, description_input, due_date_input]
    form.onsubmit = function(){
        submit_form(parent_array, fields_array, create_child_function);
    };
    container.appendChild(form);
}

// have the buttons for closing the form be here
function cancel_form(container, button){
    container.style.display = 'none';
    button.style.display = '';
}

// get info from form and update localeStorage
function submit_form(parent_array, fields_array, create_child_function){
    // fields array contains links to input field
    let title = fields_array[0].value;
    let description = fields_array[1].value;
    let due_date = fields_array[2].value;
    
    // create a child with field data and then add it to the parent array and update localeStorage
    let child = create_child_function(title, description, due_date);
    parent_array.push(child)
    localStorage.setItem('task_array', JSON.stringify(parent_array));
}

export default create_form;