const Child = (title, description, priority) => {
    let state = {
        title: title,
        description: description,
        priority: priority,
        // child_depth: parent.state.depth + 1,

        // subtasks will be stored in "Children"
        children: [],
    }


    return Object.assign(
        {
            state,
        }
    )
}

function create_new_child(title, priority, description){
    let child = Child(title, priority, description)
    return child;
}

export default create_new_child;