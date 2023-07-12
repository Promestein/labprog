<template>
    <q-dialog v-model="showModal" persistent>
      <q-card class="modal">
        <q-card-section>
          <div class="title-page">{{ title }}</div>
        </q-card-section>
        <q-card-section>
        <slot></slot>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="purple" label="Salvar" @click="salvarEstatisticas" />
          <q-btn color="purple" label="Fechar" @click="closeModal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>

  <script>
  import { Dialog } from 'quasar';

  export default {
    props: {
      title: {
        type: String,
        required: true
      },
    },
    data() {
      return {
        showModal: true
      }
    },
    methods: {
      closeModal() {
        this.$emit("fechar",false)
      },
      salvarEstatisticas() {
        if(this.title == "Estatisticas"){
          this.$emit("salvarEstatisticas")
        }
      }
    }
  }
  </script>

<style>
.title-page {
  font-size: 1.5em;
  margin-top: 1em;
  margin-bottom: 1em;
  font-weight: bold;
}

.modal{
  width: 20%;
  height: 43%;
  /* margin: auto; */
  margin-top: 10%;
  margin-bottom: 10%;
  padding: 0px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

</style>
