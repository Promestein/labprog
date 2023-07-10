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
              <a href="/#/docente" class="tab">
              <q-tab class="tab" name="docente" Label="Docente">Docentes</q-tab>
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
	background: #fff;
	padding-left: 16px;
	padding-right: 16px;
	border-bottom: 1px solid #dfe3e8;
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
  }
  .main-header {
  border-bottom: 1px solid #dee2e6;
  z-index: 1034;
  }

  .tab {
    text-decoration: none;
    color: #000;
  }
</style>
