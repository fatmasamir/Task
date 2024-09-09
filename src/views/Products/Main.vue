<template>
  <v-container>
    <v-btn
      color="#5865f2"
      variant="flat"
      class="my-3"
      @click="dialogPro = true"
    >
      <v-icon color="success"></v-icon>
      {{ t("Add_New_Product") }}
    </v-btn>
    <!--Table of products-->
    <Table
      :Products="Products.Products"
      @showDialogDelete="showDialogDelete"
      @UpdateData="UpdateData"
    />
    <!--Delete product-->
    <DialogDelete
      :text="t('MessageDelete')"
      :title="t('Delete')"
      :dialog="dialog"
      @DeleteItem="DeleteItem"
      :loading="loadingDelete"
      @closeD="dialog = false"
    />
    <!--Edit & Add product-->
    <ProductActions
      :dialog="dialogPro"
      @closepop="ClosedpopAction"
      :idUpdate="idUpdate"
    />
  </v-container>
</template>
<script setup>
import Table from "@/components/pages/Products/Table.vue";
import { UseProducts } from "@/stores/Products/index.ts";
import DialogDelete from "@/components/global/Dialog/index.vue";
import ProductActions from "@/components/pages/Products/ProductActions.vue";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
// i18n
const { t } = useI18n();

//Used Products
let Products = UseProducts();

//dialog open / close
let dialog = ref(false);
let dialogPro = ref(false);
let loadingDelete = ref(false);
let DEleteID = ref();
let idUpdate = ref(null);
//Delete Item function
const showDialogDelete = (id) => {
  DEleteID.value = id;
  dialog.value = true;
};
//Delete Item function
const DeleteItem = async () => {
  loadingDelete.value = true;
  await Products.DeleteProduct(DEleteID.value);
  loadingDelete.value = false;
  dialog.value = false;
};
//Update Item function
const UpdateData = (id) => {
  idUpdate.value = id;
  dialogPro.value = true;
};
//Update Item function
const ClosedpopAction = () => {
  idUpdate.value = null;
  dialogPro.value = false;
};
onMounted(async () => {
  //call about products list
  await Products.getProducts();
});
</script>
