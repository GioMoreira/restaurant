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
    </div>
</template>

<script>
import CartItem from './CartItem.vue';
    export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Cart",
    component: {
        CartItem,
        
    },
    computed: {
        cartList() {
            return this.$store.state.cartList;
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
        display: none;
        font-weight: 600;
        font-size: 18px;
        text-decoration: none;
        color: black;
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