// Composables
import { createRouter, createWebHistory } from "vue-router";

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

//       {
//         path: "/bots",
//         name: "Bots",
//         component: () => import("@/views/Bots.vue"),
//       },

const Home = { template: "<div>Home</div>" };
const routes = [
  { path: "/bots", component: () => import("@/views/Bots.vue") },
  { path: "/my", component: () => import("@/views/Account.vue") },
  { path: "/messages", component: () => import("@/views/Chats.vue") },
  //chats
  { path: "/chats/:id", component: () => import("@/views/Chat.vue") },
  //users
  { path: "/users", component: () => import("@/views/Users.vue") },
  { path: "/users/:id", component: () => import("@/views/User.vue") },
  {
    path: "/agent",
    component: () =>
      this.$isMobile()
        ? import("@/viewsMobile/Agent.vue")
        : import("@/views/Agent.vue"),
  },
  { path: "/", component: () => import("@/views/Account.vue") },

  { path: "/:pathMatch(.*)*", component: () => import("@/views/NotFound.vue") },
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
