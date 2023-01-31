<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="payment">
    <div class="payment--content">
      <router-link to="/" class="payment--go-back" >←️ Voltar</router-link>

      <Order />
    </div>

    <Cart class="cart-menu" />
  </div>
</template>

<script>
import Mixin from "@/mixins/mixins";
import Cart from "@/components/Cart.vue";
import Order from "@/components/Order.vue";


export default {
  mixins: [Mixin],
  components: {
    Cart,
    Order,
  },
};
</script>

<style lang="less" scoped>
.payment {
  display: flex;

  &--content {
    flex-grow: 1;
    padding: 50px;

    .payment--go-back {
        font-weight: 600;
        font-size: 18px;
        text-decoration: none;
        color: black;
    }      
  } 

  
  @media @small-desktops {
    .cart-menu{
      display: none;
    }

    &--content {
      padding: 50px 20px;
    }
  }

}
</style>
