<template>
  <div class="container home-wrapper ">
    <div class="home-header">
      <h2 class="page-title">Bot Übersicht:</h2>
      <div v-if="showFilter">
        <div class="toggle-filter-btn"
          @click="toggleFilter()">
          <i class="bi bi-caret-up-fill"></i>
          Filter
        </div>
        <div class="input-group mb-3 home-filter">
          <input type="text" class="form-control" id="botId" placeholder="FZ***">
        <button class="btn btn-outline-secondary" type="button">Filter</button>
      </div>
      </div>
      <div v-else>
        <div class="toggle-filter-btn"
          @click="toggleFilter()">
          <i class="bi bi-caret-down-fill"></i>
          Filter          
        </div>
      </div>
      
    </div>
    <div class="home-content">
      <BotCard v-for="bot in botData" :key="bot.id" :data=bot />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BotCard from '@/components/BotCard.vue'
import firebase from "../db";

const db = firebase.collection("bots");

export default {
  data() {
    return {
      showFilter: false,
      botData: [],
    }
  },
  name: 'Home',
  components: {
    BotCard
  },
  methods: {
    remove_all_bots() {
      const cards = document.querySelectorAll('#card');
      cards.forEach(card => {
        card.remove();
      });
    },
    readBots() {
      this.botData = []
      db
      .onSnapshot((querySnapshot) => {
        this.remove_all_bots()
          querySnapshot.forEach((doc) => {
            this.botData.push(
              doc.data()
            );
          });
          this.botData.sort()
        return this.botData.reverse()

        //   return this.botData
        })
    },
    toggleFilter() {
      if (this.showFilter == false) {
        this.showFilter = true
      } else {
        this.showFilter = false
      }
    }
  },
  beforeMount(){
    this.readBots()
 },
}
</script>
<style scoped>
  .home-wrapper {
    width: 100%;
    height: 100%
  }
  .home-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    margin-top: 5%;
    margin-bottom: 5%;
  }

  .filter {
    width: 30%;
    height: 2rem;
    border: none;
    border-radius: 18px;
    margin: 1%
  }

  .home-filter {
    padding: 20px;
    
  }

  .home-header {
    background-color: #EEEEEE;
    padding: 1rem;
    border-radius: 0px 0px 18px 18px;
  }

  .home-filter button {
    height: 2rem;
    background-color: #829460;
    color: #fff;
    border-radius: 18px;
  }

  .input-group {
    align-items: center;
  }

  .toggle-filter-btn {
    color: rgb(76, 92, 158)
  }

  .toggle-filter-btn:hover {
    color: rgb(110, 132, 224);
    cursor: pointer;
  }
  

  @media only screen and (max-width: 1000px) {
    .filter {
      width: 70%;
      height: 25px;
      font-size: 18px;
    }

}


</style>
