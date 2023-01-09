<template>
  <div class="item" @click="addToCart()">
    <div class="container">
      <div class="item--tag" v-if="item.offer">Oferta</div>
      <img class="item--img" :src="imagePath" alt="" />
    </div>

    <div class="content">
      <h2 class="item--name">{{ item.name }}</h2>
      <p class="item--description">{{ item.description }}</p>
      <p class="item--price">{{ item.price | currency }}</p>
    </div>
  </div>
</template>

<script>
import Mixin from "@/mixins/mixins";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Item',
    mixins: [Mixin],
    filters: {
        currency(value) {
          if( !value) return;
            return `R$ ${value.toFixed(2).replace('.',',')}`
        }
    },
    props: {
        // recebe informações do item pai
        item: {}
    },
    computed: {
        imagePath(){
            if(!this.item?.id) return;
            return require(`../assets/images/${this.item.id}.png`);
        }
    },
    methods: {
      addToCart() {
        
        if(this.isDesktop()) {
          this.$store.dispatch('addToCart', this.item);
          return;
        } 

        //se for mobile
        this.$router.push({ name: 'AddToCart', params: { id: this.item.id } })
      }
    },
}
</script>

<style lang="less" scoped>
.item {
  width: 216px;
  height: 290px;
  border-radius: 8px;
  background: white;
  position: relative;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &--name {
    font-weight: 600;
    font-size: 18px;
    margin: 0;
  }

  &--description {
    color: @dark-grey;
    font-weight: 300;
    font-size: 12px;
    margin: 0;
  }

  &--price {
    font-weight: 600;
    font-size: 18px;
    color: @yellow;
    margin:0;
  }

  &--tag {
    position: absolute;
    background: @pink;
    border-radius: 8px;
    color: white;
    top: 15px;
    right: 15px;
    font-size: 12px;
    font-weight: 500;
    padding: 3px 8px;
  }

  &--img {
    display: block;
    margin: auto;
    width: 100%;
  }

  .content{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;

  }

  @media @tablets {
    width: 100%;
    max-width: 100%;
    height: fit-content;
    border: 1px solid @light-grey;
    display: flex;
    flex-direction: row;
    margin: 10px 0;
    padding: 10px 20px;

    &--img {
      width: 86px;
      order: 0;
      margin: 0 0 5px 0;
    }

    &--price {
      text-align: right;
      margin: 10px 0 0 auto;
    }

    &--tag {
      position: static;
      order: 1;
      width: fit-content;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
    }

    .content {
      flex-grow: 1; // responsavel por alinhar os prices
    }


  }
}
</style>
