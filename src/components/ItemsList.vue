<template>
  <div class="items-list">
    <Loading v-if="isLoading" />
    <Item v-for="item in ItemsList" :key="item.id" :item="item" />
  </div>
</template>

<script>
import axios from "axios";
import Item from "./Item.vue";
import Loading from "./Loading.vue"

export default {
  name: "ItemsList",
  components: {
    Item,
    Loading
  },
  data() {
    return {
      ItemsList: [],
      isLoading: false
    };
  },
  created() {
    this.getItemsList();
  },
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory;
    },
  },
  methods: {
    getItemsList() {
      this.isLoading = true;
      this.ItemsList = [];
      // simula o tempo de carregamento de um request normal para mostrar o loading
      setTimeout ( ()=> {
        axios.get(`http://localhost:3000/${this.selectedCategory}`).then((response) => {
          this.ItemsList = response.data;
          this.isLoading = false;
        });
      },750);
    },
  },
  watch: {
    selectedCategory() {
      this.getItemsList();
    },
  },
};
</script>

<style lang="less" scoped>
.items-list {
  margin: 50px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: flex-start;

  @media @small-desktops {
    width: 100%;
    max-width: 800px;
    margin: 50px auto;
  }

  @media @tablets {
    flex-wrap: wrap;
    margin: 0px;
    padding: 20px;
  }
}
</style>
