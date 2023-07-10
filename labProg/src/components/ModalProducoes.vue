<template>
    <q-dialog v-model="showModal" persistent>
      <q-card>
        <q-card-section>
          <h2>{{ title }}</h2>
        </q-card-section>
        <q-card-section>
          <slot></slot>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="Close" @click="closeModal" />
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
      }
    }
  }
  </script>