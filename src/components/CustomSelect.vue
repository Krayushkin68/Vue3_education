<template>
    <select class="form-select mb-3" :modelValue="modelValue" @change="changeOptions">
        <option selected disabled>Выберите из списка</option>
        <option v-for="option in options" :value="option.value" :key="option.value">
            {{ option.name }}
        </option>
    </select>
</template>

<script>
    export default {
        name: "CustomSelect",
        props: {
            modelValue: {
                type: String
            },
            options: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            changeOptions(event) {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style scoped>

</style>