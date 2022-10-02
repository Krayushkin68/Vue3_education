<template>
    <div id="posts">
        <transition-group name="posts-list">
            <PostItem v-for="post in posts" :post="post" :key="post.id" @delete-post="DeletePost"/>
        </transition-group>
    </div>
</template>

<script>
    import PostItem from "@/components/PostItem";

    export default {
        name: "PostList",
        components: {
            PostItem
        },
        props: {
            posts: {
                type: Array,
                required: true
            }
        },
        methods: {
            DeletePost(post) {
                this.$emit('delete-post', post)
            }
        }
    }
</script>

<style scoped>
    .posts-list-item {
        display: inline-block;
        margin-right: 10px;
    }

    .posts-list-enter-active,
    .posts-list-leave-active {
        transition: all 0.3s ease;
    }

    .posts-list-enter-from,
    .posts-list-leave-to {
        opacity: 0;
        transform: translateX(130px);
    }

    .posts-list-move {
        transition: transform 0.8s ease;
    }
</style>