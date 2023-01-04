<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div class="item">
    <div class="item--img-container">
        <img class="item--img" :src="imagePath" alt="" />
    </div>
    
    <div class="content">
      <h3 class="item--name">{{ item.name }}</h3>
      <a class="item--observation">Adicionar observação</a>
    </div>
    <p class="item--price">{{ item.price | currency }}</p>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    item: {},
  },
  filters: {
        currency(value) {
            return `R$ ${value.toFixed(2).replace('.',',')}`
        }
    },
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory;
    },
    imagePath() {
      return require(`../assets/images/${this.selectedCategory}/${this.item.id}.png`);
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid @light-grey;

  &--img-container {
    border-radius: 8px;
    background: @light-yellow;
    width: 81px;
    height: 66px;
    display: flex;
    align-items: center;
  }

  &--img {
    width: 75px;
    display: block;
    margin: auto;
  }

  &--name {
    font-weight: 600;
    font-size: 18px;
    margin: 0;
  }

  &--observation {
    color: @dark-grey;
    text-decoration: underline;
  }

  &--price {
    font-size: 18px;
    font-weight: 600;
    line-height: 27px;
    color: @yellow;
  }

  .content {
    flex-grow: 1;
    padding: 0 20px;
  }
}
</style>
