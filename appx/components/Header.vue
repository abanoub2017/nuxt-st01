<template>
    <div class="user-account">
        <div class="user-info d-flex align-items-center">
            <img :src="selectedUser.avatar" :alt="selectedUser.name" height="30" width="30" class="rounded-circle me-2">
            <span class="fw-bold">{{ selectedUser.name }}</span>
        </div>
        <button class="btn btn-link text-danger" @click="logout">Logout</button>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            selectedUser: ''
        }
    },
    created() {
        this.selectedUser = JSON.parse(localStorage.getItem('user'))
    },
    methods: {
        logout() {
            // perform logout action, such as clearing user data and redirecting to login page
            localStorage.clear()
            this.$router.push('/');
        }
    }
}
</script>
  
<style scoped>
.user-account {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
}

.user-info {
    font-size: 0.9rem;
}
</style>