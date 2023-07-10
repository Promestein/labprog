<template>
    <q-page class="q-pa-sm" id="page">
      <div class="container">
        <div >
          <div>
            <div class="filtros">
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
        <div>
            <ModalProducoes v-if="showModalOrientacoes" title="Orientacoes" @fechar="fecharModal">
                
            </ModalProducoes>
            <ModalProducoes v-if="showModalEstatisticas" title="Estatisticas" @fechar="fecharModal">
                <div>Qtd. alunos de Graduação:</div>
                    <q-input
                        dense
                        outlined
                        v-model="qtd_graduacao"
                        :display-value="qtd_graduacao"
                    />
                    <div>Qtd. Alunos do Mestrado:</div>
                    <q-input
                        dense
                        outlined
                        v-model="qtd_mestrado"
                        :display-value="qtd_mestrado"
                    />
                    <div>Qtd. Alunos do Doutorado:</div>
                    <q-input
                        dense
                        outlined
                        v-model="qtd_doutorado"
                        :display-value="qtd_doutorado"
                    />
            </ModalProducoes>
        </div>
        <div>
          <TableEditarComponent
            :rows="rows"
            :columns="columns"
            :filter_columns="filter_columns"
            non_final_table="True"
            table_height="1000"
            @openModalA="showModalOrientacoes = true"
            @openModalB="showModalEstatisticas = true"
          />
        </div>
      </div>
    </q-page>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue'
  import axios from "axios";
  import TableEditarComponent from '../components/TableEditarComponent.vue'
  import ModalProducoes from 'src/components/ModalProducoes.vue'
  import {
    loadData,
    transformData,
  } from "src/utils/dados.js";
  
  export default defineComponent({
    name: 'GerenciarProducoes',
    components: {
      TableEditarComponent, ModalProducoes,
    },

    setup(){
        const docente = ref("Geraldo Braz Júnior")
        const rows = [
        { discente: 'João', titulo: 'Título', tipo: 'Dissertação', ano: '2020', local: 'UFSC', orientacao: 'Sim', estatisticas: 'Estatísticas' },
        { discente: 'João', titulo: 'Título', tipo: 'Dissertação', ano: '2020', local: 'UFSC', orientacao: 'Sim', estatisticas: 'Estatísticas' },
        { discente: 'João', titulo: 'Título', tipo: 'Dissertação', ano: '2020', local: 'UFSC', orientacao: 'Sim', estatisticas: 'Estatísticas' },
        { discente: 'João', titulo: 'Título', tipo: 'Dissertação', ano: '2020', local: 'UFSC', orientacao: 'Sim', estatisticas: 'Estatísticas' },
        { discente: 'João', titulo: 'Título', tipo: 'Dissertação', ano: '2020', local: 'UFSC', orientacao: 'Sim', estatisticas: 'Estatísticas' },
        { discente: 'João', titulo: 'Título', tipo: 'Dissertação', ano: '2020', local: 'UFSC', orientacao: 'Sim', estatisticas: 'Estatísticas' },
        { discente: 'João', titulo: 'Título', tipo: 'Dissertação', ano: '2020', local: 'UFSC', orientacao: 'Sim', estatisticas: 'Estatísticas' },
        { discente: 'João', titulo: 'Título', tipo: 'Dissertação', ano: '2020', local: 'UFSC', orientacao: 'Sim', estatisticas: 'Estatísticas' },]
      const columns = [
            //adicionar colunas de Ano	Docente	Título	Local	Orientação?	Estatísticas
            { name: 'discente', label: 'Discente', field: 'discente', align: 'left', sortable: true },
            { name: 'titulo', label: 'Título', field: 'titulo', align: 'left', sortable: true },
            { name: 'tipo', label: 'Tipo', field: 'tipo', align: 'left', sortable: true },
            { name: 'ano', label: 'Ano', field: 'ano', align: 'left', sortable: true },
            { name: 'local', label: 'Local', field: 'local', align: 'left', sortable: true },
            { name: 'orientacao', label: 'Orientação?', field: 'orientacao', align: 'left', sortable: true },
            { name: 'estatisticas', label: 'Estatísticas', field: 'estatisticas', align: 'left', sortable: true },
      ]
      const filter_columns = [1,2,3]
  
      const ano_inicial = ref(2019)
      const ano_final = ref(2023)
      const programa = ref("PPGCC")
        const qtd_graduacao = ref(0)
        const qtd_mestrado = ref(0)
        const qtd_doutorado = ref(0)
      const programa_select = ref(["PPGCC", "DCCMAPI"])
  
      const data = ref([[1,2,3,4,4], [3,3,2,3,4], [1,4,2,5,5], [2,2,2,2,2,]])

      const showModalOrientacoes = ref(false)
        const showModalEstatisticas = ref(false)

      const fecharModal = () => {
        showModalOrientacoes.value = false
        showModalEstatisticas.value = false
        qtd_graduacao.value = 0
        qtd_mestrado.value = 0
        qtd_doutorado.value = 0
      }

      const get_data = async () => {
        let filtered_url = "http://localhost:8083/api/producao/obterProducao";
        axios
          .get(filtered_url)
          .then((response) => {
            const rawData = response.data;
            console.log("a",rawData)
            rows.value = transformData(rawData, columns.value);
            carregar.value = false;
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
        qtd_graduacao,
        qtd_mestrado,
        qtd_doutorado,
        programa_select,
        data,
        docente,
        showModalOrientacoes,
        showModalEstatisticas,
        fecharModal,
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
  
  