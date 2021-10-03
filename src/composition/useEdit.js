import { ref, computed } from "vue";

export function useEdit(todoRef) {
    const editTodoRef = ref(null);
    let originTitle = '';
    const editToEvent = (todo) => {
        editTodoRef.value = todo;
        originTitle = todo.title;
    }
    const doneEditEvent = (todo) => {
        editTodoRef.value = null;
        const title = todo.title.trim();
        if (title) {
            todo.title = title;
        } else {
            // 删除
            const index = todoRef.value.indexOf(todo);
            if (index > 0) {
                todoRef.value.splice(index, 1);
            }
        }
    }
    const cancelEditEvent = (todo) => {
        editTodoRef.value = null;
        todo.title = originTitle;
    }
    const allDoneRef = computed({
        get() {
            const val = (todoRef.value.filter(todo => !todo.completed).length == 0);
            return val;
        },
        set(checked) {
            todoRef.value.forEach(todo =>{
                todo.completed = checked;
            });
        }
    })
    return {
        editTodoRef,
        editToEvent,
        doneEditEvent,
        cancelEditEvent,
        allDoneRef,
    }
}
