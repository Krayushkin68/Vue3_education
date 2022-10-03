<template>
    <div class="container">
        <div class="row align-items-end">
            <div class="col col-8">
                <PostForm v-if="isPostFormVisible" @create-post="CreatePost" @close-post-form="TogglePostForm"/>
                <button v-else class="btn btn-primary mb-3" @click="TogglePostForm">Создать пост</button>
            </div>
            <div class="col col-4">
                <input type="text" class="form-control mb-1" id="title" placeholder="Поиск..." v-model="searchQuery">
                <CustomSelect v-model="selectedSort" :options="sortOptions"/>
            </div>
        </div>
        <div class="row">
            <div v-if="!isPostsLoading">
                <PostList :posts="sortedAndSearchedPosts" @delete-post="DeletePost"/>
                <PaginationNav :totalPages="totalPages" :page="page" @change-page="changePage"/>
            </div>
            <div v-else>Идет загрузка постов...</div>
            <div v-intersection="loadMorePosts" class="observer"></div>
        </div>
    </div>
</template>

<script>
    import PostList from "@/components/PostList";
    import PostForm from "@/components/PostForm";
    import CustomSelect from "@/components/CustomSelect";
    import PaginationNav from "@/components/PaginationNav";
    import axios from 'axios';

    export default {
        name: 'HomeView',
        components: {
            PostList,
            PostForm,
            CustomSelect,
            PaginationNav
        },
        data() {
            return {
                posts: [],
                isPostsLoading: false,
                isPostFormVisible: false,
                page: 1,
                limit: 10,
                totalPages: 0,
                searchQuery: '',
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
            changePage(pageNum) {
                this.page = pageNum
            },
            async fetchPosts() {
                this.isPostsLoading = true;
                await axios
                    .get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    })
                    .then(response => {
                        this.posts = response.data
                        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                    })
                    .catch(() => alert('Ошибка соединения с сервером'))
                    .finally(() => this.isPostsLoading = false)
            },
            loadMorePosts() {
                console.log('Load more posts')
            }
        },
        mounted() {
            this.fetchPosts();
        },
        computed: {
            sortedPosts() {
                return [...this.posts].sort((p1, p2) => p1[this.selectedSort]?.localeCompare(p2[this.selectedSort]))
            },
            sortedAndSearchedPosts() {
                return this.sortedPosts.filter(p => p.title.includes(this.searchQuery))
            }
        },
        watch: {
            page() {
                this.fetchPosts()
            }
        }
    }
</script>
