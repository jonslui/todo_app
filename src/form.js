// check if form already exists,
// if it does, check that it means submission requirements and submit
// if it doesn't populate it
function create_form(container, button, create_child_function, array){    
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

    let priority_input = document.createElement('input');
    priority_input.setAttribute('type','text');
    priority_input.setAttribute('class','priority_input');
    priority_input.placeholder = 'Priority';

    form.appendChild(title_input);
    form.appendChild(description_input);
    form.appendChild(priority_input);

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


    let fields_array = [title_input, description_input, priority_input]

    container.appendChild(form);

    return {
        form, 
        fields_array,
    }
}

// removes form div
function cancel_form(container){
    container.remove();
}


export default create_form;