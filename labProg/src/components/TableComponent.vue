<template>
    <div class="q-pa-md">
      <q-table class="tableCss"
        flat
        bordered
        :rows-per-page-options="[15, 30, 50, 100, 500, 1000]"
        :rows="rows"
        :columns="cols"
        :row-key="cols[0].name"
        no-data-label="Não há dados disponíveis. Selecione outros filtros e clique em 'Filtrar'."
        :style="{ 'max-height': table_height - 70 + 'px' }"
        rows-per-page-label="Linhas por página:"
        :pagination-label="getPaginationLabel"
      >
        <template v-slot:header="props">
          <!-- Cabeçalho -->
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
            <q-th v-if="non_final_table" auto-width />
          </q-tr>
        </template>
  
        <template v-slot:body="props">
          <!-- Linha -->
          <q-tr :props="props">
            <!-- Colunas dos dados -->
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
            <!-- Coluna do botão de detalhar -->
            <q-td v-if="non_final_table" auto-width>
              <q-btn
                size="sm"
                class="botao-detalhar"
                push
                dense
                padding="5px 6px"
                @click="setStorageData(props.row)"
                :to="url_child"
                label="Detalhar"
                no-wrap
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </template>
  
  <script>
  export default {
    name: "TableComponent",
    // created: function () {
    //   showColumns();
    // },
    props: {
      rows: {
        type: Array,
        required: true,
      },
      columns: {
        type: Array,
        required: true,
      },
      filter_columns: {
        type: Array,
        required: false,
      },
      non_final_table: {
        type: Boolean,
        required: true,
      },
      url_child: {
        type: String,
        required: false,
      },
      table_height: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        cols: this.columns,
      };
    },
  
    methods: {
      getPaginationLabel(firstRowIndex, endRowIndex, totalRowNumber) {
        if (totalRowNumber == 1) {
          return `${firstRowIndex} de ${totalRowNumber}`;
        } else {
          return `${firstRowIndex}-${endRowIndex} de ${totalRowNumber}`;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .tableCss {
    height: 100%;
  }
  thead tr:first-child th {
    position: sticky;
    top: 0;
    background: white;
    z-index: 1000;
  }

  </style>
  