import { ref, watchEffect } from 'vue';
import * as storageApi from '../utils/localStorageApi';

export function useTodoList() {
    const todoRef = ref(storageApi.fetch());
    window.todoRef = todoRef; // 测试用
    watchEffect(() => {
        storageApi.save(todoRef.value);
    })
    return {
        todoRef,
    }
}
