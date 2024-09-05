<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import SimpleInput from "@/components/global/CusomInputs/SimpleInput/SimpleInput.vue";
import SimpleButton from "@/components/global/Buttons/simpleButton/SimpleButton.vue";
import { useForm } from "vee-validate";
import * as Yup from "yup";
import AOS from "aos";
import { Useissues } from "@/stores/issues/index";

// i18n
const { t } = useI18n();

// i18n
const useissues = Useissues();

// formRef
const formRef = ref(null);

// meta
const { meta } = useForm();

// formLogin
const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: Yup.object({
    title: Yup.string().required("Name is reqired"),
    description: Yup.string().min(6).required("Message is Required"),
  }),
});

//message ,name,phone
const title = defineInputBinds("title");
const description = defineInputBinds("description");
const image = ref();
const imageUrl = ref();
const imageName = ref();
const error = ref(false);

// fileSelected
let fileSelected = (event) => {
  const file = event.target.files.item(0);
  image.value = file;
  const reader = new FileReader();
  error.value = false;
  reader.addEventListener("load", imageLoaded);
  reader.readAsDataURL(file);
};
let imageLoaded = (event) => {
  imageUrl.value = event.target.result;
  imageName.value = image.value.name;
};
// handel submit
let onSubmit = handleSubmit(async (values: any) => {
  error.value = false;
  if (image.value) {
    let formdata = new FormData();
    let data = {
      title: values.title,
      description: values.description,
    };
    for (let key in data) {
      formdata.append(key, data[key]);
    }
    formdata.append("media[0]", image.value);
    await useissues.make_issues(formdata);
  } else {
    error.value = true;
  }
});

onMounted(() => {
  AOS.init();
});
</script>
<template>
  <div
    class="card"
    data-aos="fade-in"
    data-aos-easing="linear"
    data-aos-duration="900"
  >
    <div class="card-body">
      <h6>Fill in your complain so we can help you</h6>
      <form @submit.prevent="onSubmit">
        <div class="row mt-4">
          <div class="col-md-12">
            <SimpleInput>
              <!-- <label>Email <span class="text-red">*</span> </label> -->
              <input
                type="text"
                id="title"
                name="title"
                v-bind="title"
                placeholder="title"
                :class="{ 'is-invalid': errors.title }"
              />

              <div class="invalid-feedback">{{ errors.title }}</div>
            </SimpleInput>
          </div>
          <div class="col-10 upload_content">
            <p v-if="imageName">{{ imageName }}</p>
            <p v-else>Upload your problem images</p>
            <div class="invalid-feedback" v-if="error">
              Upload your problem images is a required field
            </div>
          </div>
          <div class="col-2 upload_icon">
            <img src="@/assets/images/export.svg" />
            <input
              type="file"
              accept="image/*"
              @change="fileSelected"
              class="imgfileType"
            />
          </div>
          <div class="col-md-12 mt-3">
            <SimpleInput>
              <!-- <label>Email <span class="text-red">*</span> </label> -->
              <textarea
                type="message"
                id="message"
                name="message"
                v-bind="description"
                placeholder="Description 
“Please Mention Your Location”"
                :class="{ 'is-invalid': errors.description }"
              ></textarea>

              <div class="invalid-feedback">{{ errors.description }}</div>
            </SimpleInput>
          </div>
          <div class="col-12 mt-3">
            <SimpleButton type="send" class="register_lab">
              <button type="submit" v-if="!useissues.is_loading">
                {{ t("Send") }}
              </button>
              <button type="submit" disabled v-else>
                {{ t("wait") }}
              </button>
            </SimpleButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "./FormStyling.scss";
.card {
  width: 70%;
  margin-top: 5%;
}
.simple-button.send button {
  width: max-content;
}
@media screen and (max-width: 993px) {
  .card {
    width: 100%;
  }
}
</style>
