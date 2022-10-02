<template>
    <div id="posts">
        <PostItem v-for="post in posts" :post="post" :key="post.id" @delete-post="DeletePost"/>
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

</style>