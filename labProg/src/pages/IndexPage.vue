<template>
  <q-page class="page q-pa-sm" id="page">
    <div class="container">
      <div >
        <div class="title-page">Programa</div>
        <div class="title-page">Filtros</div>
        <div>
          <div class="filtros">
            <div class="filtros">
              <div class="filtro-conteudo">
                <div>Programa:</div>
                  <q-select
                    dense
                    outlined
                    v-model="programa"
                    :options="programa_select"
                    :display-value="programa"
                  />
              </div>
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
        <div>
          <div v-if="carregar" class="fundo-loading">
            <q-spinner class="loading" size="160px" />
          </div>
          <div class="chart" v-if="!carregar">
            <StackChart :data="data" :ano-final="ano_final" :ano-inicial="ano_inicial"></StackChart>
          </div>
        </div>
        <div>
          <div v-if="carregar" class="fundo-loading">
            <q-spinner class="loading" size="160px" />
          </div>
          <div v-if="!carregar">
            <TableComponent
              :rows="rows"
              :columns="columns"
              :filter_columns="filter_columns"
              non_final_table="True"
              table_height="1000"
              @detalhar="detalhar"
            />
          </div>

        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import axios from "axios";
import TableComponent from '../components/TableComponent.vue'
import StackChart from '../components/StackChart.vue'
import IndicadoresCapes from '../components/Indicadores.vue'
import { transformData } from 'src/utils/dados';

export default defineComponent({
  name: 'IndexPage',
  components: {
    TableComponent,
    StackChart,
    IndicadoresCapes,
  },
  setup(){
    const columns = [
          {
            name: "docente",
            label: "Docente",
            field: "docente",
            sortable: true,
            align: "left",
          },
          {
            name: "A1",
            label: "A1",
            field: "A1",
            sortable: true,
            align: "left",
          },
          {
            name: "A2",
            label: "A2",
            field: "A2",
            sortable: true,
            align: "left",
          },
          {
            name: "A3",
            label: "A3",
            field: "A3",
            sortable: true,
            align: "left",
          },
          {
            name: "A4",
            label: "A4",
            field: "A4",
            sortable: true,
            align: "left",
          },
          {
            name: "B1",
            label: "B1",
            field: "B1",
            sortable: true,
            align: "left",
          },
          {
            name: "B2",
            label: "B2",
            field: "B2",
            sortable: true,
            align: "left",
          },
          {
            name: "B3",
            label: "B3",
            field: "B3",
            sortable: true,
            align: "left",
          },
          {
            name: "B4",
            label: "B4",
            field: "B4",
            sortable: true,
            align: "left",
          },
          {
            name: "C",
            label: "C",
            field: "C",
            sortable: true,
            align: "left",
          },
    ]
    const filter_columns = [1,2,3]

    const ano_inicial = ref(2019)
    const ano_final = ref(2023)
    const programa = ref("PPGCC")
    const programa_select = ref(["PPGCC", "DCCMAPI"])

    const data = ref([])
    const rows = ref([])
    const carregar = ref(true)
    const docentes = ref([])
    const totalProducoes = ref(0)
    const indiceGeral = ref(0)
    const indiceNRest = ref(0)
    const indiceRest = ref(0)

    const get_data = () => {
      let url_qualis_grafico = "http://localhost:8081/api/v1/qualis/"+15+"/"+ano_inicial.value+"/"+ano_final.value;
      axios
            .get( url_qualis_grafico)
            .then((response) => {
              const rawData = response.data;
              data.value = rawData;
            })
            .catch((error) => {
              console.error(error);
              carregar.value = false
            });

      let url_producao_docente = "http://localhost:8081/api/docente/obter_producoes/"+ano_inicial.value+"/"+ano_final.value;
      axios
            .get(url_producao_docente)
            .then((response) => {
              const rawData = response.data;
              const dataRows = ref([])
              const docentesList = ref([])
              rawData.forEach(i =>{
                let aux = []
                let auxDocente = []
                aux.push(i.docente.nome)
                aux = aux.concat(i.qualis)
                dataRows.value.push(aux)
                auxDocente.push({"id":i.docente.id, "nome":i.docente.nome})
                docentesList.value.push(auxDocente)
              })
              rows.value = transformData(dataRows.value,columns)
              docentes.value = docentesList.value
              carregar.value = false
            })
            .catch((error) => {
              console.error(error);
              carregar.value = false
            });
      let url_indicadores = "http://localhost:8081/api/v1/qualis/indice/"+15+"/"+ano_inicial.value+"/"+ano_final.value;
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

    const detalhar = (row) => {
      const searchIndex = docentes.value.findIndex((docente) => docente[0].nome==row.docente);
      localStorage.setItem("docenteId", docentes.value[searchIndex][0].id);
      localStorage.setItem("docenteNome", docentes.value[searchIndex][0].nome);
      window.location.href = "/#/docente";
    }

    onMounted(() => {
        carregar.value = true
        get_data()
      })

    return {
      rows,
      columns,
      filter_columns,
      ano_inicial,
      ano_final,
      programa,
      programa_select,
      data,
      carregar,
      docentes,
      totalProducoes,
      indiceGeral,
      indiceNRest,
      indiceRest,
      get_data,
      filtrar,
      detalhar,
    }

  },
})
</script>

<style>
.page{
  background-color: rgb(251, 240, 255);
}
.title-page {
  font-size: 1.5em;
  margin-top: 1em;
  margin-bottom: 0.5em;
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
  margin-right: 2em;
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
