import { createRouter, createWebHistory } from "vue-router";

import Presale from "../views/Presale.vue";
import Swap from "../views/Swap.vue";
import Vault from "../views/Vault.vue";
import MintUsdc from "../views/MintUsdc";
import NotFound from "../views/NotFound.vue";

const routes = [
    {
        path: "/",
        name: "Presale",
        component: Presale,
    },
    {
        path: "/swap",
        name: "Swap",
        component: Swap,
    },
    {
        path: "/vault",
        name: "Vault",
        component: Vault,
    },
    {
        path: "/mintusdc",
        name: "MintUsdc",
        component: MintUsdc,
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
