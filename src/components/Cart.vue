<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="cart">
        <router-link to="/" class="cart--go-back" v-if="isSmallScreen()" >←️ Voltar</router-link>
        <h2 class="cart--title">Seu pedido</h2>
        <p v-if="hasNoItems">Seu carrinho ainda está vazio ...</p>
        <CartItem 
        v-for="item in cartList" 
        :key="item.id" 
        :item="item"
        />
        <div class="cart--total" v-if="!hasNoItems">
            <span>Total: </span>
            <span class="price">{{ getCartTotal | currency }}</span>
        </div>
    </div>
</template>

<script>
import CartItem from './CartItem.vue';
import { mapGetters } from 'vuex'
import Mixin from "@/mixins/mixins";

    export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Cart",
    mixins: [Mixin],
    filters: {
        currency(value) {
        return `R$ ${value.toFixed(2).replace(".", ",")}`;
        },
    },
    computed: {
        cartList() {
            return this.$store.state.cartList;
        },
        ...mapGetters([
            'getCartTotal'
        ]),
        hasNoItems() {
            return !this.cartList.length;
        }
    },
    components: { CartItem }
}
</script>

<style lang="less" scoped>
.cart{
    background: white;
    min-width: 643px;
    width: 643px;
    padding: 50px;

    &--title {
        font-weight: 600;
        font-size: 24px;
        margin-top: 50px;
    }

    &--go-back {
        font-weight: 600;
        font-size: 18px;
        text-decoration: none;
        color: black;
    }

    &--total {
        font-weight: 600;
        font-size: 18px;
        text-align: right;
        margin-top: 30px;

        .price {
            color: @yellow;
            padding-left: 10px;
        }
    }

    

    @media @tablets {
        width: 100%;
        min-width: unset;
        padding: 50px 20px 20px;

    }

   
}
</style>