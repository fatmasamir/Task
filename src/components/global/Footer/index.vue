<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import SimpleButton from "@/components/global/Buttons/simpleButton/SimpleButton.vue";
import AOS from "aos";
const { t } = useI18n();
onMounted(() => {
  AOS.init();
});
</script>
<template>
  <Footer>
    <h2>
      Say goodbye to manual data entry and hello to effortless and
      <br />accurate contact sharing!
    </h2>
    <div class="contentFooter">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-12">
            <div class="Logo">
              <router-link to="#">
                <img src="../../../assets/images/footerLogo.svg"
              /></router-link>
            </div>
            <p>
              With our easy-to-use NFC card builder, you can design a
              personalized card that showcases your unique profile and connects
              you with people in an instant.
            </p>
          </div>
          <div class="col-lg-3 col-4">
            <h5>Discover</h5>
            <ul class="about_us">
              <li>
                <router-link to="/"> Our Cards</router-link>
              </li>
              <li>
                <router-link to="/"> Testimonials</router-link>
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-4">
            <h5>Quick Links</h5>
            <ul class="Quick">
              <li>
                <router-link to="/"> Home</router-link>
              </li>
              <li>
                <router-link to="/"> Order Your Card</router-link>
              </li>
              <li>
                <router-link to="/"> Why It Is Worth?</router-link>
              </li>
              <li>
                <router-link to="/">King Card</router-link>
              </li>
              <li>
                <router-link to="/"> Princess Card</router-link>
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-4">
            <h5>Services</h5>
            <ul class="Services">
              <li>
                <router-link to="/"> Contact Us</router-link>
              </li>
              <li>
                <router-link to="/"> About Us</router-link>
              </li>
              <li>
                <router-link to="/"> FAQ’s</router-link>
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-12">
            <h5>Social Media</h5>
            <ul class="social_media">
              <li>
                <router-link to="#">
                  <img src="../../../assets/images/scoial.svg"
                /></router-link>
              </li>
              <li>
                <router-link to="#">
                  <img src="../../../assets/images/linkedin.svg"
                /></router-link>
              </li>
              <li>
                <router-link to="#">
                  <img src="../../../assets/images/twitter.svg"
                /></router-link>
              </li>
              <li>
                <router-link to="#">
                  <img src="../../../assets/images/facebook.svg"
                /></router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Footer>
</template>
<style scoped lang="scss">
/****media****/
Footer {
  text-align: center;
  color: white;
  padding: 70px 0px;
  background: black;
  h2 {
    text-transform: capitalize;
    font-size: 32px;
  }
  .contentFooter {
    margin-top: 70px;
    text-align: left;
    padding: 30px 0px 20px;
    background: rgba(163, 108, 30, 1);
    .row {
      .Logo a {
        color: white;
        font-size: 30px;
        font-weight: 700;
      }
      p {
        color: white;
        padding: 20px 0px 0px;
        padding-right: 40px;
        line-height: 27px;
      }
      h5 {
        color: #fff;
        margin-bottom: 10px;
      }
      ul {
        padding: 0px;
        list-style: none;
      }
      .social_media {
        li {
          display: block;
          text-align: left;
          margin-bottom: 10px;
        }
      }
      ul {
        li {
          display: block;
          text-align: left;
          color: rgba(238, 238, 238, 1);
          padding-bottom: 10px;
          h5 {
            color: #fff;
          }
          a {
            color: rgba(238, 238, 238, 1) !important;
          }
          img {
            padding-right: 5px;
          }
        }
        li a::before {
          background-image: url("../../../assets/images/global/icons/global/Homepage/icons/Frame.svg");
          width: 10px;
          height: 10px;
        }
      }
      .app {
        text-align: center;
        a img {
          width: 60%;
          margin-bottom: 20px;
        }
      }
    }
  }
}
/*media" */

@media screen and (max-width: 1409px) {
}
@media screen and (max-width: 992px) {
  Footer {
    padding-bottom: 0px;
    text-align: center;
    .row {
      > div {
        margin-top: 10px;
      }
      ul {
        padding: 0px 20px;
      }
      .app a img {
        width: 40%;
      }
    }
  }
  Footer .contentFooter .row .social_media {
    display: flex;
    justify-content: space-between;
  }
  Footer .contentFooter .container {
    max-width: 100%;
  }

  Footer h2 {
    font-size: 18px;
    display: block;
    text-transform: lowercase;
  }
}
</style>
