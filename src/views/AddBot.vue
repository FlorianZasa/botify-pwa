<template>
    <div class="container">
        <div class="addbot-header">
            <h2 class="page-title">Füge einen Bot hinzu:</h2>
        </div>
    <div class="addbot-content container">
        <div class="form text-center">
            <div class="form-floating mb-4">
                <input type="text" class="form-control" id="botName" placeholder="Name">
                <label for="botName" class="form-label">Name</label>
            </div>
            <div class="form-floating mb-4">
                <input type="text" class="form-control" id="botId" placeholder="FZ***">
                <label for="botId" class="form-label">FZ***</label>
            </div>
            <div class="form-floating mb-4">
                <textarea class="form-control textfield" placeholder="Dies ist eine Beschreibung..." id="floatingTextarea" style="height: 100px"></textarea>
                <label for="floatingTextarea">Dies ist eine Beschreibung...</label>
            </div>
            <button type="button" class="form-button" @click="showMessageFunc()">Speichern</button>
        </div>
    </div>
    <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="showMessage">
        <strong>Ups! </strong>Diese Funktion steht noch nicht zur Verfügung!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="hideMessageFunc()"></button>
    </div>

</div>
    
</template>

<script>

    export default {
        name: 'AddBot',
        components: {},
        data() {
            return {
                showMessage: false,
            }
        },
        methods: {
            showMessageFunc() {
                this.showMessage = true
            },
            hideMessageFunc() {
                this.showMessage = false
            }
        },
    }

</script>

<style scoped>
    /* we will explain what these classes do next! */
    .v-enter-active,
    .v-leave-active {
    transition: opacity 1s ease;
    }

    .v-enter-from,
    .v-leave-to {
    opacity: 0;
    }

    .addbot-header {
        background-color: #EEEEEE;
    padding: 1rem;
    border-radius: 0px 0px 18px 18px;
    }

    
.addbot-content {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 5%;
        margin-bottom: 5%
}

    
    input.textfield  {
        width: 30%;
        height: 2rem;
        border: none;
        border-radius: 18px;
        margin: 1%
    }

    .form {
        margin-bottom: 50px;
        width: 60%;
    }

    .form-button {
        width: 20rem;
        background-color: #829460;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
        border-radius: 18px;
    }

    .addbot-message-container {
        width: 100%;
    }


    @media only screen and (max-width: 1000px) {
        input.textfield  {
            width: 85%;
            height: 2rem;
            border: none;
            border-radius: 18px;
            margin: 2%
        }

    .form-button {
        margin: 10%;
        width: 60%;
        height: 4rem;
        background-color: #829460;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        border-radius: 18px;
    }
}



</style>