<template>
    <div>
        <Header />
        <AddTodo />
    </div>
</template>
  
<script>

export default {
    middleware({ redirect }) {
        // If the user is not authenticated
        const token = localStorage.getItem('token')
        if (!token) {
            redirect('/')
        }
    }
}
</script>