import { ref } from "vue";
import { createId } from '../utils/localStorageApi';

export function useNewTodoList(todoRef) {
    const newToDoRef = ref('') // 获取新任务的标题
    const addNewTodo = () => {
        const value = newToDoRef.value && newToDoRef.value.trim();
        if(!value) {
            return;
        }
        // 生成一格新的对象
        const todo = {
            id: createId(),
            title: value,
            completed: false,
        }
        todoRef.value.push(todo);
        newToDoRef.value = '';
    }
    return {
        newToDoRef,
        addNewTodo,
    }
}
