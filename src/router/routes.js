const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: '/info', component: () => import('pages/InformationPage.vue') },
      { path: '/add', component: () => import('pages/AddPhrasePage.vue') },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '/new-phrases', component: () => import('pages/ListPossiblePhrasesPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
