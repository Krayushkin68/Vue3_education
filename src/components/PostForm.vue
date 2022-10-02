<template>
    <div id="post-form" @submit.prevent>
        <form class="form-control mb-3">
            <h4>Создание поста</h4>
            <div class="form-group mt-2">
                <input type="text" class="form-control" id="title" placeholder="Название поста" v-model="post.title">
            </div>
            <div class="form-group mt-2">
                <input type="text" class="form-control" id="body" placeholder="Описание" v-model="post.body">
            </div>
            <button type="submit" class="btn btn-primary mb-2 mt-3" @click="CreatePost">Создать</button>
            <button type="submit" class="btn btn-danger mb-2 mt-3 mx-2" @click="ClosePostForm">Отмена</button>
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
            },
            ClosePostForm(){
                this.$emit('close-post-form')
            }
        }
    }
</script>

<style scoped>

</style>