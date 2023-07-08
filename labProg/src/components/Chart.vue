<template>
    <div v-if="Carregar" class="fundo-loading">
      <q-spinner class="loading" size="160px" />
    </div>
    <div class="chart" v-else>
      <div class="text-chart">
        Credores que Acumulam a Mesma Quantidade de Cargos
      </div>
      <br />
      <div class="chart-container">
        <div class="yaxis-chart">Cargos Acumulados</div>
        <apexcharts
          width="800"
          :height="'100%'"
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
  
  export default {
    name: "STColumnChart",
    components: {
      apexcharts: VueApexCharts,
    },
    props: {
      ano: {
        type: String,
        required: true,
      },
    },
    methods: {
      loadData(ano) {
        let api_url =
          process.env.API_URL + "acumuloCargos/acumulo_por_credor/" + `${ano}`;
        this.$axios
          .get(api_url)
          .then((response) => {
            const rawData = response.data;
            this.transformData(rawData);
            this.Carregar = false;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      transformData(rawData) {
        let series = [];
  
        let hashObj = new Map();
        for (let i = 0; i < rawData.length; i++) {
          hashObj.set(rawData[i].qtdAcumulosMes, Array(12).fill(0));
        }
        for (let i = 0; i < rawData.length; i++) {
          let arr = hashObj.get(rawData[i].qtdAcumulosMes);
          arr[rawData[i].mes - 1] = rawData[i].qtdCredoresAcumulo;
          hashObj.set(rawData[i].qtdAcumulosMes, arr);
        }
        for (let [key, value] of hashObj) {
          series.push({
            name: key,
            data: value,
          });
        }
  
        this.series = series;
      },
  
      dataPointSelection(event, chartContext, config) {
        const mesReferencia = config.dataPointIndex + 1;
        const qtdCargo = chartContext.opts.series[config.seriesIndex].name;
        const valor =
          chartContext.opts.series[config.seriesIndex].data[
            config.dataPointIndex
          ];
        window.location.href = "/#/relatorios/acumulo-cargos-ente";
      },
    },
    watch: {
      ano: {
        handler(newVal, oldVal) {
          this.Carregar = true;
          this.loadData(newVal);
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
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            title: {
              text: "Meses",
              style: {
                fontSize: "14px",
                fontWeight: 600,
                color: "#333",
              },
            },
          },
          tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
              const mesReferencia = dataPointIndex + 1;
              const qtdCargo = w.config.series[seriesIndex].name;
              const valor = w.config.series[seriesIndex].data[dataPointIndex];
              return `
                              <div class="custom-tooltip">
                                  <span>Mês: ${mesReferencia} </span><br/>
                                  <span>Quantidade de cargos acumulados: ${qtdCargo}</span><br/>
                                  <span>Credores em Situação de Acúmulo: ${valor} </span>
                              </div>
                              `;
            },
          },
        },
        Carregar: true,
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
  
  .loading {
    color: var(--main-color);
  }
  </style>
  