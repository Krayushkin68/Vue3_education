<template>
    <div class="container">
        <div class="row align-items-end">
            <div class="col col-8">
                <PostForm v-if="isPostFormVisible" @create-post="CreatePost" @close-post-form="TogglePostForm"/>
                <button v-else class="btn btn-primary mb-3" @click="TogglePostForm">Создать пост</button>
            </div>
            <div class="col col-4">
                <input type="text" class="form-control mb-1" id="title" placeholder="Поиск..."
                       :value="searchQuery" @input="updateSearchQuery">
                <CustomSelect :value="selectedSort" :options="sortOptions" @change="updateSelectedSort"/>
            </div>
        </div>
        <div class="row">
            <PostList :posts="sortedAndSearchedPosts" @delete-post="DeletePost"/>
            <div v-show="isPostsLoading">Идет загрузка постов...</div>
        </div>
    </div>
    <div v-intersection="loadMorePosts" class="observer"></div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
    import PostList from "@/components/PostList";
    import PostForm from "@/components/PostForm";
    import CustomSelect from "@/components/CustomSelect";

    export default {
        name: "PostsStoreView",
        components: {
            PostList,
            PostForm,
            CustomSelect
        },
        data() {
            return {
                isPostFormVisible: false,
            }
        },
        methods: {
            ...mapActions({
                fetchPosts: 'post/fetchPosts',
                loadMorePosts: 'post/loadMorePosts'
            }),
            ...mapMutations({
                setPosts: 'post/setPosts',
                setLoading: 'post/setLoading',
                setPage: 'post/setPage',
                setTotalPages: 'post/setTotalPages',
                setSearchQuery: 'post/setSearchQuery',
                setSelectedSort: 'post/setSelectedSort'
            }),
            TogglePostForm() {
                this.isPostFormVisible = !this.isPostFormVisible
            },
            CreatePost(post) {
                this.posts.push(post);
                this.isPostFormVisible = false;
            },
            updateSearchQuery(event) {
                this.setSearchQuery(event.target.value)
            },
            updateSelectedSort(event) {
                this.setSelectedSort(event.target.value)
            }
        },
        computed: {
            ...mapGetters({
                sortedPosts: 'post/sortedPosts',
                sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
            }),
            ...mapState({
                posts: state => state.post.posts,
                isPostsLoading: state => state.post.isPostsLoading,
                page: state => state.post.page,
                limit: state => state.post.limit,
                totalPages: state => state.post.totalPages,
                searchQuery: state => state.post.searchQuery,
                selectedSort: state => state.post.selectedSort,
                sortOptions: state => state.post.sortOptions
            })
        },
        mounted() {
            this.fetchPosts()
        }
    }
</script>

<style scoped>

</style>