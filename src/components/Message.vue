<template>
        <div :id="type" class="message-wrapper">
            <div class="message-close-btn" @click="closeMessage()">X</div>
            <div class="message-header">
                <h3>{{title}}</h3>
            </div>
            <div class="message-content">
                {{message}}
            </div>
        </div>
</template>

<script>
    export default {
        props: {
            title: String,
            message: String,
            type: String
        },
        data() {
            return {

            }
        },
        methods: {
            closeMessage() {
                this.$emit("closed")
            }
        }
    }
</script>

<style scoped>

    .message-wrapper {
        padding: 2%;
        margin:  2%;
        border-radius: 18px;
    }

    .message-close-btn {
        position: absolute;
        margin-left: 90%;
    }

    .message-close-btn:hover {
        cursor: pointer;
        color:#fff
    }

    #alert {
        background-color: #F96666;
    }

</style>