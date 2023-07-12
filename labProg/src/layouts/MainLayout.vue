<template>
  <q-layout view="lHh Lpr lFf">
        <q-toolbar class="main-header container">
            <q-toolbar-title class="navbar-brand" to="/">
              SPPG
            </q-toolbar-title>
            <q-tabs v-model="tab">
              <a href="/" class="tab">
                <q-tab class="tab" name="programa" Label="Programa">Programas</q-tab>
              </a>
              <a href="/#/gerenciar_producoes" class="tab">
              <q-tab class="tab" name="producoes" Label="Producoes">Produções</q-tab>
              </a>
            </q-tabs>
        </q-toolbar>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { QTabs, QTab } from 'quasar'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default {
  components: {
    QTabs,
    QTab
  },
  data() {
    return {
      tabs: [
        {
          to: '/',
          label: 'Programa'
        },
        {
          to: '/docente',
          label: 'Docente'
        },
        // Add more tabs as needed
      ]
    }
  }
}
</script>

<style>

  .container {
    width: 100%;
  }

  .navbar {
    padding-left: 16px;
    padding-right: 16px;
    border-bottom: 1px solid;
    border-radius: 0;
  }
  .navbar-brand {
    display: inline-block;
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 0.5rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
    color: #ffffff;
  }
  .main-header {
    background-color: #581c87;
    z-index: 1034;
  }

  .tab {
    text-decoration: none;
    color: #ffffff;
  }
</style>
