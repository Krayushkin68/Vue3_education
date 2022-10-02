<template>
    <div class="container">
        <div class="row">
            <PostForm @create-post="CreatePost"/>
        </div>
        <div class="row">
            <PostList v-if="!isPostsLoading" :posts="posts" @delete-post="DeletePost"/>
            <div v-else>Идет загрузка постов</div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
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
                isPostsLoading: false
            }
        },
        methods: {
            CreatePost(post) {
                this.posts.push(post);
            },
            DeletePost(post) {
                console.log(post)
                this.posts = this.posts.filter(p => p.id !== post.id)
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
