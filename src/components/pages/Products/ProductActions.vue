<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="props.dialog" max-width="600">
      <v-card
        prepend-icon="mdi-account"
        :title="idUpdate ? t('EditProduct') : t('AddProduct')"
        class="p-3"
      >
        <v-form v-model="form" @submit.prevent="onSubmit">
          <v-row dense>
            <v-col cols="12" md="12" sm="12"
              ><div class="imageProfile">
                <img
                  :src="ChangeIMage"
                  v-if="ChangeIMage"
                  class="imagePostion"
                />
                <img
                  src="@/assets/images/img-box-svgrepo-com.svg"
                  v-else
                  class="imagePostion"
                />
                <v-icon icon="mdi-upload"></v-icon>
                <input
                  type="file"
                  name="headerImg"
                  @change="changeFile"
                  class="input-file"
                /></div
            ></v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="DataList.title"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                :label="t('title')"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                v-model="DataList.price"
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
                v-model="DataList.description"
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
import { onMounted, ref, watch } from "vue";
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
const DataList = ref({ title: "", price: 0, description: "" });
const loading = ref(false);
//Change IMage function
let ChangeIMage = ref("");
let changeFile = (e) => {
  const files = event.target.files;
  let filename = files[0].name;
  const fileReader = new FileReader();
  fileReader.addEventListener("load", () => {
    ChangeIMage.value = fileReader.result;
  });
  fileReader.readAsDataURL(files[0]);
  ChangeIMage.value = files[0];
};
//submit function
const onSubmit = async () => {
  let dataForm = new FormData();
  for (let key in DataList.value) {
    dataForm.append(key, DataList.value[key]);
  }
  dataForm.append("images[0]", ChangeIMage.value);
  if (!form.value) return;
  loading.value = true;
  if (props.idUpdate) {
    await Products.UpdateProduct(props.idUpdate, dataForm);
  } else {
    await Products.AddProduct(dataForm);
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
        DataList.value = {
          title: e.title,
          price: e.price,
          description: e.description,
        };
        ChangeIMage.value = e.images[0];
      }
    });
    loading.value = false;
  }
});
const resetData = () => {
  DataList.value.title = "";
  DataList.value.price = 0;
  DataList.value.description = "";
};
//when open popup to update
watch(props, (newpage) => {
  ChangeIMage.value = "";
  if (Products.Products.length > 0 && props.idUpdate) {
    Products.Products.find((e) => {
      if (e.id == props.idUpdate) {
        DataList.value = {
          title: e.title,
          price: e.price,
          description: e.description,
        };
        ChangeIMage.value = e.images[0];
      }
    });
    loading.value = false;
  }
});
</script>
<style scoped lang="scss">
.imageProfile {
  width: 10%;
  margin: auto;
  position: relative;
  cursor: pointer;
  .input-file {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    right: 0px;
    opacity: 0;
    z-index: 000000;
    top: 0px;
  }
  i {
    position: absolute;
    top: 24%;
    left: 5px;
    background: #46277c;
    font-size: 19px;
    color: white;
    border-radius: 100%;
    padding: 17px;
    opacity: 0;
  }
  .imagePostion {
    width: 70px;
    height: 70px;
    border-radius: 100%;
  }
  &:hover i {
    opacity: 0.8;
  }
}
</style>
