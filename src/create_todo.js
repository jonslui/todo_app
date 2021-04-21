const Child = (title, description, due_date) => {
    let state = {
        title: title,
        description: description,
        due_date: due_date,
        // status refers to complete vs incomplete
        status: false,
        // subtasks will be stored in "Children"
        children: [],
    }

    

    return Object.assign(
        {
            state,
        }
    )
}

function create_new_child(title, due_date, description){
    let child = Child(title, due_date, description)
    return child;
}

export default create_new_child;