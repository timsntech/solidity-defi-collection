<template>
    <div class="header pb-5">
        <div class="container">
            <!-- BEGIN NAV -->
            <nav class="navbar pb-5 text-light">
                <a class="navbar-brand" href="https://furio.io">
                    <img src="/images/furio-logo.svg" alt="Furio Logo" width="175">
                </a>
                <Connect class="ms-auto"/>
            </nav>
        </div>
    </div>
    <!-- END NAV -->
    <!-- BEGIN NOTICES -->
    <div v-show="store.state.notice" class="alert alert-success alert-dismissible fade show" role="alert">
        <div class="container py-3">
            {{ store.state.notice }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
    <div v-show="store.state.alert" class="alert alert-danger alert-dismissible fade show" role="alert">
        <div class="container py-3">
            {{ store.state.alert }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
    <!-- END NOTICES -->
    <div class="container">
        <ul class="nav nav-tabs border-0">
            <li class="nav-item">
                <router-link :to="{ name: 'Presale' }" class="nav-link" active-class="active">Presale</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'Swap' }" class="nav-link" active-class="active">Swap</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'Vault' }" class="nav-link" active-class="active">Vault</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'MintUsdc' }" class="nav-link" active-class="active">Mint USDC</router-link>
            </li>
        </ul>
        <!-- BEGIN PAGE CONTENT -->
        <div class="container py-5 px-5 bg-light text-dark rounded">
            <router-view class="mb-5 py-5"/>
        </div>
        <div class="mt-5 py-5">
            <h5 class="mb-3">Furio Rewards Responsibilty</h5>
            <p>Participation within the Furio Ecosystem is entirely at your own discretion. Please conduct your own research and read all of the available information. Remember that crypto currencies and the performance of projects carry no guarantees and you should not take on unnecessary risks. Material published by Furio should not be considered as financial advice.</p>
        </div>
        <!-- END PAGE CONTENT -->
    </div>
    <!-- START FOOTER -->
    <div class="footer border-top border-secondary pt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-3 pe-5">
                    <img src="/images/furio-logo.svg" alt="Furio Logo" class="img-fluid">
                    <p class="mt-4 text-center">Decentralised Finance</p>
                </div>
                <div class="col-md-3">
                    <h5 class="border-bottom border-primary pb-3">Contact Us</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item"><a class="nav-link" href="mailto:info@furio.io"><i class="fa-solid fa-envelope"></i> info@furio.io</a></li>
                        <li class="nav-item"><a class="nav-link" href="mailto:partners@furio.io"><i class="fa-solid fa-envelope"></i> partners@furio.io</a></li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <h5 class="border-bottom border-primary pb-3">Useful Links</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item"><a class="nav-link" href="https://furio.io/how-it-works/"><i class="fa-solid fa-link"></i> How It Works</a></li>
                        <li class="nav-item"><a class="nav-link" href="https://furio.io/referral-system"><i class="fa-solid fa-link"></i> Referral System</a></li>
                        <li class="nav-item"><a class="nav-link" href="https://furio.io/variable-rewards"><i class="fa-solid fa-link"></i> Variable Rewards</a></li>
                        <li class="nav-item"><a class="nav-link" href="https://furio.io/taxes"><i class="fa-solid fa-link"></i> Taxes</a></li>
                        <li class="nav-item"><a class="nav-link" href="https://furio.io/whale-tax"><i class="fa-solid fa-link"></i> Whale Tax</a></li>
                    </ul>
                </div>
                <div class="col-md-3">
                    <h5 class="border-bottom border-primary pb-3">Connect</h5>
                    <nav class="nav social">
                        <a class="nav-link" href="https://www.facebook.com/furiocrypto"><i class="fa-brands fa-facebook"></i></a>
                        <a class="nav-link" href="https://twitter.com/furiocrypto"><i class="fa-brands fa-twitter"></i></a>
                        <a class="nav-link" href="https://www.instagram.com/furiocrypto"><i class="fa-brands fa-instagram"></i></a>
                        <a class="nav-link" href="https://discord.gg/furio"><i class="fa-brands fa-discord"></i></a>
                        <a class="nav-link" href="https://t.me/furiocrypto"><i class="fa-brands fa-telegram"></i></a>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { onMounted } from "vue";
    import { useStore } from "vuex";
    import Connect from './components/Connect.vue';

    export default {
        components: {
            Connect,
        },
        setup() {
            const store = useStore();

            onMounted(async function () {
                await axios.get("/api/v1/settings").then(response => {
                    store.commit("settings", response.data);
                }).catch(error => {
                    store.commit("alert", error.message);
                });
            });

            return {
                store,
            }
        }
    }
</script>
