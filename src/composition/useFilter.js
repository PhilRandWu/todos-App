import { ref,onMounted,onUnmounted,computed } from "vue";
import { filter } from "../utils/localStorageApi";
const availableHash = ['all','active','completed'];

export default function useFilter(todoRef) {
    const visibilityRef = ref('all');
    const hashChange = () => {
        const hash = location.hash.replace(/^#\/?/,'');
        if(availableHash.includes(hash)) {
            visibilityRef.value = hash;
        }else {
            location.hash = "";
            visibilityRef.value = 'all';
        }
        // console.log(visibilityRef.value); // 测试用
    }
    onMounted(() => {
        window.addEventListener('hashchange', hashChange);
    })
    onUnmounted(() => {
        window.removeEventListener('hashchange', hashChange);
    })
    const filterTodoRef = computed(() => {
        return filter(todoRef.value,visibilityRef.value);
    })
    const remainingRef = computed(() => {
        return filter(todoRef.value,'active').length;
    })
    const completedRef = computed(() => {
        console.log(filter(todoRef.value,'completed').length);
        return filter(todoRef.value,'completed').length;
    }) 
    return {
        visibilityRef,
        filterTodoRef,
        remainingRef,
        completedRef,
    }    
}
