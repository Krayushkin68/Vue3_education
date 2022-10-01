<template>
    <div id="post-form" @submit.prevent>
        <form class="form-control my-3">
            <h4>Создание поста</h4>
            <div class="form-group mt-2">
                <input type="text" class="form-control" id="title" placeholder="Название поста" v-model="post.title">
            </div>
            <div class="form-group mt-2">
                <input type="text" class="form-control" id="body" placeholder="Описание" v-model="post.body">
            </div>
            <button type="submit" class="btn btn-primary mb-2 mt-3" @click="CreatePost">Создать</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "PostForm",
        data() {
            return {
                post: {
                    title: '',
                    body: ''
                }
            }
        },
        methods: {
            CreatePost() {
                this.post.id = Date.now();
                this.$emit('create-post', this.post);
                this.post = {
                    title: '',
                    body: ''
                }
            }
        }
    }
</script>

<style scoped>

</style>