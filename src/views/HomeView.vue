<template>
    <div class="container">
        <div class="row align-items-end">
            <div class="col col-9">
                <PostForm v-if="isPostFormVisible" @create-post="CreatePost" @close-post-form="TogglePostForm"/>
                <button v-else class="btn btn-primary mb-3" @click="TogglePostForm">Создать пост</button>
            </div>
            <div class="col col-3">
                <CustomSelect v-model="selectedSort" :options="sortOptions"/>
            </div>
        </div>
        <div class="row">
            <PostList v-if="!isPostsLoading" :posts="sortedPosts" @delete-post="DeletePost"/>
            <div v-else>Идет загрузка постов</div>
        </div>
    </div>
</template>

<script>
    import PostList from "@/components/PostList";
    import PostForm from "@/components/PostForm";
    import CustomSelect from "@/components/CustomSelect";
    import axios from 'axios';

    export default {
        name: 'HomeView',
        components: {
            PostList,
            PostForm,
            CustomSelect
        },
        data() {
            return {
                posts: [],
                isPostsLoading: false,
                isPostFormVisible: false,
                selectedSort: '',
                sortOptions: [
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'}
                ]
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
        },
        computed: {
            sortedPosts() {
                return [...this.posts].sort((p1, p2) => p1[this.selectedSort]?.localeCompare(p2[this.selectedSort]))
            }
        }
    }
</script>
