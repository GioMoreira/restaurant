<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="order">
    <form>
      <div class="user-data">
        <p class="section-title">Seus dados</p>

        <div class="input-field">
          <label for="">{{ formData.name.label }}</label>
          <input
            type="text"
            :placeholder="formData.name.placeholder"
            v-model="formData.name.value"
            @blur="formData.name.isValid()"
            :class="{ error: !formData.name.valid }"
          />
          <!-- blur faz a validação assim q o user termina de preencher o campo, para já
          tirar msg de erro da tela -->

          <p class="error-message" v-if="!formData.name.valid">
            {{ formData.name.errorMessage }}
          </p>
        </div>

        <div class="input-field">
          <label for="">{{ formData.cellphone.label }}</label>
          <input
            type="text"
            :placeholder="formData.cellphone.placeholder"
            v-mask="'(##) # ####-####'"
            v-model="formData.cellphone.value"
            @blur="formData.cellphone.isValid()"
            :class="{ error: !formData.cellphone.valid }"
          />
          <!-- blur faz a validação assim q o user termina de preencher o campo, para já
          tirar msg de erro da tela -->

          <p class="error-message" v-if="!formData.cellphone.valid">
            {{ formData.cellphone.errorMessage }}
          </p>
        </div>
      </div>

      <div class="address">
        <p class="section-title">Endereço</p>
        <div class="radio-container">
          <div class="radio-option">
            <input type="radio" name="delivery-type" id="store" value="store" v-model="deliveryType" />
            <label for="store">Retirar na loja</label>
          </div>

          <div class="radio-option">
            <input type="radio" name="delivery-type" id="delivery" value="delivery" checked v-model="deliveryType"/>
            <label for="delivery">Delivery</label>
          </div>
        </div>

        <div class="address-card" v-if="isDeliveryType && hasAddressInfo && savedAddress">
          <p>{{ formData.street.value }}, {{ formData.number.value }}</p> 
          <p>{{ formData.city.value }} - {{ formData.cep.value }}</p>
        </div>

        <a @click="onShowAddressModal" v-if="isDeliveryType">{{addressButtonLabel}}</a>
      </div>

      <div class="user-payment">
        <p class="section-title">Pagamento</p>
        <p>Método de pagamento:</p>
        <div class="radio-container">
          <div class="radio-option">
            <input type="radio" name="payment-type" id="credit-card" value="credit-card" v-model="paymentType" />
            <label for="credit-card">Cartão</label>
          </div>

          <div class="radio-option">
            <input type="radio" name="payment-type" id="cash" value="cash" checked v-model="paymentType"/>
            <label for="cash">Dinheiro</label>
          </div>
        </div>
      </div>
    </form>
    <button class="primary-button" @click="orderItens">Concluir Pedido</button>

    <Modal :show="showAddressModal" @on-modal-close="hideAdressModal">
      <div class="modal-content">
        <h1>Adicionar Endereço</h1>
        <!-- CEP -->
        <div class="input-field">
          <label for="">{{ formData.cep.label }}</label>
          <input
            type="text"
            :placeholder="formData.cep.placeholder"
            v-mask="'#####-###'"
            v-model="formData.cep.value"
            @blur="formData.cep.isValid()"
            :class="{ error: !formData.cep.valid }"
          />
          <!-- blur faz a validação assim q o user termina de preencher o campo, para já
          tirar msg de erro da tela -->

          <p class="error-message" v-if="!formData.cep.valid">
            {{ formData.cep.errorMessage }}
          </p>
        </div>

        <!-- CIDADE -->
        <div class="input-field">
          <label for="">{{ formData.city.label }}</label>
          <input
            type="text"
            :placeholder="formData.city.placeholder"
            v-model="formData.city.value"
            @blur="formData.city.isValid()"
            :class="{ error: !formData.city.valid }"
          />
          <!-- blur faz a validação assim q o user termina de preencher o campo, para já
          tirar msg de erro da tela -->

          <p class="error-message" v-if="!formData.city.valid">
            {{ formData.city.errorMessage }}
          </p>
        </div>


        <!-- ENDEREÇO RUA N° -->
        <div class="address-container">
          <!-- RUA -->
          <div class="input-field">
            <label for="">{{ formData.street.label }}</label>
            <input
              type="text"
              :placeholder="formData.street.placeholder"
              v-model="formData.street.value"
              @blur="formData.street.isValid()"
              :class="{ error: !formData.street.valid }"
            />
            <!-- blur faz a validação assim q o user termina de preencher o campo, para já
            tirar msg de erro da tela -->

            <p class="error-message" v-if="!formData.street.valid">
              {{ formData.street.errorMessage }}
            </p>
          </div>

          <!-- NÚMERO -->
          <div class="input-field">
            <label for="">{{ formData.number.label }}</label>
            <input
              type="text"
              :placeholder="formData.number.placeholder"
              v-model="formData.number.value"
              @blur="formData.number.isValid()"
              :class="{ error: !formData.number.valid }"
            />
            <!-- blur faz a validação assim q o user termina de preencher o campo, para já
            tirar msg de erro da tela -->

            <p class="error-message" v-if="!formData.number.valid">
              {{ formData.number.errorMessage }}
            </p>
          </div>
        </div>
              
        <button class="secondary-button" @click="hideAdressModal">Cancelar</button>
        <button class="primary-button" @click="validateAddressForm">Adicionar</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      formData: {
        name: {
          value: "",
          placeholder: "Digite seu nome",
          errorMessage: "O nome é obrigatório e deve ter no mínimo 3 letras",
          label: "Nome*",
          valid: true,
          isValid: () => {
            this.formData.name.valid = !!this.formData.name.value.length >= 3;
          },
        },
        cellphone: {
          value: "",
          placeholder: "Digite seu celular",

          errorMessage: "O celular com DDD é obrigatório",
          label: "Celular*",
          valid: true,
          isValid: () => {
            this.formData.cellphone.valid =
              this.formData.cellphone.value.length === 16;
          },
        },
        cep: {
          value: "",
          placeholder: "Digite seu CEP",

          errorMessage: "O CEP é obrigatório",
          label: "CEP*",
          valid: true,
          isValid: () => {
            this.formData.cep.valid = !!this.formData.cep.value.length;
          },
        },
        city: {
          value: "",
          placeholder: "Digite sua cidade",

          errorMessage: "A cidade obrigatória",
          label: "Cidade*",
          valid: true,
          isValid: () => {
            this.formData.city.valid = !!this.formData.city.value.length;
          },
        },
        street: {
          value: "",
          placeholder: "Digite sua rua",

          errorMessage: "A rua obrigatória",
          label: "Rua*",
          valid: true,
          isValid: () => {
            this.formData.street.valid = !!this.formData.street.value.length;
          },
        },
        number: {
          value: "",
          placeholder: "Digite o número",

          errorMessage: "O número é obrigatório",
          label: "Número*",
          valid: true,
          isValid: () => {
            this.formData.number.valid = !!this.formData.number.value.length;
          },
        },
      },
      showAddressModal: false,
      deliveryType: 'store',
      paymentType: 'credit-card',
      savedAddress: false,
    };
  },
  computed: {
    isAddressFormValid() {
      let isValid = true;
      isValid &= this.formData.city.valid;
      isValid &= this.formData.street.valid;
      isValid &= this.formData.cep.valid;
      isValid &= this.formData.number.valid;
      return isValid;
    },
    isDeliveryType() {
      return this.deliveryType === 'delivery'
    },
    hasAddressInfo() {
      return this.formData.city.value ||
      this.formData.street.value ||
      this.formData.cep.value ||
      this.formData.number.value

    },
    addressButtonLabel() {
      return this.hasAddressInfo ? 'Editar endereço' : 'Adicionar Endereço';
    }
  },
  methods: {
    triggerValidations() {
      this.formData.name.isValid();
      this.formData.cellphone.isValid();
    },

    triggerAddressFormValidations() {
      this.formData.cep.isValid();
      this.formData.city.isValid();
      this.formData.street.isValid();
      this.formData.number.isValid();
    },

    orderItens() {
      this.triggerValidations();
    },

    onShowAddressModal() {
      this.showAddressModal = true;
    },

    hideAdressModal() {
      this.showAddressModal = false;
    },
    validateAddressForm() {
      this.triggerAddressFormValidations();
      if(!this.isAddressFormValid) return;
      this.savedAddress = true;
      this.showAddressModal = false;
    }
  },
};
</script>

<style lang="less" scoped>
.order {
  width: 720px;
  margin: 30px auto;
  background: white;
  border-radius: 8px;
  padding: 30px 50px;

  .address-container {
    display: flex;
    margin-top: 15px;
    gap: 15px;
    .input-field {
      margin: 0 !important;
      width: 100%;
    }

    .input-field:last-child {
      width: 30%;
    }

  }

  .input-field {
    display: flex;
    flex-direction: column;

    .error-message {
      font-size: 12px;
      color: @error-color;
    }


    & + .input-field {
      margin-top: 15px;
    }

    label {
      font-weight: 500;
      font-size: 16px;
      margin-bottom: 5px;
    }
  }

  form {
    .section-title {
      font-weight: 600;
      font-size: 22px;
      margin-bottom: 20px;
    }

    .radio-container {
        display: flex;
      }
    .address {
      

      a {
        color: @pink;
        font-weight: normal;
        font-size: 12px;
        text-decoration: underline;
        cursor: pointer;
        margin: 15px 0;
        display: block;
        width: fit-content;
      }

      .address-card {
        border-radius: 8px;
        border: solid 1px @dark-grey;
        padding: 10px 30px;
        margin: 15px 0;
        width: fit-content;
        p {
          font-weight: normal;
          font-size: 14px;
          color: @dark-grey;
          margin: 5px 0;
        }
        
      }
    }

    .radio-option {
      display: flex;
      align-items: center;

      & + .radio-option {
        margin-left: 45px;
      }

      label {
        padding-left: 7px;
        margin: 0;
      }
    }
  }

  button {
    margin: 30px auto;
  }

  .modal-content {
    button {
      text-align: center;
    }

    button + button {
      margin-left: 15px;
    }
  }

  @media @tablets {
    width: 100%;
    padding: 0;

    .modal-content {
    button + button {
      margin-left: 5px;
    }
  }

  .address-container {
    gap: 5px;
  }

  }


}
</style>
