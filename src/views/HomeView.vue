<template>
    <div class="container">
        <div class="row align-items-end">
            <div class="col col-9">
                <PostForm v-if="isPostFormVisible" @create-post="CreatePost" @close-post-form="TogglePostForm"/>
                <button v-else class="btn btn-primary mb-3" @click="TogglePostForm">Создать пост</button>
            </div>
            <div class="col col-3">
                <select class="form-select mb-3" aria-label="Default select example">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
        </div>
        <div class="row">
            <PostList v-if="!isPostsLoading" :posts="posts" @delete-post="DeletePost"/>
            <div v-else>Идет загрузка постов</div>
        </div>
    </div>
</template>

<script>
    import PostList from "@/components/PostList";
    import PostForm from "@/components/PostForm";
    import axios from 'axios';

    export default {
        name: 'HomeView',
        components: {
            PostList,
            PostForm
        },
        data() {
            return {
                posts: [],
                isPostsLoading: false,
                isPostFormVisible: false
            }
        },
        methods: {
            CreatePost(post) {
                this.posts.push(post);
                this.isPostFormVisible = false;
            },
            DeletePost(post) {
                console.log(post)
                this.posts = this.posts.filter(p => p.id !== post.id)
            },
            TogglePostForm() {
                this.isPostFormVisible = !this.isPostFormVisible
            },
            async fetchPosts() {
                this.isPostsLoading = true;
                await axios
                    .get('https://jsonplaceholder.typicode.com/posts?_limit=10')
                    .then(response => this.posts = response.data)
                    .catch(() => alert('Ошибка соединения с сервером'))
                    .finally(() => this.isPostsLoading = false)
            }
        },
        mounted() {
            this.fetchPosts();
        }
    }
</script>
