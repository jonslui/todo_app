// check if form already exists,
// if it does, check that it means submission requirements and submit
// if it doesn't populate it

function create_form(container){
    // create form
    let form = document.createElement('form');
    
    // create field
    let test_field_1_label = document.createElement('label')
    test_field_1_label.innerHTML = 'Field 1';
    let test_field_1 = document.createElement('input');
    test_field_1.setAttribute('type','text');

    let test_field_2_label = document.createElement('label');
    test_field_2_label.innerHTML = 'Field 2';
    let test_field_2 = document.createElement('input');
    test_field_2.setAttribute('type','text');

    let test_field_3_label = document.createElement('label');
    test_field_3_label.innerHTML = 'Field 3';
    let test_field_3 = document.createElement('input');
    test_field_3.setAttribute('type','text');

    let test_field_4_label = document.createElement('label');
    test_field_4_label.innerHTML = 'Field 4';
    let test_field_4 = document.createElement('input');
    test_field_4.setAttribute('type','text');

    form.appendChild(test_field_1_label);
    form.appendChild(test_field_1);

    form.appendChild(test_field_2_label);
    form.appendChild(test_field_2);

    form.appendChild(test_field_3_label);
    form.appendChild(test_field_3);

    form.appendChild(test_field_4_label);
    form.appendChild(test_field_4);

    let cancel_button = document.createElement('button');
    cancel_button.addEventListener('click', function(){
        cancel_form(container);
    });
    cancel_button.innerHTML = "Cancel";

    let submit_button = document.createElement('button');
    submit_button.innerHTML = "Submit";

    form.appendChild(submit_button);
    form.appendChild(cancel_button);

    container.appendChild(form);
}

// have the buttons for closing the form be here
function cancel_form(container){
    

}

function submit_button(){

}


export default create_form;