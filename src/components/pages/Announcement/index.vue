<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import AOS from "aos";
import Loading from "../../global/Loading/index.vue";
import { defineProps } from "vue";

// i18n
const props = defineProps(["announcements"]);

// i18n
const { t } = useI18n();

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
    <h6 class="card-header">Announcement</h6>
    <div class="card-body" v-if="props.announcements">
      <div
        v-if="props.announcements.length > 0"
        class="Announcement-Card"
        v-for="list in props.announcements"
        :key="list.id"
      >
        <div class="announcement-detailes">
          <div class="content">
            <div class="row mr-2 p-0">
              <div class="col-lg-7 col-12">
                <h4>{{ list.title }}</h4>
                <p class="my-1">{{ list.description }}</p>
                <span>{{ list.created_at }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="NotFound">not found</div>
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
      .imag-history {
        width: 100%;
      }
    }
  }
  .card-header {
    padding: 20px 30px 20px;
    background: white;
    border: 0px;
  }
  .announcement-detailes {
    display: block;
    width: 100%;
    border-top: 5px solid rgba(252, 252, 252, 1);
    padding: 30px 0px;
    padding: 30px 20px;

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
      }
    }
  }
}
.simple-button.send button {
  width: max-content;
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
