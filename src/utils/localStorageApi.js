const LOCAL_KEY = 'todoName'

export function fetch() {
    let value = localStorage.getItem(LOCAL_KEY);
    if (value) {
        return JSON.parse(value);
    } else {
        return []
    }
}


export function save(newToDo) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(newToDo));
}

export function createId() {
    return Date.now() + Math.random().toString(16).substr(2, 6);
}

export function filter(todo, visibility = 'all') {
    if (visibility == 'all') {
        return todo;
    } else if (visibility == 'active') {
        return todo.filter((it) => !it.completed);
    } else if (visibility == 'completed') {
        return todo.filter((it) => it.completed);
    }
    throw new Error("invalid visibility value");
}
