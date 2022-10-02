<template>
    <div class="container">
        <div class="row">
            <PostForm @create-post="CreatePost"/>
        </div>
        <div class="row">
            <PostList :posts="posts" @delete-post="DeletePost"/>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import PostList from "@/components/PostList";
    import PostForm from "@/components/PostForm";

    export default {
        name: 'HomeView',
        components: {
            PostList,
            PostForm
        },
        data() {
            return {
                posts: [
                    {id: 1, title: "Пост о фронтенде", body: "Содержание поста о фронтенде"},
                    {id: 2, title: "Пост о Vue", body: "Содержание поста о Vue"},
                    {id: 3, title: "Пост о Vue-CLI", body: "Содержание поста о Vue-CLI"},
                    {id: 4, title: "Пост о Vue Router", body: "Содержание поста о Vue Router"}
                ]
            }
        },
        methods: {
            CreatePost(post) {
                this.posts.push(post);
            },
            DeletePost(post) {
                console.log(post)
                this.posts = this.posts.filter(p => p.id !== post.id)
            }
        }
    }
</script>
