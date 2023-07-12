<template>
    <div class="q-pa-md">
      <q-table class="tableCss"
        flat
        bordered
        table-header-class="bold"
        table-class="text-black"
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
            <q-th v-for="col in props.cols" :key="col.name" :props="props" style="color: white; font-size: 14px;">
              {{ col.label }}
            </q-th>
            <q-th v-if="non_final_table" auto-width />
          </q-tr>
        </template>

        <template v-slot:body="props">
          <!-- Linha -->
          <q-tr :props="props">
            <!-- Colunas dos dados -->
            <q-td v-for="col in props.cols" :key="col.name" :props="props" style="color: black; font-size: 14px; font-weight:400">
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
                @click="openModalA"
                label="A"
                no-wrap
              />
              <q-btn
                size="sm"
                class="botao-detalhar"
                push
                dense
                padding="5px 6px"
                @click="openModalB(props.row)"
                label="B"
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
    name: "TableEditarComponent",
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
        openModalA(){
            this.$emit('openModalA', true)
        },
        openModalB(row){
            this.$emit('openModalB', {"open":true, "producao": row  })
        }
    },
  };
  </script>

  <style scoped>
  .tableCss {
    height: 100%;
    background-color: #e9d5ff
  }
  thead tr:first-child th {
    position: sticky;
    top: 0;
    background: white;
    z-index: 1000;
  }
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th{
    background-color: #2e1065;
    font-weight: bold;
  }

  </style>
