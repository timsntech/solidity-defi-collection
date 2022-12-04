(function(t) {
    function e(e) {
        for (var a, i, o = e[0], u = e[1], c = e[2], p = 0, d = []; p < o.length; p++) i = o[p], Object.prototype.hasOwnProperty.call(r, i) && r[i] && d.push(r[i][0]), r[i] = 0;
        for (a in u) Object.prototype.hasOwnProperty.call(u, a) && (t[a] = u[a]);
        l && l(e);
        while (d.length) d.shift()();
        return s.push.apply(s, c || []), n()
    }

    function n() {
        for (var t, e = 0; e < s.length; e++) {
            for (var n = s[e], a = !0, o = 1; o < n.length; o++) {
                var u = n[o];
                0 !== r[u] && (a = !1)
            }
            a && (s.splice(e--, 1), t = i(i.s = n[0]))
        }
        return t
    }
    var a = {},
        r = {
            app: 0
        },
        s = [];

    function i(e) {
        if (a[e]) return a[e].exports;
        var n = a[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(n.exports, n, n.exports, i), n.l = !0, n.exports
    }
    i.m = t, i.c = a, i.d = function(t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }, i.r = function(t) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, i.t = function(t, e) {
        if (1 & e && (t = i(t)), 8 & e) return t;
        if (4 & e && "object" === typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var a in t) i.d(n, a, function(e) {
                return t[e]
            }.bind(null, a));
        return n
    }, i.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t["default"]
        } : function() {
            return t
        };
        return i.d(e, "a", e), e
    }, i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, i.p = "/";
    var o = window["webpackJsonp"] = window["webpackJsonp"] || [],
        u = o.push.bind(o);
    o.push = e, o = o.slice();
    for (var c = 0; c < o.length; c++) e(o[c]);
    var l = u;
    s.push([0, "chunk-vendors"]), n()
})({
    0: function(t, e, n) {
        t.exports = n("56d7")
    },
    "0347": function(t, e, n) {},
    "0a46": function(t, e, n) {},
    "0e1e": function(t, e, n) {},
    "0f37": function(t, e, n) {},
    1: function(t, e) {},
    10: function(t, e) {},
    11: function(t, e) {},
    12: function(t, e) {},
    13: function(t, e) {},
    "13a5": function(t) {
        t.exports = JSON.parse('[{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_INT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"player","type":"address"}],"name":"statsOf","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addrs","type":"address[]"}],"name":"removeAddressesFromWhitelist","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"removeAddressFromWhitelist","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"targetSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"remainingMintableSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"player","type":"address"}],"name":"mintedBy","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"taxRate","type":"uint8"}],"name":"setAccountCustomTax","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"vaultAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalTxs","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"removeAccountCustomTax","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"calculateTransferTaxes","outputs":[{"name":"adjustedValue","type":"uint256"},{"name":"taxAmount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"addAddressToWhitelist","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newVaultAddress","type":"address"}],"name":"setVaultAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whitelist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"mintedSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isExcluded","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"players","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addrs","type":"address[]"}],"name":"addAddressesToWhitelist","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"excludeAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"includeAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialMint","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"}],"name":"WhitelistedAddressAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"}],"name":"WhitelistedAddressRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]')
    },
    14: function(t, e) {},
    15: function(t, e) {},
    16: function(t, e) {},
    17: function(t, e) {},
    18: function(t, e) {},
    19: function(t, e) {},
    2: function(t, e) {},
    20: function(t, e) {},
    21: function(t, e) {},
    "211b": function(t) {
        t.exports = JSON.parse('[{"constant":false,"inputs":[{"name":"addrs","type":"address[]"}],"name":"removeAddressesFromWhitelist","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"removeAddressFromWhitelist","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"remainingMintableSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"},{"name":"tokenAmount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"addAddressToWhitelist","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whitelist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addrs","type":"address[]"}],"name":"addAddressesToWhitelist","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_tokenAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"source","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"}],"name":"WhitelistedAddressAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"}],"name":"WhitelistedAddressRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]')
    },
    22: function(t, e) {},
    2368: function(t, e, n) {
        "use strict";
        n("87f5")
    },
    2616: function(t, e, n) {
        "use strict";
        n("b0f3")
    },
    "26ca": function(t, e, n) {},
    "2daf": function(t) {
        t.exports = JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_src","type":"address"},{"indexed":true,"internalType":"address","name":"_dest","type":"address"},{"indexed":false,"internalType":"uint256","name":"_deposits","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_payouts","type":"uint256"}],"name":"BalanceTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"}],"name":"BeneficiaryUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Checkin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DirectPayout","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"HeartBeat","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"interval","type":"uint256"}],"name":"HeartBeatIntervalUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"referrals","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total_deposits","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total_payouts","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total_structure","type":"uint256"}],"name":"Leaderboard","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LimitReached","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":true,"internalType":"address","name":"manager","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"ManagerUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"MatchPayout","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"NewAirdrop","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NewDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":true,"internalType":"address","name":"upline","type":"address"}],"name":"Upline","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"CompoundTax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ExitTax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_UINT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"airdrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"airdrops","outputs":[{"internalType":"uint256","name":"airdrops","type":"uint256"},{"internalType":"uint256","name":"airdrops_received","type":"uint256"},{"internalType":"uint256","name":"last_airdrop","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"balanceLevel","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"checkin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"claimsAvailable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractInfo","outputs":[{"internalType":"uint256","name":"_total_users","type":"uint256"},{"internalType":"uint256","name":"_total_deposited","type":"uint256"},{"internalType":"uint256","name":"_total_withdraw","type":"uint256"},{"internalType":"uint256","name":"_total_bnb","type":"uint256"},{"internalType":"uint256","name":"_total_txs","type":"uint256"},{"internalType":"uint256","name":"_total_airdrops","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"creditsAndDebits","outputs":[{"internalType":"uint256","name":"_credits","type":"uint256"},{"internalType":"uint256","name":"_debits","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"custody","outputs":[{"internalType":"address","name":"manager","type":"address"},{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"last_heartbeat","type":"uint256"},{"internalType":"uint256","name":"last_checkin","type":"uint256"},{"internalType":"uint256","name":"heartbeat_interval","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_upline","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit_bracket_size","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dripVaultAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"getCustody","outputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"_heartbeat_interval","type":"uint256"},{"internalType":"address","name":"_manager","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"uint8","name":"_level","type":"uint8"}],"name":"isBalanceCovered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"isNetPositive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"lastActivity","outputs":[{"internalType":"uint256","name":"_heartbeat","type":"uint256"},{"internalType":"uint256","name":"_lapsed_heartbeat","type":"uint256"},{"internalType":"uint256","name":"_checkin","type":"uint256"},{"internalType":"uint256","name":"_lapsed_checkin","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"maxPayoutOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"max_payout_cap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"payoutOf","outputs":[{"internalType":"uint256","name":"payout","type":"uint256"},{"internalType":"uint256","name":"max_payout","type":"uint256"},{"internalType":"uint256","name":"net_payout","type":"uint256"},{"internalType":"uint256","name":"sustainability_fee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ref_balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"roll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"sustainabilityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"testV3","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total_airdrops","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total_bnb","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total_deposited","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total_txs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total_users","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total_withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newCompoundTax","type":"uint256"}],"name":"updateCompoundTax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newBracketSize","type":"uint256"}],"name":"updateDepositBracketSize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newExitTax","type":"uint256"}],"name":"updateExitTax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_newRefBalances","type":"uint256[]"}],"name":"updateHoldRequirements","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newInitialDeposit","type":"uint256"}],"name":"updateInitialDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPayoutCap","type":"uint256"}],"name":"updateMaxPayoutCap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newPayoutRate","type":"uint256"}],"name":"updatePayoutRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newRefBonus","type":"uint256"}],"name":"updateRefBonus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newRefDepth","type":"uint256"}],"name":"updateRefDepth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"userInfo","outputs":[{"internalType":"address","name":"upline","type":"address"},{"internalType":"uint256","name":"deposit_time","type":"uint256"},{"internalType":"uint256","name":"deposits","type":"uint256"},{"internalType":"uint256","name":"payouts","type":"uint256"},{"internalType":"uint256","name":"direct_bonus","type":"uint256"},{"internalType":"uint256","name":"match_bonus","type":"uint256"},{"internalType":"uint256","name":"last_airdrop","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"userInfoTotals","outputs":[{"internalType":"uint256","name":"referrals","type":"uint256"},{"internalType":"uint256","name":"total_deposits","type":"uint256"},{"internalType":"uint256","name":"total_payouts","type":"uint256"},{"internalType":"uint256","name":"total_structure","type":"uint256"},{"internalType":"uint256","name":"airdrops_total","type":"uint256"},{"internalType":"uint256","name":"airdrops_received","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"address","name":"upline","type":"address"},{"internalType":"uint256","name":"referrals","type":"uint256"},{"internalType":"uint256","name":"total_structure","type":"uint256"},{"internalType":"uint256","name":"direct_bonus","type":"uint256"},{"internalType":"uint256","name":"match_bonus","type":"uint256"},{"internalType":"uint256","name":"deposits","type":"uint256"},{"internalType":"uint256","name":"deposit_time","type":"uint256"},{"internalType":"uint256","name":"payouts","type":"uint256"},{"internalType":"uint256","name":"rolls","type":"uint256"},{"internalType":"uint256","name":"ref_claim_pos","type":"uint256"},{"internalType":"uint256","name":"accumulatedDiv","type":"uint256"}],"stateMutability":"view","type":"function"}]')
    },
    "2f3f": function(t, e, n) {},
    3: function(t, e) {},
    "30d7": function(t, e, n) {
        "use strict";
        n("b5fc")
    },
    "3b8b": function(t, e, n) {},
    4: function(t, e) {},
    4678: function(t, e, n) {
        var a = {
            "./af": "2bfb",
            "./af.js": "2bfb",
            "./ar": "8e73",
            "./ar-dz": "a356",
            "./ar-dz.js": "a356",
            "./ar-kw": "423e",
            "./ar-kw.js": "423e",
            "./ar-ly": "1cfd",
            "./ar-ly.js": "1cfd",
            "./ar-ma": "0a84",
            "./ar-ma.js": "0a84",
            "./ar-sa": "8230",
            "./ar-sa.js": "8230",
            "./ar-tn": "6d83",
            "./ar-tn.js": "6d83",
            "./ar.js": "8e73",
            "./az": "485c",
            "./az.js": "485c",
            "./be": "1fc1",
            "./be.js": "1fc1",
            "./bg": "84aa",
            "./bg.js": "84aa",
            "./bm": "a7fa",
            "./bm.js": "a7fa",
            "./bn": "9043",
            "./bn-bd": "9686",
            "./bn-bd.js": "9686",
            "./bn.js": "9043",
            "./bo": "d26a",
            "./bo.js": "d26a",
            "./br": "6887",
            "./br.js": "6887",
            "./bs": "2554",
            "./bs.js": "2554",
            "./ca": "d716",
            "./ca.js": "d716",
            "./cs": "3c0d",
            "./cs.js": "3c0d",
            "./cv": "03ec",
            "./cv.js": "03ec",
            "./cy": "9797",
            "./cy.js": "9797",
            "./da": "0f14",
            "./da.js": "0f14",
            "./de": "b469",
            "./de-at": "b3eb",
            "./de-at.js": "b3eb",
            "./de-ch": "bb71",
            "./de-ch.js": "bb71",
            "./de.js": "b469",
            "./dv": "598a",
            "./dv.js": "598a",
            "./el": "8d47",
            "./el.js": "8d47",
            "./en-au": "0e6b",
            "./en-au.js": "0e6b",
            "./en-ca": "3886",
            "./en-ca.js": "3886",
            "./en-gb": "39a6",
            "./en-gb.js": "39a6",
            "./en-ie": "e1d3",
            "./en-ie.js": "e1d3",
            "./en-il": "7333",
            "./en-il.js": "7333",
            "./en-in": "ec2e",
            "./en-in.js": "ec2e",
            "./en-nz": "6f50",
            "./en-nz.js": "6f50",
            "./en-sg": "b7e9",
            "./en-sg.js": "b7e9",
            "./eo": "65db",
            "./eo.js": "65db",
            "./es": "898b",
            "./es-do": "0a3c",
            "./es-do.js": "0a3c",
            "./es-mx": "b5b7",
            "./es-mx.js": "b5b7",
            "./es-us": "55c9",
            "./es-us.js": "55c9",
            "./es.js": "898b",
            "./et": "ec18",
            "./et.js": "ec18",
            "./eu": "0ff2",
            "./eu.js": "0ff2",
            "./fa": "8df4",
            "./fa.js": "8df4",
            "./fi": "81e9",
            "./fi.js": "81e9",
            "./fil": "d69a",
            "./fil.js": "d69a",
            "./fo": "0721",
            "./fo.js": "0721",
            "./fr": "9f26",
            "./fr-ca": "d9f8",
            "./fr-ca.js": "d9f8",
            "./fr-ch": "0e49",
            "./fr-ch.js": "0e49",
            "./fr.js": "9f26",
            "./fy": "7118",
            "./fy.js": "7118",
            "./ga": "5120",
            "./ga.js": "5120",
            "./gd": "f6b4",
            "./gd.js": "f6b4",
            "./gl": "8840",
            "./gl.js": "8840",
            "./gom-deva": "aaf2",
            "./gom-deva.js": "aaf2",
            "./gom-latn": "0caa",
            "./gom-latn.js": "0caa",
            "./gu": "e0c5",
            "./gu.js": "e0c5",
            "./he": "c7aa",
            "./he.js": "c7aa",
            "./hi": "dc4d",
            "./hi.js": "dc4d",
            "./hr": "4ba9",
            "./hr.js": "4ba9",
            "./hu": "5b14",
            "./hu.js": "5b14",
            "./hy-am": "d6b6",
            "./hy-am.js": "d6b6",
            "./id": "5038",
            "./id.js": "5038",
            "./is": "0558",
            "./is.js": "0558",
            "./it": "6e98",
            "./it-ch": "6f12",
            "./it-ch.js": "6f12",
            "./it.js": "6e98",
            "./ja": "079e",
            "./ja.js": "079e",
            "./jv": "b540",
            "./jv.js": "b540",
            "./ka": "201b",
            "./ka.js": "201b",
            "./kk": "6d79",
            "./kk.js": "6d79",
            "./km": "e81d",
            "./km.js": "e81d",
            "./kn": "3e92",
            "./kn.js": "3e92",
            "./ko": "22f8",
            "./ko.js": "22f8",
            "./ku": "2421",
            "./ku.js": "2421",
            "./ky": "9609",
            "./ky.js": "9609",
            "./lb": "440c",
            "./lb.js": "440c",
            "./lo": "b29d",
            "./lo.js": "b29d",
            "./lt": "26f9",
            "./lt.js": "26f9",
            "./lv": "b97c",
            "./lv.js": "b97c",
            "./me": "293c",
            "./me.js": "293c",
            "./mi": "688b",
            "./mi.js": "688b",
            "./mk": "6909",
            "./mk.js": "6909",
            "./ml": "02fb",
            "./ml.js": "02fb",
            "./mn": "958b",
            "./mn.js": "958b",
            "./mr": "39bd",
            "./mr.js": "39bd",
            "./ms": "ebe4",
            "./ms-my": "6403",
            "./ms-my.js": "6403",
            "./ms.js": "ebe4",
            "./mt": "1b45",
            "./mt.js": "1b45",
            "./my": "8689",
            "./my.js": "8689",
            "./nb": "6ce3",
            "./nb.js": "6ce3",
            "./ne": "3a39",
            "./ne.js": "3a39",
            "./nl": "facd",
            "./nl-be": "db29",
            "./nl-be.js": "db29",
            "./nl.js": "facd",
            "./nn": "b84c",
            "./nn.js": "b84c",
            "./oc-lnc": "167b",
            "./oc-lnc.js": "167b",
            "./pa-in": "f3ff",
            "./pa-in.js": "f3ff",
            "./pl": "8d57",
            "./pl.js": "8d57",
            "./pt": "f260",
            "./pt-br": "d2d4",
            "./pt-br.js": "d2d4",
            "./pt.js": "f260",
            "./ro": "972c",
            "./ro.js": "972c",
            "./ru": "957c",
            "./ru.js": "957c",
            "./sd": "6784",
            "./sd.js": "6784",
            "./se": "ffff",
            "./se.js": "ffff",
            "./si": "eda5",
            "./si.js": "eda5",
            "./sk": "7be6",
            "./sk.js": "7be6",
            "./sl": "8155",
            "./sl.js": "8155",
            "./sq": "c8f3",
            "./sq.js": "c8f3",
            "./sr": "cf1e",
            "./sr-cyrl": "13e9",
            "./sr-cyrl.js": "13e9",
            "./sr.js": "cf1e",
            "./ss": "52bd",
            "./ss.js": "52bd",
            "./sv": "5fbd",
            "./sv.js": "5fbd",
            "./sw": "74dc",
            "./sw.js": "74dc",
            "./ta": "3de5",
            "./ta.js": "3de5",
            "./te": "5cbb",
            "./te.js": "5cbb",
            "./tet": "576c",
            "./tet.js": "576c",
            "./tg": "3b1b",
            "./tg.js": "3b1b",
            "./th": "10e8",
            "./th.js": "10e8",
            "./tk": "5aff",
            "./tk.js": "5aff",
            "./tl-ph": "0f38",
            "./tl-ph.js": "0f38",
            "./tlh": "cf755",
            "./tlh.js": "cf755",
            "./tr": "0e81",
            "./tr.js": "0e81",
            "./tzl": "cf51",
            "./tzl.js": "cf51",
            "./tzm": "c109",
            "./tzm-latn": "b53d",
            "./tzm-latn.js": "b53d",
            "./tzm.js": "c109",
            "./ug-cn": "6117",
            "./ug-cn.js": "6117",
            "./uk": "ada2",
            "./uk.js": "ada2",
            "./ur": "5294",
            "./ur.js": "5294",
            "./uz": "2e8c",
            "./uz-latn": "010e",
            "./uz-latn.js": "010e",
            "./uz.js": "2e8c",
            "./vi": "2921",
            "./vi.js": "2921",
            "./x-pseudo": "fd7e",
            "./x-pseudo.js": "fd7e",
            "./yo": "7f33",
            "./yo.js": "7f33",
            "./zh-cn": "5c3a",
            "./zh-cn.js": "5c3a",
            "./zh-hk": "49ab",
            "./zh-hk.js": "49ab",
            "./zh-mo": "3a6c",
            "./zh-mo.js": "3a6c",
            "./zh-tw": "90ea",
            "./zh-tw.js": "90ea"
        };

        function r(t) {
            var e = s(t);
            return n(e)
        }

        function s(t) {
            if (!n.o(a, t)) {
                var e = new Error("Cannot find module '" + t + "'");
                throw e.code = "MODULE_NOT_FOUND", e
            }
            return a[t]
        }
        r.keys = function() {
            return Object.keys(a)
        }, r.resolve = s, t.exports = r, r.id = "4678"
    },
    "48d2": function(t, e, n) {
        "use strict";
        n("5ee3")
    },
    "4a9e": function(t, e, n) {},
    "4dc8": function(t, e, n) {
        t.exports = n.p + "img/handshake.3a4d787d.svg"
    },
    5: function(t, e) {},
    "56d7": function(t, e, n) {
        "use strict";
        n.r(e);
        n("e260"), n("e6cf"), n("cca6"), n("a79d");
        var a = n("1da1"),
            r = (n("96cf"), n("b680"), n("a9e3"), n("2b0e")),
            s = n("2f62"),
            i = {
                state: function() {
                    return {
                        Buddy: {
                            currentBuddy: "N/A"
                        }
                    }
                },
                mutations: {
                    updateBuddyData: function(t, e) {
                        t.Buddy = e
                    }
                },
                getters: {}
            },
            o = n("99e5"),
            u = n.n(o),
            c = {
                state: function() {
                    return {
                        DripToken: {
                            UserBalance: "N/A",
                            TotalTransactions: "0",
                            Players: "0",
                            Mined: "0"
                        },
                        DripTokenEvents: {
                            Transfers: []
                        }
                    }
                },
                mutations: {
                    updateDripTokenData: function(t, e) {
                        t.DripToken = e
                    },
                    updateDripEvents: function(t, e) {
                        t.DripTokenEvents = e
                    }
                },
                getters: {
                    UserDripBalance: function(t) {
                        return "N/A" === t.DripToken.UserBalance ? "N/A" : u.a.utils.fromWei(t.DripToken.UserBalance)
                    }
                }
            },
            l = n("db49"),
            p = n.n(l),
            d = {
                state: function() {
                    return {
                        Faucet: {
                            UserTotals: {
                                referrals: "...",
                                total_deposits: "...",
                                total_payouts: "...",
                                total_structure: "...",
                                airdrops_total: "...",
                                airdrops_received: "..."
                            },
                            User: {
                                upline: "None",
                                deposit_time: "...",
                                deposits: "...",
                                payouts: "...",
                                direct_bonus: "...",
                                match_bonus: "...",
                                last_airdrop: "..."
                            },
                            Payout: {
                                max_payout: "...",
                                net_payout: "...",
                                payout: "...",
                                sustainability_fee: "..."
                            },
                            Totals: {
                                _total_users: "0",
                                _total_deposited: "0",
                                _total_withdraw: "0",
                                _total_trx: "0",
                                _total_txs: "0",
                                _total_airdrops: "0"
                            },
                            Custody: {
                                _beneficiary: "None",
                                _heartbeat_interval: "0",
                                _manager: "None"
                            },
                            Activity: {
                                _heartbeat: "0",
                                _lapsed_heartbeat: "0",
                                _checkin: "0",
                                _lapsed_checkin: "0"
                            }
                        }
                    }
                },
                mutations: {
                    updateFaucetData: function(t, e) {
                        t.Faucet = e
                    }
                },
                getters: {
                    MaxPayout: function(t) {
                        return "" === t.Faucet.Payout.max_payout ? "..." : t.Faucet.Payout.max_payout / p.a.DRIP_TOKEN_DECIMAL_NEW
                    }
                }
            },
            m = {
                state: function() {
                    return {
                        Reservoir: {
                            User: {
                                stats: {
                                    withdrawn: "...",
                                    taxed: "...",
                                    reinvested: "...",
                                    compoundCount: "..."
                                },
                                balance: "...",
                                divs: "...",
                                estimateBnb: "...",
                                divsBnb: "...",
                                balanceBnb: "..."
                            },
                            Totals: {
                                totalTxs: "...",
                                players: "...",
                                tokenBalance: "...",
                                tokenBalanceBnb: "...",
                                totalSupply: "...",
                                dividendBalance: "...",
                                totalDrip: "...",
                                lockedBalance: "..."
                            }
                        }
                    }
                },
                mutations: {
                    updateReservoirData: function(t, e) {
                        t.Reservoir = e
                    }
                },
                getters: {}
            },
            f = m,
            h = {
                state: function() {
                    return {
                        Fountain: {
                            totalTxs: "...",
                            players: "...",
                            bnbBalance: "...",
                            totalDrip: "...",
                            price: "...",
                            priceEther: "...",
                            supply: "..."
                        },
                        FountainTokenEvents: {
                            Buys: [],
                            Sells: []
                        }
                    }
                },
                mutations: {
                    updateFountain: function(t, e) {
                        t.Fountain = e
                    },
                    updateFountainEvents: function(t, e) {
                        t.FountainTokenEvents = e
                    }
                },
                getters: {}
            },
            y = {
                state: function() {
                    return {
                        TokenMint: {
                            difficulty: "N/A"
                        }
                    }
                },
                mutations: {
                    updateTokenMintData: function(t, e) {
                        t.TokenMint = e
                    }
                },
                getters: {
                    difficulty: function(t) {
                        return 100
                    }
                }
            },
            b = (n("d3b7"), n("99af"), {
                methods: {
                    showSuccessModal: function(t, e, n) {
                        var a = this.$createElement,
                            r = a("div", {
                                class: ["foobar"]
                            }, [a("h3", {
                                class: []
                            }, [e]), a("p", {
                                class: []
                            }, [n])]);
                        this.$bvModal.msgBoxOk([r], {
                            title: t
                        })
                    },
                    showWarningModal: function(t, e, n) {
                        var a = this.$createElement,
                            r = a("div", {
                                class: ["foobar"]
                            }, [a("h3", {
                                class: []
                            }, [e]), a("p", {
                                class: []
                            }, [n])]);
                        this.$bvModal.msgBoxOk([r], {
                            title: t
                        })
                    },
                    showErrorModal: function(t, e, n) {
                        var a = this.$createElement,
                            r = a("div", {
                                class: ["foobar"]
                            }, [a("h3", {
                                class: []
                            }, [e]), a("p", {
                                class: []
                            }, [n])]);
                        this.$bvModal.msgBoxOk([r], {
                            title: t
                        })
                    },
                    showTemporaryClosed: function() {
                        var t = this.$createElement,
                            e = t("div", {
                                class: ["foobar"]
                            }, [t("h3", {
                                class: []
                            }, ["Not live yet!"]), t("p", {
                                class: []
                            }, [""])]);
                        this.$bvModal.msgBoxOk([e], {
                            title: "Swaps will open shortly!"
                        })
                    },
                    showUnconnectedWalletErrorModal: function() {
                        var t = this.$createElement,
                            e = t("div", {
                                class: ["foobar"]
                            }, [t("h3", {
                                class: []
                            }, ["No wallet connected!"]), t("p", {
                                class: []
                            }, ["Please connect your wallet first to continue!"])]);
                        this.$bvModal.msgBoxOk([e], {
                            title: "Please connect your wallet to continue!"
                        })
                    },
                    showWrongNetworkErrorModal: function() {
                        var t = this.$createElement,
                            e = t("div", {
                                class: ["foobar"]
                            }, [t("h3", {
                                class: []
                            }, ["Wrong network!"]), t("p", {
                                class: []
                            }, ["Please connect to the BSC Mainnet to continue!"])]);
                        this.$bvModal.msgBoxOk([e], {
                            title: "Connection Error!"
                        })
                    },
                    showMaintainanceModal: function() {
                        var t = this.$createElement,
                            e = t("div", {
                                class: ["foobar"]
                            }, [t("h3", {
                                class: []
                            }, ["Current undergoing maintenance"]), t("p", {
                                class: []
                            }, ["We will enable functionality soon! Announcements will follow in our Telegram group!"])]);
                        this.$bvModal.msgBoxOk([e], {
                            title: "Notice"
                        })
                    },
                    showInvalidAddressModal: function(t) {
                        var e = "Invalid Address",
                            n = "Please input a valid BEP20 address!",
                            a = this.$createElement,
                            r = a("div", {
                                class: ["foobar"]
                            }, [a("h3", {
                                class: []
                            }, [n]), a("p", {
                                class: []
                            }, [t])]);
                        this.$bvModal.msgBoxOk([r], {
                            title: e
                        })
                    },
                    showTransactionSuccessModal: function(t, e) {
                        var n = "Transaction Success",
                            a = this.$createElement,
                            r = a("div", {
                                class: ["foobar"]
                            }, [a("h3", {
                                class: []
                            }, [t]), a("p", {
                                class: []
                            }, ["Your transaction link:"]), a("a", {
                                class: [],
                                attrs: {
                                    href: "".concat(p.a.GetBscscanBaseUrl(), "/tx/").concat(e),
                                    target: "_blank"
                                }
                            }, ["link"])]);
                        this.$bvModal.msgBoxOk([r], {
                            title: n
                        })
                    },
                    showTransactionErrorModal: function(t) {
                        var e = "Transaction Failed",
                            n = "Something went wrong...",
                            a = this.$createElement,
                            r = a("div", {
                                class: ["foobar"]
                            }, [a("h3", {
                                class: []
                            }, [n]), a("p", {
                                class: []
                            }, [t])]);
                        this.$bvModal.msgBoxOk([r], {
                            title: e
                        })
                    }
                },
                mounted: function() {},
                destroyed: function() {}
            }),
            v = n("6612"),
            w = n.n(v);

        function g(t) {
            return isNaN(t) ? "..." : w()(u.a.utils.fromWei(String(t))).format("0,0.000 a").toUpperCase()
        }

        function x(t, e) {
            return "..." === t ? t : Number(u.a.utils.fromWei(t)).toFixed(e)
        }

        function _(t) {
            return t.substring(0, 5) + "..." + t.substring(t.length - 4, t.length)
        }

        function k(t, e, n, a) {
            return {
                headerText: t,
                statValue: e,
                subText: n,
                icon: a
            }
        }

        function C(t, e, n) {
            return {
                text: t,
                value: e,
                icon: n
            }
        }

        function T(t, e, n) {
            n = n || {};
            var a = n.expires;
            if ("number" == typeof a && a) {
                var r = new Date;
                r.setTime(r.getTime() + 1e3 * a), a = n.expires = r
            }
            a && a.toUTCString && (n.expires = a.toUTCString()), e = encodeURIComponent(e);
            var s = t + "=" + e;
            for (var i in n) {
                s += "; " + i;
                var o = n[i];
                !0 !== o && (s += "=" + o)
            }
            console.log(s), document.cookie = s
        }

        function D(t) {
            T("googtrans", "/en/".concat(t), {
                expires: 365,
                path: "/"
            }), T("googtrans", "/en/".concat(t), {
                expires: 365,
                path: "/",
                domain: "." + location.hostname
            }), location.reload()
        }
        r["default"].use(s["a"]);
        var A = new s["a"].Store({
                modules: {
                    BuddyStore: i,
                    DripStore: c,
                    Faucet: d,
                    Reservoir: f,
                    FountainStore: h,
                    TokenMintStore: y
                },
                state: {
                    Provider: {
                        connectedWallet: "",
                        networkId: "",
                        IsConnectionOk: !1,
                        IsConnected: !1
                    },
                    Prices: {
                        wbnb: {
                            usd: 0
                        },
                        chartData: []
                    },
                    ConnectedAccount: "",
                    IsConnectionOk: !0,
                    General: {
                        UserBnbBalance: 0
                    }
                },
                mutations: {
                    updateProvider: function(t, e) {
                        t.Provider = e
                    },
                    updateConnectedAccount: function(t, e) {
                        t.ConnectedAccount = e
                    },
                    updateIsConnectionOk: function(t, e) {
                        t.IsConnectionOk = e
                    },
                    updatePrices: function(t, e) {
                        t.Prices.wbnb = e.wbnb
                    },
                    updateGeneral: function(t, e) {
                        t.General = e
                    },
                    updateChartPrice: function(t, e) {
                        t.Prices.chartData = e
                    }
                },
                getters: {
                    UserBnbBalance: function(t) {
                        var e = u.a.utils.fromWei(String(t.General.UserBnbBalance));
                        return Number(e).toFixed(4)
                    },
                    DripUSDPrice: function(t) {
                        if (isNaN(t.FountainStore.Fountain.price)) return 0;
                        var e = t.Prices.wbnb.usd * t.FountainStore.Fountain.price;
                        return e
                    }
                }
            }),
            R = n("bc3a"),
            B = n.n(R),
            M = n("2edf"),
            S = new M,
            P = {
                wbnb: void 0
            };

        function E() {
            return j.apply(this, arguments)
        }

        function j() {
            return j = Object(a["a"])(regeneratorRuntime.mark((function t() {
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, U();
                        case 2:
                            return t.next = 4, O();
                        case 4:
                            setInterval(U, 3e4), setInterval(O, 3e5);
                        case 6:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), j.apply(this, arguments)
        }

        function O() {
            return I.apply(this, arguments)
        }

        function I() {
            return I = Object(a["a"])(regeneratorRuntime.mark((function t() {
                var e;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.prev = 0, t.next = 3, B.a.get("".concat(l["ActiveUrl"], "/prices/"));
                        case 3:
                            e = t.sent, A.commit("updateChartPrice", e.data), t.next = 10;
                            break;
                        case 7:
                            t.prev = 7, t.t0 = t["catch"](0), console.error("Unable to get Price data", t.t0.message);
                        case 10:
                        case "end":
                            return t.stop()
                    }
                }), t, null, [
                    [0, 7]
                ])
            }))), I.apply(this, arguments)
        }

        function U() {
            return N.apply(this, arguments)
        }

        function N() {
            return N = Object(a["a"])(regeneratorRuntime.mark((function t() {
                var e;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.prev = 0, t.next = 3, S.simple.price({
                                ids: ["wbnb"]
                            });
                        case 3:
                            e = t.sent, 200 === e.code && F(e.data), t.next = 10;
                            break;
                        case 7:
                            t.prev = 7, t.t0 = t["catch"](0), console.error("Error getting prices from CoinGecko: ", t.t0);
                        case 10:
                        case "end":
                            return t.stop()
                    }
                }), t, null, [
                    [0, 7]
                ])
            }))), N.apply(this, arguments)
        }

        function F(t) {
            A.commit("updatePrices", t)
        }
        var W, $, L = {
                Prices: P,
                Initialize: E
            },
            z = n("5aac"),
            V = n.n(z),
            G = n("2eaf"),
            q = n("d2d0"),
            H = {
                56: "binance",
                97: "binance-testnet"
            },
            Y = "0x0000000000000000000000000000000000000000",
            K = 86400,
            J = u.a.utils.toWei("1", "ether"),
            X = n("3835");
        n("3ca3"), n("ddb0");

        function Q(t, e) {
            return Z.apply(this, arguments)
        }

        function Z() {
            return Z = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return W = n, $ = e, t.next = 4, tt();
                        case 4:
                            setInterval(tt, p.a.RefreshRate);
                        case 5:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Z.apply(this, arguments)
        }

        function tt() {
            return et.apply(this, arguments)
        }

        function et() {
            return et = Object(a["a"])(regeneratorRuntime.mark((function t() {
                var e, n, a, r;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Promise.all([$.eth.getBalance(W)]);
                        case 2:
                            e = t.sent, n = Object(X["a"])(e, 1), a = n[0], r = {
                                UserBnbBalance: a
                            }, A.commit("updateGeneral", r);
                        case 7:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), et.apply(this, arguments)
        }
        var nt, at, rt = {
                Initialize: Q,
                GetStats: tt
            },
            st = n("2daf");

        function it(t, e) {
            return ot.apply(this, arguments)
        }

        function ot() {
            return ot = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return nt = new e.eth.Contract(st, p.a.FAUCET_ADDRESS, (function(t, e) {
                                t && console.log(t)
                            })), at = n, t.next = 4, ut();
                        case 4:
                            setInterval(ut, p.a.RefreshRate);
                        case 5:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), ot.apply(this, arguments)
        }

        function ut() {
            return ct.apply(this, arguments)
        }

        function ct() {
            return ct = Object(a["a"])(regeneratorRuntime.mark((function t() {
                var e, n, a, r, s, i, o, u, c;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Promise.all([nt.methods.userInfoTotals(at).call(), nt.methods.userInfo(at).call(), nt.methods.payoutOf(at).call(), nt.methods.contractInfo().call(), nt.methods.getCustody(at).call(), nt.methods.lastActivity(at).call()]);
                        case 2:
                            e = t.sent, n = Object(X["a"])(e, 6), a = n[0], r = n[1], s = n[2], i = n[3], o = n[4], u = n[5], c = {
                                UserTotals: a,
                                User: r,
                                Payout: s,
                                Totals: i,
                                Custody: o,
                                Activity: u
                            }, c.User.upline = lt(c.User.upline), c.Custody._beneficiary = lt(c.Custody._beneficiary), c.Custody._manager = lt(c.Custody._manager), A.commit("updateFaucetData", c);
                        case 15:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), ct.apply(this, arguments)
        }

        function lt(t) {
            return t === Y ? "None" : t
        }

        function pt(t) {
            return dt.apply(this, arguments)
        }

        function dt() {
            return dt = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return n = nt.methods.userInfo(e).call(), t.abrupt("return", n);
                        case 2:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), dt.apply(this, arguments)
        }

        function mt(t) {
            return ft.apply(this, arguments)
        }

        function ft() {
            return ft = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return n = nt.methods.payoutOf(e).call(), t.abrupt("return", n);
                        case 2:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), ft.apply(this, arguments)
        }

        function ht(t) {
            return yt.apply(this, arguments)
        }

        function yt() {
            return yt = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return n = nt.methods.userInfoTotals(e).call(), t.abrupt("return", n);
                        case 2:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), yt.apply(this, arguments)
        }

        function bt(t) {
            return vt.apply(this, arguments)
        }

        function vt() {
            return vt = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return n = nt.methods.isNetPositive(e).call(), t.abrupt("return", n);
                        case 2:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), vt.apply(this, arguments)
        }

        function wt(t) {
            return gt.apply(this, arguments)
        }

        function gt() {
            return gt = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return n = nt.methods.creditsAndDebits(e).call(), t.abrupt("return", n);
                        case 2:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), gt.apply(this, arguments)
        }

        function xt(t) {
            return _t.apply(this, arguments)
        }

        function _t() {
            return _t = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n, a, r, s, i;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Promise.all([nt.methods.userInfoTotals(e).call(), nt.methods.userInfo(e).call(), nt.methods.creditsAndDebits(e).call()]);
                        case 2:
                            return n = t.sent, a = Object(X["a"])(n, 3), r = a[0], s = a[1], i = a[2], t.abrupt("return", {
                                info: r,
                                airdropInfo: s,
                                credits: i
                            });
                        case 8:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), _t.apply(this, arguments)
        }

        function kt(t) {
            return Ct.apply(this, arguments)
        }

        function Ct() {
            return Ct = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n, a, r, s;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Promise.all([nt.methods.userInfoTotals(e).call(), nt.methods.creditsAndDebits(e).call()]);
                        case 2:
                            return n = t.sent, a = Object(X["a"])(n, 2), r = a[0], s = a[1], t.abrupt("return", {
                                info: r,
                                credits: s
                            });
                        case 7:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Ct.apply(this, arguments)
        }

        function Tt(t, e) {
            return Dt.apply(this, arguments)
        }

        function Dt() {
            return Dt = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                var a;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, nt.methods.deposit(e, n).send({
                                from: at
                            });
                        case 2:
                            return a = t.sent, t.abrupt("return", a);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Dt.apply(this, arguments)
        }

        function At(t, e) {
            return Rt.apply(this, arguments)
        }

        function Rt() {
            return Rt = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                var a;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, nt.methods.depositFor(e, n).send({
                                from: at
                            });
                        case 2:
                            return a = t.sent, t.abrupt("return", a);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Rt.apply(this, arguments)
        }

        function Bt(t) {
            return Mt.apply(this, arguments)
        }

        function Mt() {
            return Mt = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, nt.methods.rollFor(e).send({
                                from: at
                            });
                        case 2:
                            return n = t.sent, t.abrupt("return", n);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Mt.apply(this, arguments)
        }

        function St() {
            return Pt.apply(this, arguments)
        }

        function Pt() {
            return Pt = Object(a["a"])(regeneratorRuntime.mark((function t() {
                var e;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, nt.methods.roll().send({
                                from: at
                            });
                        case 2:
                            return e = t.sent, t.abrupt("return", e);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Pt.apply(this, arguments)
        }

        function Et() {
            return jt.apply(this, arguments)
        }

        function jt() {
            return jt = Object(a["a"])(regeneratorRuntime.mark((function t() {
                var e;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, nt.methods.claim().send({
                                from: at
                            });
                        case 2:
                            return e = t.sent, t.abrupt("return", e);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), jt.apply(this, arguments)
        }

        function Ot(t) {
            return It.apply(this, arguments)
        }

        function It() {
            return It = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, nt.methods.claim(e).send({
                                from: at
                            });
                        case 2:
                            return n = t.sent, t.abrupt("return", n);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), It.apply(this, arguments)
        }

        function Ut(t) {
            return Nt.apply(this, arguments)
        }

        function Nt() {
            return Nt = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, nt.methods.updateManager(e).send({
                                from: at
                            });
                        case 2:
                            return n = t.sent, t.abrupt("return", n);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Nt.apply(this, arguments)
        }

        function Ft(t, e) {
            return Wt.apply(this, arguments)
        }

        function Wt() {
            return Wt = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                var a;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, nt.methods.updateBeneficiary(e, n).send({
                                from: at
                            });
                        case 2:
                            return a = t.sent, t.abrupt("return", a);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Wt.apply(this, arguments)
        }

        function $t(t, e) {
            return Lt.apply(this, arguments)
        }

        function Lt() {
            return Lt = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                var a;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, nt.methods.airdrop(e, n).send({
                                from: at
                            });
                        case 2:
                            return a = t.sent, t.abrupt("return", a);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Lt.apply(this, arguments)
        }

        function zt(t, e) {
            return Vt.apply(this, arguments)
        }

        function Vt() {
            return Vt = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                var a;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, nt.methods.isManager(e, n).call();
                        case 2:
                            return a = t.sent, t.abrupt("return", a);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Vt.apply(this, arguments)
        }

        function Gt() {
            return qt.apply(this, arguments)
        }

        function qt() {
            return qt = Object(a["a"])(regeneratorRuntime.mark((function t() {
                var e;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, nt.getPastEvents("NewAirdrop", {
                                filter: {},
                                fromBlock: 0,
                                toBlock: "latest"
                            });
                        case 2:
                            return e = t.sent, t.abrupt("return", e);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), qt.apply(this, arguments)
        }
        var Ht, Yt, Kt = {
                Initialize: it,
                GetStats: ut,
                GetUserInfo: pt,
                GetUserInfoTotals: ht,
                Deposit: Tt,
                Compound: St,
                Claim: Et,
                LookupPlayer: xt,
                Airdrop: $t,
                GetUserNetPositive: bt,
                GetUserCredits: wt,
                LookupPlayer2: kt
            },
            Jt = n("742a");

        function Xt(t, e) {
            return Qt.apply(this, arguments)
        }

        function Qt() {
            return Qt = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return e, Ht = new e.eth.Contract(Jt, p.a.FOUNTAIN_ADDRESS, (function(t, e) {
                                t && console.log(t)
                            })), Yt = n, t.next = 5, Zt();
                        case 5:
                            setInterval(Zt, p.a.RefreshRate);
                        case 6:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Qt.apply(this, arguments)
        }

        function Zt() {
            return te.apply(this, arguments)
        }

        function te() {
            return te = Object(a["a"])(regeneratorRuntime.mark((function t() {
                var e, n, a, r, s, i, o, c, l;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Promise.all([Ht.methods.totalTxs().call(), Ht.methods.providers().call(), Ht.methods.bnbBalance().call(), Ht.methods.tokenBalance().call(), Ht.methods.getTokenToBnbInputPrice(J).call(), Ht.methods.totalSupply().call()]);
                        case 2:
                            e = t.sent, n = Object(X["a"])(e, 6), a = n[0], r = n[1], s = n[2], i = n[3], o = n[4], c = n[5], l = {
                                totalTxs: a,
                                players: r,
                                bnbBalance: s,
                                totalDrip: i,
                                price: o,
                                priceEther: u.a.utils.fromWei(o),
                                supply: c
                            }, A.commit("updateFountain", l);
                        case 12:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), te.apply(this, arguments)
        }

        function ee(t, e) {
            return ne.apply(this, arguments)
        }

        function ne() {
            return ne = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                var a;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Ht.methods.bnbToTokenSwapInput(n).send({
                                from: Yt,
                                value: e
                            });
                        case 2:
                            return a = t.sent, t.abrupt("return", a);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), ne.apply(this, arguments)
        }

        function ae(t, e) {
            return re.apply(this, arguments)
        }

        function re() {
            return re = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                var a;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Ht.methods.tokenToBnbSwapInput(e, n).send({
                                from: Yt
                            });
                        case 2:
                            return a = t.sent, t.abrupt("return", a);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), re.apply(this, arguments)
        }

        function se(t) {
            return ie.apply(this, arguments)
        }

        function ie() {
            return ie = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Ht.methods.getBnbToTokenInputPrice(e).call();
                        case 2:
                            return n = t.sent, t.abrupt("return", n);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), ie.apply(this, arguments)
        }

        function oe(t) {
            return ue.apply(this, arguments)
        }

        function ue() {
            return ue = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Ht.methods.getTokenToBnbInputPrice(e).call();
                        case 2:
                            return n = t.sent, t.abrupt("return", n);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), ue.apply(this, arguments)
        }
        var ce, le, pe = {
                Initialize: Xt,
                GetStats: Zt,
                GetBnbToTokenInputPrice: se,
                GetTokenToBnbInputPrice: oe,
                BuyDripWithBnb: ee,
                SellDripForBnb: ae
            },
            de = n("13a5");

        function me(t, e) {
            return fe.apply(this, arguments)
        }

        function fe() {
            return fe = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return e, ce = new e.eth.Contract(de, p.a.DRIP_TOKEN_ADDRESS, (function(t, e) {
                                t && console.log(t)
                            })), le = n, t.next = 5, he();
                        case 5:
                            setInterval(he, p.a.RefreshRate);
                        case 6:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), fe.apply(this, arguments)
        }

        function he() {
            return ye.apply(this, arguments)
        }

        function ye() {
            return ye = Object(a["a"])(regeneratorRuntime.mark((function t() {
                var e, n, a, r, s, i, o;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Promise.all([ce.methods.balanceOf(le).call(), ce.methods.totalTxs().call(), ce.methods.players().call(), ce.methods.mintedSupply().call()]);
                        case 2:
                            e = t.sent, n = Object(X["a"])(e, 4), a = n[0], r = n[1], s = n[2], i = n[3], o = {
                                UserBalance: a,
                                TotalTransactions: r,
                                Players: s,
                                Mined: i
                            }, A.commit("updateDripTokenData", o);
                        case 10:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), ye.apply(this, arguments)
        }

        function be(t) {
            return ve.apply(this, arguments)
        }

        function ve() {
            return ve = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, ce.methods.allowance(le, e).call();
                        case 2:
                            return n = t.sent, t.abrupt("return", n);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), ve.apply(this, arguments)
        }

        function we() {
            return ge.apply(this, arguments)
        }

        function ge() {
            return ge = Object(a["a"])(regeneratorRuntime.mark((function t() {
                var e;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, ce.methods.allowance(le, p.a.FAUCET_ADDRESS).call();
                        case 2:
                            return e = t.sent, t.abrupt("return", e);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), ge.apply(this, arguments)
        }

        function xe(t, e) {
            return _e.apply(this, arguments)
        }

        function _e() {
            return _e = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, ce.methods.approve(e, u.a.utils.toWei(n)).send({
                                from: le
                            });
                        case 2:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), _e.apply(this, arguments)
        }

        function ke() {
            return Ce.apply(this, arguments)
        }

        function Ce() {
            return Ce = Object(a["a"])(regeneratorRuntime.mark((function t() {
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, ce.methods.approve(p.a.FAUCET_ADDRESS, u.a.utils.toWei("9999999")).send({
                                from: le
                            });
                        case 2:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Ce.apply(this, arguments)
        }

        function Te(t) {
            return De.apply(this, arguments)
        }

        function De() {
            return De = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, ce.methods.balanceOf(e).call();
                        case 2:
                            return n = t.sent, t.abrupt("return", n);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), De.apply(this, arguments)
        }

        function Ae() {
            return Re.apply(this, arguments)
        }

        function Re() {
            return Re = Object(a["a"])(regeneratorRuntime.mark((function t() {
                var e;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, ce.methods.allowance(le, p.a.FAUCET_ADDRESS).call();
                        case 2:
                            return e = t.sent, t.abrupt("return", "0" !== e);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Re.apply(this, arguments)
        }
        var Be, Me, Se = {
                Initialize: me,
                GetStats: he,
                getAllowance: we,
                setAllowance: ke,
                getBalance: Te,
                isAirdropEnabled: Ae,
                getAllowanceV2: be,
                setAllowanceV2: xe
            },
            Pe = n("7866");

        function Ee(t, e) {
            return je.apply(this, arguments)
        }

        function je() {
            return je = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return Be = new e.eth.Contract(Pe, p.a.BUDDY_ADDRESS, (function(t, e) {
                                t && console.log(t)
                            })), Me = n, t.next = 4, Oe();
                        case 4:
                            setInterval(Oe, p.a.RefreshRate);
                        case 5:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), je.apply(this, arguments)
        }

        function Oe() {
            return Ie.apply(this, arguments)
        }

        function Ie() {
            return Ie = Object(a["a"])(regeneratorRuntime.mark((function t() {
                var e, n, a, r;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Promise.all([Be.methods.buddyOf(Me).call()]);
                        case 2:
                            e = t.sent, n = Object(X["a"])(e, 1), a = n[0], r = {
                                currentBuddy: a
                            }, A.commit("updateBuddyData", r);
                        case 7:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Ie.apply(this, arguments)
        }

        function Ue(t) {
            return Ne.apply(this, arguments)
        }

        function Ne() {
            return Ne = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Be.methods.updateBuddy(e).send({
                                from: Me
                            });
                        case 2:
                            return n = t.sent, t.abrupt("return", n);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Ne.apply(this, arguments)
        }
        var Fe, We, $e = {
                Initialize: Ee,
                GetStats: Oe,
                UpdateBuddy: Ue
            },
            Le = n("6b5f");

        function ze(t, e) {
            return Ve.apply(this, arguments)
        }

        function Ve() {
            return Ve = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return Fe = new e.eth.Contract(Le, p.a.RESERVOIR_ADDRESS, (function(t, e) {
                                t && console.log(t)
                            })), We = n, t.next = 4, Ge();
                        case 4:
                            setInterval(Ge, p.a.RefreshRate);
                        case 5:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Ve.apply(this, arguments)
        }

        function Ge() {
            return qe.apply(this, arguments)
        }

        function qe() {
            return qe = Object(a["a"])(regeneratorRuntime.mark((function t() {
                var e, n, a, r, s, i, o, u, c, l, p, d, m, f, h, y, b, v, w, g, x, _, k;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Promise.all([Fe.methods.statsOf(We).call(), Fe.methods.balanceOf(We).call(), Fe.methods.dividendsOf(We).call(), Fe.methods.dailyEstimateBnb(We).call()]);
                        case 2:
                            return e = t.sent, n = Object(X["a"])(e, 4), a = n[0], r = n[1], s = n[2], i = n[3], o = {
                                withdrawn: a[1],
                                taxed: a[3],
                                reinvested: a[13],
                                compoundCount: a[14]
                            }, t.next = 11, Promise.all([Fe.methods.totalTxs().call(), Fe.methods.players().call(), Fe.methods.totalTokenBalance().call(), Fe.methods.totalSupply().call(), Fe.methods.dividendBalance().call(), Fe.methods.totalWithdrawn().call(), Fe.methods.lockedTokenBalance().call()]);
                        case 11:
                            return u = t.sent, c = Object(X["a"])(u, 7), l = c[0], p = c[1], d = c[2], m = c[3], f = c[4], h = c[5], y = c[6], t.next = 22, Promise.all([Fe.methods.calculateLiquidityToBnb(d).call(), Fe.methods.calculateLiquidityToBnb(s).call(), Fe.methods.calculateLiquidityToBnb(r).call()]);
                        case 22:
                            b = t.sent, v = Object(X["a"])(b, 3), w = v[0], g = v[1], x = v[2], _ = r / m * 100, isNaN(_) && (_ = 0), k = {
                                User: {
                                    stats: o,
                                    balance: r,
                                    divs: s,
                                    estimateBnb: i,
                                    divsBnb: g,
                                    balanceBnb: x,
                                    stake: _
                                },
                                Totals: {
                                    totalTxs: l,
                                    players: p,
                                    tokenBalance: d,
                                    tokenBalanceBnb: w,
                                    totalSupply: m,
                                    dividendBalance: f,
                                    totalDrip: h,
                                    lockedBalance: y
                                }
                            }, A.commit("updateReservoirData", k);
                        case 31:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), qe.apply(this, arguments)
        }

        function He(t) {
            return Ye.apply(this, arguments)
        }

        function Ye() {
            return Ye = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Fe.methods.buy().send({
                                from: We,
                                value: e
                            });
                        case 2:
                            return n = t.sent, t.abrupt("return", n);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Ye.apply(this, arguments)
        }

        function Ke(t) {
            return Je.apply(this, arguments)
        }

        function Je() {
            return Je = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Fe.methods.calculateTaxedBnbToTokenLiquidity(e).call();
                        case 2:
                            return n = t.sent, t.abrupt("return", n);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Je.apply(this, arguments)
        }

        function Xe() {
            return Qe.apply(this, arguments)
        }

        function Qe() {
            return Qe = Object(a["a"])(regeneratorRuntime.mark((function t() {
                var e;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Fe.methods.reinvest().send({
                                from: We
                            });
                        case 2:
                            return e = t.sent, t.abrupt("return", e);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Qe.apply(this, arguments)
        }

        function Ze(t) {
            return tn.apply(this, arguments)
        }

        function tn() {
            return tn = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                var n;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Fe.methods.sell(e).send({
                                from: We
                            });
                        case 2:
                            return n = t.sent, t.abrupt("return", n);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), tn.apply(this, arguments)
        }

        function en() {
            return nn.apply(this, arguments)
        }

        function nn() {
            return nn = Object(a["a"])(regeneratorRuntime.mark((function t() {
                var e;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, Fe.methods.withdraw().send({
                                from: We
                            });
                        case 2:
                            return e = t.sent, t.abrupt("return", e);
                        case 4:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), nn.apply(this, arguments)
        }
        var an = {
                Initialize: ze,
                GetStats: Ge,
                GetDripEstimate: Ke,
                Buy: He,
                Compound: Xe,
                Withdraw: en,
                Sell: Ze
            },
            rn = n("211b");

        function sn(t, e) {
            return on.apply(this, arguments)
        }

        function on() {
            return on = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return new e.eth.Contract(rn, p.a.TOKENMINT_ADDRESS, (function(t, e) {
                                t && console.log(t)
                            })), n, t.next = 4, un();
                        case 4:
                            setInterval(un, p.a.RefreshRate);
                        case 5:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), on.apply(this, arguments)
        }

        function un() {
            return cn.apply(this, arguments)
        }

        function cn() {
            return cn = Object(a["a"])(regeneratorRuntime.mark((function t() {
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), cn.apply(this, arguments)
        }
        var ln = {
            Initialize: sn,
            GetStats: un
        };

        function pn(t, e) {
            return dn.apply(this, arguments)
        }

        function dn() {
            return dn = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return t.next = 2, rt.Initialize(e, n);
                        case 2:
                            return t.next = 4, Kt.Initialize(e, n);
                        case 4:
                            return t.next = 6, pe.Initialize(e, n);
                        case 6:
                            return t.next = 8, Se.Initialize(e, n);
                        case 8:
                            return t.next = 10, $e.Initialize(e, n);
                        case 10:
                            return t.next = 12, an.Initialize(e, n);
                        case 12:
                            return t.next = 14, ln.Initialize(e, n);
                        case 14:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), dn.apply(this, arguments)
        }
        var mn, fn, hn = {
                Initialize: pn
            },
            yn = n("eb21"),
            bn = {
                display: {
                    logo: yn,
                    name: "Binance Chain Wallet",
                    description: "Binance Smart Chain Wallet"
                },
                package: q["BscConnector"],
                options: {
                    supportedChainIds: [56, 97]
                },
                connector: function() {
                    var t = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                        var a;
                        return regeneratorRuntime.wrap((function(t) {
                            while (1) switch (t.prev = t.next) {
                                case 0:
                                    return a = new e(n), t.next = 3, a.activate();
                                case 3:
                                    return t.abrupt("return", a.getProvider());
                                case 4:
                                case "end":
                                    return t.stop()
                            }
                        }), t)
                    })));

                    function e(e, n) {
                        return t.apply(this, arguments)
                    }
                    return e
                }()
            },
            vn = {
                "custom-bsc": bn,
                walletconnect: {
                    package: G["a"],
                    options: {
                        rpc: {
                            56: "https://bsc-dataseed.binance.org",
                            97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
                        }
                    }
                }
            },
            wn = new V.a({
                network: p.a.ActiveNetwork,
                cacheProvider: !0,
                providerOptions: vn
            });

        function gn() {
            return xn.apply(this, arguments)
        }

        function xn() {
            return xn = Object(a["a"])(regeneratorRuntime.mark((function t() {
                var e, n, a, r;
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            return console.log("Init Provider"), t.next = 3, wn.connect();
                        case 3:
                            return mn = t.sent, fn = new u.a(mn), Rn(mn), t.next = 8, fn.eth.getAccounts();
                        case 8:
                            return e = t.sent, t.next = 11, fn.eth.getChainId();
                        case 11:
                            return n = t.sent, t.next = 14, fn.eth.net.getId();
                        case 14:
                            if (a = t.sent, r = Bn(n), A.commit("updateProvider", {
                                    connectedWallet: e[0],
                                    networkId: a,
                                    IsConnectionOk: r,
                                    IsConnected: !0
                                }), r) {
                                t.next = 20;
                                break
                            }
                            return t.next = 20, wn.clearCachedProvider();
                        case 20:
                            if (!r) {
                                t.next = 24;
                                break
                            }
                            return console.log("Initialize contracts..."), t.next = 24, hn.Initialize(fn, e[0]);
                        case 24:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), xn.apply(this, arguments)
        }

        function _n() {
            return kn.apply(this, arguments)
        }

        function kn() {
            return kn = Object(a["a"])(regeneratorRuntime.mark((function t() {
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            gn();
                        case 1:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), kn.apply(this, arguments)
        }

        function Cn() {
            return Tn.apply(this, arguments)
        }

        function Tn() {
            return Tn = Object(a["a"])(regeneratorRuntime.mark((function t() {
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            if (fn) {
                                t.next = 2;
                                break
                            }
                            return t.abrupt("return");
                        case 2:
                            if (!(fn && fn.currentProvider && fn.currentProvider.close)) {
                                t.next = 5;
                                break
                            }
                            return t.next = 5, fn.currentProvider.close();
                        case 5:
                            return t.next = 7, wn.clearCachedProvider();
                        case 7:
                            A.commit("updateProvider", {
                                connectedWallet: "",
                                networkId: null,
                                IsConnectionOk: !1
                            }), fn = null;
                        case 9:
                        case "end":
                            return t.stop()
                    }
                }), t)
            }))), Tn.apply(this, arguments)
        }

        function Dn() {
            return An.apply(this, arguments)
        }

        function An() {
            return An = Object(a["a"])(regeneratorRuntime.mark((function t() {
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            if (!wn.cachedProvider) {
                                t.next = 11;
                                break
                            }
                            return t.prev = 1, t.next = 4, gn();
                        case 4:
                            t.next = 9;
                            break;
                        case 6:
                            t.prev = 6, t.t0 = t["catch"](1), console.error("Error connecting to Provider: ", t.t0);
                        case 9:
                            t.next = 13;
                            break;
                        case 11:
                            return t.next = 13, wn.clearCachedProvider();
                        case 13:
                        case "end":
                            return t.stop()
                    }
                }), t, null, [
                    [1, 6]
                ])
            }))), An.apply(this, arguments)
        }

        function Rn(t) {
            t.on && (t.on("disconnect", (function() {
                Sn()
            })), t.on("accountsChanged", function() {
                var t = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                    return regeneratorRuntime.wrap((function(t) {
                        while (1) switch (t.prev = t.next) {
                            case 0:
                                Sn();
                            case 1:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })));
                return function(e) {
                    return t.apply(this, arguments)
                }
            }()), t.on("chainChanged", Object(a["a"])(regeneratorRuntime.mark((function t() {
                return regeneratorRuntime.wrap((function(t) {
                    while (1) switch (t.prev = t.next) {
                        case 0:
                            Sn();
                        case 1:
                        case "end":
                            return t.stop()
                    }
                }), t)
            })))))
        }

        function Bn(t) {
            if (console.log("chainId:", t), console.log("currentNetwork:", H[t]), t in H) {
                var e = H[t];
                if (e === p.a.ActiveNetwork) return !0
            }
            return !1
        }
        var Mn, Sn = function() {
                var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                    return regeneratorRuntime.wrap((function(t) {
                        while (1) switch (t.prev = t.next) {
                            case 0:
                                if (fn) {
                                    t.next = 2;
                                    break
                                }
                                return t.abrupt("return");
                            case 2:
                                if (!(fn && fn.currentProvider && fn.currentProvider.close)) {
                                    t.next = 5;
                                    break
                                }
                                return t.next = 5, fn.currentProvider.close();
                            case 5:
                                return t.next = 7, wn.clearCachedProvider();
                            case 7:
                                location.reload();
                            case 8:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })));
                return function() {
                    return t.apply(this, arguments)
                }
            }(),
            Pn = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    attrs: {
                        id: "app"
                    }
                }, [n("navigation"), n("div", {
                    staticClass: "page-cover"
                }), n("div", {
                    staticClass: "router-view"
                }, [n("transition", {
                    attrs: {
                        name: "scale",
                        mode: "out-in"
                    }
                }, [n("router-view", {
                    key: t.$route.fullPath
                })], 1)], 1), n("WarningModal"), n("ErrorModal")], 1)
            },
            En = [],
            jn = n("1157"),
            On = n.n(jn),
            In = (n("3339"), function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("b-modal", {
                    attrs: {
                        id: "modal-success"
                    },
                    scopedSlots: t._u([{
                        key: "modal-footer",
                        fn: function(e) {
                            var a = e.cancel;
                            return [n("b-button", {
                                attrs: {
                                    size: "sm"
                                },
                                on: {
                                    click: function(t) {
                                        return a()
                                    }
                                }
                            }, [t._v(" Close ")])]
                        }
                    }])
                }, [n("p", {
                    staticClass: "my-4"
                }, [n("b-icon", {
                    staticStyle: {
                        width: "30px",
                        height: "30px",
                        margin: "0 10px -7px 0"
                    },
                    attrs: {
                        icon: "exclamation-triangle"
                    }
                }), t._v("Incorrect network, please connect to BSC Mainnet!")], 1)])
            }),
            Un = [],
            Nn = {
                name: "errorModal",
                computed: {
                    showModal: function() {
                        return !A.state.IsConnectionOk
                    }
                }
            },
            Fn = Nn,
            Wn = n("2877"),
            $n = Object(Wn["a"])(Fn, In, Un, !1, null, "567d611e", null),
            Ln = $n.exports,
            zn = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("b-modal", {
                    attrs: {
                        id: "modal-1",
                        "hide-footer": "",
                        "hide-header": "",
                        "no-close-on-backdrop": ""
                    },
                    model: {
                        value: t.showModal,
                        callback: function(e) {
                            t.showModal = e
                        },
                        expression: "showModal"
                    }
                }, [n("p", {
                    staticClass: "my-4"
                }, [n("b-icon", {
                    staticStyle: {
                        width: "30px",
                        height: "30px",
                        margin: "0 10px -7px 0"
                    },
                    attrs: {
                        icon: "exclamation-triangle"
                    }
                }), t._v("Incorrect network, please connect to BSC Mainnet!")], 1)])
            },
            Vn = [],
            Gn = {
                name: "warning",
                computed: {
                    showModal: function() {
                        return !A.state.IsConnectionOk
                    }
                }
            },
            qn = Gn,
            Hn = Object(Wn["a"])(qn, zn, Vn, !1, null, "48cbb7a8", null),
            Yn = Hn.exports,
            Kn = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    attrs: {
                        id: "topNavigation"
                    }
                }, [n("b-navbar", {
                    attrs: {
                        toggleable: "lg",
                        type: "dark",
                        variant: "info"
                    }
                }, [n("div", {
                    staticClass: "container"
                }, [n("b-navbar-brand", {
                    attrs: {
                        to: {
                            path: "/"
                        }
                    }
                }, [t._v("Drip Network")]), n("b-navbar-toggle", {
                    attrs: {
                        target: "nav-collapse"
                    }
                }), n("b-collapse", {
                    attrs: {
                        id: "nav-collapse",
                        "is-nav": ""
                    }
                }, [n("b-navbar-nav", [n("b-nav-item", {
                    staticClass: "nav-link",
                    attrs: {
                        "active-class": "active",
                        to: {
                            path: "/fountain"
                        }
                    }
                }, [t._v("SWAP")]), n("b-nav-item", {
                    staticClass: "nav-link",
                    attrs: {
                        "active-class": "active",
                        to: {
                            path: "/faucet"
                        }
                    }
                }, [t._v("FAUCET")]), n("b-nav-item", {
                    staticClass: "nav-link",
                    attrs: {
                        "active-class": "active",
                        to: {
                            path: "/reservoir"
                        }
                    }
                }, [t._v("RESERVOIR")])], 1), n("b-navbar-nav", {
                    staticClass: "ml-auto"
                }, [n("b-nav-item", {
                    staticClass: "nav-link",
                    attrs: {
                        "active-class": "active",
                        target: "_blank",
                        href: "https://drip.community/docs/DRIP_LIGHTPAPER_v0.8_Lit_Version.pdf"
                    }
                }, [t._v("Whitepaper")]), n("b-nav-item", {
                    staticClass: "nav-link",
                    attrs: {
                        "active-class": "active",
                        target: "_blank",
                        href: "https://v1exchange.pancakeswap.finance/#/swap?outputCurrency=0xa86d305A36cDB815af991834B46aD3d7FbB38523"
                    }
                }, [t._v("Buy BR34P")]), n("b-nav-item", {
                    staticClass: "nav-link",
                    attrs: {
                        "active-class": "active",
                        target: "_blank",
                        href: "https://youtu.be/TOJg308iREw"
                    }
                }, [t._v("Tutorial")]), n("b-nav-item-dropdown", {
                    attrs: {
                        text: "Lang",
                        right: "",
                        id: "languageDowndrop"
                    }
                }, [n("template", {
                    slot: "button-content"
                }, [n("i", {
                    staticClass: "glyph-icon simple-icon-globe"
                }, [t._v("Lang")])]), t._l(t.languages, (function(e) {
                    return n("b-dropdown-item-button", {
                        key: e.value,
                        on: {
                            click: function(n) {
                                return t.setLanguage(e.value)
                            }
                        }
                    }, [t._v(t._s(e.text) + " "), n("span", {
                        staticClass: "flag-icon",
                        class: ["flag-icon-" + e.icon]
                    })])
                }))], 2), n("b-nav-item-dropdown", {
                    attrs: {
                        text: "Lang",
                        right: ""
                    }
                }, [n("template", {
                    slot: "button-content"
                }, [n("i", {
                    staticClass: "glyph-icon simple-icon-settings"
                })]), n("b-dropdown-item-button", [n("b-form-checkbox", {
                    attrs: {
                        id: "enabledRipples",
                        name: "enabledRipples"
                    },
                    on: {
                        change: t.setRipplesState
                    },
                    model: {
                        value: t.ripplesEnabled,
                        callback: function(e) {
                            t.ripplesEnabled = e
                        },
                        expression: "ripplesEnabled"
                    }
                }, [t._v(" Ripple enabled ")])], 1)], 2), n("b-nav-item", [n("wallet")], 1)], 1)], 1)], 1)])], 1)
            },
            Jn = [],
            Xn = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", [n("b-button", {
                    attrs: {
                        variant: t.ButtonState.variant
                    },
                    on: {
                        click: t.ButtonState.method
                    }
                }, [n("b-icon", {
                    attrs: {
                        icon: t.ButtonState.icon,
                        "aria-hidden": "true"
                    }
                }), t._v(t._s(t.ButtonState.text))], 1), "incorrect_network" === t.activeState ? n("div", {
                    staticClass: "provider-errors"
                }, [n("sub", [t._v("Please connect to BSC mainnet!")])]) : t._e()], 1)
            },
            Qn = [],
            Zn = {
                name: "wallet",
                created: function() {
                    return Object(a["a"])(regeneratorRuntime.mark((function t() {
                        return regeneratorRuntime.wrap((function(t) {
                            while (1) switch (t.prev = t.next) {
                                case 0:
                                case "end":
                                    return t.stop()
                            }
                        }), t)
                    })))()
                },
                data: function() {
                    return {
                        activeState: "default",
                        states: {
                            default: {
                                text: "Connect Wallet",
                                icon: "plug",
                                variant: "light",
                                method: this.connect
                            },
                            incorrect_network: {
                                text: "Incorrect Network",
                                icon: "exclamation-triangle",
                                variant: "warning",
                                method: this.disconnect
                            },
                            connected: {
                                text: "",
                                icon: "x",
                                variant: "light",
                                method: this.disconnect
                            }
                        }
                    }
                },
                methods: {
                    connect: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (console.log("button toggle"), console.log("this.Provider.IsConnected:", this.$store.state.Provider.IsConnected), !this.$store.state.Provider.IsConnected) {
                                            t.next = 5;
                                            break
                                        }
                                        t.next = 7;
                                        break;
                                    case 5:
                                        return t.next = 7, _n();
                                    case 7:
                                        this.syncProvider();
                                    case 8:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    switchNetwork: function() {
                        alert("switch network")
                    },
                    syncProvider: function() {
                        var t = this,
                            e = this.$store.state.Provider;
                        console.log("WALLET _provider.IsConnected: ", e.IsConnected), e.IsConnected || (t.activeState = "default"), e.IsConnected && ("" !== e.connectedWallet && (this.states.connected.text = _(e.connectedWallet), t.activeState = "connected"), e.IsConnectionOk || (t.activeState = "incorrect_network"))
                    },
                    disconnect: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, Cn();
                                    case 2:
                                    case "end":
                                        return t.stop()
                                }
                            }), t)
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }()
                },
                computed: {
                    ButtonState: function() {
                        this.$store.state.Provider;
                        return this.states[this.activeState]
                    }
                },
                watch: {
                    "$store.state.Provider": function() {
                        console.log("Provider updated"), this.syncProvider()
                    }
                }
            },
            ta = Zn,
            ea = (n("a1b3"), Object(Wn["a"])(ta, Xn, Qn, !1, null, "de8c4aa0", null)),
            na = ea.exports,
            aa = {
                name: "navigation",
                components: {
                    wallet: na
                },
                data: function() {
                    return {
                        ripplesEnabled: !1,
                        languages: [C("English", "en", "gb"), C("ä¸­æ–‡", "zh-CN", "cn"), C("æ—¥æœ¬äºº", "ja", "jp"), C("í•œêµ­ì–´", "ko", "kr"), C("EspaÃ±ol", "es", "es"), C("Ð ÑƒÑÑÐºÐ¸Ð¹", "ru", "ru"), C("FranÃ§ais", "fr", "fr")]
                    }
                },
                mounted: function() {
                    void 0 === localStorage.ripplesEnabled && (localStorage.ripplesEnabled = "true"), localStorage.ripplesEnabled && (this.ripplesEnabled = localStorage.ripplesEnabled)
                },
                methods: {
                    setRipplesState: function(t) {
                        !1 === t && On()(".page-cover").ripples("destroy"), localStorage.ripplesEnabled = t
                    },
                    setLanguage: function(t) {
                        D(t)
                    }
                }
            },
            ra = aa,
            sa = (n("b750"), Object(Wn["a"])(ra, Kn, Jn, !1, null, "11b38217", null)),
            ia = sa.exports,
            oa = {
                name: "App",
                components: {
                    navigation: ia,
                    WarningModal: Yn,
                    ErrorModal: Ln
                },
                mounted: function() {
                    return Object(a["a"])(regeneratorRuntime.mark((function t() {
                        return regeneratorRuntime.wrap((function(t) {
                            while (1) switch (t.prev = t.next) {
                                case 0:
                                    void 0 === localStorage.ripplesEnabled && (localStorage.ripplesEnabled = "true"), "true" === localStorage.ripplesEnabled && On()(".page-cover").ripples({
                                        resolution: 256,
                                        perturbance: .01
                                    });
                                case 2:
                                case "end":
                                    return t.stop()
                            }
                        }), t)
                    })))()
                }
            },
            ua = oa,
            ca = (n("5c0b"), Object(Wn["a"])(ua, Pn, En, !1, null, null, null)),
            la = ca.exports,
            pa = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    attrs: {
                        id: "fountain"
                    }
                }, [n("div", {
                    staticClass: "container"
                }, [n("div", {
                    staticClass: "landing-page"
                }, [n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-xl-12"
                }, [n("div", {
                    staticClass: "home-text text-center row"
                }, [n("b-container", {}, [n("b-row", [n("b-col", [n("span", {
                    staticClass: "luck-title  notranslate"
                }, [t._v("Casino")])])], 1)], 1)], 1)])]), t._m(0), t._m(1)])]), n("foot")], 1)
            },
            da = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-xl-12 text-center"
                }, [n("h2", {
                    staticStyle: {
                        "text-decoration": "underline",
                        "font-weight": "bold"
                    }
                }, [t._v("Welcome to DRIP Casino powered by TreasureKey & Chainlink.")]), n("h5", [t._v("Below are opensource and fully on-chain games which utilize Chainlink for security and randomization.")]), n("h5", [t._v("All profit made from the casino gets removed from circulation and sent to the Faucet tax pool to pay out dividends.")]), n("h5", [t._v("This allows the Faucet to act as an investment vehicle for the Drip Casino where your stakes in the Faucet represent your share of the Drip Casino's profits.")]), n("h5", [t._v("The games represent an amazing new use case for DRIP, a chance to cross promote with TreasureKey, and a new cashflow into the Faucet contract!")]), n("h5", [t._v("There are no dev fees on the games.")])])])
            }, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-xl-12"
                }, [n("iframe", {
                    attrs: {
                        width: "100%",
                        height: "1500px",
                        frameborder: "0",
                        src: "https://treasurekey.bet/barbell-roll?partner=DRIP"
                    }
                })])])
            }],
            ma = function() {
                var t = this,
                    e = t.$createElement,
                    a = t._self._c || e;
                return a("div", [a("pagebreak"), a("div", {
                    staticClass: "section footer mb-0",
                    attrs: {
                        id: "footer"
                    }
                }, [a("div", {
                    staticClass: "container"
                }, [a("div", {
                    staticClass: "row footer-row"
                }, [a("div", {
                    staticClass: "col-12 text-right"
                }, [a("a", {
                    staticClass: "btn btn-circle btn-outline-semi-light footer-circle-button",
                    attrs: {
                        id: "footerCircleButton"
                    },
                    on: {
                        click: t.scrollToTop
                    }
                }, [a("i", {
                    staticClass: "simple-icon-arrow-up"
                })])]), t._m(0)]), a("div", {
                    staticClass: "row",
                    attrs: {
                        id: "footerMenuAccordion"
                    }
                })]), a("div", {
                    staticClass: "container copyright pt-5 pb-5"
                }, [a("b-row", {
                    attrs: {
                        "align-h": "between"
                    }
                }, [a("b-col", {
                    attrs: {
                        sm: "12",
                        md: "6"
                    }
                }, [t._v("2021 Â© DRIP NETWORK")]), a("b-col", {
                    staticClass: "social-icons",
                    attrs: {
                        sm: "12",
                        md: "6"
                    }
                }, [a("p", [a("a", {
                    staticClass: "footer-link",
                    attrs: {
                        target: "_blank",
                        href: "https://forms.zohopublic.com/admin3193/form/Partnershipinquiry/formperma/-yBuJKHURjSAs33q5l2xFMui34N3vQNMxmzsCwwWN94"
                    }
                }, [a("img", {
                    staticClass: "footer-handshake",
                    attrs: {
                        src: n("4dc8")
                    }
                }), t._v("Partnership enquiries")])]), a("p", [a("a", {
                    staticClass: "footer-link",
                    attrs: {
                        target: "_blank",
                        href: "https://t.me/DRIPtoken_Chat"
                    }
                }, [a("img", {
                    staticClass: "footer-telegram",
                    attrs: {
                        src: n("e474")
                    }
                }), t._v("Join us on Telegram")])]), a("p", [a("a", {
                    staticClass: "footer-link",
                    attrs: {
                        target: "_blank",
                        href: "https://twitter.com/DRIPcommunity"
                    }
                }, [a("img", {
                    staticClass: "footer-telegram",
                    attrs: {
                        src: n("942e")
                    }
                }), t._v("Join us on Twitter")])])])], 1)], 1)])], 1)
            },
            fa = [function() {
                var t = this,
                    e = t.$createElement,
                    a = t._self._c || e;
                return a("div", {
                    staticClass: "col-12 text-center footer-content"
                }, [a("img", {
                    staticClass: "footer-logo",
                    attrs: {
                        alt: "footer logo",
                        src: n("6a2e")
                    }
                })])
            }],
            ha = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "header"
                }, [n("div", [n("svg", {
                    staticClass: "waves",
                    attrs: {
                        xmlns: "http://www.w3.org/2000/svg",
                        "xmlns:xlink": "http://www.w3.org/1999/xlink",
                        viewBox: "0 24 150 28",
                        preserveAspectRatio: "none",
                        "shape-rendering": "auto"
                    }
                }, [n("defs", [n("path", {
                    attrs: {
                        id: "gentle-wave",
                        d: "M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    }
                })]), n("g", {
                    staticClass: "parallax"
                }, [n("use", {
                    attrs: {
                        "xlink:href": "#gentle-wave",
                        x: "48",
                        y: "0",
                        fill: "rgba(255,255,255,0.7"
                    }
                }), n("use", {
                    attrs: {
                        "xlink:href": "#gentle-wave",
                        x: "48",
                        y: "3",
                        fill: "rgba(255,255,255,0.5)"
                    }
                }), n("use", {
                    attrs: {
                        "xlink:href": "#gentle-wave",
                        x: "48",
                        y: "5",
                        fill: "rgba(255,255,255,0.3)"
                    }
                }), n("use", {
                    attrs: {
                        "xlink:href": "#gentle-wave",
                        x: "48",
                        y: "7",
                        fill: "#fff"
                    }
                })])])])])
            },
            ya = [],
            ba = {
                name: "pagebreak"
            },
            va = ba,
            wa = (n("6a80"), Object(Wn["a"])(va, ha, ya, !1, null, "ab5e3c86", null)),
            ga = wa.exports,
            xa = {
                name: "foot",
                components: {
                    pagebreak: ga
                },
                methods: {
                    scrollToTop: function() {
                        var t = document.getElementById("app");
                        t && t.scrollIntoView({
                            behavior: "smooth"
                        })
                    }
                }
            },
            _a = xa,
            ka = (n("64c8"), Object(Wn["a"])(_a, ma, fa, !1, null, "895acaa2", null)),
            Ca = ka.exports,
            Ta = {
                name: "barbellroll",
                components: {
                    foot: Ca
                }
            },
            Da = Ta,
            Aa = (n("6dd1"), Object(Wn["a"])(Da, pa, da, !1, null, "2f75d2ab", null)),
            Ra = (Aa.exports, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    attrs: {
                        id: "fountain"
                    }
                }, [n("div", {
                    staticClass: "container"
                }, [n("div", {
                    staticClass: "landing-page"
                }, [n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-xl-12"
                }, [n("div", {
                    staticClass: "home-text text-center row"
                }, [n("b-container", {}, [n("b-row", [n("b-col", [n("span", {
                    staticClass: "luck-title  notranslate"
                }, [t._v("Casino")])])], 1)], 1)], 1)])]), t._m(0), t._m(1)])]), n("foot")], 1)
            }),
            Ba = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-xl-12 text-center"
                }, [n("h2", {
                    staticStyle: {
                        "text-decoration": "underline",
                        "font-weight": "bold"
                    }
                }, [t._v("Welcome to DRIP Casino powered by TreasureKey & Chainlink.")]), n("h5", [t._v("Below are opensource and fully on-chain games which utilize Chainlink for security and randomization.")]), n("h5", [t._v("All profit made from the casino gets removed from circulation and sent to the Faucet tax pool to pay out dividends.")]), n("h5", [t._v("This allows the Faucet to act as an investment vehicle for the Drip Casino where your stakes in the Faucet represent your share of the Drip Casino's profits.")]), n("h5", [t._v("The games represent an amazing new use case for DRIP, a chance to cross promote with TreasureKey, and a new cashflow into the Faucet contract!")]), n("h5", [t._v("There are no dev fees on the games.")])])])
            }, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-xl-12"
                }, [n("iframe", {
                    attrs: {
                        width: "100%",
                        height: "1500px",
                        frameborder: "0",
                        src: "https://treasurekey.bet/coin-flip?partner=DRIP"
                    }
                })])])
            }],
            Ma = {
                name: "coinflip",
                components: {
                    foot: Ca
                }
            },
            Sa = Ma,
            Pa = (n("fb6b"), Object(Wn["a"])(Sa, Ra, Ba, !1, null, "715bf778", null)),
            Ea = (Pa.exports, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    attrs: {
                        id: "fountain"
                    }
                }, [n("div", {
                    staticClass: "container"
                }, [n("div", {
                    staticClass: "landing-page"
                }, [n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-xl-12"
                }, [n("div", {
                    staticClass: "home-text text-center row"
                }, [n("b-container", {}, [n("b-row", [n("b-col", [n("span", {
                    staticClass: "luck-title  notranslate"
                }, [t._v("Casino")])])], 1)], 1)], 1)])]), t._m(0), t._m(1)])]), n("foot")], 1)
            }),
            ja = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-xl-12 text-center"
                }, [n("h2", {
                    staticStyle: {
                        "text-decoration": "underline",
                        "font-weight": "bold"
                    }
                }, [t._v("Welcome to DRIP Casino powered by TreasureKey & Chainlink.")]), n("h5", [t._v("Below are opensource and fully on-chain games which utilize Chainlink for security and randomization.")]), n("h5", [t._v("All profit made from the casino gets removed from circulation and sent to the Faucet tax pool to pay out dividends.")]), n("h5", [t._v("This allows the Faucet to act as an investment vehicle for the Drip Casino where your stakes in the Faucet represent your share of the Drip Casino's profits.")]), n("h5", [t._v("The games represent an amazing new use case for DRIP, a chance to cross promote with TreasureKey, and a new cashflow into the Faucet contract!")]), n("h5", [t._v("There are no dev fees on the games.")])])])
            }, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-xl-12"
                }, [n("iframe", {
                    attrs: {
                        width: "100%",
                        height: "1500px",
                        frameborder: "0",
                        src: "https://treasurekey.bet/dice-it?partner=DRIP"
                    }
                })])])
            }],
            Oa = {
                name: "diceit",
                components: {
                    foot: Ca
                }
            },
            Ia = Oa,
            Ua = (n("2616"), Object(Wn["a"])(Ia, Ea, ja, !1, null, "07ef47a0", null)),
            Na = (Ua.exports, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    attrs: {
                        id: "fountain"
                    }
                }, [n("div", {
                    staticClass: "container"
                }, [n("div", {
                    staticClass: "landing-page"
                }, [n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-xl-12"
                }, [n("div", {
                    staticClass: "home-text text-center row"
                }, [n("b-container", {}, [n("b-row", [n("b-col", [n("span", {
                    staticClass: "luck-title  notranslate"
                }, [t._v("fountain")])])], 1)], 1)], 1), n("topStats")], 1)]), n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-12 col-xl-6 col-lg-6 col-md-6 mb-4"
                }, [n("b-card", {
                    staticClass: "mb-4",
                    attrs: {
                        "bg-variant": "primary",
                        "text-variant": "white"
                    }
                }, [n("b-card-text", [n("buy")], 1)], 1)], 1), n("div", {
                    staticClass: "container col-12 col-xl-6 col-lg-6 col-md-6 mb-4"
                }, [n("b-card", {
                    staticClass: "mb-4",
                    attrs: {
                        "bg-variant": "primary",
                        "text-variant": "white"
                    }
                }, [n("b-card-text", [n("sell")], 1)], 1)], 1)]), n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-12 text-center",
                    attrs: {
                        "data-v-d691744e": ""
                    }
                }, [n("chart")], 1)]), n("appStats")], 1)]), n("foot")], 1)
            }),
            Fa = [],
            Wa = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [t._m(0), t._l(t.appStats, (function(t) {
                    return n("div", {
                        key: t.header,
                        staticClass: "container col-6 col-xl-4 col-lg-4 col-md-4 text-center"
                    }, [n("statBlock", {
                        attrs: {
                            "header-text": t.headerText,
                            "sub-text": t.subText,
                            "stat-value": t.statValue,
                            icon: t.icon
                        }
                    })], 1)
                }))], 2)
            },
            $a = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "container col-12 text-center"
                }, [n("h1", {}, [t._v("Stats")]), n("p", [t._v("Fountain is the best way to exchange value in the Drip Network! Here are the numbers...")])])
            }],
            La = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "price-top-part"
                }, [n("i", {
                    staticClass: "large-icon",
                    class: t.icon
                }), n("h5", {
                    staticClass: "mb-0 font-weight-semibold color-theme-1 mb-2"
                }, [t._v(t._s(t.headerText))]), n("p", {
                    staticClass: "text-large mb-2 text-white"
                }, [n("span", {
                    staticClass: "notranslate"
                }, [t._v(t._s(t.statValue))])]), n("p", {
                    staticClass: "text-small"
                }, [t._v(t._s(t.subText))])])
            },
            za = [],
            Va = {
                name: "statBlock",
                props: ["headerText", "statValue", "subText", "icon"]
            },
            Ga = Va,
            qa = Object(Wn["a"])(Ga, La, za, !1, null, "7bb8691d", null),
            Ha = qa.exports,
            Ya = {
                name: "appStats",
                components: {
                    statBlock: Ha
                },
                created: function() {
                    this.updateAppStats()
                },
                data: function() {
                    return {
                        appStats: []
                    }
                },
                methods: {
                    updateAppStats: function() {
                        this.appStats = [k("Supply", this.Supply, "DRIP", "iconsmind-Mine"), k("Contract Balance", this.BnbBalance, "DROPS (DRIP / LOCKED)", "iconsmind-Basket-Coins"), k("Transactions", this.FountainData.totalTxs, "Txs", "iconsmind-Sync")]
                    }
                },
                computed: {
                    BnbBalance: function() {
                        return g(this.FountainData.bnbBalance)
                    },
                    Supply: function() {
                        return g(this.FountainData.totalDrip)
                    },
                    TotalSupply: function() {
                        return g(this.FountainData.supply)
                    },
                    FountainData: function() {
                        return this.$store.state.FountainStore.Fountain
                    }
                },
                watch: {
                    FountainData: function() {
                        this.updateAppStats()
                    }
                }
            },
            Ka = Ya,
            Ja = Object(Wn["a"])(Ka, Wa, $a, !1, null, "29ca14e6", null),
            Xa = Ja.exports,
            Qa = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "row mb-4 mt-2"
                }, t._l(t.appStats, (function(t) {
                    return n("div", {
                        key: t.header,
                        staticClass: "container col-md-3 col-sm-12 text-center"
                    }, [n("statBlock", {
                        attrs: {
                            "header-text": t.headerText,
                            "sub-text": t.subText,
                            "stat-value": t.statValue,
                            icon: t.icon
                        }
                    })], 1)
                })), 0)
            },
            Za = [],
            tr = {
                name: "topStats",
                components: {
                    statBlock: Ha
                },
                created: function() {
                    this.updateAppStats()
                },
                data: function() {
                    return {
                        appStats: []
                    }
                },
                methods: {
                    updateAppStats: function() {
                        this.appStats = [k("Price", "".concat(this.DripBnbPrice, " BNB/DRIP"), "BNB/DRIP â‰ˆ ".concat(this.DripUSDPrice, " USDT"), "iconsmind-Coin"), k("BNB Balance", this.UserBnbBalance, "BNB â‰ˆ ".concat(this.UserBnbBalanceUSD, " USDT"), "iconsmind-Coins"), k("DRIP Balance", this.UserDripBalance, "DRIP â‰ˆ ".concat(this.UserDripBalanceUSD, " USDT"), "iconsmind-Drop")]
                    }
                },
                computed: {
                    DripUSDPrice: function() {
                        return (this.DripBnbPrice * this.Prices.wbnb.usd).toFixed(2)
                    },
                    UserDripBalanceUSD: function() {
                        return (this.DripUSDPrice * this.UserDripBalance).toFixed(3)
                    },
                    UserBnbBalanceUSD: function() {
                        return (this.UserBnbBalance * this.Prices.wbnb.usd).toFixed(3)
                    },
                    FountainData: function() {
                        return this.$store.state.FountainStore.Fountain
                    },
                    UserBnbBalance: function() {
                        return this.$store.getters.UserBnbBalance
                    },
                    UserDripBalance: function() {
                        return this.$store.getters.UserDripBalance
                    },
                    Prices: function() {
                        return this.$store.state.Prices
                    },
                    DripBnbPrice: function() {
                        return Number(this.FountainData.priceEther)
                    },
                    difficulty: function() {
                        var t = this.$store.state.TokenMintStore.TokenMint.difficulty;
                        return "N/A" === t ? t : "todo"
                    }
                },
                watch: {
                    FountainData: function() {
                        this.updateAppStats()
                    }
                }
            },
            er = tr,
            nr = Object(Wn["a"])(er, Qa, Za, !1, null, "61a6e881", null),
            ar = nr.exports,
            rr = function() {
                var t = this,
                    e = t.$createElement;
                t._self._c;
                return t._m(0)
            },
            sr = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-12 text-center"
                }, [n("h1", {}, [t._v("Chart")])]), n("div", {
                    staticClass: "container col-12",
                    attrs: {
                        id: "priceChart"
                    }
                })])
            }],
            ir = (n("0042"), n("69af"), n("8192")),
            or = {
                name: "chart",
                components: {},
                mounted: function() {
                    var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                        var e, n, a;
                        return regeneratorRuntime.wrap((function(t) {
                            while (1) switch (t.prev = t.next) {
                                case 0:
                                    try {
                                        e = document.getElementById("priceChart").offsetWidth - 30, n = Object(ir["a"])(document.getElementById("priceChart"), {
                                            width: e,
                                            height: .325 * e,
                                            layout: {
                                                backgroundColor: "#007bff",
                                                textColor: "#00dcff"
                                            },
                                            rightPriceScale: {
                                                scaleMargins: {
                                                    top: .35,
                                                    bottom: .2
                                                },
                                                borderVisible: !1
                                            },
                                            timeScale: {
                                                borderVisible: !1,
                                                timeVisible: !0,
                                                secondsVisible: !1
                                            },
                                            grid: {
                                                horzLines: {
                                                    color: "#eee",
                                                    visible: !1
                                                },
                                                vertLines: {
                                                    color: "#ffffff",
                                                    visible: !1
                                                }
                                            },
                                            crosshair: {
                                                horzLine: {
                                                    visible: !0,
                                                    labelVisible: !0
                                                },
                                                vertLine: {
                                                    visible: !0,
                                                    style: 0,
                                                    width: 2,
                                                    color: "rgba(32, 38, 46, 0.1)",
                                                    labelVisible: !0
                                                }
                                            },
                                            localization: {
                                                priceFormatter: function(t) {
                                                    return "$" + t.toFixed(2)
                                                }
                                            }
                                        }), a = n.addAreaSeries({
                                            topColor: "rgba(0, 220, 255, 0.8)",
                                            bottomColor: "rgba(255, 255, 255, 0.2)",
                                            lineColor: "rgba(255, 255, 255, 1.0)",
                                            lineWidth: 3
                                        }), this.series = n, this.chart = a, this.chart.setData(this.ChartData)
                                    } catch (r) {
                                        console.error("Unable to get data", r.message)
                                    }
                                    window.addEventListener("resize", this.onResize);
                                case 2:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));

                    function e() {
                        return t.apply(this, arguments)
                    }
                    return e
                }(),
                beforeDestroy: function() {
                    window.removeEventListener("resize", this.onResize)
                },
                data: function() {
                    return {
                        chart: void 0
                    }
                },
                methods: {
                    getBreakPoint: function() {},
                    onResize: function(t) {
                        var e = document.getElementById("priceChart").offsetWidth - 30;
                        this.series.resize(e, .325 * e)
                    }
                },
                computed: {
                    DripUSDPrice: function() {
                        return this.DripBnbPrice * this.Prices.wbnb.usd
                    },
                    UserDripBalanceUSD: function() {
                        return (this.DripUSDPrice * this.UserDripBalance).toFixed(3)
                    },
                    UserBnbBalanceUSD: function() {
                        return (this.UserBnbBalance * this.Prices.wbnb.usd).toFixed(3)
                    },
                    ChartData: function() {
                        return this.$store.state.Prices.chartData
                    }
                },
                watch: {
                    ChartData: function(t, e) {
                        this.chart.setData(t)
                    }
                }
            },
            ur = or,
            cr = (n("9913"), Object(Wn["a"])(ur, rr, sr, !1, null, "1a497351", null)),
            lr = cr.exports,
            pr = function() {
                var t = this,
                    e = t.$createElement,
                    a = t._self._c || e;
                return a("div", {
                    staticClass: "landing-page"
                }, [t._m(0), a("form", [a("div", {
                    staticClass: "form-group"
                }, [a("div", {
                    staticClass: "row"
                }, [t._m(1), a("div", {
                    staticClass: "col-6 text-right"
                }, [t._v(" BNB Balance: "), a("label", {
                    staticClass: "user-balance text-white"
                }, [t._v(t._s(t.UserBnbBalance))])])]), a("b-input-group", [a("b-form-input", {
                    attrs: {
                        type: "number",
                        placeholder: "BNB"
                    },
                    model: {
                        value: t.BuyAmount,
                        callback: function(e) {
                            t.BuyAmount = e
                        },
                        expression: "BuyAmount"
                    }
                }), a("b-input-group-append", [a("b-dropdown", {
                    attrs: {
                        right: "",
                        variant: "info",
                        "toggle-class": "text-decoration-none",
                        "no-caret": ""
                    },
                    scopedSlots: t._u([{
                        key: "button-content",
                        fn: function() {
                            return [a("b-icon-gear-fill", {
                                staticStyle: {
                                    width: "16px",
                                    height: "16px"
                                }
                            })]
                        },
                        proxy: !0
                    }])
                }, [a("b-dropdown-form", [a("b-form-group", {
                    staticStyle: {
                        "white-space": "nowrap"
                    },
                    attrs: {
                        label: "Slippage tolerance",
                        "label-for": "dropdown-slippage-config"
                    },
                    on: {
                        submit: function(t) {
                            t.stopPropagation(), t.preventDefault()
                        }
                    }
                }, [a("b-form-radio-group", {
                    staticClass: "pt-2",
                    attrs: {
                        options: t.slippageRadioOptions,
                        "value-field": "item",
                        "text-field": "name"
                    },
                    on: {
                        input: function(e) {
                            return t.calcTokens()
                        }
                    },
                    model: {
                        value: t.buySlippage,
                        callback: function(e) {
                            t.buySlippage = e
                        },
                        expression: "buySlippage"
                    }
                }), a("b-input-group", [a("b-form-input", {
                    attrs: {
                        type: "number",
                        max: "50",
                        id: "dropdown-slippage-config",
                        placeholder: "0.1%"
                    },
                    model: {
                        value: t.buySlippage,
                        callback: function(e) {
                            t.buySlippage = e
                        },
                        expression: "buySlippage"
                    }
                }), a("b-input-group-append", [a("b-button", {
                    attrs: {
                        size: "sm"
                    }
                }, [t._v("%")])], 1)], 1)], 1)], 1)], 1)], 1)], 1), a("div", {
                    staticClass: "row"
                }, [a("div", {
                    staticClass: "col-6 text-left"
                }, [a("small", {
                    staticClass: "form-text"
                }, [t._v("Estimate received: " + t._s(t.BuyEstimate))]), a("small", {
                    staticClass: "form-text"
                }, [t._v("Minimum received: " + t._s(t.MinTokensText))])]), a("div", {
                    staticClass: "col-6 text-right"
                }, [a("small", {
                    staticClass: "form-text"
                }, [t._v("Slippage Tolerance: " + t._s(t.buySlippage) + "%")])])])], 1), a("div", {
                    staticClass: "row justify-content-end"
                }, [a("div", {
                    staticClass: "col-12 text-left"
                }, [a("b-button", {
                    attrs: {
                        variant: "outline-light"
                    },
                    on: {
                        click: t.buy
                    }
                }, [t._v("BUY")]), t.txInProgress ? a("img", {
                    attrs: {
                        src: n("7fb4")
                    }
                }) : t._e()], 1)])])])
            },
            dr = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "text-left"
                }, [n("h3", [n("span", {
                    staticClass: "notranslate"
                }, [t._v("Buy DRIP")])])])
            }, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "col-6 text-left"
                }, [n("label", [t._v("Amount")])])
            }],
            mr = (n("25f0"), {
                methods: {
                    isWalletConnected: function() {
                        return "" !== A.state.Provider.connectedWallet
                    },
                    isCorrectNetwork: function() {
                        return !0 === A.state.Provider.IsConnectionOk
                    },
                    isValidData: function(t) {
                        return t === isNaN ? "..." : t
                    },
                    checkProvider: function() {
                        if (this.isWalletConnected()) {
                            if (this.isCorrectNetwork()) return !0;
                            b.methods.showWrongNetworkErrorModal()
                        } else b.methods.showUnconnectedWalletErrorModal()
                    }
                },
                mounted: function() {},
                destroyed: function() {}
            }),
            fr = {
                name: "buy",
                mixins: [b, mr],
                data: function() {
                    return {
                        BuyAmount: "",
                        BuyEstimate: "",
                        txInProgress: !1,
                        buySlippage: 3,
                        MinTokensText: "",
                        MinTokensAmount: 1,
                        slippageRadioOptions: [{
                            item: "1",
                            name: "1%"
                        }, {
                            item: "3",
                            name: "3%"
                        }, {
                            item: "5",
                            name: "5%"
                        }]
                    }
                },
                methods: {
                    calcTokens: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e, n, a, r, s, i;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (!(this.BuyAmount <= 0)) {
                                            t.next = 4;
                                            break
                                        }
                                        return this.BuyEstimate = 0, this.MinTokensAmount = 0, t.abrupt("return");
                                    case 4:
                                        return e = u.a.utils.toWei(this.BuyAmount), t.next = 7, pe.GetBnbToTokenInputPrice(e);
                                    case 7:
                                        n = t.sent, a = u.a.utils.toBN(n), r = a.mul(u.a.utils.toBN(100 - this.buySlippage)).div(u.a.utils.toBN(100)), this.MinTokensAmount = r.toString(), s = Number(u.a.utils.fromWei(n)).toFixed(4), i = Number(u.a.utils.fromWei(r)).toFixed(4), this.BuyEstimate = "".concat(s, " DRIP"), this.MinTokensText = "".concat(i, " DRIP");
                                    case 15:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    setMaxAmount: function() {
                        this.BuyAmount = this.UserBnbBalance
                    },
                    buy: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e, n;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (this.isWalletConnected()) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showUnconnectedWalletErrorModal(), t.abrupt("return");
                                    case 3:
                                        if (this.isCorrectNetwork()) {
                                            t.next = 6;
                                            break
                                        }
                                        return this.showWrongNetworkErrorModal(), t.abrupt("return");
                                    case 6:
                                        if (!(this.BuyAmount <= 0) && isFinite(this.BuyAmount) && "" !== this.BuyAmount) {
                                            t.next = 9;
                                            break
                                        }
                                        return this.showWarningModal("Invalid amount", "Check your buy amount!", "Enter a valid amount of BNB"), t.abrupt("return");
                                    case 9:
                                        if (!(this.buySlippage <= 0 || this.buySlippage > 50) && isFinite(this.buySlippage) && "" !== this.buySlippage) {
                                            t.next = 12;
                                            break
                                        }
                                        return this.showWarningModal("Invalid slippage", "Check your slippage!", "Enter a slippage between 1-50%"), t.abrupt("return");
                                    case 12:
                                        if (!(Number(this.BuyAmount) > Number(this.UserBnbBalance))) {
                                            t.next = 15;
                                            break
                                        }
                                        return this.showWarningModal("Insufficient balance", "Check your deposit amount!", "Your desired buy amount exceeds your balance!"), t.abrupt("return");
                                    case 15:
                                        return this.txInProgress = !0, e = u.a.utils.toWei(this.BuyAmount), t.prev = 17, t.next = 20, pe.BuyDripWithBnb(e, this.MinTokensAmount);
                                    case 20:
                                        n = t.sent, this.showTransactionSuccessModal("Buy successful!", n.transactionHash), t.next = 28;
                                        break;
                                    case 24:
                                        t.prev = 24, t.t0 = t["catch"](17), this.showTransactionErrorModal(t.t0.message), console.error("Error Buying tokens: ", t.t0.message);
                                    case 28:
                                        return t.prev = 28, this.txInProgress = !1, t.next = 32, this.calcTokens();
                                    case 32:
                                        return t.finish(28);
                                    case 33:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [17, 24, 28, 33]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }()
                },
                computed: {
                    UserBnbBalance: function() {
                        return this.$store.getters.UserBnbBalance
                    }
                },
                watch: {
                    BuyAmount: function(t, e) {
                        this.calcTokens()
                    }
                }
            },
            hr = fr,
            yr = (n("830a"), Object(Wn["a"])(hr, pr, dr, !1, null, "59523b7a", null)),
            br = yr.exports,
            vr = function() {
                var t = this,
                    e = t.$createElement,
                    a = t._self._c || e;
                return a("div", {
                    staticClass: "landing-page"
                }, [t._m(0), a("form", [a("div", {
                    staticClass: "form-group"
                }, [a("div", {
                    staticClass: "row"
                }, [t._m(1), a("div", {
                    staticClass: "col-9 text-right"
                }, [t._v(" DRIP Balance: "), a("label", {
                    staticClass: "user-balance text-white"
                }, [t._v(t._s(t.UserDripBalance))])])]), a("b-input-group", [a("b-form-input", {
                    attrs: {
                        type: "number",
                        placeholder: "DRIP"
                    },
                    model: {
                        value: t.BuyAmount,
                        callback: function(e) {
                            t.BuyAmount = e
                        },
                        expression: "BuyAmount"
                    }
                }), a("b-input-group-append", [a("b-button", {
                    attrs: {
                        variant: "info"
                    },
                    on: {
                        click: t.setMaxAmount
                    }
                }, [t._v("Max")]), a("b-dropdown", {
                    attrs: {
                        right: "",
                        variant: "info",
                        "toggle-class": "text-decoration-none",
                        "no-caret": ""
                    },
                    scopedSlots: t._u([{
                        key: "button-content",
                        fn: function() {
                            return [a("b-icon-gear-fill", {
                                staticStyle: {
                                    width: "16px",
                                    height: "16px"
                                }
                            })]
                        },
                        proxy: !0
                    }])
                }, [a("b-dropdown-form", [a("b-form-group", {
                    staticStyle: {
                        "white-space": "nowrap"
                    },
                    attrs: {
                        label: "Slippage tolerance",
                        "label-for": "dropdown-sell-slippage-config"
                    },
                    on: {
                        submit: function(t) {
                            t.stopPropagation(), t.preventDefault()
                        }
                    }
                }, [a("b-form-radio-group", {
                    staticClass: "pt-2",
                    attrs: {
                        options: t.slippageRadioOptions,
                        "value-field": "item",
                        "text-field": "name"
                    },
                    on: {
                        input: function(e) {
                            return t.calcTokens()
                        }
                    },
                    model: {
                        value: t.sellSlippage,
                        callback: function(e) {
                            t.sellSlippage = e
                        },
                        expression: "sellSlippage"
                    }
                }), a("b-input-group", [a("b-form-input", {
                    attrs: {
                        type: "number",
                        max: "50",
                        id: "dropdown-sell-slippage-config",
                        placeholder: "0.1%"
                    },
                    model: {
                        value: t.sellSlippage,
                        callback: function(e) {
                            t.sellSlippage = e
                        },
                        expression: "sellSlippage"
                    }
                }), a("b-input-group-append", [a("b-button", {
                    attrs: {
                        size: "sm"
                    }
                }, [t._v("%")])], 1)], 1)], 1)], 1)], 1)], 1)], 1), a("div", {
                    staticClass: "row"
                }, [a("div", {
                    staticClass: "col-6 text-left"
                }, [a("small", {
                    staticClass: "form-text"
                }, [t._v("Estimate received*: " + t._s(t.BuyEstimate))]), a("small", {
                    staticClass: "form-text"
                }, [t._v("Minimum received: " + t._s(t.MinTokensText))]), a("small", {
                    staticClass: "form-text text-left"
                }, [t._v("* 10% Tax is applied on sells")])]), a("div", {
                    staticClass: "col-6 text-right"
                }, [a("small", {
                    staticClass: "form-text"
                }, [t._v("Slippage Tolerance: " + t._s(t.sellSlippage) + "%")])])])], 1), a("div", {
                    staticClass: "row justify-content-end"
                }, [a("div", {
                    staticClass: "col-12 text-left"
                }, [a("b-button", {
                    attrs: {
                        variant: "outline-light"
                    },
                    on: {
                        click: t.sell
                    }
                }, [t._v("SELL")]), t.txInProgress ? a("img", {
                    attrs: {
                        src: n("7fb4")
                    }
                }) : t._e(), a("div", {
                    staticClass: "allowanceSelect",
                    staticStyle: {
                        float: "right"
                    }
                }, [a("b-form-checkbox", {
                    attrs: {
                        switch: "",
                        size: "lg",
                        disabled: t.loadingDisable,
                        name: "check-button"
                    },
                    on: {
                        change: t.ToggleAllowance
                    },
                    model: {
                        value: t.AllowanceSet,
                        callback: function(e) {
                            t.AllowanceSet = e
                        },
                        expression: "AllowanceSet"
                    }
                }, [t._v(" Approve DRIP ")])], 1)], 1)])])])
            },
            wr = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "text-left"
                }, [n("h3", [n("span", {
                    staticClass: "notranslate"
                }, [t._v("SELL DRIP")])])])
            }, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "col-3 text-left"
                }, [n("label", [t._v("Amount")])])
            }],
            gr = {
                name: "sell",
                mixins: [b, mr],
                data: function() {
                    return {
                        BuyAmount: "",
                        BuyEstimate: "",
                        txInProgress: !1,
                        sellSlippage: 3,
                        MinTokensText: "",
                        MinTokensAmount: 1,
                        slippageRadioOptions: [{
                            item: "1",
                            name: "1%"
                        }, {
                            item: "3",
                            name: "3%"
                        }, {
                            item: "5",
                            name: "5%"
                        }],
                        AllowanceSet: !1
                    }
                },
                mounted: function() {
                    var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                        var e;
                        return regeneratorRuntime.wrap((function(t) {
                            while (1) switch (t.prev = t.next) {
                                case 0:
                                    e = this, Mn = setInterval((function() {
                                        e.IsProviderConnected && e.CheckAllowance() && clearInterval(Mn)
                                    }), 3e3);
                                case 2:
                                case "end":
                                    return t.stop()
                            }
                        }), t, this)
                    })));

                    function e() {
                        return t.apply(this, arguments)
                    }
                    return e
                }(),
                beforeDestroy: function() {
                    clearInterval(Mn)
                },
                methods: {
                    CheckAllowance: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, Se.getAllowanceV2(p.a.FOUNTAIN_ADDRESS);
                                    case 2:
                                        return e = t.sent, this.AllowanceSet = e > 0, t.abrupt("return", !0);
                                    case 5:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    ToggleAllowance: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e, n;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return e = !this.AllowanceSet, t.prev = 1, t.next = 4, Se.getAllowanceV2(p.a.FOUNTAIN_ADDRESS);
                                    case 4:
                                        if (n = t.sent, 0 != n) {
                                            t.next = 11;
                                            break
                                        }
                                        return t.next = 8, Se.setAllowanceV2(p.a.FOUNTAIN_ADDRESS, "999999");
                                    case 8:
                                        this.AllowanceSet = !e, t.next = 14;
                                        break;
                                    case 11:
                                        return t.next = 13, Se.setAllowanceV2(p.a.FOUNTAIN_ADDRESS, "0");
                                    case 13:
                                        this.AllowanceSet = !e;
                                    case 14:
                                        t.next = 21;
                                        break;
                                    case 16:
                                        t.prev = 16, t.t0 = t["catch"](1), this.AllowanceSet = e, console.error(t.t0), this.showWarningModal("Transaction Error", "Unable to get allowance", "Something went wrong trying to get your wallets allowance, check that you are connected!");
                                    case 21:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [1, 16]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    calcTokens: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e, n, a, r, s, i;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (!(this.BuyAmount <= 0)) {
                                            t.next = 4;
                                            break
                                        }
                                        return this.BuyEstimate = 0, this.MinTokensAmount = 0, t.abrupt("return");
                                    case 4:
                                        return e = u.a.utils.toWei(this.BuyAmount), t.next = 7, pe.GetTokenToBnbInputPrice(e);
                                    case 7:
                                        n = t.sent, a = u.a.utils.toBN(n), a = a.mul(u.a.utils.toBN(90)).div(u.a.utils.toBN(100)), r = a.mul(u.a.utils.toBN(100 - this.sellSlippage)).div(u.a.utils.toBN(100)), this.MinTokensAmount = r.toString(), s = Number(u.a.utils.fromWei(a.toString())), i = Number(u.a.utils.fromWei(r)).toFixed(4), this.BuyEstimate = "".concat(s, " BNB"), this.MinTokensText = "".concat(i, " BNB");
                                    case 16:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    setMaxAmount: function() {
                        this.BuyAmount = this.UserDripBalance
                    },
                    sell: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e, n;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (this.isWalletConnected()) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showUnconnectedWalletErrorModal(), t.abrupt("return");
                                    case 3:
                                        if (this.isCorrectNetwork()) {
                                            t.next = 6;
                                            break
                                        }
                                        return this.showWrongNetworkErrorModal(), t.abrupt("return");
                                    case 6:
                                        if (this.AllowanceSet) {
                                            t.next = 9;
                                            break
                                        }
                                        return this.showWarningModal("Allowance not enabled!", "Check allowance!", "Toggle your allowance settings using the 'Approve DRIP' switch"), t.abrupt("return");
                                    case 9:
                                        if (!(this.BuyAmount <= 0) && isFinite(this.BuyAmount) && "" !== this.BuyAmount) {
                                            t.next = 12;
                                            break
                                        }
                                        return this.showWarningModal("Invalid amount", "Check your buy amount!", "Enter a valid amount of DRIP"), t.abrupt("return");
                                    case 12:
                                        if (!(this.BuyAmount > this.UserBnbBalance)) {
                                            t.next = 15;
                                            break
                                        }
                                        return this.showWarningModal("Insufficient balance", "Check your deposit amount!", "Your desired buy amount exceeds your balance!"), t.abrupt("return");
                                    case 15:
                                        return this.txInProgress = !0, e = u.a.utils.toWei(this.BuyAmount), t.prev = 17, t.next = 20, pe.SellDripForBnb(e, this.MinTokensAmount);
                                    case 20:
                                        n = t.sent, this.showTransactionSuccessModal("Sold successfully!", n.transactionHash), t.next = 28;
                                        break;
                                    case 24:
                                        t.prev = 24, t.t0 = t["catch"](17), this.showTransactionErrorModal(t.t0.message), console.error("Error Selling tokens: ", t.t0.message);
                                    case 28:
                                        return t.prev = 28, this.txInProgress = !1, t.finish(28);
                                    case 31:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [17, 24, 28, 31]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }()
                },
                computed: {
                    UserDripBalance: function() {
                        return this.$store.getters.UserDripBalance
                    },
                    IsProviderConnected: function() {
                        return this.$store.state.Provider.IsConnectionOk
                    }
                },
                watch: {
                    BuyAmount: function(t, e) {
                        this.calcTokens()
                    }
                }
            },
            xr = gr,
            _r = (n("9fcf"), Object(Wn["a"])(xr, vr, wr, !1, null, "c9fa9a7a", null)),
            kr = _r.exports,
            Cr = {
                name: "fountain",
                components: {
                    appStats: Xa,
                    topStats: ar,
                    chart: lr,
                    buy: br,
                    sell: kr,
                    foot: Ca
                },
                data: function() {
                    return {}
                },
                methods: {},
                computed: {},
                watch: {}
            },
            Tr = Cr,
            Dr = (n("69b6"), Object(Wn["a"])(Tr, Na, Fa, !1, null, "2a7c1b9a", null)),
            Ar = Dr.exports,
            Rr = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    attrs: {
                        id: "faucet"
                    }
                }, [n("div", {
                    staticClass: "container"
                }, [n("div", {
                    staticClass: "landing-page"
                }, [n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-xl-12"
                }, [n("div", {
                    staticClass: "home-text text-center row"
                }, [n("b-container", {}, [n("b-row", [n("b-col", [n("span", {
                    staticClass: "luck-title notranslate"
                }, [t._v("faucet")])])], 1)], 1)], 1)]), n("div", {
                    staticClass: "container col-xl-6 col-lg-6 col-md-6 mb-4 pt-4"
                }, [n("userStats"), t._m(0)], 1), n("div", {
                    staticClass: "container col-12 col-xl-6 col-lg-6 col-md-6 mb-4"
                }, [n("div", {
                    staticClass: "row mb-2"
                }, [n("div", {
                    staticClass: "text-left col-lg-5 col-md-12"
                }, [n("price")], 1), n("div", {
                    staticClass: "actions col-lg-7 col-md-12 text-right"
                }, [n("b-button", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: t.HasUpline,
                        expression: "HasUpline"
                    }],
                    attrs: {
                        variant: "link",
                        id: "copyRefButton"
                    },
                    on: {
                        click: t.copyRef
                    }
                }, [t._v("Copy Referral Link!")]), n("b-tooltip", {
                    attrs: {
                        target: "copyRefButton",
                        placement: "top",
                        triggers: "click",
                        show: t.showTooltip
                    },
                    on: {
                        "update:show": function(e) {
                            t.showTooltip = e
                        }
                    }
                }, [n("strong", [t._v("Copied!")])]), n("router-link", {
                    attrs: {
                        to: "fountain"
                    }
                }, [t._v("Get DRIP")]), n("a", {
                    attrs: {
                        target: "_blank",
                        href: "https://youtu.be/TOJg308iREw"
                    }
                }, [t._v("Tutorial")])], 1)]), n("b-card", {
                    staticClass: "mb-4",
                    attrs: {
                        "bg-variant": "primary",
                        "text-variant": "white"
                    }
                }, [n("b-card-text", [n("deposit")], 1)], 1), n("p", {
                    staticClass: "col-12 white mb-3"
                }, [n("actions")], 1)], 1)]), n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-12 col-xl-6 col-lg-6 col-md-6 mb-4"
                }, [n("h2", {}, [t._v("Get a Buddy")]), n("buddy")], 1), n("div", {
                    staticClass: "container col-12 col-xl-6 col-lg-6 col-md-6 mb-4"
                }, [n("h2", {}, [t._v("Checkout Drippers")]), n("lookup")], 1), n("div", {
                    staticClass: "container-fluid mb-4 mt-4"
                }, [n("teams")], 1)]), n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("about")], 1)])]), n("foot")], 1)
            },
            Br = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("p", {
                    staticClass: "col-12 white mb-3 text-justify"
                }, [t._v(" The DRIP Networkâ€™s Faucet is a low-risk, high reward contract that operates similarly to a high yield certificate of deposit by paying out 1% daily return on investment up to 365%."), n("br"), t._v("Players can compound and extend their earnings through deposits, hydrating (compounding) rewards as well as through team based referrals. ")])
            }],
            Mr = function() {
                var t = this,
                    e = t.$createElement,
                    a = t._self._c || e;
                return a("div", {
                    staticClass: "landing-page"
                }, [t._m(0), a("form", [a("div", {
                    staticClass: "form-group"
                }, [a("div", {
                    staticClass: "row"
                }, [t._m(1), a("div", {
                    staticClass: "col-6 text-right"
                }, [t._v(" Drip Balance: "), a("label", {
                    staticClass: "user-balance text-white"
                }, [t._v(t._s(t.UserDripBalance))])])]), a("b-input-group", [a("b-form-input", {
                    attrs: {
                        type: "number",
                        placeholder: "DRIP"
                    },
                    model: {
                        value: t.DepositAmount,
                        callback: function(e) {
                            t.DepositAmount = e
                        },
                        expression: "DepositAmount"
                    }
                }), a("b-input-group-append", [a("b-button", {
                    attrs: {
                        varient: "outline",
                        variant: "info"
                    },
                    on: {
                        click: t.setMaxAmountDrip
                    }
                }, [t._v("MAX")])], 1)], 1), a("small", {
                    staticClass: "form-text text-left"
                }, [t._v("A minimum of 1 DRIP required for deposits *")]), a("small", {
                    staticClass: "form-text text-left"
                }, [t._v("A 10% tax is charged on deposits *")])], 1), a("div", {
                    staticClass: "row justify-content-end"
                }, [a("div", {
                    staticClass: "col-12 text-left"
                }, [a("b-button", {
                    attrs: {
                        variant: "outline-light"
                    },
                    on: {
                        click: t.deposit
                    }
                }, [t._v("DEPOSIT")]), t.txInProgress ? a("img", {
                    attrs: {
                        src: n("7fb4")
                    }
                }) : t._e()], 1)])])])
            },
            Sr = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "text-left"
                }, [n("h3", [n("span", {
                    staticClass: "notranslate"
                }, [t._v("Deposit")])])])
            }, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "col-6 text-left"
                }, [n("label", [t._v("Amount")])])
            }],
            Pr = {
                name: "deposit",
                mixins: [b, mr],
                data: function() {
                    return {
                        DepositAmount: "",
                        txInProgress: !1
                    }
                },
                methods: {
                    setMaxAmountDrip: function() {
                        this.DepositAmount = this.UserDripBalance
                    },
                    deposit: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e, n, a, r, s, i, o, c;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (this.isWalletConnected()) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showUnconnectedWalletErrorModal(), t.abrupt("return");
                                    case 3:
                                        if (this.isCorrectNetwork()) {
                                            t.next = 6;
                                            break
                                        }
                                        return this.showWrongNetworkErrorModal(), t.abrupt("return");
                                    case 6:
                                        if (e = this.FaucetData.User.deposits, n = u.a.utils.fromWei(e), a = A.state.Faucet.Faucet.User.upline, r = A.state.BuddyStore.Buddy.currentBuddy, a = a.toLowerCase() === Y.toLowerCase() ? a : r, a.toLowerCase() !== Y.toLowerCase() && "None" !== a) {
                                            t.next = 14;
                                            break
                                        }
                                        return this.showWarningModal("Bud up!", "Missing Buddy!", "Lock in a buddy before making a deposit! Use a referral link or support marketing/development!"), t.abrupt("return");
                                    case 14:
                                        return t.prev = 14, t.next = 17, Kt.GetUserInfo(a);
                                    case 17:
                                        s = t.sent, t.next = 25;
                                        break;
                                    case 20:
                                        return t.prev = 20, t.t0 = t["catch"](14), this.showTransactionErrorModal(t.t0.message), console.error("Error getting buddy Info: ", t.t0), t.abrupt("return");
                                    case 25:
                                        if ("0" !== s.deposit_time || this.ConnectedAccount.toLowerCase() !== l["TEAM_ADDRESS"].toLowerCase()) {
                                            t.next = 28;
                                            break
                                        }
                                        return this.showWarningModal("Tortoise Buddy!", "Your buddy has not joined yet", "You can still get started TODAY! Scroll down and support marketing/development. You EARN by getting YOUR OWN direct referrals"), t.abrupt("return");
                                    case 28:
                                        if (isFinite(this.DepositAmount) && "" !== this.DepositAmount) {
                                            t.next = 31;
                                            break
                                        }
                                        return this.showWarningModal("Invalid amount", "Check your deposit amount!", "Enter a valid amount of Drip to deposit"), t.abrupt("return");
                                    case 31:
                                        if (i = u.a.utils.toWei(this.DepositAmount), u.a.utils.toWei(this.UserDripBalance), !(Number(this.DepositAmount) > Number(this.UserDripBalance))) {
                                            t.next = 36;
                                            break
                                        }
                                        return this.showWarningModal("Insufficient balance", "Check your deposit amount!", "Your desired deposit amount exceeds your balance! Head over to the exchange to top up and get started TODAY!"), t.abrupt("return");
                                    case 36:
                                        if (!(0 === Number(n) && Number(this.DepositAmount) < 1)) {
                                            t.next = 39;
                                            break
                                        }
                                        return this.showWarningModal("Invalid amount", "Check your deposit amount!", "You need to deposit a minimum of 1 DRIP to initially enter the Faucet contract!"), t.abrupt("return");
                                    case 39:
                                        if (!(this.DepositAmount < 1)) {
                                            t.next = 42;
                                            break
                                        }
                                        return this.showWarningModal("Invalid amount", "Check your deposit amount!", "You need to deposit a minimum of 1 DRIP"), t.abrupt("return");
                                    case 42:
                                        return this.txInProgress = !0, t.prev = 43, t.next = 46, Se.getAllowance();
                                    case 46:
                                        if (o = t.sent, !(o < i)) {
                                            t.next = 50;
                                            break
                                        }
                                        return t.next = 50, Se.setAllowance();
                                    case 50:
                                        t.next = 58;
                                        break;
                                    case 52:
                                        return t.prev = 52, t.t1 = t["catch"](43), this.txInProgress = !1, console.error(t.t1), this.showWarningModal("Transaction Error", "Unable to get allowance", "Something went wrong trying to get your wallets allowance, check that you are connected!"), t.abrupt("return");
                                    case 58:
                                        return t.prev = 58, t.next = 61, Kt.Deposit(a, u.a.utils.toWei(this.DepositAmount));
                                    case 61:
                                        c = t.sent, this.showTransactionSuccessModal("Deposit successful!", c.transactionHash), t.next = 69;
                                        break;
                                    case 65:
                                        t.prev = 65, t.t2 = t["catch"](58), this.showTransactionErrorModal(t.t2.message), console.error("Error Depositing: ", t.t2);
                                    case 69:
                                        this.txInProgress = !1;
                                    case 70:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [14, 20],
                                [43, 52],
                                [58, 65]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }()
                },
                computed: {
                    ConnectedAccount: function() {
                        return this.$store.state.Provider.connectedWallet
                    },
                    FaucetData: function() {
                        return this.$store.state.Faucet.Faucet
                    },
                    UserDripBalance: function() {
                        return this.$store.getters.UserDripBalance
                    }
                }
            },
            Er = Pr,
            jr = Object(Wn["a"])(Er, Mr, Sr, !1, null, "07d884de", null),
            Or = jr.exports,
            Ir = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", [n("b-button", {
                    attrs: {
                        variant: "outline-light",
                        block: ""
                    },
                    on: {
                        click: t.roll
                    }
                }, [t._v("HYDRATE"), n("small", [t._v(" (recompound)")])]), n("b-button", {
                    attrs: {
                        variant: "outline-light",
                        block: ""
                    },
                    on: {
                        click: t.claim
                    }
                }, [t._v("CLAIM")])], 1)
            },
            Ur = [],
            Nr = {
                name: "actions",
                mixins: [b, mr],
                methods: {
                    checkDivs: function() {
                        var t = A.state.Faucet.Faucet.Payout.payout;
                        if ("0" !== t) return !0;
                        this.showErrorModal("You need some Divs! Make a deposit to continue!")
                    },
                    roll: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (this.isWalletConnected()) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showUnconnectedWalletErrorModal(), t.abrupt("return");
                                    case 3:
                                        if (this.isCorrectNetwork()) {
                                            t.next = 6;
                                            break
                                        }
                                        return this.showWrongNetworkErrorModal(), t.abrupt("return");
                                    case 6:
                                        if (!this.checkDivs()) {
                                            t.next = 18;
                                            break
                                        }
                                        return t.prev = 7, t.next = 10, Kt.Compound();
                                    case 10:
                                        e = t.sent, console.log(e), this.showTransactionSuccessModal("Compound success!", e.transactionHash), t.next = 18;
                                        break;
                                    case 15:
                                        t.prev = 15, t.t0 = t["catch"](7), this.showTransactionErrorModal(t.t0.message);
                                    case 18:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [7, 15]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    claim: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (this.isWalletConnected()) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showUnconnectedWalletErrorModal(), t.abrupt("return");
                                    case 3:
                                        if (this.isCorrectNetwork()) {
                                            t.next = 6;
                                            break
                                        }
                                        return this.showWrongNetworkErrorModal(), t.abrupt("return");
                                    case 6:
                                        if (!this.checkDivs()) {
                                            t.next = 17;
                                            break
                                        }
                                        return t.prev = 7, t.next = 10, Kt.Claim();
                                    case 10:
                                        e = t.sent, this.showTransactionSuccessModal("Claim successful!", e.transactionHash), t.next = 17;
                                        break;
                                    case 14:
                                        t.prev = 14, t.t0 = t["catch"](7), this.showTransactionErrorModal(t.t0.message);
                                    case 17:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [7, 14]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }()
                },
                computed: {}
            },
            Fr = Nr,
            Wr = Object(Wn["a"])(Fr, Ir, Ur, !1, null, "4674c6c0", null),
            $r = Wr.exports,
            Lr = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "row",
                    attrs: {
                        id: "topStatsContainer"
                    }
                }, t._l(t.userStats, (function(t) {
                    return n("div", {
                        key: t.header,
                        staticClass: "container col-6 col-xl-4 col-lg-4 col-md-4 text-center"
                    }, [n("statBlock", {
                        attrs: {
                            "header-text": t.headerText,
                            "sub-text": t.subText,
                            "stat-value": t.statValue,
                            icon: t.icon
                        }
                    })], 1)
                })), 0)
            },
            zr = [],
            Vr = {
                name: "appStats",
                mixins: [mr],
                components: {
                    statBlock: Ha
                },
                created: function() {
                    this.updateUserStats()
                },
                data: function() {
                    return {
                        userStats: []
                    }
                },
                methods: {
                    updateUserStats: function() {
                        this.userStats = [k("Available", this.UserPayout, "DRIP â‰ˆ ".concat(this.UserPayoutUSD, " USDT"), "iconsmind-Coins"), k("Deposits", this.UserDeposits, "DRIP â‰ˆ ".concat(this.UserDepositsUSDT, " USDT"), "iconsmind-Astronaut"), k("Claimed", this.UserClaimed, "DRIP", "iconsmind-Mine"), k("Referral Rewards", "".concat(this.UserRewards), "DRIP", "iconsmind-Handshake"), k("Max Payout", this.MaxPayout, "DRIP", "iconsmind-Coins"), k("Team", "".concat(this.FaucetData.UserTotals.referrals, " / ").concat(this.FaucetData.UserTotals.total_structure, " "), "Players (Direct / Total)", "iconsmind-MaleFemale")]
                    }
                },
                computed: {
                    FaucetData: function() {
                        return this.$store.state.Faucet.Faucet
                    },
                    MaxPayout: function() {
                        return g(this.FaucetData.Payout.max_payout)
                    },
                    UserRewards: function() {
                        if ("..." !== this.FaucetData.User.direct_bonus && "..." !== this.FaucetData.User.match_bonus) {
                            var t = u.a.utils.toBN(this.FaucetData.User.direct_bonus),
                                e = u.a.utils.toBN(this.FaucetData.User.match_bonus),
                                n = t.add(e);
                            return g(n.toString())
                        }
                        return "..."
                    },
                    UserRewardsIndirect: function() {
                        if ("..." !== this.FaucetData.User.direct_bonus && "..." !== this.FaucetData.User.match_bonus) {
                            var t = u.a.utils.toBN(this.FaucetData.User.match_bonus);
                            return g(t.toString())
                        }
                        return "..."
                    },
                    UserPayout: function() {
                        return g(this.FaucetData.Payout.net_payout)
                    },
                    UserPayoutUSD: function() {
                        if ("..." === this.FaucetData.Payout.net_payout) return "...";
                        var t = u.a.utils.fromWei(String(this.FaucetData.Payout.net_payout)),
                            e = u.a.utils.fromWei(String(this.DripUSDPrice)),
                            n = t * e;
                        return n.toFixed(2)
                    },
                    UserDeposits: function() {
                        return g(this.FaucetData.User.deposits)
                    },
                    UserDepositsUSDT: function() {
                        if ("..." === this.FaucetData.User.deposits) return "...";
                        var t = u.a.utils.fromWei(String(this.FaucetData.User.deposits)),
                            e = u.a.utils.fromWei(String(this.DripUSDPrice)),
                            n = t * e;
                        return n.toFixed(2)
                    },
                    UserClaimed: function() {
                        return g(this.FaucetData.UserTotals.total_payouts)
                    },
                    DripUSDPrice: function() {
                        return this.$store.getters.DripUSDPrice
                    }
                },
                watch: {
                    FaucetData: function() {
                        this.updateUserStats()
                    }
                }
            },
            Gr = Vr,
            qr = Object(Wn["a"])(Gr, Lr, zr, !1, null, "27e48459", null),
            Hr = qr.exports,
            Yr = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "row pt-4 mt-4"
                }, [t._m(0), t._l(t.appStats, (function(t) {
                    return n("div", {
                        key: t.header,
                        staticClass: "container col-6 col-xl-4 col-lg-4 col-md-4 text-center"
                    }, [n("statBlock", {
                        attrs: {
                            "header-text": t.headerText,
                            "sub-text": t.subText,
                            "stat-value": t.statValue,
                            icon: t.icon
                        }
                    })], 1)
                }))], 2)
            },
            Kr = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "container col-12 text-center"
                }, [n("h1", {}, [t._v("Stats")]), n("p", [t._v("Faucet is the best way to earn BNB long term supporting the Drip Community ecosystem! Here are the numbers...")])])
            }],
            Jr = {
                name: "appStats",
                components: {
                    statBlock: Ha
                },
                created: function() {
                    this.updateAppStats()
                },
                data: function() {
                    return {
                        appStats: []
                    }
                },
                methods: {
                    updateAppStats: function() {
                        this.appStats = [k("Players", this.FaucetData.Totals._total_users, "Players", "iconsmind-MaleFemale"), k("Total Value Locked", this.TotalLockedValue, "DRIP â‰ˆ ".concat(this.TotalLockedValueUSDT, " USDT"), "iconsmind-Full-Moon"), k("Transactions", this.FaucetData.Totals._total_txs, "Txs", "iconsmind-Mine")]
                    }
                },
                computed: {
                    FaucetData: function() {
                        return this.$store.state.Faucet.Faucet
                    },
                    TotalLockedValue: function() {
                        return g(this.FaucetData.Totals._total_deposited)
                    },
                    TotalLockedValueUSDT: function() {
                        this.DripUSDPrice, u.a.utils.toBN(this.FaucetData.Totals._total_deposited), this.FaucetData.Totals._total_deposited, this.DripUSDPrice;
                        return isNaN(this.FaucetData.Totals._total_deposited * this.DripUSDPrice) ? "..." : g(this.FaucetData.Totals._total_deposited * this.DripUSDPrice)
                    },
                    DripUSDPrice: function() {
                        return this.$store.getters.DripUSDPrice
                    }
                },
                watch: {
                    FaucetData: function() {
                        this.updateAppStats()
                    }
                }
            },
            Xr = Jr,
            Qr = Object(Wn["a"])(Xr, Yr, Kr, !1, null, "97516c08", null),
            Zr = (Qr.exports, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "priceDiv"
                }, [t._v(" Price Â Â "), n("span", {
                    staticClass: "text-white"
                }, [t._v(t._s(t.Price))]), t._v(" Â BNB/DRIP ")])
            }),
            ts = [],
            es = {
                name: "price",
                computed: {
                    Price: function() {
                        var t = this.$store.state.FountainStore.Fountain.priceEther;
                        return console.log(t), isNaN(t) ? "N/A" : Number(t).toFixed(8)
                    }
                }
            },
            ns = es,
            as = (n("2368"), Object(Wn["a"])(ns, Zr, ts, !1, null, "770d848a", null)),
            rs = as.exports,
            ss = function() {
                var t = this,
                    e = t.$createElement,
                    a = t._self._c || e;
                return a("b-card", {
                    attrs: {
                        "bg-variant": "dark",
                        "text-variant": "white"
                    }
                }, [a("b-card-text", [a("b-form", [a("div", {
                    staticClass: "form-group"
                }, [a("label", [t._v("Current Buddy")]), a("h4", {
                    staticClass: "text-white-50",
                    attrs: {
                        id: "current-buddy"
                    }
                }, [t._v(t._s(t.CurrentBuddy))]), a("label", [t._v("Manager")]), a("h4", {
                    staticClass: "text-white-50",
                    attrs: {
                        id: "current-manager"
                    }
                }, [t._v(t._s(t.faucetData.Custody._manager))]), a("label", [t._v("Beneficiary")]), a("h4", {
                    staticClass: "text-white-50",
                    attrs: {
                        id: "current-beneficiary"
                    }
                }, [t._v(t._s(t.faucetData.Custody._beneficiary))]), a("label", [t._v("Last Checkin")]), a("h4", {
                    staticClass: "text-white-50",
                    attrs: {
                        id: "current-checkin"
                    }
                }, [t._v(t._s(t.faucetData.Activity._checkin))]), a("label", [t._v("Inactivity Threshold")]), a("h4", {
                    staticClass: "text-white-50",
                    attrs: {
                        id: "current-inactivity"
                    }
                }, [t._v(t._s(t.faucetData.Custody._heartbeat_interval))])]), t.ShowBuddyInputs ? a("div", {
                    attrs: {
                        id: "buddy-input"
                    }
                }, [a("b-form-group", {
                    attrs: {
                        label: "Buddy"
                    }
                }, [a("b-form-input", {
                    attrs: {
                        type: "text",
                        placeholder: "Address"
                    },
                    model: {
                        value: t.BuddyAddress,
                        callback: function(e) {
                            t.BuddyAddress = e
                        },
                        expression: "BuddyAddress"
                    }
                })], 1), a("div", [a("b-button", {
                    attrs: {
                        variant: "outline-light"
                    },
                    on: {
                        click: t.updateBuddy
                    }
                }, [t._v("UPDATE")]), t.txInProgress ? a("img", {
                    attrs: {
                        src: n("7fb4")
                    }
                }) : t._e()], 1), a("div", [a("br"), a("b-button", {
                    attrs: {
                        variant: "outline-light"
                    },
                    on: {
                        click: t.supportMarketingingDev
                    }
                }, [t._v("Support marketing and development")]), t.buddyRefAddress ? a("b-button", {
                    attrs: {
                        variant: "outline-light"
                    },
                    on: {
                        click: t.useBuddyRef
                    }
                }, [t._v("Buddy Detected")]) : t._e()], 1)], 1) : t._e()])], 1)], 1)
            },
            is = [],
            os = (n("2b3d"), n("9861"), {
                name: "buddy",
                mixins: [b, mr],
                mounted: function() {
                    this.detectBuddyRef()
                },
                data: function() {
                    return {
                        BuddyAddress: "",
                        buddyRefAddress: "",
                        txInProgress: !1
                    }
                },
                methods: {
                    updateBuddy: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (this.isWalletConnected()) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showUnconnectedWalletErrorModal(), t.abrupt("return");
                                    case 3:
                                        if (this.isCorrectNetwork()) {
                                            t.next = 6;
                                            break
                                        }
                                        return this.showWrongNetworkErrorModal(), t.abrupt("return");
                                    case 6:
                                        if ("" !== this.BuddyAddress) {
                                            t.next = 9;
                                            break
                                        }
                                        return this.showInvalidAddressModal("No address entered! Use a referral address or use the marketing/development address!"), t.abrupt("return");
                                    case 9:
                                        if (u.a.utils.isAddress(this.BuddyAddress)) {
                                            t.next = 12;
                                            break
                                        }
                                        return this.showInvalidAddressModal("Invalid BEP20 Address! Check that the buddy address is valid!"), t.abrupt("return");
                                    case 12:
                                        if (this.BuddyAddress.toLowerCase() !== this.ConnectedAccount.toLowerCase() && this.ConnectedAccount.toLowerCase() !== p.a.TEAM_ADDRESS) {
                                            t.next = 15;
                                            break
                                        }
                                        return this.showInvalidAddressModal("Can't use your own address as a buddy! Use a referral address or use the marketing/development address!"), t.abrupt("return");
                                    case 15:
                                        return this.txInProgress = !0, t.prev = 16, console.info("Updating Buddy: ", this.BuddyAddress), t.next = 20, $e.UpdateBuddy(this.BuddyAddress);
                                    case 20:
                                        e = t.sent, this.showTransactionSuccessModal("Buddy updated!", e.transactionHash), t.next = 28;
                                        break;
                                    case 24:
                                        t.prev = 24, t.t0 = t["catch"](16), this.showTransactionErrorModal(t.t0.message), console.error("Error Updating Buddy: ", t.t0);
                                    case 28:
                                        return t.prev = 28, this.txInProgress = !1, t.finish(28);
                                    case 31:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [16, 24, 28, 31]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    supportMarketingingDev: function() {
                        this.BuddyAddress = p.a.TEAM_ADDRESS
                    },
                    useBuddyRef: function() {
                        this.BuddyAddress = this.buddyRefAddress
                    },
                    detectBuddyRef: function() {
                        console.log("buddy detect");
                        var t = window.location.href,
                            e = new URL(t),
                            n = e.searchParams.get("buddy");
                        null !== n && u.a.utils.isAddress(n) ? this.buddyRefAddress = n : this.buddyRefAddress = ""
                    }
                },
                computed: {
                    faucetData: function() {
                        return this.$store.state.Faucet.Faucet
                    },
                    ConnectedAccount: function() {
                        return this.$store.state.Provider.connectedWallet
                    },
                    ShowBuddyInputs: function() {
                        return "None" === this.$store.state.Faucet.Faucet.User.upline || this.$store.state.Provider.connectedWallet === p.a.TEAM_ADDRESS
                    },
                    CurrentBuddy: function() {
                        return "None" !== this.faucetData.User.upline ? this.faucetData.User.upline : "N/A" !== this.$store.state.BuddyStore.Buddy.currentBuddy && this.$store.state.BuddyStore.Buddy.currentBuddy !== Y ? this.$store.state.BuddyStore.Buddy.currentBuddy : "None"
                    }
                }
            }),
            us = os,
            cs = Object(Wn["a"])(us, ss, is, !1, null, "e99f7274", null),
            ls = cs.exports,
            ps = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("b-card", {
                    attrs: {
                        "bg-variant": "dark",
                        "text-variant": "white"
                    }
                }, [n("b-card-text", [n("h3", [t._v("Player Lookup")]), n("form", [n("div", {
                    attrs: {
                        id: "buddy-input"
                    }
                }, [n("div", {
                    staticClass: "form-group"
                }, [n("label", {
                    attrs: {
                        for: "player-lookup"
                    }
                }, [t._v("Player")]), n("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.LookupAddress,
                        expression: "LookupAddress"
                    }],
                    staticClass: "form-control",
                    attrs: {
                        id: "player-lookup",
                        "aria-describedby": "transTrxHelp",
                        placeholder: "Address"
                    },
                    domProps: {
                        value: t.LookupAddress
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.LookupAddress = e.target.value)
                        }
                    }
                })]), n("p", {
                    staticClass: "text-left"
                }, [n("b-button", {
                    attrs: {
                        variant: "outline-light"
                    },
                    on: {
                        click: t.playerLookup
                    }
                }, [t._v("GO")])], 1), n("h4", {
                    staticClass: "color-theme-1 mt-2 pt-2"
                }, [t._v("Player Info")]), n("div", {
                    staticClass: "row"
                }, [n("label", {
                    staticClass: "col-6"
                }, [t._v("Directs")]), n("span", {
                    staticClass: "col-6 text-white",
                    attrs: {
                        id: "player-directs"
                    }
                }, [t._v(t._s(t.PlayerData.info.referrals))]), n("label", {
                    staticClass: "col-6"
                }, [t._v("Team")]), n("span", {
                    staticClass: "col-6 text-white",
                    attrs: {
                        id: "player-team"
                    }
                }, [t._v(t._s(t.PlayerData.info.total_structure))]), n("label", {
                    staticClass: "col-6"
                }, [t._v("Net Deposits")]), n("span", {
                    staticClass: "col-6 text-white",
                    attrs: {
                        id: "player-deposits"
                    }
                }, [t._v(t._s(t.NetDeposits) + " DRIP")]), n("label", {
                    staticClass: "col-6"
                }, [t._v("Airdrop Sent / Received")]), n("span", {
                    staticClass: "col-6 text-white",
                    attrs: {
                        id: "player-airdrop"
                    }
                }, [t._v(t._s(t.AirdropsSent) + "/" + t._s(t.AirdropsReceived) + " DRIP")]), n("label", {
                    staticClass: "col-6"
                }, [t._v("Airdrop Last Sent")]), n("span", {
                    staticClass: "col-6 text-white",
                    attrs: {
                        id: "player-airdrop-time"
                    }
                }, [t._v(t._s(0 == t.PlayerData.airdropInfo.last_airdrop ? "Never" : t.timeNowFrom(t.PlayerData.airdropInfo.last_airdrop)))])])])])])], 1)
            },
            ds = [],
            ms = n("c1df"),
            fs = {
                name: "lookup",
                mixins: [b, mr],
                data: function() {
                    return {
                        LookupAddress: "",
                        PlayerData: {
                            info: {
                                referrals: "0",
                                total_deposits: "0",
                                total_payouts: "0",
                                total_structure: "0",
                                airdrops_total: "0",
                                airdrops_received: "0"
                            },
                            airdropInfo: {
                                upline: "None",
                                deposit_time: "0",
                                deposits: "0",
                                payouts: "0",
                                direct_bonus: "0",
                                match_bonus: "0",
                                last_airdrop: "0"
                            },
                            credits: {
                                _credits: "0",
                                _debits: "0"
                            }
                        }
                    }
                },
                methods: {
                    timeNowFrom: function(t) {
                        return Object(ms["unix"])(t).fromNow()
                    },
                    playerLookup: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (this.isWalletConnected()) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showUnconnectedWalletErrorModal(), t.abrupt("return");
                                    case 3:
                                        if (this.isCorrectNetwork()) {
                                            t.next = 6;
                                            break
                                        }
                                        return this.showWrongNetworkErrorModal(), t.abrupt("return");
                                    case 6:
                                        if ("" !== this.LookupAddress) {
                                            t.next = 9;
                                            break
                                        }
                                        return this.showInvalidAddressModal("No address entered! Please enter a address to do a lookup!"), t.abrupt("return");
                                    case 9:
                                        if (u.a.utils.isAddress(this.LookupAddress)) {
                                            t.next = 12;
                                            break
                                        }
                                        return this.showInvalidAddressModal("Invalid BEP20 Address! Check that the address is valid!"), t.abrupt("return");
                                    case 12:
                                        return t.prev = 12, t.next = 15, Kt.LookupPlayer(this.LookupAddress);
                                    case 15:
                                        e = t.sent, this.PlayerData = e, t.next = 22;
                                        break;
                                    case 19:
                                        t.prev = 19, t.t0 = t["catch"](12), this.showTransactionErrorModal(t.t0.message);
                                    case 22:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [12, 19]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }()
                },
                computed: {
                    FaucetData: function() {
                        return this.$store.state.Faucet.Faucet
                    },
                    NetDeposits: function() {
                        var t = u.a.utils.fromWei(this.PlayerData.credits._credits),
                            e = u.a.utils.fromWei(this.PlayerData.credits._debits);
                        return t - e
                    },
                    AirdropsSent: function() {
                        return g(this.PlayerData.info.airdrops_total)
                    },
                    AirdropsReceived: function() {
                        return g(this.PlayerData.info.airdrops_received)
                    }
                }
            },
            hs = fs,
            ys = Object(Wn["a"])(hs, ps, ds, !1, null, "eb4e54ae", null),
            bs = ys.exports,
            vs = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", [n("h2", {
                    staticClass: "text-white-50"
                }, [t._v("Flow Teams")]), n("b-card", {
                    attrs: {
                        "no-body": "",
                        "bg-variant": "dark",
                        "text-variant": "white"
                    }
                }, [n("b-tabs", {
                    attrs: {
                        card: ""
                    }
                }, [n("b-tab", {
                    attrs: {
                        title: "Team Viewer",
                        active: ""
                    }
                }, [n("b-card-text", [n("team_viewer")], 1)], 1), n("b-tab", {
                    attrs: {
                        title: "Team Airdrop"
                    }
                }, [n("b-card-text", [n("team_airdrop")], 1)], 1), n("b-tab", {
                    attrs: {
                        title: "Direct Airdrop"
                    }
                }, [n("b-card-text", [n("teams_transfers")], 1)], 1)], 1)], 1)], 1)
            },
            ws = [],
            gs = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", [n("form", [n("div", [n("referralViewer", {
                    attrs: {
                        searchAddress: t.searchAddress
                    }
                }), n("div", {
                    staticClass: "form-group"
                }, [n("label", {
                    attrs: {
                        for: "recipient"
                    }
                }, [t._v("Player")]), n("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.activeAccount,
                        expression: "activeAccount"
                    }],
                    staticClass: "form-control",
                    attrs: {
                        id: "recipient",
                        placeholder: "Address"
                    },
                    domProps: {
                        value: t.activeAccount
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.activeAccount = e.target.value)
                        }
                    }
                }), n("div", {
                    staticClass: "text-right mt-2"
                }, [n("b-button", {
                    attrs: {
                        variant: "primary"
                    },
                    on: {
                        click: function(e) {
                            return t.setOwnAddress()
                        }
                    }
                }, [t._v("Use my address")]), n("b-button", {
                    attrs: {
                        variant: "primary"
                    },
                    on: {
                        click: function(e) {
                            return t.SetRootAddress()
                        }
                    }
                }, [t._v("View all")])], 1)]), n("p", {
                    staticClass: "text-left"
                }, [n("b-button", {
                    on: {
                        click: function(e) {
                            return t.showOrg()
                        }
                    }
                }, [t._v("SHOW")])], 1), n("h4", {
                    attrs: {
                        id: "suggested-buddy"
                    }
                }), n("div", {
                    staticClass: "org-viewer-buddy"
                }), n("div", {
                    staticClass: "mt-4 overflow-auto",
                    attrs: {
                        id: "org-viewer"
                    }
                })], 1)])])
            },
            xs = [],
            _s = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", [t.dataLoaded ? n("tree", {
                    attrs: {
                        zoomable: "true",
                        id: "treeHolder",
                        identifier: t.getId,
                        data: t.treeData,
                        "node-text": "text",
                        layoutType: "horizontal"
                    },
                    on: {
                        expand: t.onExpand,
                        retract: t.onRetract
                    }
                }) : t._e()], 1)
            },
            ks = [],
            Cs = n("74cc"),
            Ts = {
                name: "referralViewer",
                components: {
                    tree: Cs["tree"]
                },
                props: ["searchAddress"],
                data: function() {
                    return {
                        dataLoaded: !1,
                        treeData: {
                            id: 0,
                            text: "abc"
                        }
                    }
                },
                methods: {
                    getId: function(t) {
                        return t.id
                    },
                    onExpand: function(t) {
                        console.log(t), this.onEvent("onExpand", t)
                    },
                    onRetract: function(t) {
                        console.log(t), this.onEvent("onRetract", t)
                    }
                },
                watch: {
                    searchAddress: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                            var a;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.prev = 0, t.next = 3, B.a.get("".concat(l["ActiveUrl"], "/org/").concat(e));
                                    case 3:
                                        a = t.sent, this.treeData = a.data, this.dataLoaded = !0, t.next = 11;
                                        break;
                                    case 8:
                                        t.prev = 8, t.t0 = t["catch"](0), console.error("Unable to get data");
                                    case 11:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [0, 8]
                            ])
                        })));

                        function e(e, n) {
                            return t.apply(this, arguments)
                        }
                        return e
                    }()
                }
            },
            Ds = Ts,
            As = (n("d24d"), Object(Wn["a"])(Ds, _s, ks, !1, null, "afbc8bea", null)),
            Rs = As.exports,
            Bs = {
                name: "team_viewer",
                components: {
                    referralViewer: Rs
                },
                data: function() {
                    return {
                        activeAccount: "",
                        referralData: {},
                        searchAddress: "",
                        showTree: !1
                    }
                },
                methods: {
                    setOwnAddress: function() {
                        return this.activeAccount = this.userAccount
                    },
                    SetRootAddress: function() {
                        return this.activeAccount = l["TEAM_ADDRESS"]
                    },
                    showOrg: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        this.searchAddress = this.activeAccount;
                                    case 1:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    hideOrg: function() {
                        this.showTree = !1
                    }
                },
                computed: {
                    userAccount: function() {
                        return this.$store.state.Provider.connectedWallet
                    }
                }
            },
            Ms = Bs,
            Ss = Object(Wn["a"])(Ms, gs, xs, !1, null, "5ce2a6e4", null),
            Ps = Ss.exports,
            Es = function() {
                var t = this,
                    e = t.$createElement,
                    a = t._self._c || e;
                return a("div", [a("form", [a("div", [a("div", {
                    staticClass: "form-group"
                }, [a("label", [t._v("Player")]), a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.playerSelected,
                        expression: "playerSelected"
                    }],
                    staticClass: "form-control",
                    attrs: {
                        placeholder: "Address"
                    },
                    domProps: {
                        value: t.playerSelected
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.playerSelected = e.target.value)
                        }
                    }
                }), a("div", {
                    staticClass: "text-right mt-2"
                }, [a("b-button", {
                    on: {
                        click: function(e) {
                            return t.useMyAddress()
                        }
                    }
                }, [t._v("Use my address")])], 1)]), a("div", {
                    staticClass: "form-group"
                }, [a("div", {
                    staticClass: "row mt-2 mb-4"
                }, [a("div", {
                    staticClass: "col-12 mb-4 pb-2"
                }, [a("label", [t._v("Campaign")]), a("b-form-select", {
                    attrs: {
                        options: t.maxRecipients
                    },
                    model: {
                        value: t.maxRecipientSelected,
                        callback: function(e) {
                            t.maxRecipientSelected = e
                        },
                        expression: "maxRecipientSelected"
                    }
                }), a("small", {
                    staticClass: "form-text text-muted"
                }, [t._v("* Eligible matching players selected at random")])], 1), a("div", {
                    staticClass: "col-12 col-xl-3 col-lg-3 col-md-3 mb-2"
                }, [a("label", [t._v("Minimum directs")]), a("br"), a("b-form-select", {
                    attrs: {
                        options: t.minimumDirects
                    },
                    on: {
                        change: t.clearCampaign
                    },
                    model: {
                        value: t.minimumDirectsSelected,
                        callback: function(e) {
                            t.minimumDirectsSelected = e
                        },
                        expression: "minimumDirectsSelected"
                    }
                })], 1), a("div", {
                    staticClass: "col-12 col-xl-3 col-lg-3 col-md-3 mb-2"
                }, [a("label", [t._v("Team depth")]), a("br"), a("b-form-select", {
                    attrs: {
                        options: t.teamDepth
                    },
                    on: {
                        change: t.clearCampaign
                    },
                    model: {
                        value: t.teamDepthSelected,
                        callback: function(e) {
                            t.teamDepthSelected = e
                        },
                        expression: "teamDepthSelected"
                    }
                })], 1), a("div", {
                    staticClass: "col-12 col-xl-3 col-lg-3 col-md-3 mb-2"
                }, [a("label", [t._v("Minimum net deposits")]), a("br"), a("b-form-select", {
                    attrs: {
                        options: t.minimumDeposits
                    },
                    on: {
                        change: t.clearCampaign
                    },
                    model: {
                        value: t.minimumDepositsSelected,
                        callback: function(e) {
                            t.minimumDepositsSelected = e
                        },
                        expression: "minimumDepositsSelected"
                    }
                })], 1)]), a("div", {
                    staticClass: "row"
                }, [a("div", {
                    staticClass: "col-6 text-left"
                }, [a("label", [t._v("Budget")]), a("br"), a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.dropAmount,
                        expression: "dropAmount"
                    }],
                    staticClass: "form-control",
                    attrs: {
                        type: "number",
                        placeholder: "DRIP"
                    },
                    domProps: {
                        value: t.dropAmount
                    },
                    on: {
                        change: t.calcBudget,
                        input: function(e) {
                            e.target.composing || (t.dropAmount = e.target.value)
                        }
                    }
                }), a("br"), a("b-button", {
                    on: {
                        click: function(e) {
                            return t.showAirdrop()
                        }
                    }
                }, [t._v("RUN")])], 1), a("div", {
                    staticClass: "col-6 text-right"
                }, [t._v(" Available: "), a("label", {
                    staticClass: "user-balance text-white"
                }, [t._v(t._s(t.UserDripBalance) + " Drip")]), a("br"), t._v(" Number of recipients: "), a("label", {
                    staticClass: "user-balance text-white"
                }, [t._v(t._s(t.RecipientsCount))]), a("br"), t._v(" Estimated Drip per person: "), a("label", {
                    staticClass: "user-balance text-white"
                }, [t._v(t._s(t.EstimateDripPerRecipients))]), a("br"), t.deliveringAirdrop ? a("img", {
                    attrs: {
                        src: n("7fb4")
                    }
                }) : t._e(), a("b-button", {
                    on: {
                        click: function(e) {
                            return t.sendAirdrop()
                        }
                    }
                }, [t._v("SEND")]), a("br"), t.deliveringAirdrop ? a("b-button", {
                    on: {
                        click: function(e) {
                            return t.cancelAirdrop()
                        }
                    }
                }, [t._v("CANCEL")]) : t._e()], 1)])])]), a("hr"), a("div", {
                    staticClass: "row"
                }, [a("div", {
                    staticClass: "col-lg-5 col-md-6"
                }, [a("div", {
                    staticClass: "row"
                }, [t._m(0), a("div", {
                    staticClass: "col text-right",
                    attrs: {
                        id: "send-console"
                    }
                }, [t._v(t._s(t.send_console))])]), a("b-form-textarea", {
                    attrs: {
                        readonly: "",
                        rows: "20"
                    },
                    model: {
                        value: t.LogText,
                        callback: function(e) {
                            t.LogText = e
                        },
                        expression: "LogText"
                    }
                })], 1), a("div", {
                    staticClass: "col-lg-7 col-md-6"
                }, [a("h3", [t._v("Campaign Viewer")]), a("div", {
                    staticClass: "org-viewer-monitor"
                }, [t._v(t._s(t.load_status))]), a("table", [a("tr", [a("th"), a("th", [t._v("Address")]), a("th", [t._v("Directs")]), a("th", [t._v("Deposits")]), a("th", [a("b-form-checkbox", {
                    on: {
                        change: t.toggleAll
                    }
                })], 1), a("th", [t._v("Status")])]), t._l(t.airdrop_campaign.recipients, (function(e, n, r) {
                    return a("tr", {
                        key: n
                    }, [a("td", [t._v(t._s(r + 1))]), a("td", [t._v(t._s(n))]), a("td", [t._v(t._s(e.directs))]), a("td", [t._v(t._s(e.deposits))]), a("td", [a("b-form-checkbox-group", {
                        attrs: {
                            id: "checkbox-group-1"
                        },
                        model: {
                            value: t.recipients_chosen,
                            callback: function(e) {
                                t.recipients_chosen = e
                            },
                            expression: "recipients_chosen"
                        }
                    }, [a("b-form-checkbox", {
                        attrs: {
                            value: n
                        }
                    })], 1)], 1), a("td", {
                        staticClass: "text-center"
                    }, [t.recipients_airdrop_status[n] ? a("b-icon-check-circle-fill", {
                        attrs: {
                            variant: "success"
                        }
                    }) : t._e(), t.recipients_airdrop_status[n] || void 0 === t.recipients_airdrop_status[n] ? t._e() : a("b-icon-x-circle-fill", {
                        attrs: {
                            variant: "danger"
                        }
                    }), void 0 === t.recipients_airdrop_status[n] ? a("b-icon-pause-circle-fill") : t._e()], 1)])
                }))], 2)])])])])
            },
            js = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "col"
                }, [n("h3", [t._v("Campaign Console")])])
            }],
            Os = (n("4de4"), n("159b"), n("b64b"), n("f7fe")),
            Is = n.n(Os),
            Us = n("0406"),
            Ns = n.n(Us),
            Fs = n("d924"),
            Ws = n.n(Fs),
            $s = {
                name: "team_airdrop",
                mixins: [b, mr],
                mounted: function() {
                    return Object(a["a"])(regeneratorRuntime.mark((function t() {
                        return regeneratorRuntime.wrap((function(t) {
                            while (1) switch (t.prev = t.next) {
                                case 0:
                                case "end":
                                    return t.stop()
                            }
                        }), t)
                    })))()
                },
                data: function() {
                    return {
                        deliveringAirdrop: !1,
                        cancelledAirdrop: !1,
                        recipients_chosen: [],
                        recipients_airdrop_status: {},
                        airdrop_campaign: {
                            total_candidates: 0,
                            total_eligible: 0,
                            total_recipients: 0,
                            recipients: {}
                        },
                        campaign_log: [],
                        load_status: "",
                        estimateAmount: "",
                        send_console: "",
                        dropAmount: 0,
                        playerSelected: "",
                        maxRecipientSelected: 0,
                        maxRecipients: [{
                            value: 0,
                            text: "Divide budget between all matching players"
                        }, {
                            value: 1,
                            text: "Rewards budget to one matching player *"
                        }, {
                            value: 5,
                            text: "Divided budget across 5 matching players *"
                        }, {
                            value: 20,
                            text: "Divided budget across 20 matching players *"
                        }, {
                            value: 50,
                            text: "Divided budget across 50 matching players *"
                        }, {
                            value: 100,
                            text: "Divided budget across 100 matching players *"
                        }],
                        minimumDirectsSelected: 0,
                        minimumDirects: [{
                            value: 1,
                            text: "1"
                        }, {
                            value: 5,
                            text: "5"
                        }, {
                            value: 15,
                            text: "15"
                        }, {
                            value: 0,
                            text: "None"
                        }],
                        teamDepthSelected: 1,
                        teamDepth: [{
                            value: 1,
                            text: "1"
                        }, {
                            value: 2,
                            text: "2"
                        }, {
                            value: 10,
                            text: "10"
                        }, {
                            value: 15,
                            text: "15"
                        }],
                        minimumDepositsSelected: 1,
                        minimumDeposits: [{
                            value: 1,
                            text: "1+ DRIP"
                        }, {
                            value: 25,
                            text: "25+ DRIP"
                        }, {
                            value: 50,
                            text: "50+ DRIP"
                        }, {
                            value: 100,
                            text: "100+ DRIP"
                        }, {
                            value: 250,
                            text: "250+ DRIP"
                        }, {
                            value: 500,
                            text: "500+ DRIP"
                        }, {
                            value: 1e3,
                            text: "1000+ DRIP"
                        }, {
                            value: 2e3,
                            text: "2000+ DRIP"
                        }]
                    }
                },
                methods: {
                    clearCampaign: function() {
                        this.recipients_chosen = [], this.campaign_log = [], this.airdrop_campaign = {
                            total_candidates: 0,
                            total_eligible: 0,
                            total_recipients: 0,
                            recipients: {}
                        }
                    },
                    toggleAll: function(t) {
                        this.recipients_chosen = t ? this.EligiblePlayerList : []
                    },
                    cancelAirdrop: function() {
                        this.cancelledAirdrop = !0, this.showWarningModal("Airdrop Cancelled!")
                    },
                    useMyAddress: function() {
                        if (this.isWalletConnected()) return this.playerSelected = this.OwnAccount;
                        this.showUnconnectedWalletErrorModal()
                    },
                    showOrg: function() {
                        return this.activeAccount = this.OwnAccount
                    },
                    calcBudget: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                            var n, a;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (n = this.dropAmount, !(n < 1) && isFinite(n) && "" !== n) {
                                            t.next = 3;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 3:
                                        if (u.a.utils.toWei(n), a = this.UserDripBalance, "", !(a < n)) {
                                            t.next = 9;
                                            break
                                        }
                                        return this.estimateAmount = "Insufficient balance to run campaign", t.abrupt("return");
                                    case 9:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e(e) {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    showAirdrop: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e, n, a, r, s, i;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (this.isWalletConnected()) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showUnconnectedWalletErrorModal(), t.abrupt("return");
                                    case 3:
                                        if (this.airdrop_campaign = {
                                                total_candidates: 0,
                                                total_eligible: 0,
                                                total_recipients: 0,
                                                recipients: {}
                                            }, this.recipients_chosen = [], this.campaign_log = [], e = this.minimumDirectsSelected, n = this.minimumDepositsSelected, a = this.teamDepthSelected, r = this.maxRecipientSelected, s = this.playerSelected, u.a.utils.isAddress(s)) {
                                            t.next = 14;
                                            break
                                        }
                                        return this.showInvalidAddressModal("No address entered!"), t.abrupt("return");
                                    case 14:
                                        return this.load_status = "Loading...", i = null, 0, this.campaign_log.push("Loading: ".concat(s)), t.prev = 17, t.next = 20, B.a.get("".concat(p.a.ActiveUrl, "/org/").concat(s));
                                    case 20:
                                        i = t.sent, t.next = 28;
                                        break;
                                    case 23:
                                        return t.prev = 23, t.t0 = t["catch"](17), this.showWarningModal("Network Error", "Unable to retrieve players, please try again later"), this.load_status = "Service unavailable, try again later...", t.abrupt("return");
                                    case 28:
                                        if (i.data) {
                                            t.next = 31;
                                            break
                                        }
                                        return this.showWarningModal("No data", "No data for this player"), t.abrupt("return");
                                    case 31:
                                        if (!i) {
                                            t.next = 38;
                                            break
                                        }
                                        return this.campaign_log.push("\n\nFinding eligible players..."), this.campaign_log.push("\nDirects - ".concat(e)), this.campaign_log.push("\nNet deposits - ".concat(n, " DRIP")), this.campaign_log.push("\nMaximum recipients - ".concat(r || "All")), t.next = 38, this.getEligiblePlayers(i.data, e, n, a, r);
                                    case 38:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [17, 23]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    sendAirdrop: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e, n;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (this.isWalletConnected()) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showUnconnectedWalletErrorModal(), t.abrupt("return");
                                    case 3:
                                        if (0 !== Number(this.RecipientsCount)) {
                                            t.next = 6;
                                            break
                                        }
                                        return this.showWarningModal("Airdrop Error", "Run a successful campaign, and select recipients"), t.abrupt("return");
                                    case 6:
                                        if (e = this.dropAmount, !(e < 1) && isFinite(e) && "" !== e) {
                                            t.next = 10;
                                            break
                                        }
                                        return this.showWarningModal("Airdrop Error", "Set a budget for the campaign"), t.abrupt("return");
                                    case 10:
                                        if (!(Number(this.UserDripBalance) < Number(e))) {
                                            t.next = 13;
                                            break
                                        }
                                        return this.showWarningModal("Airdrop Error", "Insufficient balance!", "Go to the Fountain to top up!"), t.abrupt("return");
                                    case 13:
                                        return n = u.a.utils.toWei(String(this.EstimateDripPerRecipients)), t.next = 16, this.deliverAirdrop(n);
                                    case 16:
                                        t.sent;
                                    case 17:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    deliverAirdrop: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                            var n, a, r, s, i;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (!this.deliveringAirdrop) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showWarningModal("Airdrop in progress!"), t.abrupt("return");
                                    case 3:
                                        return t.next = 5, Ae();
                                    case 5:
                                        if (n = t.sent, n) {
                                            t.next = 9;
                                            break
                                        }
                                        return this.showWarningModal("Allowance not enabled!", "Check allowance!", "Please set allowance on Faucet by making a deposit!"), t.abrupt("return");
                                    case 9:
                                        this.deliveringAirdrop = !0, a = this.recipients_chosen, this.campaign_log.push("\n\nAirdropping ".concat(u.a.utils.fromWei(e), " DRIP per recipient:\n")), t.prev = 12, s = 0;
                                    case 14:
                                        if (!(s < a.length)) {
                                            t.next = 39;
                                            break
                                        }
                                        if (!this.cancelledAirdrop) {
                                            t.next = 19;
                                            break
                                        }
                                        return this.cancelledAirdrop = !1, this.deliveringAirdrop = !1, t.abrupt("break", 39);
                                    case 19:
                                        return r = a[s], null, t.prev = 21, i = String(e), t.next = 25, $t(r, i);
                                    case 25:
                                        t.sent, this.campaign_log.push("".concat(r, " -- ").concat(u.a.utils.fromWei(e), "\n")), this.recipients_airdrop_status[r] = !0, t.next = 36;
                                        break;
                                    case 30:
                                        return t.prev = 30, t.t0 = t["catch"](21), this.recipients_airdrop_status[r] = !1, console.error("payout fail to %s: %s", r, t.t0), this.showWarningModal("Airdrop in failed", t.t0.message), t.abrupt("continue", 36);
                                    case 36:
                                        s++, t.next = 14;
                                        break;
                                    case 39:
                                        this.sendConsole = "Airdrop Complete", this.campaign_log.push("Airdrop Complete"), t.next = 46;
                                        break;
                                    case 43:
                                        t.prev = 43, t.t1 = t["catch"](12), console.error();
                                    case 46:
                                        return t.prev = 46, this.cancelledAirdrop = !1, this.deliveringAirdrop = !1, t.finish(46);
                                    case 50:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [12, 43, 46, 50],
                                [21, 30]
                            ])
                        })));

                        function e(e) {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    getEligiblePlayers: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t(e, n, a, r, s) {
                            var i, o;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return this.campaign_log.push("\n\nFinding Players..."), t.next = 3, this.pluckAirdrop(e, r, n, null);
                                    case 3:
                                        i = t.sent, i.eligible = i.children.filter((function(t) {
                                            return t.directs >= n && t.deposits >= a
                                        })), i.recipients = s ? Ns()(i.eligible, s) : i.eligible, o = {
                                            total_candidates: i.raw_count,
                                            total_eligible: i.eligible.length,
                                            total_recipients: i.recipients.length,
                                            recipients: {}
                                        }, i.recipients.forEach((function(t) {
                                            o.recipients[t.player.id] = Ws()(t, ["player"])
                                        })), console.log("finalResult", o), this.campaign_log.push("\nCampaign results"), this.campaign_log.push("\nTotal candidates:   ".concat(o.total_candidates)), this.campaign_log.push("\nTotal eligible:   ".concat(o.total_eligible)), this.campaign_log.push("\nTotal recipients:   ".concat(o.total_recipients)), this.campaign_log.push("\nReady to send..."), this.airdrop_campaign = o, document.getElementById("org-viewer-drop"), this.load_status = "";
                                    case 17:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e(e, n, a, r, s) {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    pluckAirdrop: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t(e, n, a, r, s) {
                            var i, o, u, c, l;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (null == r && (r = {
                                                parent: e.id,
                                                max_depth: n,
                                                children: [],
                                                raw_count: 0,
                                                total_count: 0
                                            }, n = 0), !(n < r.max_depth)) {
                                            t.next = 28;
                                            break
                                        }
                                        if (n++, i = e.id, !("children" in e)) {
                                            t.next = 26;
                                            break
                                        }
                                        o = e.children, r.total_count += o.length, s && (this.campaign_log[this.campaign_log.length - 1] = "Loading... ".concat(r.total_count)), c = 0;
                                    case 9:
                                        if (!(c < o.length)) {
                                            t.next = 26;
                                            break
                                        }
                                        if (r.raw_count++, this.load_status = "Loading... ".concat(r.raw_count, " / ").concat(r.total_count), l = void 0, l = "children" in e.children[c] ? e.children[c].children.length : 0, !(l >= a)) {
                                            t.next = 20;
                                            break
                                        }
                                        return t.next = 17, this.fillPlayer(o[c], 0);
                                    case 17:
                                        u = t.sent, u.upline = i, r.children.push(u);
                                    case 20:
                                        return {}, t.next = 23, this.pluckAirdrop(e.children[c], n, a, r);
                                    case 23:
                                        c++, t.next = 9;
                                        break;
                                    case 26:
                                        t.next = 29;
                                        break;
                                    case 28:
                                        return t.abrupt("return", r);
                                    case 29:
                                        return t.abrupt("return", r);
                                    case 30:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e(e, n, a, r, s) {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    fillPlayer: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t(e, n) {
                            var a, r, s, i, o, c, l;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.prev = 0, t.next = 3, kt(e.id);
                                    case 3:
                                        return a = t.sent, r = a.credits._credits, s = a.credits._debits, i = a.info.referrals, o = u.a.utils.fromWei(r), c = u.a.utils.fromWei(s), l = Number(o) - Number(c), t.abrupt("return", {
                                            player: e,
                                            directs: i,
                                            deposits: l.toFixed(2)
                                        });
                                    case 13:
                                        t.prev = 13, t.t0 = t["catch"](0), console.error(t.t0);
                                    case 16:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, null, [
                                [0, 13]
                            ])
                        })));

                        function e(e, n) {
                            return t.apply(this, arguments)
                        }
                        return e
                    }()
                },
                computed: {
                    OwnAccount: function() {
                        return this.$store.state.Provider.connectedWallet
                    },
                    UserDripBalance: function() {
                        return this.$store.getters.UserDripBalance
                    },
                    EligiblePlayerList: function() {
                        return Object.keys(this.airdrop_campaign.recipients)
                    },
                    RecipientsCount: function() {
                        return this.recipients_chosen.length
                    },
                    EstimateDripPerRecipients: function() {
                        return this.dropAmount / this.RecipientsCount
                    },
                    LogText: function() {
                        var t = "";
                        return this.campaign_log.forEach((function(e) {
                            t += e
                        })), t
                    }
                }
            },
            Ls = $s,
            zs = (n("e764"), Object(Wn["a"])(Ls, Es, js, !1, null, "6c573e1c", null)),
            Vs = zs.exports,
            Gs = function() {
                var t = this,
                    e = t.$createElement,
                    a = t._self._c || e;
                return a("div", [a("div", {
                    staticClass: "text-right mb-4"
                }, [t.showLoader ? a("img", {
                    attrs: {
                        src: n("7fb4")
                    }
                }) : t._e(), a("b-button", {
                    on: {
                        click: t.getLatestAirdrops
                    }
                }, [t._v("REFRESH")])], 1), a("div", {
                    attrs: {
                        id: "airdropActivity-ui"
                    }
                }, [a("airdrop_activity", {
                    attrs: {
                        "event-list": t.airdropResult
                    }
                })], 1)])
            },
            qs = [],
            Hs = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "col-12 mb-4"
                }, [n("b-card", {
                    attrs: {
                        "no-body": "",
                        "bg-variant": "dark",
                        "text-variant": "white"
                    }
                }, [n("b-tabs", {
                    attrs: {
                        card: ""
                    }
                }, [n("b-tab", {
                    attrs: {
                        title: "Activity",
                        active: ""
                    }
                }, [n("b-card-text", [n("div", {
                    staticClass: "row"
                }, [n("div", {
                    staticClass: "col-12 list"
                }, [n("div", {
                    staticClass: "card d-flex flex-row mb-3"
                }, [n("div", {
                    staticClass: "d-flex flex-grow-1 min-width-zero"
                }, [n("div", {
                    staticClass: "card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"
                }, [n("div", {
                    staticClass: "w-20 w-xs-100"
                }, [t._v("Time")]), n("div", {
                    staticClass: "w-20 w-xs-100"
                }, [t._v("From")]), n("p", {
                    staticClass: "mb-1 w-15 w-xs-100"
                }, [t._v("To")]), n("p", {
                    staticClass: "mb-1 w-15 w-xs-100"
                }, [t._v("Amount")])])])])])])]), t._l(t.eventList, (function(e) {
                    return n("b-card-text", {
                        key: e
                    }, [n("div", {
                        staticClass: "row"
                    }, [n("div", {
                        staticClass: "col-12 list"
                    }, [n("div", {
                        staticClass: "card d-flex flex-row mb-3"
                    }, [n("div", {
                        staticClass: "d-flex flex-grow-1 min-width-zero"
                    }, [n("div", {
                        staticClass: "card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"
                    }, [n("div", {
                        staticClass: "w-20 w-xs-100"
                    }, [t._v(t._s(e.timestamp))]), n("div", {
                        staticClass: "w-20 w-xs-100"
                    }, [t._v(t._s(t.trim(e.from)))]), n("p", {
                        staticClass: "mb-1 w-15 w-xs-100"
                    }, [t._v(t._s(t.trim(e.to)))]), n("p", {
                        staticClass: "mb-1 w-15 w-xs-100"
                    }, [t._v(t._s(t.toEther(e.value)))])])])])])])])
                }))], 2)], 1)], 1)], 1)
            },
            Ys = [],
            Ks = {
                name: "airdrop_activity",
                components: {},
                props: ["eventList"],
                data: function() {
                    return {
                        transferEvents: []
                    }
                },
                methods: {
                    trim: function(t) {
                        return _(t)
                    },
                    toEther: function(t) {
                        return t / p.a.DRIP_TOKEN_DECIMAL
                    }
                },
                computed: {}
            },
            Js = Ks,
            Xs = Object(Wn["a"])(Js, Hs, Ys, !1, null, "00fd9e79", null),
            Qs = Xs.exports,
            Zs = {
                name: "latest_airdrop",
                components: {
                    airdrop_activity: Qs
                },
                data: function() {
                    return {
                        activeAccount: "",
                        airdropResult: [],
                        showLoader: !1
                    }
                },
                methods: {
                    getLatestAirdrops: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e, n, a, r, s, i, o;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return this.showLoader = !0, e = [], n = {}, t.prev = 3, t.next = 6, Gt();
                                    case 6:
                                        a = t.sent, r = 0;
                                    case 8:
                                        if (!(r < a.length)) {
                                            t.next = 27;
                                            break
                                        }
                                        if (s = a[r].blockNumber, i = 0, !(s in n)) {
                                            t.next = 15;
                                            break
                                        }
                                        i = n[s], t.next = 19;
                                        break;
                                    case 15:
                                        return t.next = 17, fn.eth.getBlock(s);
                                    case 17:
                                        i = t.sent.timestamp, n[s] = i;
                                    case 19:
                                        o = {}, o.timestamp = Object(ms["unix"])(i).format("MM/DD/YYYY, h:mm:ss a"), o.event = "unknown name obj for now", a[r].returnValues && (o.from = a[r].returnValues.from, o.to = a[r].returnValues.to, o.value = a[r].returnValues.amount), e.push(o);
                                    case 24:
                                        r++, t.next = 8;
                                        break;
                                    case 27:
                                        this.airdropResult = e, t.next = 33;
                                        break;
                                    case 30:
                                        t.prev = 30, t.t0 = t["catch"](3), console.error(t.t0);
                                    case 33:
                                        return t.prev = 33, this.showLoader = !1, t.finish(33);
                                    case 36:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [3, 30, 33, 36]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }()
                },
                computed: {
                    OwnAccount: function() {
                        return this.$store.state.ConnectedAccount
                    }
                }
            },
            ti = Zs,
            ei = Object(Wn["a"])(ti, Gs, qs, !1, null, "1e927304", null),
            ni = (ei.exports, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", [n("form", [n("div", [n("div", {
                    staticClass: "form-group"
                }, [n("label", {
                    attrs: {
                        for: "recipient"
                    }
                }, [t._v("Player")]), n("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.selectedAccount,
                        expression: "selectedAccount"
                    }],
                    staticClass: "form-control",
                    attrs: {
                        id: "airdrop-search-address",
                        "aria-describedby": "transTrxHelp",
                        placeholder: "Address"
                    },
                    domProps: {
                        value: t.selectedAccount
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.selectedAccount = e.target.value)
                        }
                    }
                }), n("div", {
                    staticClass: "text-right mt-2"
                }, [n("b-button", {
                    attrs: {
                        variant: "primary"
                    },
                    on: {
                        click: t.myAirdropSearch
                    }
                }, [t._v("Use my address")])], 1)])]), n("div", {
                    staticClass: "row mb-4"
                }, [n("div", {
                    staticClass: "col text-left"
                }, [t._m(0), n("b-button", {
                    attrs: {
                        variant: "primary"
                    },
                    on: {
                        click: function(e) {
                            return t.searchAirdrop()
                        }
                    }
                }, [t._v("GO")])], 1)])]), n("div", {
                    attrs: {
                        id: "search-results"
                    }
                })])
            }),
            ai = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "btn-group btn-group-toggle mr-4",
                    attrs: {
                        id: "search-address-option",
                        "data-toggle": "buttons"
                    }
                }, [n("label", {
                    staticClass: "btn btn-outline-primary active"
                }, [n("input", {
                    attrs: {
                        type: "radio",
                        name: "options",
                        value: "to",
                        checked: ""
                    }
                }), t._v(" To ")]), n("label", {
                    staticClass: "btn btn-outline-primary"
                }, [n("input", {
                    attrs: {
                        type: "radio",
                        name: "options",
                        value: "from"
                    }
                }), t._v(" From ")])])
            }],
            ri = {
                name: "airdrops_search",
                data: function() {
                    return {
                        selectedAccount: ""
                    }
                },
                methods: {
                    myAirdropSearch: function() {
                        this.selectedAccount = this.OwnAccount
                    },
                    searchAirdrop: function() {
                        if (u.a.utils.isAddress(this.selectedAccount)) alert("invalid address");
                        else {
                            var t = {};
                            this.loadNewActivityData("#search-results", t)
                        }
                    },
                    loadNewActivityData: function() {},
                    toEther: function(t) {
                        return t / p.a.DRIP_TOKEN_DECIMAL
                    }
                },
                computed: {
                    OwnAccount: function() {
                        return this.$store.state.Provider.connectedWallet
                    }
                }
            },
            si = ri,
            ii = Object(Wn["a"])(si, ni, ai, !1, null, "0f2451b4", null),
            oi = (ii.exports, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", [n("div", {
                    staticClass: "mb-4"
                }, [t._m(0), n("form", [n("div", {
                    staticClass: "form-group"
                }, [n("div", {
                    staticClass: "form-group"
                }, [n("label", {
                    attrs: {
                        for: "managedPlayer"
                    }
                }, [t._v("Player")]), n("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.managedPlayer,
                        expression: "managedPlayer"
                    }],
                    staticClass: "form-control",
                    attrs: {
                        id: "managedPlayer",
                        placeholder: "Address"
                    },
                    domProps: {
                        value: t.managedPlayer
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.managedPlayer = e.target.value)
                        }
                    }
                })]), n("div", {
                    staticClass: "row"
                }, [t._m(1), n("div", {
                    staticClass: "col-6 text-right"
                }, [t._v(" Available "), n("label", {
                    staticClass: "user-balance text-white"
                }, [t._v(t._s(t.UserDripBalance))])])]), n("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.managedPlayerAmount,
                        expression: "managedPlayerAmount"
                    }],
                    staticClass: "form-control",
                    attrs: {
                        type: "number",
                        id: "managedStakeAmount",
                        placeholder: "DRIP"
                    },
                    domProps: {
                        value: t.managedPlayerAmount
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.managedPlayerAmount = e.target.value)
                        }
                    }
                }), n("small", {
                    staticClass: "form-text text-muted"
                }, [t._v("A minimum of 1 DRIP for deposits *")])]), n("div", {
                    staticClass: "row justify-content-end"
                }, [n("div", {
                    staticClass: "col-8 text-left"
                }, [n("b-button", {
                    staticClass: "mb-0 mr-2",
                    attrs: {
                        variant: "primary"
                    },
                    on: {
                        click: t.depositFor
                    }
                }, [t._v("DEPOSIT")])], 1), n("div", {
                    staticClass: "col-4 text-right"
                }, [n("span", {
                    staticClass: "mr-2",
                    attrs: {
                        id: "available-managed-divs"
                    }
                }), n("b-button", {
                    staticClass: "mb-0 mr-2",
                    attrs: {
                        variant: "primary"
                    },
                    on: {
                        click: t.rollFor
                    }
                }, [t._v("ROLL")]), n("b-button", {
                    staticClass: "mb-0 mr-2",
                    attrs: {
                        variant: "primary"
                    },
                    on: {
                        click: t.claimFor
                    }
                }, [t._v("CLAIM")])], 1)])])]), n("div", {
                    staticClass: "mb-4"
                }, [t._m(2), n("form", [t._m(3), n("div", {
                    staticClass: "row justify-content-end"
                }, [n("div", {
                    staticClass: "col-8 text-left"
                }, [n("a", {
                    staticClass: "btn btn-outline-semi-light default mb-0 mr-2",
                    on: {
                        click: function(e) {
                            t.transferInactive
                        }
                    }
                }, [t._v("TRANSFER")])]), t._m(4)])])])])
            }),
            ui = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("h3", [n("span", {
                    staticClass: "notranslate",
                    attrs: {
                        id: "time-left"
                    }
                }, [t._v("Manage Player")])])
            }, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "col-6 text-left"
                }, [n("label", {
                    attrs: {
                        for: "managedStakeAmount"
                    }
                }, [t._v("Amount")])])
            }, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("h3", [n("span", {
                    staticClass: "notranslate",
                    attrs: {
                        id: "time-left"
                    }
                }, [t._v("Beneficiary Actions")])])
            }, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "form-group"
                }, [n("label", {
                    attrs: {
                        for: "manager"
                    }
                }, [t._v("Primary (optional)")]), n("input", {
                    staticClass: "form-control",
                    attrs: {
                        id: "primary",
                        placeholder: "Address"
                    }
                }), n("small", {
                    staticClass: "form-text text-muted"
                }, [n("span", {
                    staticClass: "notranslate",
                    attrs: {
                        id: "primary-rewards"
                    }
                }), n("span", {
                    staticClass: "notranslate",
                    attrs: {
                        id: "primary-deposits"
                    }
                }), n("span", {
                    staticClass: "notranslate",
                    attrs: {
                        id: "primary-claims"
                    }
                }), n("br"), n("span", {
                    staticClass: "notranslate",
                    attrs: {
                        id: "primary-manager"
                    }
                }), n("span", {
                    staticClass: "notranslate",
                    attrs: {
                        id: "primary-heartbeat"
                    }
                }), n("br"), n("span", {
                    staticClass: "notranslate",
                    attrs: {
                        id: "primary-beneficiary"
                    }
                }), n("span", {
                    staticClass: "notranslate",
                    attrs: {
                        id: "primary-checkin"
                    }
                })])])
            }, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "col-4 text-right"
                }, [n("span", {
                    staticClass: "mb-0 mr-2",
                    attrs: {
                        id: "saved-manager"
                    }
                })])
            }],
            ci = {
                name: "custody_management",
                data: function() {
                    return {
                        managedPlayer: "",
                        managedPlayerAmount: ""
                    }
                },
                methods: {
                    depositFor: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e, n, a, r;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, this.checkManagedPlayer();
                                    case 2:
                                        if (e = t.sent, e) {
                                            t.next = 5;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 5:
                                        if (n = this.managedPlayerAmount, !(n < 1) && isFinite(n) && "" !== n) {
                                            t.next = 10;
                                            break
                                        }
                                        alert("invalid amount modal todo"), t.next = 26;
                                        break;
                                    case 10:
                                        return t.next = 12, Te(this.OwnAccount);
                                    case 12:
                                        if (a = t.sent, r = n * p.a.DRIP_TOKEN_DECIMAL, !(a < r)) {
                                            t.next = 17;
                                            break
                                        }
                                        return alert("Insuffiecent Balance"), t.abrupt("return");
                                    case 17:
                                        return t.prev = 17, t.next = 20, At(this.managedPlayerAmount, r);
                                    case 20:
                                        alert("deposit good modal todo"), t.next = 26;
                                        break;
                                    case 23:
                                        t.prev = 23, t.t0 = t["catch"](17), alert("Error doing deposit for this.managedPlayerAmount");
                                    case 26:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [17, 23]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    checkManagedPlayer: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if ("" !== this.managedPlayer) {
                                            t.next = 3;
                                            break
                                        }
                                        return alert("Please enter a address! modal"), t.abrupt("return");
                                    case 3:
                                        if (u.a.utils.isAddress(this.managedPlayer)) {
                                            t.next = 6;
                                            break
                                        }
                                        return alert("Invalid address modal todo"), t.abrupt("return");
                                    case 6:
                                        return t.next = 8, zt(this.managedPlayer, this.OwnAccount);
                                    case 8:
                                        if (e = t.sent, e) {
                                            t.next = 12;
                                            break
                                        }
                                        return alert("NOT THE MANAGER!!! You arent set as the manager for this address"), t.abrupt("return");
                                    case 12:
                                        return t.abrupt("return", !0);
                                    case 13:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    rollFor: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e, n;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, this.checkManagedPlayer();
                                    case 2:
                                        if (e = t.sent, e) {
                                            t.next = 5;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 5:
                                        return t.next = 7, mt(this.managedPlayer);
                                    case 7:
                                        if (n = t.sent, n.payout.toNumber()) {
                                            t.next = 11;
                                            break
                                        }
                                        return alert("NO DIVS!!! Slow down there buddy, your client needs to have some divs first! Make a deposit"), t.abrupt("return");
                                    case 11:
                                        try {
                                            Bt(this.managedPlayer), alert("RollFor good modal todo")
                                        } catch (a) {
                                            alert("Error doing RollFor for this.managedPlayerAmount")
                                        }
                                        return t.abrupt("return", !1);
                                    case 13:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this)
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    claimFor: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e, n;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, this.checkManagedPlayer();
                                    case 2:
                                        if (e = t.sent, e) {
                                            t.next = 5;
                                            break
                                        }
                                        return t.abrupt("return");
                                    case 5:
                                        return t.next = 7, mt(this.managedPlayer);
                                    case 7:
                                        if (n = t.sent, n.payout.toNumber()) {
                                            t.next = 11;
                                            break
                                        }
                                        return alert("NO DIVS!!! Slow down there buddy, your client needs to have some divs first! Make a deposit"), t.abrupt("return");
                                    case 11:
                                        try {
                                            Ot(this.managedPlayer), alert("ClaimFor good modal todo")
                                        } catch (a) {
                                            alert("Error doing ClaimFor for this.managedPlayerAmount")
                                        }
                                        case 12:
                                        case "end":
                                            return t.stop()
                                }
                            }), t, this)
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    transferInactive: function(t) {}
                },
                computed: {
                    OwnAccount: function() {
                        return this.$store.state.Provider.connectedWallet
                    },
                    UserDripBalance: function() {
                        return this.$store.state.DripStore.DripToken.UserBalance / p.a.DRIP_TOKEN_DECIMAL
                    }
                }
            },
            li = ci,
            pi = Object(Wn["a"])(li, oi, ui, !1, null, "35813bfc", null),
            di = (pi.exports, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", [n("div", {
                    staticClass: "mt-4 mb-4"
                }, [t._m(0), n("form", [n("div", {
                    staticClass: "form-group"
                }, [n("div", {
                    staticClass: "form-group"
                }, [n("label", [t._v("Player")]), n("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.addressToAirdrop,
                        expression: "addressToAirdrop"
                    }],
                    staticClass: "form-control",
                    attrs: {
                        id: "airdropPlayer",
                        placeholder: "Address"
                    },
                    domProps: {
                        value: t.addressToAirdrop
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.addressToAirdrop = e.target.value)
                        }
                    }
                })]), n("div", {
                    staticClass: "row"
                }, [t._m(1), n("div", {
                    staticClass: "col-6 text-right"
                }, [t._v(" Available: "), n("label", {
                    staticClass: "user-balance text-white"
                }, [t._v(t._s(t.UserDripBalance))]), t._v(" DRIP ")])]), n("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.airdropAmount,
                        expression: "airdropAmount"
                    }],
                    staticClass: "form-control",
                    attrs: {
                        type: "number",
                        id: "airdropStakeAmount",
                        placeholder: "DRIP"
                    },
                    domProps: {
                        value: t.airdropAmount
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.airdropAmount = e.target.value)
                        }
                    }
                })]), n("div", {
                    staticClass: "row justify-content-end"
                }, [n("div", {
                    staticClass: "col-12 text-left"
                }, [n("b-button", {
                    staticClass: "mb-0 mr-2",
                    attrs: {
                        variant: "primary"
                    },
                    on: {
                        click: t.directAirdrop
                    }
                }, [t._v("SEND")])], 1)])])])])
            }),
            mi = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("h3", [n("span", {
                    staticClass: "notranslate",
                    attrs: {
                        id: "time-left"
                    }
                }, [t._v("Direct Airdrop")])])
            }, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "col-6 text-left"
                }, [n("label", {
                    attrs: {
                        for: "airdropStakeAmount"
                    }
                }, [t._v("Amount")])])
            }],
            fi = {
                name: "teams_transfers",
                mixins: [b, mr],
                data: function() {
                    return {
                        addressToAirdrop: "",
                        airdropAmount: ""
                    }
                },
                methods: {
                    directAirdrop: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e, n, a, r, s;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (this.isWalletConnected()) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showUnconnectedWalletErrorModal(), t.abrupt("return");
                                    case 3:
                                        if (this.isCorrectNetwork()) {
                                            t.next = 6;
                                            break
                                        }
                                        return this.showWrongNetworkErrorModal(), t.abrupt("return");
                                    case 6:
                                        if ("" !== this.addressToAirdrop) {
                                            t.next = 9;
                                            break
                                        }
                                        return this.showInvalidAddressModal("No address entered! Please enter a address to airdrop.!"), t.abrupt("return");
                                    case 9:
                                        if (u.a.utils.isAddress(this.addressToAirdrop)) {
                                            t.next = 12;
                                            break
                                        }
                                        return this.showInvalidAddressModal("Invalid BEP20 Address! Check that the address is valid!"), t.abrupt("return");
                                    case 12:
                                        return t.next = 14, pt(this.addressToAirdrop);
                                    case 14:
                                        if (e = t.sent, "0x0000000000000000000000000000000000000000" !== e.upline) {
                                            t.next = 18;
                                            break
                                        }
                                        return this.showWarningModal("Invalid Buddy", "Call your bud", "Your buddy has not joined the faucet yet!"), t.abrupt("return");
                                    case 18:
                                        return t.next = 20, Ae();
                                    case 20:
                                        if (n = t.sent, n) {
                                            t.next = 24;
                                            break
                                        }
                                        return this.showWarningModal("Allowance not enabled!", "Check allowance!", "Please set allowance on Faucet by making a deposit!"), t.abrupt("return");
                                    case 24:
                                        if (a = this.airdropAmount, !(a < 1) && isFinite(a) && "" !== a) {
                                            t.next = 28;
                                            break
                                        }
                                        return this.showErrorModal("Invalid amount to airdrop", "Minimum of 1 Drip required"), t.abrupt("return");
                                    case 28:
                                        if (!(Number(a) > Number(this.UserDripBalance))) {
                                            t.next = 31;
                                            break
                                        }
                                        return this.showWarningModal("Airdrop Error", "Insufficient balance!", "Go to the Fountain to top up!"), t.abrupt("return");
                                    case 31:
                                        return r = u.a.utils.toWei(a), u.a.utils.toWei(this.UserDripBalance), t.prev = 33, t.next = 36, $t(this.addressToAirdrop, r);
                                    case 36:
                                        s = t.sent, this.showTransactionSuccessModal("Airdrop complete", s.transactionHash), t.next = 43;
                                        break;
                                    case 40:
                                        t.prev = 40, t.t0 = t["catch"](33), this.showErrorModal("Transaction Error! ".concat(t.t0.message));
                                    case 43:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [33, 40]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }()
                },
                computed: {
                    OwnAccount: function() {
                        return this.$store.state.Provider.connectedWallet
                    },
                    UserDripBalance: function() {
                        return this.$store.getters.UserDripBalance
                    }
                }
            },
            hi = fi,
            yi = Object(Wn["a"])(hi, di, mi, !1, null, "d46ce7c4", null),
            bi = yi.exports,
            vi = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", [n("div", {
                    staticClass: "mb-4"
                }, [t._m(0), n("form", [n("div", {
                    staticClass: "form-group"
                }, [n("label", {
                    attrs: {
                        for: "beneficiary"
                    }
                }, [t._v("Beneficiary (optional)")]), n("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.beneficiaryAddress,
                        expression: "beneficiaryAddress"
                    }],
                    staticClass: "form-control",
                    attrs: {
                        id: "beneficiary",
                        placeholder: "Address"
                    },
                    domProps: {
                        value: t.beneficiaryAddress
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.beneficiaryAddress = e.target.value)
                        }
                    }
                })]), n("div", {
                    staticClass: "form-group"
                }, [n("label", [t._v("Inactivity Threshold")]), n("b-form-select", {
                    attrs: {
                        options: t.inactiveThresholdOptions
                    },
                    model: {
                        value: t.inactiveThresholdSelection,
                        callback: function(e) {
                            t.inactiveThresholdSelection = e
                        },
                        expression: "inactiveThresholdSelection"
                    }
                })], 1), n("div", {
                    staticClass: "row justify-content-end"
                }, [n("div", {
                    staticClass: "col-8 text-left"
                }, [n("b-button", {
                    staticClass: "mb-0 mr-2",
                    attrs: {
                        variant: "primary"
                    },
                    on: {
                        click: t.saveBeneficiary
                    }
                }, [t._v("SAVE")]), n("b-button", {
                    staticClass: "mb-0 mr-2",
                    attrs: {
                        variant: "primary"
                    },
                    on: {
                        click: t.clearBeneficiary
                    }
                }, [t._v("CLEAR")])], 1), t._m(1)])])]), n("div", {
                    staticClass: "mb-4"
                }, [t._m(2), n("form", [n("div", {
                    staticClass: "form-group"
                }, [n("label", {
                    attrs: {
                        for: "manager"
                    }
                }, [t._v("Manager (optional)")]), n("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.accountManagerAddress,
                        expression: "accountManagerAddress"
                    }],
                    staticClass: "form-control",
                    attrs: {
                        id: "manager",
                        placeholder: "Address"
                    },
                    domProps: {
                        value: t.accountManagerAddress
                    },
                    on: {
                        input: function(e) {
                            e.target.composing || (t.accountManagerAddress = e.target.value)
                        }
                    }
                })]), n("div", {
                    staticClass: "row justify-content-end"
                }, [n("div", {
                    staticClass: "col-8 text-left"
                }, [n("b-button", {
                    staticClass: "mb-0 mr-2",
                    attrs: {
                        variant: "primary"
                    },
                    on: {
                        click: t.saveManager
                    }
                }, [t._v("SAVE")]), n("b-button", {
                    staticClass: "mb-0 mr-2",
                    attrs: {
                        variant: "primary"
                    },
                    on: {
                        click: t.clearManager
                    }
                }, [t._v("CLEAR")])], 1), t._m(3)])])])])
            },
            wi = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("h3", [n("span", {
                    staticClass: "notranslate",
                    attrs: {
                        id: "time-left"
                    }
                }, [t._v("Inactive Account Management")])])
            }, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "col-4 text-right"
                }, [n("span", {
                    staticClass: "mb-0 mr-2",
                    attrs: {
                        id: "saved-beneficiary"
                    }
                }), n("span", {
                    staticClass: "mb-0 mr-2",
                    attrs: {
                        id: "saved-duration"
                    }
                })])
            }, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("h3", [n("span", {
                    staticClass: "notranslate",
                    attrs: {
                        id: "time-left"
                    }
                }, [t._v("Account Manager")])])
            }, function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "col-4 text-right"
                }, [n("span", {
                    staticClass: "mb-0 mr-2",
                    attrs: {
                        id: "saved-manager"
                    }
                })])
            }],
            gi = {
                name: "teams_settings",
                mixins: [b],
                data: function() {
                    return {
                        inactiveThresholdSelection: 90,
                        inactiveThresholdOptions: [{
                            value: 90,
                            text: "3 months"
                        }, {
                            value: 120,
                            text: "4 months"
                        }, {
                            value: 180,
                            text: "6 months"
                        }, {
                            value: 240,
                            text: "8 months"
                        }, {
                            value: 365,
                            text: "1 year"
                        }, {
                            value: 545,
                            text: "1.5 years"
                        }, {
                            value: 730,
                            text: "2 years"
                        }],
                        beneficiaryAddress: "",
                        accountManagerAddress: ""
                    }
                },
                methods: {
                    saveBeneficiary: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e, n, a;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (u.a.utils.isAddress(this.beneficiaryAddress)) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showErrorModal("Invalid address!"), t.abrupt("return");
                                    case 3:
                                        return t.next = 5, zt(this.OwnAccount, this.beneficiaryAddress);
                                    case 5:
                                        if (e = t.sent, e) {
                                            t.next = 9;
                                            break
                                        }
                                        return this.showErrorModal("The address supplied is not eligible to be a beneficiary. Check to make sure the player has joined in player lookup."), t.abrupt("return");
                                    case 9:
                                        return n = this.inactiveThresholdSelection, a = n * K, t.prev = 11, t.next = 14, Ft(this.beneficiaryAddress, a);
                                    case 14:
                                        t.sent, this.showSuccessModal("Success Modal Text"), t.next = 21;
                                        break;
                                    case 18:
                                        t.prev = 18, t.t0 = t["catch"](11), this.showErrorModal("Invalid address! ".concat(t.t0.message));
                                    case 21:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [11, 18]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    clearBeneficiary: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.prev = 0, t.next = 3, Ft(Y, 90 * K);
                                    case 3:
                                        t.sent, this.showSuccessModal("Success Modal Text"), t.next = 10;
                                        break;
                                    case 7:
                                        t.prev = 7, t.t0 = t["catch"](0), this.showErrorModal("Error during Transaction! ".concat(t.t0.message));
                                    case 10:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [0, 7]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    saveManager: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (u.a.utils.isAddress(this.accountManagerAddress)) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showErrorModal("Invalid address!"), t.abrupt("return");
                                    case 3:
                                        return t.next = 5, zt(this.OwnAccount, this.accountManagerAddress);
                                    case 5:
                                        if (e = t.sent, e) {
                                            t.next = 9;
                                            break
                                        }
                                        return this.showErrorModal("The address supplied is not eligible to be a manager. Check to make sure the player has joined in player lookup."), t.abrupt("return");
                                    case 9:
                                        return t.prev = 9, t.next = 12, Ut(this.accountManagerAddress);
                                    case 12:
                                        t.sent, this.showSuccessModal("Success Modal Text"), t.next = 19;
                                        break;
                                    case 16:
                                        t.prev = 16, t.t0 = t["catch"](9), this.showErrorModal("Transaction Error! ".concat(t.t0.message));
                                    case 19:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [9, 16]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    clearManager: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        return t.prev = 0, t.next = 3, Ut(Y);
                                    case 3:
                                        t.sent, this.showSuccessModal("Transaction success Modal Text"), t.next = 10;
                                        break;
                                    case 7:
                                        t.prev = 7, t.t0 = t["catch"](0), this.showErrorModal("Transaction Error! ".concat(t.t0.message));
                                    case 10:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [0, 7]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }()
                },
                computed: {
                    OwnAccount: function() {
                        return this.$store.state.Provider.connectedWallet
                    }
                }
            },
            xi = gi,
            _i = Object(Wn["a"])(xi, vi, wi, !1, null, "4450c70c", null),
            ki = (_i.exports, {
                name: "teams",
                components: {
                    team_viewer: Ps,
                    team_airdrop: Vs,
                    teams_transfers: bi
                }
            }),
            Ci = ki,
            Ti = Object(Wn["a"])(Ci, vs, ws, !1, null, "530c02d4", null),
            Di = Ti.exports,
            Ai = function() {
                var t = this,
                    e = t.$createElement;
                t._self._c;
                return t._m(0)
            },
            Ri = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "container col-12"
                }, [n("h2", {
                    staticClass: "text-white-50"
                }, [t._v("About")]), n("p", {
                    staticClass: "text-white"
                }, [t._v("Players can participate by purchasing DRIP from the platform's SWAP page, joining another userâ€™s DRIP team (1 DRIP minimum requirement)"), n("br"), t._v(" Depositing DRIP to the Faucet contract earns a consistent 1% daily return of their DRIP (365% maximum payout) passively. Players can also compound their earnings through regular deposits, rolling rewards as well as team based referrals. Unlike many other platforms promising a consistent daily % return, Faucet's contract cannot drain and will ALWAYS be able to provide the DRIP that has been rewarded. DRIP rewards come from a 10% tax on all DRIP transactions excluding buys from the platform's SWAP page."), n("br"), t._v(" If there is ever a situation where the tax pool is not enough to pay DRIP rewards new DRIP will be minted to ensure rewards are paid out. Given the game theory behind the DRIP network, the probability that the system will need to mint new DRIP to pay rewards is extremely low. Since DRIP deposited into Faucet are sent to a burn address and DRIP is constantly being locked in the liquidity pool through the reservoir contract, DRIP is the only deflationary daily ROI platform."), n("br"), t._v(" The best strategy for DRIP is to focus on real world adoption by building out your team through direct referrals, as you will receive bonus rewards from referrals on their deposits and downline bonuses from players they refer based on the amount of "), n("a", {
                    staticClass: "text-white",
                    attrs: {
                        href: "https://br34p.finance/"
                    }
                }, [t._v("bR34P")]), t._v(" held in your wallet: 1-2, 2-3, 3-5, 4-8, 5-13, 6-21, 7-34, 8-55, 9-89, 10-144, 11-233, 12-377, 13-610, 14-987, 15-1597 ")]), n("p", {
                    attrs: {
                        id: "referral"
                    }
                })])
            }],
            Bi = (n("ac1f"), n("00b4"), {
                name: "about",
                mounted: function() {
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (this.contractAddress = _(p.a.FAUCET_ADDRESS))
                },
                data: function() {
                    return {
                        contractAddress: p.a.FAUCET_ADDRESS,
                        contractAddressUrl: "".concat(p.a.GetBscscanBaseUrl(), "/address/").concat(p.a.FAUCET_ADDRESS)
                    }
                },
                methods: {}
            }),
            Mi = Bi,
            Si = Object(Wn["a"])(Mi, Ai, Ri, !1, null, "3f09ab18", null),
            Pi = Si.exports,
            Ei = {
                components: {
                    userStats: Hr,
                    deposit: Or,
                    price: rs,
                    buddy: ls,
                    lookup: bs,
                    teams: Di,
                    about: Pi,
                    actions: $r,
                    foot: Ca
                },
                name: "faucet",
                created: function() {},
                data: function() {
                    return {
                        showTooltip: !1
                    }
                },
                methods: {
                    copyRef: function() {
                        var t = this,
                            e = document.createElement("textarea");
                        e.value = "".concat(window.location.hostname, "/faucet?buddy=").concat(this.ConnectedAccount), e.setAttribute("readonly", ""), e.style.position = "absolute", e.style.left = "-9999px", document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e), setTimeout((function() {
                            t.showTooltip = !1
                        }), 1200)
                    }
                },
                computed: {
                    ConnectedAccount: function() {
                        return this.$store.state.Provider.connectedWallet
                    },
                    HasUpline: function() {
                        return "None" !== this.$store.state.Faucet.Faucet.User.upline
                    }
                },
                watch: {}
            },
            ji = Ei,
            Oi = (n("c277"), Object(Wn["a"])(ji, Rr, Br, !1, null, "782a8d4f", null)),
            Ii = Oi.exports,
            Ui = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", [n("div", {
                    staticClass: "container"
                }, [n("div", {
                    staticClass: "landing-page"
                }, [n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-xl-12"
                }, [n("div", {
                    staticClass: "home-text text-center row"
                }, [n("b-container", {}, [n("b-row", [n("b-col", [n("span", {
                    staticClass: "luck-title notranslate"
                }, [t._v("reservoir")])])], 1)], 1)], 1)]), n("div", {
                    staticClass: "container col-xl-6 col-lg-6 col-md-6 mb-4 pt-4"
                }, [n("userStats"), n("p", {
                    staticClass: "col-12 white mb-3 text-justify"
                }, [t._v(" Reservoir is The DRIP Networkâ€™s solution for players that want benefit from non-inflationary yield farming through adding liquidity to DRIP ")]), n("actions")], 1), n("div", {
                    staticClass: "container col-12 col-xl-6 col-lg-6 col-md-6 mb-4"
                }, [n("b-card", {
                    staticClass: "mb-4",
                    attrs: {
                        "bg-variant": "primary",
                        "text-variant": "white"
                    }
                }, [n("b-card-text", [n("buy")], 1)], 1), n("b-card", {
                    staticClass: "mb-4",
                    attrs: {
                        "bg-variant": "primary",
                        "text-variant": "white"
                    }
                }, [n("b-card-text", [n("withdraw")], 1)], 1), n("p", {
                    staticClass: "col-12 white mb-3"
                })], 1), n("div", {
                    staticClass: "container col-12 col-xl-6 col-lg-6 col-md-6 mb-4"
                })]), n("appStats")], 1)]), n("foot")], 1)
            },
            Ni = [],
            Fi = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [t._m(0), t._l(t.appStats, (function(t) {
                    return n("div", {
                        key: t.header,
                        staticClass: "container col-6 col-xl-4 col-lg-4 col-md-4 text-center"
                    }, [n("statBlock", {
                        attrs: {
                            "header-text": t.headerText,
                            "sub-text": t.subText,
                            "stat-value": t.statValue,
                            icon: t.icon
                        }
                    })], 1)
                }))], 2)
            },
            Wi = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "container col-12 text-center"
                }, [n("h1", {}, [t._v("Stats")]), n("p", [t._v("Reservoir is The DRIP Networkâ€™s solution for players that want benefit from non-inflationary yield farming through adding liquidity to DRIP. Here are the numbers...")])])
            }],
            $i = {
                name: "appStats",
                components: {
                    statBlock: Ha
                },
                created: function() {
                    this.updateAppStats()
                },
                data: function() {
                    return {
                        appStats: []
                    }
                },
                methods: {
                    updateAppStats: function() {
                        this.appStats = [k("Players", this.ReservoirData.Totals.players, "User Count", "iconsmind-MaleFemale"), k("Total Value Locked", this.TotalValueLocked, "DROPS", "iconsmind-Full-Moon"), k("Rewards", this.TotalRewards, "BNB", "iconsmind-Mine"), k("Dividend Pool", this.DividendSting, "DROPS (DRIP / LOCKED)", "iconsmind-Basket-Coins"), k("Contract Balance", "".concat(this.TokenBalance, " BNB"), "DROPS â‰ˆ ".concat(this.TokenBalanceUSD, " USDT"), "iconsmind-Coins"), k("Transactions", this.ReservoirData.Totals.totalTxs, "Txs", "iconsmind-Sync")]
                    }
                },
                computed: {
                    ReservoirData: function() {
                        return this.$store.state.Reservoir.Reservoir
                    },
                    TotalValueLocked: function() {
                        var t = x(this.ReservoirData.Totals.lockedBalance, 4);
                        return t
                    },
                    TotalRewards: function() {
                        var t = x(this.ReservoirData.Totals.totalDrip, 4);
                        return t
                    },
                    TokenBalance: function() {
                        var t = x(this.ReservoirData.Totals.tokenBalance, 4);
                        return t
                    },
                    TokenBalanceUSD: function() {
                        var t = x(this.ReservoirData.Totals.tokenBalance, 4);
                        return "..." !== t && (t *= this.$store.state.Prices.wbnb.usd), t
                    },
                    DividendBalance: function() {
                        var t = x(this.ReservoirData.Totals.dividendBalance, 4);
                        return t
                    },
                    DividendSting: function() {
                        var t = x(this.ReservoirData.Totals.dividendBalance, 4),
                            e = x(this.ReservoirData.Totals.lockedBalance, 4);
                        return t + " / " + e
                    }
                },
                watch: {
                    ReservoirData: function() {
                        this.updateAppStats()
                    }
                }
            },
            Li = $i,
            zi = Object(Wn["a"])(Li, Fi, Wi, !1, null, "a087d9f4", null),
            Vi = zi.exports,
            Gi = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "row",
                    attrs: {
                        id: "topStatsContainer"
                    }
                }, t._l(t.userStats, (function(t) {
                    return n("div", {
                        key: t.header,
                        staticClass: "container col-6 col-xl-4 col-lg-4 col-md-4 text-center"
                    }, [n("statBlock", {
                        attrs: {
                            "header-text": t.headerText,
                            "sub-text": t.subText,
                            "stat-value": t.statValue,
                            icon: t.icon
                        }
                    })], 1)
                })), 0)
            },
            qi = [],
            Hi = {
                name: "userStats",
                components: {
                    statBlock: Ha
                },
                created: function() {
                    this.updateUserStats()
                },
                data: function() {
                    return {
                        userStats: []
                    }
                },
                methods: {
                    updateUserStats: function() {
                        this.userStats = [k("Rewards", this.UserDivsBnb, "BNB", "iconsmind-Coins"), k("Total DROPS", this.UserDropBalance, "DROP", "iconsmind-Astronaut"), k("Stake", this.UserStake, "%", "iconsmind-Gaugage"), k("Compounds", this.ReservoirData.User.stats.compoundCount, "Count", "iconsmind-Repeat-3"), k("Total Withdrawn", this.UserTotalWithdrawn, "BNB", "iconsmind-Basket-Coins"), k("Compounded Total", this.UserTotalCompounds, "BNB", "iconsmind-Back")]
                    }
                },
                computed: {
                    ReservoirData: function() {
                        return this.$store.state.Reservoir.Reservoir
                    },
                    UserStake: function() {
                        return isNaN(this.ReservoirData.User.stake) ? "..." : this.ReservoirData.User.stake.toFixed(2)
                    },
                    UserDivsBnb: function() {
                        return g(this.ReservoirData.User.divsBnb)
                    },
                    UserDropBalance: function() {
                        return g(this.ReservoirData.User.balance)
                    },
                    UserTotalWithdrawn: function() {
                        return g(this.ReservoirData.User.stats.withdrawn)
                    },
                    UserTotalCompounds: function() {
                        return g(this.ReservoirData.User.stats.reinvested)
                    }
                },
                watch: {
                    ReservoirData: function() {
                        this.updateUserStats()
                    }
                }
            },
            Yi = Hi,
            Ki = Object(Wn["a"])(Yi, Gi, qi, !1, null, "c58106be", null),
            Ji = Ki.exports,
            Xi = function() {
                var t = this,
                    e = t.$createElement,
                    a = t._self._c || e;
                return a("div", [a("h3", [t._v("Buy and Deposit")]), a("form", [a("div", {
                    staticClass: "form-group"
                }, [a("div", {
                    staticClass: "row"
                }, [t._m(0), a("div", {
                    staticClass: "col-6 text-right"
                }, [t._v(" BNB Balance: "), a("label", {
                    staticClass: "user-balance text-white"
                }, [t._v(t._s(t.UserBnbBalance))]), a("br"), t._v(" Price: "), a("label", {
                    staticClass: "user-balance text-white"
                }, [t._v(" " + t._s(t.DripBnbPrice) + " ")]), t._v(" "), a("span", {
                    staticClass: "text-small"
                }, [t._v("DRIP/BNB")])])]), a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.BuyAmount,
                        expression: "BuyAmount"
                    }],
                    staticClass: "form-control",
                    attrs: {
                        type: "number",
                        placeholder: "BNB"
                    },
                    domProps: {
                        value: t.BuyAmount
                    },
                    on: {
                        input: [function(e) {
                            e.target.composing || (t.BuyAmount = e.target.value)
                        }, t.debounceInput]
                    }
                }), a("small", {
                    staticClass: "form-text text-left"
                }, [t._v("Estimated: "), a("span", {
                    staticClass: "notranslate"
                }, [t._v(t._s(t.BuyEstimate))]), t._v(" DROPS")])]), a("div", {
                    staticClass: "row justify-content-end"
                }, [a("div", {
                    staticClass: "col-12 text-left"
                }, [a("b-button", {
                    attrs: {
                        variant: "outline-light"
                    },
                    on: {
                        click: t.buy
                    }
                }, [t._v("BUY")]), t.txInProgress ? a("img", {
                    attrs: {
                        src: n("7fb4")
                    }
                }) : t._e()], 1)])])])
            },
            Qi = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "col-6 text-left"
                }, [n("br"), n("label", [t._v("Amount")])])
            }],
            Zi = {
                name: "buy",
                mixins: [b, mr],
                data: function() {
                    return {
                        BuyAmount: "",
                        BuyEstimate: "",
                        txInProgress: !1
                    }
                },
                methods: {
                    buy: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e, n;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (this.isWalletConnected()) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showUnconnectedWalletErrorModal(), t.abrupt("return");
                                    case 3:
                                        if (this.isCorrectNetwork()) {
                                            t.next = 6;
                                            break
                                        }
                                        return this.showWrongNetworkErrorModal(), t.abrupt("return");
                                    case 6:
                                        if (!(this.BuyAmount <= 0) && isFinite(this.BuyAmount) && "" !== this.BuyAmount) {
                                            t.next = 9;
                                            break
                                        }
                                        return this.showWarningModal("Invalid amount", "Check your buy amount!", "Enter a valid amount of BNB!"), t.abrupt("return");
                                    case 9:
                                        return e = u.a.utils.toWei(this.BuyAmount), this.txInProgress = !0, t.prev = 11, t.next = 14, an.Buy(e);
                                    case 14:
                                        n = t.sent, this.showTransactionSuccessModal("Buy successful!", n.transactionHash), t.next = 21;
                                        break;
                                    case 18:
                                        t.prev = 18, t.t0 = t["catch"](11), this.showTransactionErrorModal(t.t0.message);
                                    case 21:
                                        return t.prev = 21, this.txInProgress = !1, t.finish(21);
                                    case 24:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [11, 18, 21, 24]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    debounceInput: Is()(function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                            var n, a;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (!(this.BuyAmount <= 0 || "" === this.BuyAmount)) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.BuyEstimate = 0, t.abrupt("return");
                                    case 3:
                                        return e.target.value, n = u.a.utils.toWei(this.BuyAmount), t.prev = 5, t.next = 8, an.GetDripEstimate(n);
                                    case 8:
                                        a = t.sent, this.BuyEstimate = Number(u.a.utils.fromWei(a)).toFixed(4), t.next = 15;
                                        break;
                                    case 12:
                                        t.prev = 12, t.t0 = t["catch"](5), console.error("Error getting Drip Estimate: ", t.t0.message);
                                    case 15:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [5, 12]
                            ])
                        })));
                        return function(e) {
                            return t.apply(this, arguments)
                        }
                    }(), 500)
                },
                computed: {
                    FountainData: function() {
                        return this.$store.state.FountainStore.Fountain
                    },
                    DripBnbPrice: function() {
                        return isNaN(this.FountainData.price) ? "..." : u.a.utils.fromWei(this.FountainData.price)
                    },
                    UserBnbBalance: function() {
                        return this.$store.getters.UserBnbBalance
                    }
                }
            },
            to = Zi,
            eo = Object(Wn["a"])(to, Xi, Qi, !1, null, "1acbf4bc", null),
            no = eo.exports,
            ao = function() {
                var t = this,
                    e = t.$createElement,
                    a = t._self._c || e;
                return a("div", [a("h3", [t._v("Withdraw")]), a("form", [a("div", {
                    staticClass: "form-group"
                }, [a("div", {
                    staticClass: "row"
                }, [t._m(0), a("div", {
                    staticClass: "col-6 text-right"
                }, [t._v(" Drop Balance: "), a("label", {
                    staticClass: "user-balance text-white"
                }, [t._v(t._s(t.UserDropBalance))]), a("br")])]), a("b-input-group", [a("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.WithdrawAmount,
                        expression: "WithdrawAmount"
                    }],
                    staticClass: "form-control",
                    attrs: {
                        type: "number",
                        placeholder: "DROPS"
                    },
                    domProps: {
                        value: t.WithdrawAmount
                    },
                    on: {
                        input: [function(e) {
                            e.target.composing || (t.WithdrawAmount = e.target.value)
                        }, t.debounceInput]
                    }
                }), a("b-input-group-append", [a("b-button", {
                    attrs: {
                        variant: "info"
                    },
                    on: {
                        click: t.setMaxAmount
                    }
                }, [t._v("Max")])], 1)], 1)], 1), a("div", {
                    staticClass: "row justify-content-end"
                }, [a("div", {
                    staticClass: "col-12 text-left"
                }, [a("b-button", {
                    attrs: {
                        variant: "outline-light"
                    },
                    on: {
                        click: t.withdraw
                    }
                }, [t._v("Withdraw")]), t.txInProgress ? a("img", {
                    attrs: {
                        src: n("7fb4")
                    }
                }) : t._e()], 1)])])])
            },
            ro = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "col-6 text-left"
                }, [n("br"), n("label", [t._v("Amount")])])
            }],
            so = {
                name: "buy",
                mixins: [b, mr],
                data: function() {
                    return {
                        WithdrawAmount: "",
                        BuyEstimate: "",
                        txInProgress: !1
                    }
                },
                methods: {
                    setMaxAmount: function() {
                        this.WithdrawAmount = this.UserDropBalance
                    },
                    withdraw: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e, n;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (this.isWalletConnected()) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showUnconnectedWalletErrorModal(), t.abrupt("return");
                                    case 3:
                                        if (this.isCorrectNetwork()) {
                                            t.next = 6;
                                            break
                                        }
                                        return this.showWrongNetworkErrorModal(), t.abrupt("return");
                                    case 6:
                                        if (!(this.WithdrawAmount <= 0) && isFinite(this.WithdrawAmount) && "" !== this.WithdrawAmount) {
                                            t.next = 9;
                                            break
                                        }
                                        return this.showWarningModal("Invalid amount", "Check your withdraw amount!", "Enter a valid amount of BNB!"), t.abrupt("return");
                                    case 9:
                                        if (!(Number(this.WithdrawAmount) > Number(this.UserDropBalance))) {
                                            t.next = 12;
                                            break
                                        }
                                        return this.showWarningModal("Insufficient balance", "Check your withdraw amount!", "Your desired withdraw amount exceeds your available Drops balacne!"), t.abrupt("return");
                                    case 12:
                                        return e = u.a.utils.toWei(this.WithdrawAmount), this.txInProgress = !0, t.prev = 14, t.next = 17, an.Sell(e);
                                    case 17:
                                        n = t.sent, this.showTransactionSuccessModal("Withdraw successful!", n.transactionHash), t.next = 24;
                                        break;
                                    case 21:
                                        t.prev = 21, t.t0 = t["catch"](14), this.showTransactionErrorModal(t.t0.message);
                                    case 24:
                                        return t.prev = 24, this.txInProgress = !1, t.finish(24);
                                    case 27:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [14, 21, 24, 27]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    debounceInput: Is()(function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t(e) {
                            var n, a;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (!(this.BuyAmount <= 0 || "" === this.BuyAmount)) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.BuyEstimate = 0, t.abrupt("return");
                                    case 3:
                                        return e.target.value, n = u.a.utils.toWei(this.BuyAmount), t.prev = 5, t.next = 8, an.GetDripEstimate(n);
                                    case 8:
                                        a = t.sent, this.BuyEstimate = Number(u.a.utils.fromWei(a)).toFixed(4), t.next = 15;
                                        break;
                                    case 12:
                                        t.prev = 12, t.t0 = t["catch"](5), console.error("Error getting Drip Estimate: ", t.t0.message);
                                    case 15:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [5, 12]
                            ])
                        })));
                        return function(e) {
                            return t.apply(this, arguments)
                        }
                    }(), 500)
                },
                computed: {
                    ReservoirData: function() {
                        return this.$store.state.Reservoir.Reservoir
                    },
                    UserDropBalance: function() {
                        return "..." === this.ReservoirData.User.balance ? "..." : u.a.utils.fromWei(this.ReservoirData.User.balance)
                    },
                    FountainData: function() {
                        return this.$store.state.FountainStore.Fountain
                    },
                    DripBnbPrice: function() {
                        return isNaN(this.FountainData.price) ? "..." : u.a.utils.fromWei(this.FountainData.price)
                    },
                    UserBnbBalance: function() {
                        return this.$store.getters.UserBnbBalance
                    }
                }
            },
            io = so,
            oo = Object(Wn["a"])(io, ao, ro, !1, null, "78107b49", null),
            uo = oo.exports,
            co = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", [n("b-button", {
                    attrs: {
                        variant: "outline-light",
                        block: ""
                    },
                    on: {
                        click: t.reinvest
                    }
                }, [t._v("COMPOUND")]), n("b-button", {
                    attrs: {
                        variant: "outline-light",
                        block: ""
                    },
                    on: {
                        click: t.withdraw
                    }
                }, [t._v("CLAIM")])], 1)
            },
            lo = [],
            po = {
                name: "actions",
                mixins: [b, mr],
                methods: {
                    checkDivs: function() {
                        var t = A.state.Reservoir.Reservoir.User.divs;
                        return "0" !== t || (this.showErrorModal("You need some Divs! Make a deposit to continue!"), !1)
                    },
                    reinvest: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (this.isWalletConnected()) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showUnconnectedWalletErrorModal(), t.abrupt("return");
                                    case 3:
                                        if (this.isCorrectNetwork()) {
                                            t.next = 6;
                                            break
                                        }
                                        return this.showWrongNetworkErrorModal(), t.abrupt("return");
                                    case 6:
                                        if (!this.checkDivs()) {
                                            t.next = 18;
                                            break
                                        }
                                        return t.prev = 7, t.next = 10, an.Compound();
                                    case 10:
                                        e = t.sent, this.showTransactionSuccessModal("Compound successful!", e.transactionHash), t.next = 18;
                                        break;
                                    case 14:
                                        t.prev = 14, t.t0 = t["catch"](7), console.error(t.t0), this.showTransactionErrorModal(t.t0.message);
                                    case 18:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [7, 14]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }(),
                    withdraw: function() {
                        var t = Object(a["a"])(regeneratorRuntime.mark((function t() {
                            var e;
                            return regeneratorRuntime.wrap((function(t) {
                                while (1) switch (t.prev = t.next) {
                                    case 0:
                                        if (this.isWalletConnected()) {
                                            t.next = 3;
                                            break
                                        }
                                        return this.showUnconnectedWalletErrorModal(), t.abrupt("return");
                                    case 3:
                                        if (this.isCorrectNetwork()) {
                                            t.next = 6;
                                            break
                                        }
                                        return this.showWrongNetworkErrorModal(), t.abrupt("return");
                                    case 6:
                                        if (!this.checkDivs()) {
                                            t.next = 18;
                                            break
                                        }
                                        return t.prev = 7, t.next = 10, an.Withdraw();
                                    case 10:
                                        e = t.sent, this.showTransactionSuccessModal("Withdraw successful!", e.transactionHash), t.next = 18;
                                        break;
                                    case 14:
                                        t.prev = 14, t.t0 = t["catch"](7), console.error(t.t0), this.showTransactionErrorModal(t.t0.message);
                                    case 18:
                                    case "end":
                                        return t.stop()
                                }
                            }), t, this, [
                                [7, 14]
                            ])
                        })));

                        function e() {
                            return t.apply(this, arguments)
                        }
                        return e
                    }()
                },
                computed: {}
            },
            mo = po,
            fo = Object(Wn["a"])(mo, co, lo, !1, null, "ac2d8338", null),
            ho = fo.exports,
            yo = {
                name: "reservoir",
                components: {
                    appStats: Vi,
                    userStats: Ji,
                    buy: no,
                    withdraw: uo,
                    actions: ho,
                    foot: Ca
                },
                mounted: function() {
                    return Object(a["a"])(regeneratorRuntime.mark((function t() {
                        return regeneratorRuntime.wrap((function(t) {
                            while (1) switch (t.prev = t.next) {
                                case 0:
                                case "end":
                                    return t.stop()
                            }
                        }), t)
                    })))()
                },
                data: function() {
                    return {}
                },
                methods: {},
                computed: {},
                watch: {}
            },
            bo = yo,
            vo = (n("48d2"), Object(Wn["a"])(bo, Ui, Ni, !1, null, "d8e1ea5c", null)),
            wo = vo.exports,
            go = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", [n("div", {
                    staticClass: "container landing-page"
                }, [n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [n("div", {
                    staticClass: "container col-xl-12"
                }, [n("div", {
                    staticClass: "home-text text-center row"
                }, [n("b-container", {}, [n("b-row", [n("b-col", [n("span", {
                    staticClass: "luck-title notranslate"
                }, [t._v("drip network")])])], 1)], 1)], 1)]), n("about"), n("div", {
                    staticClass: "container col-xl-6 col-lg-6 col-md-6 mb-4 pt-4"
                }, [n("p", {
                    staticClass: "col-12 white mb-3 text-justify"
                }), n("p", {
                    staticClass: "col-12 white text-center"
                }, [n("router-link", {
                    attrs: {
                        to: "fountain"
                    }
                }, [n("b-button", {
                    attrs: {
                        variant: "outline-light",
                        block: ""
                    }
                }, [t._v("TRADE")])], 1), n("router-link", {
                    attrs: {
                        to: "faucet"
                    }
                }, [n("b-button", {
                    attrs: {
                        variant: "outline-light",
                        block: ""
                    }
                }, [t._v("STAKE")])], 1), n("router-link", {
                    attrs: {
                        to: "reservoir"
                    }
                }, [n("b-button", {
                    attrs: {
                        variant: "outline-light",
                        block: ""
                    }
                }, [t._v("LIQUIDITY FARM")])], 1)], 1)]), t._m(0)], 1), n("appStats"), n("div", {
                    staticClass: "row pt-4 mt-4"
                }, [n("activity")], 1)], 1), n("foot")], 1)
            },
            xo = [function() {
                var t = this,
                    e = t.$createElement,
                    a = t._self._c || e;
                return a("div", {
                    staticClass: "container col-12 col-xl-6 col-lg-6 col-md-6 text-center"
                }, [a("img", {
                    staticClass: "img-fluid p-4 logoSan",
                    attrs: {
                        src: n("6a2e")
                    }
                })])
            }],
            _o = function() {
                var t = this,
                    e = t.$createElement;
                t._self._c;
                return t._m(0)
            },
            ko = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "container col-12 col-xl-8 col-lg-8 col-md-8"
                }, [n("p", {
                    staticClass: "text-white"
                }, [t._v("DRIP Network is the latest project developed by "), n("a", {
                    attrs: {
                        target: "_blank",
                        href: "https://t.me/Forex_Sh4rk"
                    }
                }, [t._v("Forex_Shark")]), t._v(", "), n("a", {
                    attrs: {
                        target: "_blank",
                        href: "https://t.me/BBbest123"
                    }
                }, [t._v("BB")]), t._v(" and team."), n("br"), n("br"), t._v(" The official token of the DRIP Network is DRIP (BEP-20) on the Binance Smart blockchain (BSC) that captures value by being scarce, deflationary, censorship resistant, and by being built on a robust, truly decentralized blockchain. "), n("br"), n("br"), t._v('The recommended exchange for trading DRIP is the Fountain contract which can be found directly on the platforms website under the "swap" tab, as it allows us to waive the initial 10% tax on buys and provides the lowest prices and highest liquidity, resulting in less slippage for larger trades.')])])
            }],
            Co = {
                name: "about"
            },
            To = Co,
            Do = (n("30d7"), Object(Wn["a"])(To, _o, ko, !1, null, "3b642644", null)),
            Ao = Do.exports,
            Ro = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "row mb-4 mt-2"
                }, [t._m(0), t._l(t.appStats, (function(t) {
                    return n("div", {
                        key: t.header,
                        staticClass: "container col-6 col-xl-3 col-lg-3 col-md-3 text-center"
                    }, [n("statBlock", {
                        attrs: {
                            "header-text": t.headerText,
                            "sub-text": t.subText,
                            "stat-value": t.statValue,
                            icon: t.icon
                        }
                    })], 1)
                }))], 2)
            },
            Bo = [function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "container col-12 text-center"
                }, [n("h1", {}, [t._v("Stats")]), n("p", [t._v("The DRIP token captures the entire value of the Drip Network and makes it available to the entire BNB Community!")])])
            }],
            Mo = {
                name: "appStats",
                components: {
                    statBlock: Ha
                },
                created: function() {
                    this.updateAppStats()
                },
                data: function() {
                    return {
                        appStats: []
                    }
                },
                methods: {
                    updateAppStats: function() {
                        this.appStats = [k("Players", this.DripTokenData.Players, "Count", "iconsmind-MaleFemale"), k("Max Daily Return", this.difficulty, "", "iconsmind-Line-Chart2"), k("Total Supply", this.DripTokenData.Mined / p.a.DRIP_TOKEN_DECIMAL_NEW, "DRIP â‰ˆ N/A", "iconsmind-Mine"), k("Transactions", this.DripTokenData.TotalTransactions, "Count", "iconsmind-Sync")]
                    }
                },
                computed: {
                    DripTokenData: function() {
                        return this.$store.state.DripStore.DripToken
                    }
                },
                watch: {
                    FaucetData: function() {
                        this.updateAppStats()
                    }
                }
            },
            So = Mo,
            Po = Object(Wn["a"])(So, Ro, Bo, !1, null, "2b20e1ea", null),
            Eo = Po.exports,
            jo = function() {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("div", {
                    staticClass: "col-12 mb-4"
                }, [n("b-card", {
                    attrs: {
                        "no-body": "",
                        "bg-variant": "dark",
                        "text-variant": "white"
                    }
                }, [n("b-tabs", {
                    attrs: {
                        card: ""
                    }
                }, [n("b-tab", {
                    attrs: {
                        title: "Activity",
                        active: ""
                    }
                }, [n("b-card-text", [n("div", {
                    staticClass: "row"
                }, [n("div", {
                    staticClass: "col-12 list"
                }, [n("div", {
                    staticClass: "card d-flex flex-row mb-3"
                }, [n("div", {
                    staticClass: "d-flex flex-grow-1 min-width-zero"
                }, [n("div", {
                    staticClass: "card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"
                }, [n("div", {
                    staticClass: "w-20 w-xs-100"
                }, [t._v("From")]), n("div", {
                    staticClass: "w-20 w-xs-100"
                }, [t._v("To")]), n("p", {
                    staticClass: "mb-1 w-15 w-xs-100"
                }, [t._v("Amount")])])])])])])]), t._l(t.DripTransferEvents, (function(e) {
                    return n("b-card-text", {
                        key: e[0]
                    }, [n("div", {
                        staticClass: "row"
                    }, [n("div", {
                        staticClass: "col-12 list"
                    }, [n("div", {
                        staticClass: "card d-flex flex-row mb-3"
                    }, [n("div", {
                        staticClass: "d-flex flex-grow-1 min-width-zero"
                    }, [n("div", {
                        staticClass: "card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center"
                    }, [n("div", {
                        staticClass: "w-20 w-xs-100"
                    }, [t._v(t._s(e[1]))]), n("div", {
                        staticClass: "w-20 w-xs-100"
                    }, [t._v(t._s(e[2]))]), n("p", {
                        staticClass: "mb-1 w-15 w-xs-100"
                    }, [t._v(t._s(e[3]))])])])])])])])
                }))], 2)], 1)], 1)], 1)
            },
            Oo = [],
            Io = {
                name: "activity",
                components: {},
                data: function() {
                    return {
                        transferEvents: []
                    }
                },
                computed: {
                    DripEvents: function() {
                        return this.$store.state.DripStore.DripTokenEvents
                    },
                    DripTransferEvents: function() {
                        var t = 10,
                            e = this.DripEvents.Transfers;
                        if (!e) return [];
                        var n = [];
                        if (e.length > 0)
                            for (var a = 0; a < t; a++) {
                                var r = a,
                                    s = _(e[a].returnValues.from),
                                    i = _(e[a].returnValues.to),
                                    o = g(e[a].returnValues.value);
                                n.push([r, s, i, o])
                            }
                        return n
                    }
                }
            },
            Uo = Io,
            No = Object(Wn["a"])(Uo, jo, Oo, !1, null, "f3118596", null),
            Fo = No.exports,
            Wo = {
                components: {
                    appStats: Eo,
                    about: Ao,
                    activity: Fo,
                    foot: Ca
                },
                name: "faucet",
                created: function() {},
                data: function() {
                    return {
                        DripTokenAddress: l["DRIP_TOKEN_ADDRESS"],
                        bscscanBaseUrl: p.a.GetBscscanBaseUrl()
                    }
                },
                methods: {},
                computed: {},
                watch: {}
            },
            $o = Wo,
            Lo = (n("89df"), Object(Wn["a"])($o, go, xo, !1, null, "15de93f6", null)),
            zo = Lo.exports,
            Vo = n("8c4f"),
            Go = n("3b8b"),
            qo = n.n(Go),
            Ho = n("5f5b"),
            Yo = n("b1e0");
        n("f9e3"), n("2dd8"), n("5aea"), n("7a1f");
        L.Initialize();
        n("1157");
        Dn(), r["default"].use(Vo["a"]);
        var Ko = [{
                path: "/",
                component: zo
            }, {
                path: "/fountain",
                component: Ar
            }, {
                path: "/faucet",
                component: Ii
            }, {
                path: "/reservoir",
                component: wo
            }],
            Jo = new Vo["a"]({
                routes: Ko,
                mode: "history"
            });
        r["default"].use(qo.a), n("a68b"), n("b853"), r["default"].config.productionTip = !1, r["default"].use(Ho["a"]), r["default"].use(Yo["a"]), new r["default"]({
            router: Jo,
            store: A,
            render: function(t) {
                return t(la)
            }
        }).$mount("#app")
    },
    "5aea": function(t, e, n) {},
    "5c0b": function(t, e, n) {
        "use strict";
        n("9c0c")
    },
    "5ee3": function(t, e, n) {},
    6: function(t, e) {},
    "64c8": function(t, e, n) {
        "use strict";
        n("f223")
    },
    "69af": function(t) {
        t.exports = JSON.parse("{}")
    },
    "69b6": function(t, e, n) {
        "use strict";
        n("0347")
    },
    "69c8": function(t, e, n) {},
    "6a2e": function(t, e, n) {
        t.exports = n.p + "img/dropLogo.cea61927.png"
    },
    "6a80": function(t, e, n) {
        "use strict";
        n("4a9e")
    },
    "6b5f": function(t) {
        t.exports = JSON.parse('[{"constant":true,"inputs":[{"name":"_customerAddress","type":"address"}],"name":"dividendsOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lockedTokenBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_customerAddress","type":"address"}],"name":"statsOf","outputs":[{"name":"","type":"uint256[15]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"myDividends","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dividendBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sweep","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalTokenBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalClaims","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_amount","type":"uint256"}],"name":"calculateTaxedBnbToTokenLiquidity","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_amount","type":"uint256"}],"name":"calculateTaxedLiquidityToBnb","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"collateralAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalWithdrawn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalTxs","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_amount","type":"uint256"}],"name":"calculateLiquidityToBnb","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_customerAddress","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"distributionInterval","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalDeposits","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"swapAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"myTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_customerAddress","type":"address"}],"name":"dailyEstimateBnb","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"buy","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"lastPayout","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"collateralBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_customerAddress","type":"address"}],"name":"bnbBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"players","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amountOfTokens","type":"uint256"}],"name":"sell","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_customerAddress","type":"address"}],"name":"dailyEstimate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balanceInterval","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reinvest","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_swapAddress","type":"address"},{"name":"_collateralAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"invested","type":"uint256"},{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"soldTokens","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"onLeaderBoard","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"incomingeth","type":"uint256"},{"indexed":false,"name":"tokensMinted","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"onTokenPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"tokensBurned","type":"uint256"},{"indexed":false,"name":"ethEarned","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"onTokenSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"ethReinvested","type":"uint256"},{"indexed":false,"name":"tokensMinted","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"onReinvestment","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"ethWithdrawn","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"onWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"customerAddress","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"onClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"onTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"bnbBalance","type":"uint256"},{"indexed":false,"name":"tokenBalance","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"onBalance","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"onLiquiditySweep","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"onLiquidityProviderReward","type":"event"}]')
    },
    "6dd1": function(t, e, n) {
        "use strict";
        n("a9f5")
    },
    7: function(t, e) {},
    "742a": function(t) {
        t.exports = JSON.parse('[{"inputs":[{"internalType":"address","name":"token_addr","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"addr","type":"address"}],"name":"WhitelistedAddressAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"addr","type":"address"}],"name":"WhitelistedAddressRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":true,"internalType":"uint256","name":"bnb_amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"token_amount","type":"uint256"}],"name":"onAddLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":true,"internalType":"uint256","name":"token_amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"bnb_amount","type":"uint256"}],"name":"onBnbPurchase","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"}],"name":"onContractBalance","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"onLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"onPrice","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"provider","type":"address"},{"indexed":true,"internalType":"uint256","name":"bnb_amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"token_amount","type":"uint256"}],"name":"onRemoveLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"liquidity","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"onSummary","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":true,"internalType":"uint256","name":"bnb_amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"token_amount","type":"uint256"}],"name":"onTokenPurchase","type":"event"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"addAddressToWhitelist","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"addrs","type":"address[]"}],"name":"addAddressesToWhitelist","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"min_liquidity","type":"uint256"},{"internalType":"uint256","name":"max_tokens","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bnbBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"min_tokens","type":"uint256"}],"name":"bnbToTokenSwapInput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokens_bought","type":"uint256"}],"name":"bnbToTokenSwapOutput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"bnb_sold","type":"uint256"}],"name":"getBnbToLiquidityInputPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bnb_sold","type":"uint256"}],"name":"getBnbToTokenInputPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokens_bought","type":"uint256"}],"name":"getBnbToTokenOutputPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"input_amount","type":"uint256"},{"internalType":"uint256","name":"input_reserve","type":"uint256"},{"internalType":"uint256","name":"output_reserve","type":"uint256"}],"name":"getInputPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getLiquidityToReserveInputPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"output_amount","type":"uint256"},{"internalType":"uint256","name":"input_reserve","type":"uint256"},{"internalType":"uint256","name":"output_reserve","type":"uint256"}],"name":"getOutputPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokens_sold","type":"uint256"}],"name":"getTokenToBnbInputPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"bnb_bought","type":"uint256"}],"name":"getTokenToBnbOutputPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"providers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"removeAddressFromWhitelist","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"addrs","type":"address[]"}],"name":"removeAddressesFromWhitelist","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"min_bnb","type":"uint256"},{"internalType":"uint256","name":"min_tokens","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokens_sold","type":"uint256"},{"internalType":"uint256","name":"min_bnb","type":"uint256"}],"name":"tokenToBnbSwapInput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"bnb_bought","type":"uint256"},{"internalType":"uint256","name":"max_tokens","type":"uint256"}],"name":"tokenToBnbSwapOutput","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTxs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"txs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]')
    },
    7866: function(t) {
        t.exports = JSON.parse('[{"constant":false,"inputs":[{"name":"buddy","type":"address"}],"name":"updateBuddy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"myBuddy","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"player","type":"address"}],"name":"buddyOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"player","type":"address"},{"indexed":true,"name":"buddy","type":"address"}],"name":"onUpdateBuddy","type":"event"}]')
    },
    "7a1f": function(t, e, n) {},
    "7fb4": function(t, e, n) {
        t.exports = n.p + "img/loadingDrip.27e2ef14.svg"
    },
    8: function(t, e) {},
    "830a": function(t, e, n) {
        "use strict";
        n("2f3f")
    },
    8672: function(t, e, n) {},
    8729: function(t, e, n) {},
    "87f5": function(t, e, n) {},
    "89df": function(t, e, n) {
        "use strict";
        n("69c8")
    },
    9: function(t, e) {},
    "942e": function(t, e, n) {
        t.exports = n.p + "img/twitter-logo.eb5e72b7.svg"
    },
    9913: function(t, e, n) {
        "use strict";
        n("0e1e")
    },
    "9c0c": function(t, e, n) {},
    "9fcf": function(t, e, n) {
        "use strict";
        n("c729")
    },
    a1b3: function(t, e, n) {
        "use strict";
        n("8729")
    },
    a68b: function(t, e, n) {},
    a9f5: function(t, e, n) {},
    aadf: function(t, e, n) {},
    b0f3: function(t, e, n) {},
    b5fc: function(t, e, n) {},
    b750: function(t, e, n) {
        "use strict";
        n("0a46")
    },
    b853: function(t, e, n) {},
    c277: function(t, e, n) {
        "use strict";
        n("8672")
    },
    c729: function(t, e, n) {},
    d24d: function(t, e, n) {
        "use strict";
        n("26ca")
    },
    db49: function(t, e) {
        var n = "0x4Fe59AdcF621489cED2D674978132a54d432653A",
            a = "0xFFE811714ab35360b67eE195acE7C10D93f89D8C",
            r = "0x20f663CEa80FaCE82ACDFA3aAE6862d246cE0333",
            s = "0x900D655425ecD9429c4f71BFd1dEAc5FF8C87344",
            i = "0xB486857fac4254A7ffb3B1955EE0C0A2B2ca75AB",
            o = "0x18a1162b11Df31F66bD81c27bCd4ab0C00eE12AE",
            u = "0xe8e9720e39e13854657c165CF4eB10b2dfE33570",
            c = "binance",
            l = "https://api.drip.community";

        function p() {
            return "binance-testnet" === c ? "https://testnet.bscscan.com" : "https://bscscan.com"
        }
        var d = 1e4,
            m = 1e18;
        t.exports = {
            FOUNTAIN_ADDRESS: n,
            FAUCET_ADDRESS: a,
            DRIP_TOKEN_ADDRESS: r,
            BUDDY_ADDRESS: s,
            RESERVOIR_ADDRESS: i,
            TOKENMINT_ADDRESS: o,
            TEAM_ADDRESS: u,
            DRIP_TOKEN_DECIMAL_NEW: m,
            RefreshRate: d,
            ActiveUrl: l,
            ActiveNetwork: c,
            GetBscscanBaseUrl: p
        }
    },
    e474: function(t, e, n) {
        t.exports = n.p + "img/telegram-logo.4bd51b01.svg"
    },
    e764: function(t, e, n) {
        "use strict";
        n("0f37")
    },
    eb21: function(t, e, n) {
        t.exports = n.p + "img/bscLogo.5f1c66d8.jpeg"
    },
    f223: function(t, e, n) {},
    fb6b: function(t, e, n) {
        "use strict";
        n("aadf")
    }
});