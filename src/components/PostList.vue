<template>
    <div id="posts">
        <PostItem v-for="(post, index) in posts" :post="post" :key="index"/>
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
        }
    }
</script>

<style scoped>

</style>