<template>
  <q-page class="q-pa-sm" id="page">
    <div class="container">
      <div >
        <div class="title-page">Programa</div>
        <div class="title-page">Filtros</div>
        <div>
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
        </div>
      </div>
      <div class="chart">
        <StackChart :data="data" :ano-final="ano_final" :ano-inicial="ano_inicial"></StackChart>
      </div>
      <div>
        <TableComponent
          :rows="rows"
          :columns="columns"
          :filter_columns="filter_columns"
          non_final_table="True"
          table_height="1000"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import axios from "axios";
import TableComponent from '../components/TableComponent.vue'
import StackChart from '../components/StackChart.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    TableComponent,
    StackChart
  },
  setup(){
    const rows = [
      {
        docente: "Docente 1",
        A1: 1,
        A2: 2,
        A3: 3,
        A4: 4,
        B1: 5,
        B2: 6,
        B3: 7,
        B4: 8,
      },
      {
        docente: "Docente 2",
        A1: 1,
        A2: 2,
        A3: 3,
        A4: 4,
        B1: 5,
        B2: 6,
        B3: 7,
        B4: 8,
      },
      {
        docente: "Docente 3",
        A1: 1,
        A2: 2,
        A3: 3,
        A4: 4,
        B1: 5,
        B2: 6,
        B3: 7,
        B4: 8,
      },
      {
        docente: "Docente 4",
        A1: 1,
        A2: 2,
        A3: 3,
        A4: 4,
        B1: 5,
        B2: 6,
        B3: 7,
        B4: 8,
      },
      {
        docente: "Docente 5",
        A1: 1,
        A2: 2,
        A3: 3,
        A4: 4,
        B1: 5,
        B2: 6,
        B3: 7,
        B4: 8,
      },
      {
        docente: "Docente 6",
        A1: 1,
        A2: 2,
        A3: 3,
        A4: 4,
        B1: 5,
        B2: 6,
        B3: 7,
        B4: 8,
      },
      {
        docente: "Docente 7",
        A1: 1,
        A2: 2,
        A3: 3,
        A4: 4,
        B1: 5,
        B2: 6,
        B3: 7,
        B4: 8,
      },
    ]
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
    ]
    const filter_columns = [1,2,3]

    const ano_inicial = ref(2019)
    const ano_final = ref(2023)
    const programa = ref("PPGCC")
    const programa_select = ref(["PPGCC", "DCCMAPI"])

    const data = ref([])

    const get_data = async () => {
      let filtered_url = "http://localhost:8081/api/v1/qualis/"+15+"/TRABALHO-EM-EVENTOS/"+ano_inicial.value+"/"+ano_final.value;
      console.log(filtered_url)
      axios
            .get(filtered_url)
            .then((response) => {
              const rawData = response.data;
              console.log("data",rawData)
              data.value = rawData;
            })
            .catch((error) => {
              console.error(error);
            });
    }

    onMounted(() => {
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
      data
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
}
.chart{
  margin-top: 2em;
  margin-bottom: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
