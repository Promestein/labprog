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
                  label="Programa"
                  :display-value="programa"
                />
            </div>
            <div class="filtro-conteudo">
              <div>Ano Inicial:</div>
                <q-select
                  dense
                  outlined
                  v-model="ano_inicial"
                  :options="ano_inicial_select"
                  label="Programa"
                  :display-value="ano_inicial"
                />
            </div>
            <div class="filtro-conteudo">
              <div>Ano Final:</div>
                <q-select
                  dense
                  outlined
                  v-model="ano_final"
                  :options="ano_final_select"
                  label="Programa"
                  :display-value="ano_final"
                />
            </div>
          </div>
        </div>
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
import { defineComponent } from 'vue'
import TableComponent from '../components/TableComponent.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    TableComponent
  },
  setup(){
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

    return {
      rows,
      columns,
      filter_columns
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
    padding-right: 7.5px;
    padding-left: 7.5px;
  }
.filtros {
  display: flex;
  flex-direction: row;
}
.filtro-conteudo {
  width: 15vw;
  height: auto;
}
</style>
