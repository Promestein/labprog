<template>
    <q-page class="q-pa-sm page" id="page">
      <div class="container">
        <div >
          <div>
            <div class="filtros">
              <div class="filtro-conteudo">
                <div>Docente:</div>
                  <q-select
                    dense
                    outlined
                    v-model="docente"
                    :options="docentes_select"
                  />
              </div>
              <div class="botao-filtrar">
                <q-btn color="purple" label="Filtrar" @click="filtrar"/>
              </div>
            </div>
          </div>
        </div>
        <div>
            <ModalProducoes v-if="showModalOrientacoes" title="Orientacoes" @fechar="fecharModal">

            </ModalProducoes>
            <ModalProducoes v-if="showModalEstatisticas" title="Estatisticas" @fechar="fecharModal" @salvarEstatisticas="salvarEstatisticas">
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
        <div v-if="carregar" class="fundo-loading">
          <q-spinner class="loading" size="160px" />
        </div>
        <div v-if="!carregar">
          <TableEditarComponent
            :rows="rows"
            :columns="columns"
            :filter_columns="filter_columns"
            non_final_table="True"
            table_height="1000"
            @openModalA="showModalOrientacoes = true"
            @openModalB="modalEstatisticas"
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
import { Loading } from 'quasar';

  export default defineComponent({
    name: 'GerenciarProducoes',
    components: {
      TableEditarComponent, ModalProducoes,
    },

    setup(){
        // const docente = ref("Geraldo Braz Júnior")
      const rows = ref([])
      const columns = ref([
            { name: 'ano', label: 'Ano', field: 'ano', align: 'left', sortable: true },
            { name: 'titulo', label: 'Título', field: 'titulo', align: 'left', sortable: true },
            { name: 'local', label: 'Local', field: 'local', align: 'left', sortable: true },
            { name: 'orientacao', label: 'Orientação?', field: 'orientacao', align: 'left', sortable: true },
            { name: 'estatisticas', label: 'Estatísticas', field: 'estatisticas', align: 'left', sortable: true },
      ])
      const filter_columns = [1,2,3]

      const ano_inicial = ref(2019)
      const ano_final = ref(2023)
      const programa = ref("PPGCC")
        const qtd_graduacao = ref(0)
        const qtd_mestrado = ref(0)
        const qtd_doutorado = ref(0)
      const programa_select = ref(["PPGCC", "DCCMAPI"])
      const carregar = ref(false)

      const docente = ref("Geraldo Braz Júnior")
      const docentes_select = ref([])
      const docentes_ids = ref([])
      const producoes = ref([])
      const idProducao = ref(0)


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

      const get_data = async (id) => {
        let filtered_url = "http://localhost:8081/api/producao/obterProducao/"+id;
        axios
          .get(filtered_url)
          .then((response) => {
            const rawData = response.data;
            console.log(rawData)
            let data = []
            for (let i = 0; i < rawData.length; i++) {
              const aux = []
              producoes.value.push({"id":rawData[i].id,"titulo":rawData[i].titulo})
              if(rawData[i].ano == null){
                aux.push("Não informado")
              }else{
                aux.push(rawData[i].ano)
              }
              if(rawData[i].titulo == null){
                aux.push("Não informado")
              }else{
                aux.push(rawData[i].titulo)
              }
              if(rawData[i].nomeLocal == null){
                aux.push("Não informado")
              }else{
                aux.push(rawData[i].nomeLocal)
              }
              if(rawData[i].orientacao == null){
                aux.push("Não informado")
              }else{
                aux.push(rawData[i].orientacao)
              }
              let estatisticas = ""
              if(rawData[i].qtdGrad == null){
                estatisticas+=("0G|")
              }else{
                estatisticas+=rawData[i].qtdGrad+"G|"
              }
              if(rawData[i].qtdMestrado == null){
                estatisticas+="0M|"
              }else{
                estatisticas+=rawData[i].qtdMestrado+"M|"
              }
              if(rawData[i].qtdDoutorado == null){
                estatisticas+="0D"
              }else{
                estatisticas+=rawData[i].qtdDoutorado+"D"
              }
              aux.push(estatisticas)
              data.push(aux)
            }
            rows.value = transformData(data, columns.value);
            carregar.value = false;
          })
          .catch((error) => {
            console.error(error);
          });
      }
      const get_docentes = async () => {
        let docentes_url = "http://localhost:8081/api/docente/obter_docentes";
        axios
          .get(docentes_url)
          .then((response) => {
            const rawData = response.data;
            docentes_ids.value = []
            docentes_select.value = []
            rawData.forEach(i => {
              docentes_ids.value.push(i.id)
              docentes_select.value.push(i.nome)
            });
            carregar.value = false;
          })
          .catch((error) => {
            console.error(error);
          });
      }

      const salvarEstatisticas = async()=>{
        let estatisticas_url = "http://localhost:8081/api/producao/setandoEstaticticas/"+idProducao.value+"/"+qtd_graduacao.value+"/"+qtd_mestrado.value+"/"+qtd_doutorado.value
        axios
          .post(estatisticas_url)
          .then((response) => {
            console.log(response)
            fecharModal()
          })
          .catch((error) => {
            console.error(error);
          });
      }

      const modalEstatisticas = (bool) => {
        const nome = bool.producao.titulo
        producoes.value.forEach(i => {
          if(i.titulo === nome){
            idProducao.value = i.id
          }
        });
        showModalEstatisticas.value = bool.open
      }

      const filtrar = () =>{
        carregar.value = true
        const id = docentes_select.value.findIndex(i => i == docente.value)
        const docente_id = docentes_ids.value[id]
        get_data(docente_id)
      }

      onMounted(() => {
        carregar.value = true
        get_docentes()
        get_data(15)
      })

      return {
        rows,
        columns,
        filter_columns,
        ano_inicial,
        ano_final,
        programa,
        carregar,
        qtd_graduacao,
        qtd_mestrado,
        qtd_doutorado,
        programa_select,
        data,
        docentes_select,
        docentes_ids,
        docente,
        showModalOrientacoes,
        showModalEstatisticas,
        fecharModal,
        filtrar,
        modalEstatisticas,
        salvarEstatisticas,
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

  .fundo-loading {
    background-color: #e9d5ff;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
  }
  .botao-filtrar{
  margin-top: 1.55em;
  margin-bottom: 2em;
  width: 10vw;
  height: auto;
  margin-right: 2em;
}
.filtro-conteudo {
  width: 15vw;
  height: auto;
  margin-right: 2em;
}

  .loading {
    color: var(--main-color);
  }
  </style>

