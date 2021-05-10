// check if form already exists,
// if it does, check that it means submission requirements and submit
// if it doesn't populate it
function create_form(container, button){    
    // create form
    let form = document.createElement('form');
    
    // create form fields
    let title_input = create_input_field('Enter Title', true);
    // title_input.style.borderRadius = '10px 10px 0px 0px'
    let description_input = create_input_field('Enter Description', false);
    let priority_input = create_select_field(false);
    let due_date_input = create_date_field(false);


    let cancel_button = document.createElement('button');
    cancel_button.setAttribute('type','button');
    cancel_button.setAttribute('class','form_button')
    // cancel_button.style.borderRadius = '0px 0px 10px 0px'
    cancel_button.innerHTML = "Cancel";
    cancel_button.addEventListener('click', function(){
        cancel_form(container, button);
    });

    let submit_button = document.createElement('button');
    submit_button.setAttribute('type','submit');
    submit_button.setAttribute('class','form_button')
    // submit_button.style.borderRadius = '0px 0px 0px 10px'
    submit_button.innerHTML = "Submit";


    // append fields to form
    form.appendChild(title_input);
    form.appendChild(description_input);
    form.appendChild(priority_input);
    form.appendChild(due_date_input);
    form.appendChild(submit_button);
    form.appendChild(cancel_button);


    let fields_array = [title_input, description_input, priority_input, due_date_input];

    container.appendChild(form);

    return {
        form, 
        fields_array,
    }
}

function create_input_field(placeholder, is_required){
    let element = document.createElement('input');
    element.setAttribute('type','text');
    element.setAttribute('class','form_field');
    element.placeholder = placeholder;
    element.required = is_required;

    return element;
}

function create_date_field(is_required){
    let element = document.createElement('input');
    element.setAttribute('type', 'date');
    element.setAttribute('class', 'form_field');
    element.required = is_required;

    return element;
}

function create_select_field(is_required){
    let element = document.createElement('SELECT');
    element.setAttribute('class','form_field');
    element.required = is_required;

    create_option('Select Priority (Optional)', 4, element);
    create_option('Low', 3, element);
    create_option('Medium', 2, element);
    create_option('High', 1, element);

    return element;
}

function create_option(text, value, select_field){
    let option = document.createElement('option');
    option.setAttribute('value', value);
    let node = document.createTextNode(text);
    option.appendChild(node);

    select_field.appendChild(option);
}

// removes form div
function cancel_form(container){
    container.remove();
}


export default create_form;