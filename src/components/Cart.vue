<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="cart">
        <router-link to="/" class="cart--go-back" >←️ Voltar</router-link>
        <h2 class="cart--title">Seu pedido</h2>
        <CartItem 
        v-for="item in cartList" 
        :key="item.id" 
        :item="item"
        />
        <div class="cart--total">
            <span>Total: </span>
            <span class="price">{{ getCartTotal | currency }}</span>
        </div>
    </div>
</template>

<script>
import CartItem from './CartItem.vue';
import { mapGetters } from 'vuex'

    export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Cart",
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
        ])
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
        display: none;
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

        &--go-back {
        display: flex;
    }
    }

   
}
</style>