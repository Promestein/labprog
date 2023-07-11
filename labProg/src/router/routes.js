
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue') },
      {
        path: "/docente",
        component: () => import("pages/DocentePage.vue"),
      },
      {
        path: "/gerenciar_producoes",
        component: () => import("pages/GerenciarProducoes.vue"),
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
  {
    path: "/logout",
    component: () => import("pages/LogoutPage.vue"),
  }
]

export default routes
