// check if form already exists,
// if it does, check that it means submission requirements and submit
// if it doesn't populate it
function create_form(container, button){    
    // create form
    let form = document.createElement('form');
    
    // create form fields
    let title_input = create_input_field('Title', true);
    let description_input = create_input_field('Description', false);
    let priority_input = create_input_field('Priority', false);


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


    // append fields to form
    form.appendChild(title_input);
    form.appendChild(description_input);
    form.appendChild(priority_input);
    form.appendChild(submit_button);
    form.appendChild(cancel_button);


    let fields_array = [title_input, description_input, priority_input]

    container.appendChild(form);

    return {
        form, 
        fields_array,
    }
}

function create_input_field(placeholder, is_required){
    let field = document.createElement('input');
    field.setAttribute('type','text');
    field.setAttribute('class','form_field');
    field.placeholder = placeholder;
    field.required = is_required;

    return field
}

// removes form div
function cancel_form(container){
    container.remove();
}


export default create_form;