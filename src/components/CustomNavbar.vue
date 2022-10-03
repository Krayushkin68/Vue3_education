<template>
    <nav class="navbar navbar-light bg-light navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand" href="/">MyApp</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent"
                    aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse mx-5" id="navContent">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link" :class="{active: isActive('/')}">
                            Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/about" class="nav-link" :class="{active: isActive('/about')}">
                            About
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "CustomNavbar",
        methods: {
            isActive(path) {
                return this.$route.path === path
            }
        }
    }
</script>

<style scoped>

</style>