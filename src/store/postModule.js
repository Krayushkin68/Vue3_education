import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isPostsLoading: false,
        page: 1,
        limit: 10,
        totalPages: 0,
        searchQuery: '',
        selectedSort: '',
        sortOptions: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'}
        ]
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((p1, p2) => p1[state.selectedSort]?.localeCompare(p2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(p => p.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        }
    },
    actions: {
        async fetchPosts({state, commit}) {
            commit('setLoading', true)
            await axios
                .get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                .then(response => {
                    commit('setPosts', response.data)
                    commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                })
                .catch(() => alert('Ошибка соединения с сервером'))
                .finally(commit('setLoading', false))
        },
        async loadMorePosts({state, commit}) {
            commit('setPage', state.page + 1)
            await axios
                .get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                .then(response => {
                    commit('setPosts', [...state.posts, ...response.data])
                    commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                })
                .catch(() => alert('Ошибка соединения с сервером'))
        }
    },
    namespaced: true
}