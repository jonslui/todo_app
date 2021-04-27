const Child = (title, description, priority, due_date) => {
    let state = {
        title: title,
        description: description,
        priority: priority,
        due_date: due_date,
        // subtasks are stored in children
        children: [],
    }


    return Object.assign(
        {
            state,
        }
    )
}


function create_new_child(title, priority, description, due_date){
    let child = Child(title, priority, description, due_date)
    return child;
}

export default create_new_child;