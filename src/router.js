import { createRouter, createWebHistory } from 'vue-router';
import VotePage from './components/VotePage.vue';
import ResultPage from './components/ResultPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/vote',
  },
  {
    path: '/vote',
    name: 'Vote',
    component: VotePage,
  },
  {
    path: '/result',
    name: 'Result',
    component: ResultPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;