<template>
  <q-page class="q-pa-sm" id="page">
    <div class="container">
      <div >
        <div class="title-page">Docente: {{docente}}</div>
        <div class="title-page">Filtros</div>
        <div>
          <div class="filtros">
            <div class="filtro-conteudo">
              <div>Ano Inicial:</div>
                <q-input
                  dense
                  outlined
                  type="number"
                  v-model="ano_inicial"
                  :display-value="ano_inicial"
                />
            </div>
            <div class="filtro-conteudo">
              <div>Ano Final:</div>
                <q-input
                  dense
                  outlined
                  type="number"
                  v-model="ano_final"
                  :display-value="ano_final"
                />
            </div>
            <div class="botao-filtrar">
              <q-btn color="purple" label="Filtrar" @click="filtrar"/>
            </div>
          </div>
        </div>
      </div>
      <div v-if="carregar" class="fundo-loading">
        <q-spinner class="loading" size="160px" />
      </div>
      <div v-if="!carregar">
        <div class="title-page">Indicadores Capes</div>
        <div class="indicadores">
          <IndicadoresCapes class="indicador" squareColor="grey" firstLine="Total Produções" :secondLine="totalProducoes"/>
          <IndicadoresCapes class="indicador" squareColor="cornflowerblue" firstLine="I Geral" :secondLine="indiceGeral"/>
          <IndicadoresCapes class="indicador" squareColor="darkseagreen" firstLine="I Restrito" :secondLine="indiceRest"/>
          <IndicadoresCapes class="indicador" squareColor="khaki" firstLine="I Não Restrito" :secondLine="indiceNRest"/>
        </div>
        <div class="chart">
          <StackChart titulo="Produção em Periódicos vs Qualis" :data="dataGrafico1" :ano-final="ano_final" :ano-inicial="ano_inicial"></StackChart>
        </div>
        <div class="chart">
          <StackChart titulo="Produção em Congressos vs Qualis" :data="dataGrafico2" :ano-final="ano_final" :ano-inicial="ano_inicial"></StackChart>
        </div>
        <div>
          <TableComponent
            titulo="Orientações"
            :rows="rowsOrientacao"
            :columns="columnsOrientacao"
            :filter_columns="filter_columns"
            non_final_table="True"
            table_height="1000"
          />
        </div>
        <div>
          <TableComponent
            titulo="Artigos"
            :rows="rowsArtigos"
            :columns="columnsArtigos"
            :filter_columns="filter_columns"
            non_final_table="True"
            table_height="1000"
          />
        </div>
        <div>
          <TableComponent
            titulo="Técnicas"
            :rows="rowsTecnicas"
            :columns="columnsTecnicas"
            :filter_columns="filter_columns"
            non_final_table="True"
            table_height="1000"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import TableComponent from '../components/TableComponent.vue'
import StackChart from '../components/StackChart.vue'
import IndicadoresCapes from '../components/Indicadores.vue'
import axios from "axios";
import { transformData } from 'src/utils/dados';

export default defineComponent({
  name: 'DocentePage',
  components: {
    TableComponent,
    StackChart,
    IndicadoresCapes
  },
  setup(){
    const docente = localStorage.getItem("docenteNome")
    const idDocente = localStorage.getItem("docenteId")
    const rowsOrientacao = ref([])
    const rowsArtigos = ref([])
    const rowsTecnicas = ref([])
    const columnsOrientacao = [
          {
            name: "discente",
            label: "Discente",
            field: "discente",
            sortable: true,
            align: "left",
          },
          {
            name: "titulo",
            label: "Título",
            field: "titulo",
            sortable: true,
            align: "left",
          },
          {
            name: "tipo",
            label: "Tipo",
            field: "tipo",
            sortable: true,
            align: "left",
          },
          {
            name: "ano",
            label: "Ano",
            field: "ano",
            sortable: true,
            align: "left",
          }
    ]
    const columnsArtigos = [
      {
        name: "titulo",
        label: "Título",
        field: "titulo",
        sortable: true,
        align: "left",
      },
      {
        name: "local",
        label: "Local",
        field: "local",
        sortable: true,
        align: "left",
      },
      {
        name: "tipo",
        label: "Tipo",
        field: "tipo",
        sortable: true,
        align: "left",
      },
      {
        name: "qualis",
        label: "Qualis",
        field: "qualis",
        sortable: true,
        align: "left",
      },
      {
        name: "ano",
        label: "Ano",
        field: "ano",
        sortable: true,
        align: "left",
      }
    ]

    const columnsTecnicas = [
      //mesmo de cima para titulo, tipo e ano
      {
        name: "titulo",
        label: "Título",
        field: "titulo",
        sortable: true,
        align: "left",
      },
      {
        name: "tipo",
        label: "Tipo",
        field: "tipo",
        sortable: true,
        align: "left",
      },
      {
        name: "ano",
        label: "Ano",
        field: "ano",
        sortable: true,
        align: "left",
      }
    ]

    const filter_columns = [1,2,3]

    const ano_inicial = ref(2019)
    const ano_final = ref(2023)
    const totalProducoes = ref(0)
    const indiceGeral = ref(0)
    const indiceNRest = ref(0)
    const indiceRest = ref(0)

    const carregar = ref(true)

    const dataGrafico1 = ref([])
    const dataGrafico2 = ref([])

    const get_data = () => {
      let url_qualis_periodico = "http://localhost:8081/api/v1/qualis/periodicos/"+idDocente+"/"+ano_inicial.value+"/"+ano_final.value;
      axios
            .get( url_qualis_periodico)
            .then((response) => {
              const rawData = response.data;
              dataGrafico1.value = rawData;
            })
            .catch((error) => {
              console.error(error);
              carregar.value = false
            });
      let url_qualis_congresso = "http://localhost:8081/api/v1/qualis/congressos/"+idDocente+"/"+ano_inicial.value+"/"+ano_final.value;
      axios
            .get( url_qualis_congresso)
            .then((response) => {
              const rawData = response.data;
              dataGrafico2.value = rawData;
            })
            .catch((error) => {
              console.error(error);
              carregar.value = false
            });

      let url_orientacao_docente = "http://localhost:8081/api/docente/obter_orientacoes/"+idDocente+"/"+ano_inicial.value+"/"+ano_final.value;
      axios
            .get(url_orientacao_docente)
            .then((response) => {
              const rawData = response.data;
              const dataRows = ref([])
              rawData.forEach(i =>{
                let aux = []
                aux.push(i.discente)
                aux.push(i.titulo)
                aux.push(i.tipo)
                aux.push(i.ano)
                dataRows.value.push(aux)
              })
              rowsOrientacao.value = transformData(dataRows.value,columnsOrientacao)
              carregar.value = false
            })
            .catch((error) => {
              console.error(error);
              carregar.value = false
            });

      let url_artigos_docente = "http://localhost:8081/api/docente/obter_producoes/"+idDocente+"/"+ano_inicial.value+"/"+ano_final.value;
      axios
            .get(url_artigos_docente)
            .then((response) => {
              const rawData = response.data;
              const dataRows = ref([])
              rawData.forEach(i =>{
                let aux = []
                aux.push(i.titulo)
                aux.push(i.nomeLocal)
                aux.push(i.tipo)
                aux.push(i.qualis)
                aux.push(i.ano)
                dataRows.value.push(aux)
              })
              rowsArtigos.value = transformData(dataRows.value,columnsArtigos)
            })
            .catch((error) => {
              console.error(error);
              carregar.value = false
            });

      let url_tecnicas_docente = "http://localhost:8081/api/docente/obter_tecnicas/"+idDocente+"/"+ano_inicial.value+"/"+ano_final.value;
      axios
            .get(url_tecnicas_docente)
            .then((response) => {
              const rawData = response.data;
              const dataRows = ref([])
              rawData.forEach(i =>{
                let aux = []
                aux.push(i.titulo)
                aux.push(i.tipo)
                aux.push(i.ano)
                dataRows.value.push(aux)
              })
              rowsTecnicas.value = transformData(dataRows.value,columnsTecnicas)
            })
            .catch((error) => {
              console.error(error);
              carregar.value = false
            });

      let url_indicadores = "http://localhost:8081/api/v1/qualis/indice_docente/"+idDocente+"/"+ano_inicial.value+"/"+ano_final.value;
      axios
            .get(url_indicadores)
            .then((response) => {
              const rawData = response.data;
              indiceGeral.value = rawData.indice.indiceGeral.toFixed(2)
              indiceNRest.value = rawData.indice.indiceNRest.toFixed(2)
              indiceRest.value = rawData.indice.indiceRest.toFixed(2)
              totalProducoes.value = rawData.producoes.length.toFixed(2)
            })
            .catch((error) => {
              console.error(error);
              carregar.value = false
            });

    }
      

    const filtrar = () => {
        carregar.value = true
        get_data()
    }

    onMounted(() => {
        carregar.value = true
        get_data()
      })

    return {
      filter_columns,
      ano_inicial,
      ano_final,
      docente,
      idDocente,
      totalProducoes,
      indiceGeral,
      indiceNRest,
      indiceRest,
      dataGrafico1,
      dataGrafico2,
      rowsOrientacao,
      rowsArtigos,
      rowsTecnicas,
      columnsOrientacao,
      columnsArtigos,
      columnsTecnicas,
      carregar,
      filtrar
    }

  },
})
</script>

<style>
.title-page {
  font-size: 1.5em;
  margin-top: 1em;
  margin-bottom: 1em;
}
.container {
    width: 100%;
    padding-right: 100px;
    padding-left: 100px;
  }
.filtros {
  display: flex;
  flex-direction: row;
}
.filtro-conteudo {
  width: 15vw;
  height: auto;
}
.chart{
  margin-top: 2em;
  margin-bottom: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.indicadores{
  display: flex;
  flex-direction: row;
}
.indicador{
  margin-right: 2em;
}
.botao-filtrar{
  margin-top: 1.55em;
  margin-bottom: 2em;
  width: 10vw;
  height: auto;
  margin-right: 2em;
}
.fundo-loading {
    background-color: rgb(250, 238, 255);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
  }
  
  .loading {
    color: var(--main-color);
  }
</style>

