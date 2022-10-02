<template>
    <nav>
        <ul class="pagination" aria-label="es">
            <li class="page-item"
                :class="{'active': page === pageNum}"
                v-for="pageNum in totalPages"
                :key="pageNum">
                <a class="page-link" href="#" @click="changePage(pageNum)">{{ pageNum }}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "PaginationNav",
        props: {
            page: {
                type: Number
            },
            totalPages: {
                type: Number
            }
        },
        methods: {
            changePage(pageNum) {
                this.$emit('change-page', pageNum)
            }
        }
    }
</script>

<style scoped>

</style>