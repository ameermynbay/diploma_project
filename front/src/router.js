import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";
import Main from "./views/Main.vue";
import store from "@/store/index.js";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/playlist/:id",
        name: "PlaylistDetail",
        meta: {
          requiresAuth: true,
        },
        props: true,
        component: () =>
          import("@/components/playlists/PlaylistDetail.vue"),
      },
      {
        path: "/albums/:id",
        name: "AlbumDetail",
        props: true,
        component: () =>
          import("@/components/albums/AlbumDetail.vue"),
      },
      {
        path: "/artists/:id",
        name: "ArtistDetail",
        props: true,
        component: () =>
          import("@/components/artists/ArtistDetail.vue"),
      },
      {
        path: "/library",
        name: "Library",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import("@/views/Library.vue"),
      },
      {
        path: "/liked",
        name: "Liked",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import("@/components/liked/Liked.vue"),
      },
      {
        path: "/profile",
        name: "Profile",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import("@/views/Profile.vue"),
      },
      {
        path: "/settings",
        name: "Settings",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import("@/views/Settings.vue"),
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("@/components/auth/Login.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import("@/components/auth/Signup.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () =>
      import("@/views/ResetPassword.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/signup', '/', '/reset-password'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  console.log(store.getters['auth/getLogged'])
  if (!store.getters['auth/getLogged'] && authRequired) {
    return next({
      path: "/login",
    });
  }
  if (authRequired && loggedIn == null) {
    return next({
      path: "/login",
    });
  } else {
    next();
  }
});
export default router;