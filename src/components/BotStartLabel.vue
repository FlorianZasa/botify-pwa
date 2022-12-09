<template>
    <div class="canvas">
        Gestartet am <b>{{this.started}}</b>
    </div>
</template>

<script>
export default {
    props: {
        started: String
    }
}
</script>

<style scoped>
.canvas {
    background-color: rgb(173, 189, 241);
    padding: 1rem;
    border-radius: 3rem;
    overflow: hidden;
    max-width: 200px;
    text-align: center;
}
</style>

