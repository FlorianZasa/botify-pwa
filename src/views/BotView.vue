<template>
    <div class="container">
        <div class="botview">
            <div class="botview-header">
                <div class="page-title buttonGrup">
                <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Übersicht</a></li>
                        <li class="breadcrumb-item activated" aria-current="page">Botview {{$route.params.name}}</li>
                    </ol>
                </nav>
            </div>
                <div class="botview-hdg">
                    <h2 class="page-title">Botview {{$route.params.name}}</h2>
                <h3 :class="is_active(get_seconds(botData.last_state))">{{counter}} SEK</h3>
                </div>
            </div>
            <div class="charts">
                <BotStartLabelVue :started="botData.started" />
                <apexchart width="380" type="bar" :options="lineChartOptions" :series="series" ref="linechart" class="chart"></apexchart>
                <BotNeustartsLabelVue :restarts="botData.automated_restarts" />
            </div>
    <div class="botview-content">
        <table style="border-collapse: collapse; width: 100%;">
        <tbody>
            <tr>
                <td class="header">Status:</td>
                <td id="table_content" :class="is_active(get_seconds(botData.last_state))">{{botData.last_state}}</td>
            </tr>
            <tr>
                <td class="header">Alle Fehler bisher:</td>
                <td id="table_content">    
                    <apexchart width="300" type="pie" :options="pieChartOptions" :series="errorSeries" ref="piechart"></apexchart>
                </td>
            </tr>
            <tr>
                <td class="header">Status:</td>
                <td id="table_content state" style="padding-left: 6rem">{{botData.status}}</td>
            </tr>
            <tr>
                <td class="header">Log:</td>
                <td id="table_content">{{botData.log}}</td>
            </tr>
            <tr>
                <td class="header">Mehr Infos</td>
                <td id="table_content">{{botData.description}}</td>
            </tr>
        </tbody>
      </table> 
    </div>  
    </div>
    </div>
</template>


<script>
import firebase from "../db";
import BotStartLabelVue from "../components/BotStartLabel.vue";
import BotNeustartsLabelVue from "../components/BotNeustartsLabel.vue";
const db = firebase.collection("bots");
export default {
    name: 'Botview',
    props: {
        name: String,
    },
    components: {
        BotStartLabelVue,
        BotNeustartsLabelVue
    },
    data() {
        return {
            botData: {},
            counter: 0,
            startTime: 6,
            pieData: {},
            
            errorSeries: [],
            
            pieChartOptions: {
                chart: {
                    width: 400,
                    type: 'pie',
                },
                labels: [],
                responsive: [{
                breakpoint: 400,
                options: {
                    chart: {
                    width: 400
                    },
                    legend: {
                    position: 'bottom'
                    }
                }
                }],
            },
            series: [{
                name: "Ausfälle pro Stunde",
                data: []
            }],
            lineChartOptions: {
                chart: {
                    type: 'area',
                    height: 200,
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: true
                },
                title: {
                    text: 'Ausfälle von ' + this.name,
                    align: 'left'
                },
                subtitle: {
                    text: 'pro Stunde',
                    align: 'left'
                },
                labels: [],
                xaxis: {
                    type: 'string',
                },
                yaxis: {
                    opposite: true
                },
                legend: {
                    horizontalAlign: 'left'
                },
                colors: ['#F96666'],
          },
        }
    },
    methods: {
        readBot() {
            try {
                db
                .doc(this.name)
                .onSnapshot((snapshot) => {
                this.botData = snapshot.data()
                this.counter = this.get_seconds(this.botData.last_state)

                this.add_data_to_line_serie()
                this.pieData = this.get_different_errors(this.botData.errors)
                return this.botData
            });
 
            } catch {
                return this.botData
            }
        },

        get_error_per_hour(hours) {
            let amount = 0
            for(let i = 0; i < this.botData.errors.length; i++) {
                let time = this.botData.errors[i].error_time
                let hour = time.substring(0,2)
                if (hour == hours) {
                    amount += 1
                }
            }
            return amount
        },

        get_now_hour(){
            return new Date().getHours()  
        },

        add_data_to_line_serie() {
            let lineData = []
            let lineLabels = []

            for(let time = this.startTime; time <= this.get_now_hour(); time++) {
                if (time) {
                    if (!lineLabels.includes(time)) {
                        lineLabels.push(time + " Uhr")
                    }
                    lineData.push(this.get_error_per_hour(time))
                } else {
                    console.log("FEHLER BEI: " + time)
                }        
            }
            this.series[0].data = lineData
            this.lineChartOptions.labels = lineLabels

            this.lineChartOptions = {
                labels: lineLabels,
            };

        },

        get_different_errors(error_dict_lst) {
            var error_list = []
            const counts = {};
            for(var i = 0; i < error_dict_lst.length; i++) {
                error_list.push(error_dict_lst[i]["error_msg"])
            }

            var error_set = new Set(error_list)
            error_set = Array.from(error_set);

            error_list.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });

            for(var y =0; y <error_set.length; y++) {
                this.errorSeries.push(counts[error_set[y]])
                this.pieChartOptions.labels.push(error_set[y])
            }
            return counts
        },
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
                } catch (ex) {
                    return 0
                }
        },

        is_active(seconds) {
        if (seconds > 90) {
            return "inactive"
        } else {
            return "active"
        }
        
        },
        countDownTimer () {
                setTimeout(() => {
                    this.counter += 1
                    this.countDownTimer()
                }, 1000)
            }
    },
    created () {
        this.countDownTimer()
    },
    beforeMount(){
        this.readBot()
    },
}
</script>

<style scoped>

    .page-title {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .botview-header {
        background-color: #EEEEEE;
        padding: 1rem;
        border-radius: 0px 0px 18px 18px;
    }

    .botview-hdg {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .botview-content {
        display: flex;
        flex-direction: row;
        text-align: left;
        overflow: scroll;

        margin-top: 5%;
        margin-bottom: 5%
    }

    table {
        background-color: white;
        border-radius: 18px;
        width: 100%
    }

    table td {
        padding: 2%;
        width: 20%;
    }

    .header {
        padding-right: 10%;
        font-weight: bold;
        position: absolute;
        background: white;
    }

    #table_content {
        padding-left: 6rem;
    }
    .active {
        color: #829460;
    }

    .inactive {
        color: #F96666;
    }
    
    .activated {
        font-weight: bold;
    }

    #state {
        color: rgb(76, 92, 158)
    }

    .charts {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items:center;
        justify-content: center;
        padding-top: 20px;
        gap: 2rem
    }

    .chart {
        margin: 4rem;
    }





    @media only screen and (max-width: 1000px) {
        .botview {
            width: 95%;
            justify-content: center;
            margin: auto
        }
    }


</style>


