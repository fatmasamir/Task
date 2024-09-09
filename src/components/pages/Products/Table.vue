<template>
  <v-data-table
    :headers="headers"
    :items="Products"
    item-key="name"
    :loading="!Products.length > 0"
    loading-text="Loading ...."
    items-per-page="5"
  >
    <template v-slot:headers="{ columns }">
      <tr>
        <template v-for="column in columns" :key="column">
          <td>{{ t(column.title) }}</td>
        </template>
      </tr>
    </template>
    <template v-slot:item.images="{ item }">
      <img :src="item.images[0]" class="imagePro" v-if="item.images" />
      <img
        src="@/assets/images/img-box-svgrepo-com.svg"
        class="imagePro"
        v-else
      />
    </template>
    <template v-slot:item.price="{ value }">
      <v-chip color="success">
        {{ value }}
      </v-chip>
    </template>
    <template v-slot:item.description="{ value }">
      {{ value.substring(0, 40) + ".." }}
    </template>
    <template v-slot:item.action="{ item }">
      <v-menu open-on-hover block>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props">
            <v-icon icon="mdi-dots-vertical" />
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <router-link :to="`/show-product/${item.id}`">
                <v-icon icon="mdi-eye" color="success" /> {{ t("view") }}
              </router-link>
            </v-list-item-title></v-list-item
          >
          <v-list-item>
            <v-list-item-title @click="$emit('UpdateData', item.id)">
              <v-icon icon="mdi-pencil-outline" color="info" />
              {{ t("Edit") }}</v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="$emit('showDialogDelete', item.id)">
              <v-icon icon="mdi-delete" color="danger" />
              {{ t("delete") }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template></v-data-table
  >
</template>
<script setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useLang } from "@/stores/lang";
// Language
const Language = useLang();
const props = defineProps(["Products"]);
// i18n
const { t } = useI18n();
const itemsPerPage = ref(5);
const loading = ref(true);
const totalItems = ref(0);
const serverItems = ref([]);
let headers = ref([
  {
    title: "id",
    key: "id",
    sortable: true,
  },
  {
    title: "",
    key: "images",
  },
  {
    title: "title",
    key: "title",
  },
  {
    title: "price",
    key: "price",
  },
  {
    title: "description",
    key: "description",
  },
  {
    title: "action",
    key: "action",
  },
]);
</script>
<style scoped lang="scss">
.v-btn.v-btn--density-default {
  box-shadow: none;
}
.imagePro {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}
.v-list-item-title {
  padding: 10px;
  cursor: pointer;
  width: 150px;
  &:hover {
    background: #673ab7;
    color: white;
    border-radius: 4px;
  }
}
.is-ar {
  .v-list-item-title {
    direction: rtl;
  }
}
</style>
