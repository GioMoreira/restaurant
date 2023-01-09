<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="item--quantity">
    <button class="buttons" @click="onDecreaseButtonClick()" 
    :disabled="item.quantity == 0">
      -
    </button>
    <span class="number">{{ item.quantity }}</span>
    <button class="buttons" @click="onIncreaseButtonClick()">+</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    item: {},
    useStore: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity"]),

    onDecreaseButtonClick() {
      if(this.useStore) {
        this.decreaseQuantity(this.item.id);
        return;
      }
      // eslint-disable-next-line vue/no-mutating-props
      --this.item.quantity
      
    },

    onIncreaseButtonClick() {
      if(this.useStore) {
        this.increaseQuantity(this.item.id);
        return;
      }     
      // eslint-disable-next-line vue/no-mutating-props
      ++this.item.quantity;
    }
  },

};
</script>

<style lang="less" scoped>
.item--quantity {
  display: flex;
  align-items: center;
  padding-right: 40px;
  font-size: 18px;

  .number {
    font-weight: 500;
    color: @yellow;
    width: 28px;
    text-align: center;
  }

  .buttons {
    font-weight: 600;
    cursor: pointer;
    background: none;
    border: 0;
  }
}
</style>
