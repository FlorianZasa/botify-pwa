<template>
  
  <div id="card" :class="is_active(componentData.last_state)" @click="open_details(componentData.name)">
    <div class="name">{{componentData.id}} / {{componentData.name}}</div>
    <div class="last_state">{{componentData.last_state}}</div>
    <div class="status">{{componentData.status}}</div>
    <Countdown :startTime="get_seconds(componentData.last_state)" :active="is_active(componentData.last_state)" />
  </div>

</template>

<script>

import Countdown from './BotCountdown.vue'
export default {
  name: 'HelloWorld',
  components: {
    Countdown,
  },
  props: {
      data: {
        type: Object
      } 
    },
    data() {
      return {
        componentData: this.data,
      }
    },
    methods: {
      get_seconds(time) {
        try {
          var today = new Date();
          const dt_sections= time.split(',');
          const date_sections = dt_sections[0].split('.')
          var day = date_sections[0].trim()
          var month = date_sections[1].trim()
          var year = date_sections[2].trim()
          const time_sections = dt_sections[1].split(':');
          var hour = time_sections[0].trim()
          var minute = time_sections[1].trim()
          var second = time_sections[2].trim()

          // 01.01.2022, 00:00:00
          var ls_dt = new Date(year, parseInt(month)-1, day, hour, minute, second, 0);

          var dif = ls_dt.getTime() - today.getTime();
          var seconds_dif = dif / 1000;
          var seconds = Math.abs(Math.round(seconds_dif));
          return seconds
          } catch {
            return 0
          }
      },

    is_active(time) {
      var time_str = time
      var seconds = this.get_seconds(time_str)
      if (seconds > 90) {
        return "inactive"
      } else {
        return "active"
      }
      
    },
    open_details(name) {
      this.$router.push({ name: 'BotView', params: {name: name}})
    },
    reload() {
      this.$parent.readBots()
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#card {
  width: 40%;
  min-width: 120px;
  margin: 1em;
  padding: 1em;
  border-radius: 18px;
  box-shadow: 0px 0px 10px rgb(188, 188, 188);
  display: grid;
  
}

.name, .last_state, .status {
  padding: 1rem;
}

.active {
  background: #829460;
}

.active:hover {
  background: #b9d18c;
}


.inactive {
  background: #F96666;
}

.inactive:hover {
  background: #fa8787;
}

.name {
  font-weight: bold;
  font-size: large;
}


.status {
  color: rgb(76, 92, 158)
}


/* If the screen size is 600px wide or less, hide the element */
@media only screen and (max-width: 1000px) {
  #card {
  width: 100%;
  
}
}

</style>
