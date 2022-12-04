<template>
    <h1>Presale</h1>
    <div class="row">
        <div class="col-lg-6 mb-2">
            <div v-show="!store.state.connected">
                <p>Connect your wallet to view the presale details.</p>
            </div>
            <div v-show="store.state.connected">
                <div v-show="max == 0">
                    <div v-show="countdown.days > 0 || countdown.hours > 0 || countdown.minutes > 0 || countdown.seconds > 0">
                        <div>{{ nextEvent }} starts in...</div>
                        <div class="card-group mb-3">
                            <div class="card">
                                <div class="card-body">
                                    <div class="card-title text-center">Days</div>
                                    <div class="card-text text-center"><strong>{{ countdown.days }}</strong></div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <div class="card-title text-center">Hours</div>
                                    <div class="card-text text-center"><strong>{{ countdown.hours }}</strong></div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <div class="card-title text-center">Minutes</div>
                                    <div class="card-text text-center"><strong>{{ countdown.minutes }}</strong></div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <div class="card-title text-center">Seconds</div>
                                    <div class="card-text text-center"><strong>{{ countdown.seconds }}</strong></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="card-group">
                        <div class="card">
                            <div class="card-body">
                                <div class="card-title text-center"><small>Remaining Supply</small></div>
                                <div class="card-text text-center"><strong>{{ supply }}</strong></div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <div class="card-title text-center"><small>Value Per NFT</small></div>
                                <div class="card-text text-center"><strong>{{ value / 1000000000000000000 }} $FUR</strong></div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <div class="card-title text-center"><small>Price Per NFT</small></div>
                                <div class="card-text text-center"><strong>{{ price / 1000000 }} USDC</strong></div>
                            </div>
                        </div>
                    </div>
                    <div class="card-group">
                        <div class="card">
                            <div class="card-body">
                                <div class="card-title text-center"><small>Max Available</small></div>
                                <div class="card-text text-center"><strong>{{ max }}</strong></div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <div class="card-title text-center"><small>Owned Value</small></div>
                                <div class="card-text text-center"><strong>{{ ownedValue / 1000000000000000000 }} $FUR</strong></div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <div class="card-title text-center"><small>Balance</small></div>
                                <div class="card-text text-center"><strong>{{ balance }}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
                <button v-show="store.state.connected" @click="getContractData" :disabled="locked" class="btn btn-sm btn-link col-12">Reload Contract Data</button>
            </div>
        </div>
        <div class="col-lg-6 mb-3">
            <div v-show="store.state.connected">
                <div v-show="!store.state.address.attributes.email">
                    <div class="mb-3">
                        <label for="email" class="form-label">Enter your email address</label>
                        <input v-model="email" type="email" class="form-control" id="email">
                    </div>
                    <button @click="submitEmail" class="btn btn-lg btn-primary">Submit</button>
                </div>
                <div v-show="store.state.address.attributes.email && !store.state.address.attributes.email_verified_at">
                    <div class="mb-3">
                        <label for="verification" class="form-label">Enter your email verification code</label>
                        <input v-model="verification" type="text" class="form-control" id="verification">
                    </div>
                    <button @click="submitVerification" class="btn btn-lg btn-primary">Submit</button>
                </div>
                <div v-show="store.state.address.attributes.email && store.state.address.attributes.email_verified_at">
                    <div v-show="max > 0">
                        <input v-show="max > 1" v-model="quantity" :disabled="locked" :max="max" min="1" type="number" class="form-control mb-2" id="quantity">
                        <button @click="purchase" :disabled="locked" class="btn btn-lg btn-primary col-12">Purchase ({{ totalPrice / 1000000 }} USDC)</button>
                    </div>
                    <div v-show="max == 0">
                        No presales are available at this time.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { computed, onMounted, ref, watch } from "vue";
    import { useTimer } from "vue-timer-hook";
    import { useStore } from "vuex";

    export default {
        setup() {
            const store = useStore();
            const email = ref(null);
            const verification = ref(null);
            const contract = ref(null);
            const paymentContract = ref(null);
            const max = ref(0);
            const quantity = ref(0);
            const supply = ref(0);
            const value = ref(0);
            const price = ref(0);
            const locked = ref(false);
            const balance = ref(0);
            const ownedValue = ref(0);
            const presaleOneStart = ref(0);
            const presaleTwoStart = ref(0);
            const presaleThreeStart = ref(0);
            const claimStart = ref(0);
            const countdown = ref(useTimer(0));
            const nextEvent = ref(null);

            const connected = computed(() => {
                return store.state.connected;
            });

            const totalPrice = computed(() => {
                return price.value * quantity.value;
            });

            onMounted(async function () {
                if(store.state.connected) {
                    getContractData();
                }
            });

            watch(connected, async function (currentValue, oldValue) {
                if(oldValue) {
                    return;
                }
                if(!currentValue) {
                    return;
                }
                if(!max.value) {
                    getContractData();
                }
            });

            watch(countdown.value.seconds, async function (currentValue, oldValue) {
                if(oldValue > 0 && countdown.value.days == 0 && countdown.value.hours == 0 && countdown.value.minutes == 0 && countdown.value.seconds == 0) {
                    alert(currentValue);
                    getSettings();
                    getContractData();
                }
            });

            async function getSettings() {
                await axios.get("/api/v1/settings").then(response => {
                    store.commit("settings", response.data);
                }).catch(error => {
                    store.commit("alert", error.message);
                });
            }

            async function submitEmail() {
                locked.value = true;
                await axios.post('/api/v1/address', {
                    address: store.state.account,
                    email: email.value,
                }).then(response => {
                    store.commit("address", response.data.data);
                }).catch(error => {
                    store.commit("notice", null);
                    store.commit("alert", error.message);
                });
                locked.value = false;
            }

            async function submitVerification() {
                locked.value = true;
                await axios.post('/api/v1/address', {
                    address: store.state.account,
                    email_verification_code: verification.value,
                }).then(response => {
                    store.commit("address", response.data.data);
                }).catch(error => {
                    store.commit("notice", null);
                    store.commit("alert", error.message);
                });
                locked.value = false;
            }

            async function getContractData() {
                locked.value = true;
                try {
                    contract.value = new web3.eth.Contract(JSON.parse(store.state.presaleNftAbi), store.state.presaleNftAddress);
                    paymentContract.value = new web3.eth.Contract(JSON.parse(store.state.usdcAbi), store.state.usdcAddress);
                    max.value = await contract.value.methods.max(store.state.account).call();
                    quantity.value = max.value;
                    supply.value = await contract.value.methods.supply().call();
                    value.value = await contract.value.methods.value().call();
                    price.value = await contract.value.methods.price().call();
                    balance.value = await contract.value.methods.balanceOf(store.state.account).call();
                    ownedValue.value = await contract.value.methods.ownedValue(store.state.account).call();
                    presaleOneStart.value = await contract.value.methods.presaleOneStart().call();
                    presaleTwoStart.value = await contract.value.methods.presaleTwoStart().call();
                    presaleThreeStart.value = await contract.value.methods.presaleThreeStart().call();
                    claimStart.value = await contract.value.methods.claimStart().call();
                    if(claimStart.value > Date.now() / 1000) {
                        nextEvent.value = "Claim";
                        countdown.value.restart(claimStart.value * 1000);
                    }
                    if(presaleThreeStart.value > Date.now() / 1000) {
                        nextEvent.value = "Presale Three";
                        countdown.value.restart(presaleThreeStart.value * 1000);
                    }
                    if(presaleTwoStart.value > Date.now() / 1000) {
                        nextEvent.value = "Presale Two";
                        countdown.value.restart(presaleTwoStart.value * 1000);
                    }
                    if(presaleOneStart.value > Date.now() / 1000) {
                        nextEvent.value = "Presale One";
                        countdown.value.restart(presaleOneStart.value * 1000);
                    }
                } catch (error) {
                    store.commit("alert", error.message);
                }
                locked.value = false;
            }

            async function purchase() {
                locked.value = true;
                store.commit("notice", "Waiting on response from wallet");
                try {
                    const gasPrice = Math.round(await web3.eth.getGasPrice());
                    let gas = Math.round(await paymentContract.value.methods.approve(store.state.presaleNftAddress, quantity.value * price.value).estimateGas({ from: store.state.account, gasPrice: gasPrice }) * 2);
                    await paymentContract.value.methods.approve(store.state.presaleNftAddress, quantity.value * price.value).send({ from: store.state.account, gasPrice: gasPrice, gas: gas });
                    gas = Math.round(await contract.value.methods.buy(quantity.value).estimateGas({ from: store.state.account, gasPrice: gasPrice}) * 2);
                    const result = await contract.value.methods.buy(quantity.value).send({ from: store.state.account, gasPrice: gasPrice, gas: gas });
                    store.commit("notice", "Transaction successful! TXID: " + result.blockHash);
                } catch (error) {
                    store.commit("alert", error.message);
                }
                locked.value = false;
                getContractData();
            }

            return {
                store,
                email,
                verification,
                submitEmail,
                submitVerification,
                getContractData,
                purchase,
                max,
                quantity,
                supply,
                value,
                price,
                totalPrice,
                locked,
                balance,
                ownedValue,
                countdown,
                nextEvent,
            }
        }

    }
</script>
