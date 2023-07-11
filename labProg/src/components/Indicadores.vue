<template>
    <div class="rectangle">
      <div class="square" :style="{ backgroundColor: squareColor }"></div>
      <div class="text">
        <span>{{ firstLine }}</span>
        <span>{{ secondLine }}</span>
      </div>
    </div>
  </template>
  
  <script>
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'IndicadoresCapes',
        props: {
            squareColor: {
                type: String,
                default: 'blue' // Cor padrão do quadrado interno
            },
            firstLine: {
                type: String,
                default: 'Primeira linha' // Texto padrão da primeira linha
            },
            secondLine: {
                type: String,
                default: 'Segunda linha' // Texto padrão da segunda linha
            }
        },
    })
  </script>
  
  <style scoped>
  .rectangle {
    display: flex;
    align-items: center;
    background-color: rgb(230, 225, 225);
    width: 25%;
    height: 65px;
    border-radius: 5px;
    /* margin-top: 15px; */
  }
  
  .square {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin-left: 10px;
    
  }
  
  .text {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
  }
  </style>