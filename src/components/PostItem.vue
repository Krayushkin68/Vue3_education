<template>
    <div class="card border-dark mb-3">
        <div class="card-body text-dark">
            <div class="container">
                <div class="row">
                    <div class="col col-10">
                        <h5 class="card-title" @click="$router.push(`/posts/${post.id}`)">{{ post.title }}</h5>
                        <p class="card-text">{{ post.body }}</p>
                    </div>
                    <div class="col col-2">
                        <button class="btn btn-outline-danger float-end" @click="DeletePost">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PostItem",
        props: {
            post: {
                type: Object,
                required: true
            }
        },
        methods: {
            DeletePost() {
                this.$emit('delete-post', this.post)
            }
        }
    }
</script>

<style scoped>
    .card-title {
        cursor: pointer;
    }
</style>