const Child = (title, due_date, description, parent) => {
    let state = {
        title: title,
        due_date: due_date,
        description: description,
        parent: parent,
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

function create_new_child(title, due_date, description, parent){
    let child = Child(title, due_date, description, parent)
    parent.push(child);
    return child;
}

export default create_new_child;