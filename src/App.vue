<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newToDoRef"
          @keypress.enter="addNewTodo"
        />
      </header>
      <section class="main" v-show="todoRef.length > 0">
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDoneRef"/>
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            v-for="item in filterTodoRef"
            :key="item.id"
            :class="{ completed: item.completed, editing: item == editTodoRef }"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="item.completed" />
              <label @dblclick="editToEvent(item)">{{ item.title }}</label>
              <button class="destroy" @click="remove(item)"></button>
            </div>
            <input
              class="edit"
              type="text"
              v-model="item.title"
              @blur="doneEditEvent(item)"
              @keyup.enter="doneEditEvent(item)"
              @keyup.escape="cancelEditEvent(item)"
            />
          </li>
        </ul>
      </section>
      <footer class="footer"  v-show="todoRef.length > 0">
        <span class="todo-count">
          <strong>{{ remainingRef }}</strong>
          <span>item{{ remainingRef > 1 ? "s" : "" }} left</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibilityRef == 'all' }"
              >All</a
            >
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibilityRef == 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibilityRef == 'completed' }"
              >Completed</a
            >
          </li>
        </ul>
        <button
          class="clear-completed"
          style="display: none"
          v-show="completedRef > 0"
          @click="removeCompleted"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import { useTodoList } from "./composition/useTodoList";
import { useNewTodoList } from "./composition/useNewTodo";
import useFilter from "./composition/useFilter";
import { useEdit } from "./composition/useEdit";
import useRemove from "./composition/useRemove";

export default {
  setup() {
    return {
      ...useTodoList(),
      ...useNewTodoList(todoRef),
      ...useFilter(todoRef),
      ...useEdit(todoRef),
      ...useRemove(todoRef),
    };
  },
};
</script>
