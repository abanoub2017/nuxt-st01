<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-6">
                <div class="user-dashboard p-4 rounded shadow">
                    <h1 class="mb-4">{{ selectedUser.name }}'s Dashboard</h1>
                    <div class="mb-3">
                        <label for="new-todo" class="form-label">New Todo:</label>
                        <input type="text" v-model="newTodo" class="form-control" id="new-todo" required>
                    </div>
                    <button class="btn btn-primary" @click="addTodo">Add Todo</button>
                    <div class="mt-4">
                        <ul class="list-group">
                            <li v-for="todo in todos" :key="todo.id"
                                class="list-group-item d-flex justify-content-between align-items-center">
                                <span :class="{ 'text-decoration-line-through': todo.completed }">{{ todo.task }}</span>
                                <div>
                                    <input type="checkbox" v-model="todo.completed" @change="toggleCompletion(todo)">
                                    <button class="btn btn-danger btn-sm ms-2" @click="deleteTodo(todo)">Delete</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import TodoService from '../services/todos'

export default {
    data() {
        return {
            selectedUser: '',
            newTodo: '',
            todos: []
        }
    },
    created() {
        this.selectedUser = JSON.parse(localStorage.getItem('user'))
        this.getTodos()
    },
    methods: {
        async getTodos() {
            const response = await TodoService.getUserDetails()
            this.todos = response.data
        },
        async addTodo() {
            const todo = {
                task: this.newTodo,
                completed: false,
            }
            await TodoService.addTodoServices(todo)
            this.newTodo = ''
            this.getTodos()
        },
        async toggleCompletion(todo) {
            todo.completed = !todo.completed
            await TodoService.updateTodoServices(todo.id)
        },
        async deleteTodo(todo) {
            await TodoService.deletTodoServices(todo.id)
            this.getTodos()
        }
    }
}
</script>
  