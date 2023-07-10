<template>
  <q-page class="q-pa-sm" id="page">
    <div class="container">
      <div >
        <div class="title-page">Docente: {{docente}}</div>
        <div class="title-page">Filtros</div>
        <div>
          <div class="filtros">
            <div class="filtro-conteudo">
              <div>Programa</div>
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
import { defineComponent, ref } from 'vue'
import TableComponent from '../components/TableComponent.vue'
import StackChart from '../components/StackChart.vue'

export default defineComponent({
  name: 'DocentePage',
  components: {
    TableComponent,
    StackChart
  },
  setup(){
    const docente = ref("Geraldo Braz Júnior")
    const rows = [{discente: "João", titulo: "TCC", tipo: "TCC", ano: "2021"}, 
                  {discente: "Maria", titulo: "Dissertação", tipo: "Dissertação", ano: "2021"},
                  {discente: "José", titulo: "Tese", tipo: "Tese", ano: "2021"}]
    const columns = [
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
    const filter_columns = [1,2,3]

    const ano_inicial = ref(2019)
    const ano_final = ref(2023)
    const programa = ref("PPGCC")
    const programa_select = ref(["PPGCC", "DCCMAPI"])

    const data = ref([[1,2,3,4,4], [3,3,2,3,4], [1,4,2,5,5], [2,2,2,2,2,]])

    return {
      rows,
      columns,
      filter_columns,
      ano_inicial,
      ano_final,
      programa,
      programa_select,
      data,
      docente
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

