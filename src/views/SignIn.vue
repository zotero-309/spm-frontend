<template>
  <!-- <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow" btn-background="bg-gradient-success"
          :dark-mode="true" />
      </div>
    </div>
  </div> -->

  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">


        <div class="sidenav-header w-25 position-absolute z-index-3 p-3" style="top: 0; left: 0;">
          <i id="iconSidenav"
            class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
            aria-hidden="true"></i>
          <a class="m-0 navbar-brand justify-content-center d-flex align-items-center" href="/">
            <div class="justify-content-center d-flex align-items-center">
              <img :src="logo" alt="main_logo" style="height: 40px; width: 40px;" />
            </div>
            <div class="mx-3 d-flex flex-column justify-content-end">
              <div>
                <span class="font-weight-bold text-wrap">Work from Home Scheduling Platform</span>
              </div>
            </div>
          </a>
        </div>


        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-info text-gradient">Welcome back</h3>
                  <p class="mb-0">Select the role you want to sign in as</p>
                </div>
                <div class="card-body">
                  <form role="form" class="text-start" @submit.prevent="login">
                    <label>Username</label>
                    <vsud-select type="text" placeholder="Select Username" v-model="username" name="username"
                      :value="username" :options="[
                        { value: 'ceo', label: 'CEO' },
                        { value: 'saleshr', label: 'Human Resource' },
                        { value: 'salesmanager', label: 'Sales Manager' },
                        { value: 'salesstaff', label: 'Sales Staff' }
                      ]" />
                    <label>Password</label>
                    <vsud-input type="password" placeholder="Password" name="password" :value="username" readonly />
                    <vsud-switch id="rememberMe" checked>Remember me</vsud-switch>
                    <div class="text-center">
                      <vsud-button class="my-4 mb-2" variant="gradient" color="info" full-width>Sign in</vsud-button>
                      <div v-if="errorMessage" class="error-message" style="color: red;">
                        {{ errorMessage }}
                      </div>
                    </div>
                  </form>
                </div>
                <div id="loading-icon" class="d-none d-flex flex-column justify-content-center align-items-center">
                  <div class="spinner mb-3"></div>
                </div>
                <!-- <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a
                      href="javascript:;"
                      class="text-info text-gradient font-weight-bold"
                    >Sign up</a>
                  </p>
                </div> -->
              </div>
            </div>
            <div class="col-md-6">
              <div class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8">
                <div class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" :style="{
                  backgroundImage:
                    `url(${bgImg})`,
                }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- <app-footer /> -->
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import axios from "axios";
import Navbar from "@/examples/PageLayout/Navbar.vue";
// import AppFooter from "@/examples/PageLayout/Footer.vue";
import VsudInput from "@/components/VsudInput.vue";
import VsudSwitch from "@/components/VsudSwitch.vue";
import VsudButton from "@/components/VsudButton.vue";
import VsudSelect from "@/components/VsudSelect.vue";
import bgImg from "@/assets/img/curved-images/curved9.jpg"
import logo from "@/assets/img/logo-ct.png";
const body = document.getElementsByTagName("body")[0];
const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;



export default {
  name: "SigninPage",
  components: {
    Navbar,
    // AppFooter,
    VsudInput,
    VsudSwitch,
    VsudButton,
    VsudSelect
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const baseURL = proxy.$baseURL;  // Access $baseURL from global properties
    return {
      baseURL
    };
  },
  data() {
    return {
      bgImg,
      username: "",
      password: "",
      errorMessage: null,
      logo
    }
  },
  beforeMount() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },

  methods: {
    sendTelegramNotification() {
      axios.get(`${this.baseURL}/monitoring/telenoti/${this.username}`)
        .then(res => {
          console.log('✅ Telegram notification sent:', res.data.message);
        })
        .catch(err => {
          console.error('❌ Failed to send Telegram notification:', err.response?.data || err.message);
        });
    },
    sendTelegramNotification2() {
      axios.get(`${this.baseURL}/monitoring/telenotierror/${this.username}`)
        .then(res => {
          console.log('✅ Telegram notification sent:', res.data.message);
        })
        .catch(err => {
          console.error('❌ Failed to send Telegram notification:', err.response?.data || err.message);
        });
    },
    async login() {
      try {
        document.getElementById("loading-icon").classList.remove("d-none"); // show
        this.errorMessage = "Login may fail occasionally due to free-tier database limitations. Please retry a few times.";
        console.log(`${this.baseURL}/staff/login`);

        // Make an API call to authenticate
        const response = await axios.post(`${this.baseURL}/staff/login`, {
          username: this.username,
          password: this.username
        });

        // Assuming the API response contains staff ID on success
        const staffId = response.data.data;
        // Store staff ID in localStorage
        localStorage.setItem("staff_id", staffId["staff_id"]);
        localStorage.setItem("role", staffId["role"]);
        localStorage.setItem("position", this.username);

        await axios.get(`${this.baseURL}/application/autoReject`)


        // Redirect to the main page (or another route)
        if (this.username == "ceo" || this.username == "saleshr") {
          this.$router.push({ name: "HRViewOverallSchedule1" });
          alert("Login Success!")
        } else if (this.username == "salesmanager" || this.username == "salesstaff") {
          this.$router.push({ name: "Scheduler" });
          alert("Login Success!")
        }

        this.sendTelegramNotification();

      } catch (error) {
        alert("Login Failed! Please try again.")
        document.getElementById("loading-icon").classList.add("d-none");
        this.errorMessage = "Login may fail occasionally due to free-tier database limitations. Please retry a few times.";
        this.sendTelegramNotification2();
      }
    },
  }
};
</script>
