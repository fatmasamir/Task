<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="props.dialog" max-width="600">
      <v-card
        prepend-icon="mdi-account"
        :title="idUpdate ? 'Edit Product' : 'Add Product'"
        class="p-3"
      >
        <v-form v-model="form" @submit.prevent="onSubmit">
          <v-row dense>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="FormData.title"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                :label="t('title')"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="FormData.price"
                :readonly="loading"
                :rules="[required]"
                type="number"
                :label="t('price')"
                placeholder="Enter your price"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-textarea
                v-model="FormData.description"
                :readonly="loading"
                :rules="[required]"
                type="text"
                :label="t('description')"
                placeholder="Enter product description"
                clearable
              ></v-textarea></v-col
          ></v-row>
          <br />
          <div class="d-flex w-100 justify-center gap-3 align-center">
            <v-btn
              :disabled="!form"
              :loading="loading"
              color="success"
              size="large"
              type="submit"
              variant="elevated"
            >
              {{ t("Save") }}
            </v-btn>
            <v-btn
              color="gray"
              size="large"
              variant="elevated"
              @click="$emit('closepop')"
            >
              {{ t("Cancel") }}
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { UseProducts } from "@/stores/Products/index.ts";
import { useI18n } from "vue-i18n";
// i18n
const { t } = useI18n();
//Used Products
let Products = UseProducts();
//props
const props = defineProps(["dialog", "idUpdate"]);
//emits
const emits = defineEmits(["closepop"]);

const form = ref(false);
const FormData = ref({ title: "", price: 0, description: "" });
const loading = ref(false);

//submit function
const onSubmit = async () => {
  if (!form.value) return;
  loading.value = true;
  if (props.idUpdate) {
    await Products.UpdateProduct(props.idUpdate, FormData.value);
  } else {
    await Products.AddProduct(FormData.value);
  }
  resetData();
  emits("closepop");
  setTimeout(() => (loading.value = false), 2000);
};
//required function
const required = (v) => {
  return !!v || "Field is required";
};
//required function
watch(props.idUpdate, (newpage) => {
  if (Products.Products.length > 0) {
    Products.Products.find((e) => {
      if (e.id == props.idUpdate) {
        FormData.value = {
          title: e.title,
          price: e.price,
          description: e.description,
        };
      }
    });
    loading.value = false;
  }
});
const resetData = () => {
  FormData.value.title = "";
  FormData.value.price = 0;
  FormData.value.description = "";
};
//when open popup to update
watch(props, (newpage) => {
  if (Products.Products.length > 0 && props.idUpdate) {
    Products.Products.find((e) => {
      if (e.id == props.idUpdate) {
        FormData.value = {
          title: e.title,
          price: e.price,
          description: e.description,
        };
      }
    });
    loading.value = false;
  }
});
</script>
