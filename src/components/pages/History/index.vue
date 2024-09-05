<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import SimpleInput from "@/components/global/CusomInputs/SimpleInput/SimpleInput.vue";
import SimpleButton from "@/components/global/Buttons/simpleButton/SimpleButton.vue";
import { useForm } from "vee-validate";
import * as Yup from "yup";
import { defineProps } from "vue";
import Swal from "sweetalert2";
import AOS from "aos";
import { UseHistory } from "@/stores/History/index";
import Loading from "../../global/Loading/index.vue";
let Histories = UseHistory();
// i18n
const props = defineProps(["Histories"]);
// i18n
const { t } = useI18n();

// handel submit
let onSubmit = () => {
  console.log("hello");
};
let NumberHistory = ref([]);
let MessageFeedback = ref([]);
let MakeFeedback = (index) => {
  NumberHistory.value[index] = !NumberHistory.value[index];
};
let sendFeedback = async (id, index) => {
  const data = { feedback: MessageFeedback.value[index] };
  await Histories.MakeFeedback(id, JSON.stringify(data)).then(() => {
    setTimeout(() => {
      MakeFeedback(index);
    }, 1000);
  });
};
let DeleteHistoryfun = async (id, index) => {
  Swal.fire({
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#aaa",
    title: "Are you want to delete this History",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      Histories.DeleteHistory(id, index).then(() => {
        setTimeout(() => {
          Swal.fire({
            title: "Deleted!",
            icon: "success",
          });
        }, 1000);
      });
    }
  });
};
onMounted(() => {
  AOS.init();
});
watch(props, (newValue) => {
  for (let key in newValue.Histories) {
    NumberHistory.value.push(false);
    MessageFeedback.value.push("");
  }
});
</script>
<template>
  <div
    class="card"
    data-aos="fade-in"
    data-aos-easing="linear"
    data-aos-duration="900"
  >
    <h6 class="card-header">History details</h6>
    <div class="card-body" v-if="props.Histories">
      <div
        v-if="props.Histories.length > 0"
        class="History-Card"
        v-for="(list, index) in props.Histories"
        :key="list.id"
      >
        <div class="history-detailes" v-if="!NumberHistory[index]">
          <div class="content">
            <div class="row mr-2 p-0">
              <div class="col-lg-3 image-history">
                <div class="imag-sec">
                  <div v-for="img in list.image" :key="img" class="">
                    <img :src="img.original_url" />
                  </div>
                </div>
                <span v-if="list.status == 1" class="Accepted">Accepted</span
                ><span v-else-if="list.status == 2" class="Rejected"
                  >Rejected</span
                ><span v-else class="Pending">Pending</span>
              </div>
              <div class="col-lg-9">
                <h4>{{ list.title }}</h4>
                <p class="my-1">{{ list.description }}</p>
                <span>{{ list.date }}</span>
              </div>
            </div>
            <div
              class="row mt-2 feedback-sec"
              v-if="list.feedback && list.feedback.length > 0"
            >
              <div class="col-lg-12">
                <h6>The feedback :-</h6>
                <ul>
                  <li v-for="feed in list.feedback" :key="feed.id">
                    <p>- {{ feed.feedback }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <SimpleButton type="send">
            <button @click="MakeFeedback(index)" v-if="list.status">
              feedback
            </button></SimpleButton
          >
          <SimpleButton type="send">
            <button
              class="btn-danger"
              @click="DeleteHistoryfun(list.id, index)"
              :class="Histories.DeleteHistoryLoading ? 'disabled' : ''"
              :disabled="Histories.DeleteHistoryLoading"
            >
              Delete
            </button></SimpleButton
          >
        </div>
        <div class="history-detailes-form" v-else>
          <div class="content">
            <form @submit.prevent="onSubmit">
              <div class="row m-0 p-0">
                <div class="col-md-10 m-0 p-0">
                  <SimpleInput>
                    <textarea
                      placeholder="Feedback"
                      v-model="MessageFeedback[index]"
                      :rows="4"
                    ></textarea>
                    <span
                      v-if="!Histories.is_loadingMakeFeedback"
                      class="send-feedback"
                      @click="sendFeedback(list.id, index)"
                    >
                      Send feedback
                    </span>
                    <span class="send-feedback disabled" v-else>
                      {{ t("wait") }} ...
                    </span>
                  </SimpleInput>
                </div>
                <div class="col-md-2 m-0 p-0">
                  <SimpleButton type="send">
                    <button type="submit" @click="MakeFeedback(index)">
                      Back
                    </button></SimpleButton
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div v-else class="NotFound">History is empty</div>
    </div>
    <Loading v-else />
  </div>
</template>
<style scoped lang="scss">
@import "../Hompage/FormStyling.scss";
.card {
  width: 90%;
  margin-top: 5%;
  padding: 0px;
  hr {
    background: rgba(252, 252, 252, 1);
  }
  .card-body {
    padding: 0px !important;
    .content {
      width: 100%;
      .row {
        align-items: center;
      }
      .imag-sec {
        height: 178px;
        display: block;
        width: 100%;
        img {
          width: 100%;
          height: 178px;
        }
      }
    }
  }
  .card-header {
    padding: 20px 30px 20px;
    background: white;
    border: 0px;
  }
  .history-detailes {
    display: flex;
    border-top: 5px solid rgba(252, 252, 252, 1);
    padding: 30px 0px;
    padding: 30px 20px;
    justify-content: space-between;
    align-items: center;
    .image-history {
      position: relative;
      .Accepted,
      .Rejected,
      .Pending {
        position: absolute;
        bottom: 10px;
        background: rgba(23, 201, 8, 1);
        padding: 5px;
        left: 20px;
        color: rgba(255, 255, 255, 1);
      }
      .Rejected {
        background: rgba(193, 2, 2, 1);
      }
      .Pending {
        background: rgba(191, 172, 2, 1);
      }
    }
    .feedback-sec {
      ul {
        padding: 5px 15px;
        p {
          font-size: 14px;
          margin-bottom: 5px;
        }
      }
    }
    h4 {
      margin: 5px 0px;
    }
    p {
      width: 90%;
    }
    span {
      color: rgba(139, 139, 139, 1);
    }
  }
  .history-detailes-form {
    border-top: 5px solid rgba(252, 252, 252, 1);
    padding: 30px 0px;
    padding: 30px 20px;
    .row {
      display: flex;
      align-items: center;
      button {
        margin-left: auto;
      }
      .simple-input {
        position: relative;
        textarea {
          height: 188px;
        }
        .send-feedback {
          position: absolute;
          bottom: 10px;
          right: 10px;
          color: rgba(0, 16, 99, 1);
          font-weight: 600;
          cursor: pointer !important;
        }
        .disabled {
          color: #aaa;
        }
      }
    }
  }
}

.simple-button.send button {
  width: max-content;
  padding: 5px 10px;
  margin: 3px;
  height: 48px;
}
.simple-button.send button.btn-danger {
  background: #dc3545 !important;
  padding: 10px !important;
}
.simple-button.send button.btn-danger.disabled {
  background: #eee !important;
  color: #aaa !important;
}
@media screen and (max-width: 993px) {
  .card {
    width: 100%;
    margin-bottom: 100px;
    .simple-button,
    .simple-button button {
      width: 100%;
    }
  }
  .history-detailes {
    flex-direction: column;
  }
}
</style>
