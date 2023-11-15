// Composables
import { createRouter, createWebHistory } from "vue-router";

import Account from "@/views/Account.vue";
//       {
//         path: "/bots",
//         name: "Bots",
//         component: () => import("@/views/Bots.vue"),
//       },
import Bots from "@/views/Bots.vue";
import Chat from "@/views/Chat.vue";
import Chats from "@/views/Chats.vue";
import NotFound from "@/views/NotFound.vue";
import User from "@/views/User.vue";
import Users from "@/views/Users.vue";
//       //any other routes
//       {
//         path: "/:pathMatch(.*)*",
//         name: "NotFound",
//         component: () => import("@/views/NotFound.vue"),
//       },
//     ],
//   },
// ];
import { useMobileDetection } from "vue3-mobile-detection";

const { isMobile } = useMobileDetection();
// const routes = [
//   {
//     path: "/",
//     component: () => import("@/layouts/default/Default.vue"),
//     children: [
//       {
//         path: "/home",
//         name: "Home",
//         // route level code-splitting
//         // this generates a separate chunk (about.[hash].js) for this route
//         // which is lazy-loaded when the route is visited.
//         component: () =>
//           import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
//       },

//       {
//         path: "/account",
//         name: "Account",
//         // route level code-splitting
//         // this generates a separate chunk (about.[hash].js) for this route
//         // which is lazy-loaded when the route is visited.
//         component: () =>
//           import(/* webpackChunkName: "account" */ "@/views/Account.vue"),
//       },

const Home = { template: "<div>Home</div>" };
const routes = [
  { path: "/bots", component: Bots },
  { path: "/my", component: Account },
  { path: "/messages", component: Chats },
  //chats
  { path: "/chats/:id", component: Chat },
  //users
  { path: "/users", component: Users },
  { path: "/users/:id", component: User },

  { path: "/", component: Account },

  { path: "/:pathMatch(.*)*", component: NotFound },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
// const router = VueRouter.createRouter({
//   // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
//   history: VueRouter.createWebHashHistory(),
//   routes, // short for `routes: routes`
// });
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
