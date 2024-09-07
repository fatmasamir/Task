<template>
  <div class="mt-5">
    <v-btn
      color="orange"
      variant="flat"
      class="my-3"
      @click="$router.push('/products')"
    >
      <v-icon icon="mdi-arrow-left" /> {{ t("back") }}
    </v-btn>
    <v-card max-width="50%" v-if="!loading" class="p-4"
      ><img
        :src="Product.thumbnail"
        class="imge-pro"
        v-if="Product.thumbnail"
      />
      <img
        src="@/assets/images/img-box-svgrepo-com.svg"
        class="imge-pro"
        v-else
      />
      <h5>
        <v-chip color="success">{{ t("title") }} :-</v-chip> {{ Product.title }}
      </h5>
      <p>
        <v-chip color="success">{{ t("description") }} :-</v-chip>
        {{ Product.description }}
      </p>
      <p>
        <v-chip color="success"
          >{{ t("price") }} :- {{ Product.price }}
        </v-chip>
      </p>
    </v-card>
    <div v-else>
      <v-skeleton-loader
        elevation="4"
        max-width="50%"
        type="image, list-item-two-line, list-item-two-line, list-item-two-line, list-item-two-line"
        boilerplate
      ></v-skeleton-loader>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { UseProducts } from "@/stores/Products/index.ts";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
// i18n
const { t } = useI18n();
//route
let route = useRoute();
//Used Products
let Products = UseProducts();
//Product obj
let Product = ref({});
//loading
let loading = ref(true);
onMounted(async () => {
  //call about products list
  // await Products.getProducts();
  //filter product have id route to show
  Product.value = Products.Products.find((e) => {
    if (e.id == route.params.id) {
      return e;
    }
  });
  loading.value = false;
});
// watch(Products, (newpage) => {
//   if (Products.Products.length > 0) {
//     Product.value = Products.Products.find((e) => {
//       if (e.id == route.params.id) {
//         return e;
//       }
//     });
//     loading.value = false;
//   }
// });
</script>
<style scoped>
.imge-pro {
  width: 100%;
  object-fit: contain;
  height: 250px;
  margin: 10px auto;
}
</style>
