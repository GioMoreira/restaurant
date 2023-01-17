<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="item--quantity">
    <button
      class="buttons"
      @click="onDecreaseButtonClick()"
      :disabled="item.quantity == 0"
    >
      -
    </button>
    <span class="number">{{ item.quantity }}</span>
    <button class="buttons" @click="onIncreaseButtonClick">+</button>
    <Modal :show="showModal">
      <div class="modal-content">
        <h2>Deseja remover esse item do carrinho?</h2>
        <button @click="onCancelButtonClick" class="secondary-button">Cancelar</button>
        <button @click="onRemoveButtonClick" class="primary-button">Sim, remover</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Modal from "./Modal.vue";

export default {
  components: {
    Modal,
  },
  props: {
    item: {},
    useStore: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity"]),

    onDecreaseButtonClick() {
      if (this.useStore) {
        this.decreaseQuantity(this.item.id);
        if (!this.item.quantity) {
          //significa que quantity está vazio
          this.showModal = true;
        }
        return;
      }
      // eslint-disable-next-line vue/no-mutating-props
      --this.item.quantity;
    },

    onIncreaseButtonClick() {
      if (this.useStore) {
        this.increaseQuantity(this.item.id);
        return;
      }
      // eslint-disable-next-line vue/no-mutating-props
      ++this.item.quantity;
    },

    onCancelButtonClick(){
      this.increaseQuantity(this.item.id);
      this.showModal = false;
    },

    onRemoveButtonClick() {
      this.showModal = false;
      this.$nextTick(() => { // Só realiza a próxima ação após concluir e atualizar na DOM a ação anterior (assim não mistura os comportamentos)
        this.$store.dispatch('removeFromCart', this.item.id);
      });
      
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

  .modal-content {
    text-align: center;
    button {
      margin-left: 10px;
      margin-top: 20px;
    }
  }
}
</style>
