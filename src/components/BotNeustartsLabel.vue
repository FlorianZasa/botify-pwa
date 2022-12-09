<template>
    <div class="canvas">
        <b>{{this.restarts}}</b> Neustarts
    </div>
</template>

<script>

export default {
    props: {
        restarts: String
    }
}
</script>

<style scoped>
.canvas {
    background-color: #F96666;
    padding: 1rem;
    border-radius: 3rem;
    overflow: hidden;
    max-width: 200px;
    text-align: center;
    color: white
}
</style>

