<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="user-login p-4 rounded shadow">
          <h1 class="mb-4">User Login</h1>
          <select v-model="selectedUser" class="form-select mb-3">
            <option value="" selected disabled>Select User</option>
            <option v-for="user in users" :value="user">{{ user.name }}</option>
          </select>
          <div v-if="selectedUser">
            <div class="d-flex align-items-center mb-3">
              <img :src="selectedUser.avatar" :alt="selectedUser.name" height="60" width="60" class="rounded-circle me-3">
              <h2 class="mb-0">{{ selectedUser.name }}</h2>
            </div>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" v-model="password" class="form-control" id="password" required>
              </div>
              <button class="btn btn-primary" type="submit">Login</button>
            </form>
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
      users: '',
      selectedUser: '',
      password: '',
      listOfUser: [
        {
          "name": "Zucker Ping",
          "password": "123456",
        },
        {
          "name": "Felon Must",
          "password": "123123",
        },
        {
          "name": "Robon Wood",
          "password": "secret",
        }
      ]
    }
  },
  methods: {
    async getAllUser() {
      await TodoService.getUserList().then(res => {
        this.users = res.data
      }).catch(error => console.log(error))
    },
    login() {
      const user = this.selectedUser;
      const password = this.password;
      // Check if username and password match with any user in the list
      const matchedUser = this.listOfUser.find(u => u.name === user.name && u.password === password);
      if (matchedUser) {
        matchedUser.avatar = user.avatar
        // Save token to local storage and redirect to todo list page
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(matchedUser));
        this.$router.push({ path: '/todoList' }).then(() => { this.$router.go() })
      } else {
        // Display error message if no user matches the entered credentials
        alert('Invalid username or password');
      }
    },
  },
  mounted() {
    this.getAllUser()
  }
}
</script>

<style scoped>
.user-login {
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
}

.form-select {
  font-size: 1.2rem;
}

.rounded-circle {
  object-fit: cover;
}

.form-label {
  font-weight: bold;
}

.form-control {
  font-size: 1.2rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

.btn-primary {
  font-size: 1.2rem;
  border-radius: 0.5rem;
  background-color: #007bff;
  border: none;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0069d9;
}
</style>