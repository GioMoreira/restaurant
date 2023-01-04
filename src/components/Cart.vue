<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="cart">
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
    }
}
</style>