<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="cart">
    <router-link to="/" class="cart--go-back" v-if="isSmallScreen()"
      >←️ Voltar</router-link
    >
    <h2 class="cart--title">Seu pedido</h2>
    <div class="cart--content">
      <p v-if="hasNoItems">Seu carrinho ainda está vazio ...</p>
      <transition-group name="list">
        <CartItem v-for="item in cartList" :key="item.id" :item="item" />
      </transition-group>
    </div>
    <div class="cart--total" v-if="!hasNoItems">
        <span>Total: </span>
        <span class="price">{{ getCartTotal | currency }}</span>
      </div>
    <button class="primary-button payment-button" @click="goToPayment" v-if="cartList.length">Finalizar compra</button>
  </div>
</template>

<script>
import CartItem from "./CartItem.vue";
import { mapGetters } from "vuex";
import Mixin from "@/mixins/mixins";
import feather from "feather-icons";

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
    ...mapGetters(["getCartTotal"]),
    hasNoItems() {
      return !this.cartList.length;
    },
    circleIcon() {
      return feather.icons.circle.toSvg();
    },
  },
  components: {
    CartItem,
  },
  methods: {
    goToPayment() {
      this.$router.push({name: 'Payment'})
    }
  },
};
</script>

<style lang="less" scoped>
.cart {
  background: white;
  min-width: 520px;
  height: 100vh;
  width: 520px;
  padding: 30px;
  display: flex;
  flex-direction: column;

  &--content {
    flex-grow: 1;
    overflow: auto;
  }

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

  .payment-button {
    width: 390px;
    margin: 20px auto;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(-30px);
  }

  @media @tablets {
    width: 100%;
    min-width: unset;
    padding: 50px 20px 20px;

    .payment-button {
    width: 100%;
  }
  }
}
</style>
