<template>
    <div id="circle" :class=" active== 'inactive' ? 'inactive' : 'active'">
        VOR {{this.timer}} SEK
    </div>
</template>


<script>
    export default {
        name: 'Countdown',
        data() {
            return {
                timer: this.startTime
            }
        },
        props: {
            startTime: Number,
            active: String,
        },
        methods: {
            countDownTimer () {
                setTimeout(() => {
                    this.timer += 1
                    this.countDownTimer()
                    this.triggerReload()
                }, 1000)
            },
            triggerReload() {
                if (this.timer == 90) {
                    this.$parent.reload()
                }
            }
            
        },
        created () {
            this.countDownTimer()
        }


    }

</script>

<style scoped>
#circle {
        width: 80%;
        padding-left: 2%;
        padding-right: 2%;
        line-height: 40px;
        border-radius: 20px;
        font-size: 20px;
        text-align: center;
        align-content: center;
        background-color: #fff;
        margin: 0 auto;
}

.active {
    color: #829460;
}
.inactive {
    color: rgb(241, 0, 0);
}
</style>
