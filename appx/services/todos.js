import apiClient from './index'

class TodoService {
    // List Users
    static getUserList() {
        return apiClient.get(`users`)
    }

    // Get User Details
    static getUserDetails() {
        return apiClient.get(`todos`)
    }

    // Add
    static addTodoServices(payload) {
        return apiClient.post(`todos`, payload)
    }

    // Update
    static updateTodoServices(id ) {
        return apiClient.put(`todos/${id}`)
    }

    // Delete
    static deletTodoServices(id) {
        return apiClient.delete(`todos/${id}`)
    }
}
export default TodoService