<template>
    <div v-if="Carregar" class="fundo-loading">
      <q-spinner class="loading" size="160px" />
    </div>
    <div class="chart" v-else>
      <div class="text-chart">
        {{ titulo }}
      </div>
      <br />
      <div class="chart-container">
        <apexcharts
          width="1000"
          height="300"
          type="bar"
          :options="chartOptions"
          :series="series"
          @dataPointSelection="dataPointSelection"
        ></apexcharts>
      </div>
    </div>
  </template>

  <script>
  import VueApexCharts from "vue3-apexcharts";
  import { defineComponent, ref } from 'vue'

  export default {
    name: "StackChart",
    components: {
      apexcharts: VueApexCharts,
    },
    props: {
      titulo: {
        type: String,
        required: true,
      },
      anoInicial: {
        type: String,
        required: true,
      },
      anoFinal: {
        type: String,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      },
    },
    methods: {
      transformData(rawData) {
        let series = [];
        const qualis = ref(["A1", "A2", "A3", "A4"])
        const anos = ref([])
        for (let i = this.anoInicial; i <= this.anoFinal; i++) {
          anos.value.push(i);
        }

        let hashObj = new Map();
        for (let i = 0; i < qualis.value.length; i++) {
          hashObj.set(qualis.value[i], Array(this.anoFinal-this.anoInicial).fill(0));
        }
        for (let i = 0; i < rawData.length; i++) {
          let arr = hashObj.get(qualis.value[i]);
          for (let j = 0; j < anos.value.length; j++) {
            arr[j] = rawData[i][j];
          }
        }
        for (let [key, value] of hashObj) {
          series.push({
            name: key,
            data: value,
          });
        }
        this.chartOptions.xaxis.categories = anos.value;
        console.log("a",this.chartOptions.xaxis.categories)
        this.series = series;
      },

      dataPointSelection(event, chartContext, config) {
        const mesReferencia = config.dataPointIndex + 1;
        const qtdCargo = chartContext.opts.series[config.seriesIndex].name;
        const valor =
          chartContext.opts.series[config.seriesIndex].data[
            config.dataPointIndex
          ];
      },
    },
    watch: {
      data: {
        handler(newVal, oldVal) {
          this.transformData(newVal);
        },
        immediate: true,
      },
    },
    data: function () {
      return {
        series: [],
        chartOptions: {
          chart: {
            type: "bar",
            height: "auto",
            stacked: true,
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: true,
            },
          },
          legend: {
            position: "right",
            textAnchor: "start",
          },
          xaxis: {
            categories: [],
          },
          tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
              const ano = w.config.xaxis.categories[dataPointIndex];
              const qualis = w.config.series[seriesIndex].name;
              const quantidade = w.config.series[seriesIndex].data[dataPointIndex];
              const color = w.globals.colors[seriesIndex];
              return `
                              <div class="custom-tooltip">
                                  <span>Ano: ${ano} </span><br/>
                                  <span>${qualis}: ${quantidade}</span><br/>
                              </div>
                              `;
            },
          },
        },
        Carregar: false,
      };
    },
  };
  </script>

  <style>
  .fundo-loading {
    background-color: rgb(244, 244, 244);
    min-height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .yaxis-chart {
  width: 15%;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  }

  .loading {
    color: var(--main-color);
  }
  </style>
