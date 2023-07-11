<template>
  <q-page class="q-pa-sm" id="page">
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
                    v-model="ano_inicial"
                    :display-value="ano_inicial"
                  />
              </div>
              <div class="filtro-conteudo">
                <div>Ano Final:</div>
                  <q-input
                    dense
                    outlined
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
          <IndicadoresCapes class="indicador" squareColor="grey" firstLine="Total Produções" secondLine="100"/>
          <IndicadoresCapes class="indicador" squareColor="cornflowerblue" firstLine="Total Produções" secondLine="100"/>
          <IndicadoresCapes class="indicador" squareColor="darkseagreen" firstLine="Total Produções" secondLine="100"/>
          <IndicadoresCapes class="indicador" squareColor="khaki" firstLine="Total Produções" secondLine="100"/>
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
    const docente = ref("")

    const get_data = () => {
      let url_qualis_grafico = "http://localhost:8081/api/v1/qualis/"+15+"/TRABALHO-EM-EVENTOS/"+ano_inicial.value+"/"+ano_final.value;
      axios
            .get( url_qualis_grafico)
            .then((response) => {
              const rawData = response.data;
              data.value = rawData;
            })
            .catch((error) => {
              console.error(error);
            });
      
      let url_producao_docente = "http://localhost:8081/api/docente/obter_producoes/"+ano_inicial.value+"/"+ano_final.value;
      axios
            .get(url_producao_docente)
            .then((response) => {
              const rawData = response.data;
              const dataRows = ref([])
              rawData.forEach(i =>{
                let aux = []
                aux.push(i.docente.nome)
                aux = aux.concat(i.qualis)
                dataRows.value.push(aux)
              })
              rows.value = transformData(dataRows.value,columns)
              carregar.value = false
            })
            .catch((error) => {
              console.error(error);
            });
    }

    const filtrar = () => {
        carregar.value = true
        get_data()
    }

    const detalhar = (row) => {
      
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
      get_data,
      filtrar,
      detalhar,
    }

  },
})
</script>

<style>
.title-page {
  font-size: 1.5em;
  margin-top: 1em;
  margin-bottom: 0.5em;
}
.container {
    width: 100%;
    padding-right: 300px;
    padding-left: 300px;
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
