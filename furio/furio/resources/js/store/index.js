import { createStore } from "vuex";

export default createStore({
    state: {
        notice: null,
        alert: null,
        connected: false,
        networkId: null,
        networkName: null,
        rpcUrl: null,
        recaptcha: null,
        usdcAddress: null,
        usdcAbi: null,
        presaleNftAddress: null,
        presaleNftAbi: null,
        tokenAddress: null,
        tokenAbi: null,
        swapAddress: null,
        swapAbi: null,
        downlineNftAddress: null,
        downlineNftAbi: null,
        wallet: null,
        account: null,
        address: {
            type: 'addresses',
            id: null,
            attributes: {
                address: null,
                nonce: null,
                logged_in: null,
                name: null,
                email: null,
                email_verified_at: null,
                created_at: null,
                updated_at: null,
            }
        },
        events: [],
    },
   mutations: {
        notice(state, value) {
            state.notice = value;
        },
        alert(state, value) {
            state.alert = value;
        },
        wallet(state, value) {
            state.wallet = value;
        },
        connected(state, value) {
            state.connected = value;
        },
        account(state, value) {
            state.account = value;
        },
        address(state, value) {
            state.address = value;
        },
        event(state, value) {
            state.events.push(value);
        },
        settings(state, value) {
            for(const property in value) {
                state[property] = value[property];
            }
        }
   }
});
