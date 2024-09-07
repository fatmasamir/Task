<template>
  <v-dialog v-model="props.dialog" max-width="400" persistent>
    <v-card prepend-icon="mdi-delete" :text="text" :title="title">
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="$emit('DeleteItem')" color="gerrn">
          <span v-if="loading">
            <v-progress-circular
              color="success"
              indeterminate
              model-value="20"
            ></v-progress-circular>
            wait ...</span
          >
          <span v-else> {{ t("Save") }}</span>
        </v-btn>

        <v-btn @click="$emit('closeD')" color="red"> {{ t("Cancel") }} </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
// i18n
const { t } = useI18n();
const props = defineProps(["dialog", "text", "title", "loading"]);
</script>
