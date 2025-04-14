<template>
  <aside id="sidenav-main"
    class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl"
    :class="$store.state.isRTL ? 'me-3 rotate-caret' : 'ms-3'" :data-color="sidenavActiveBgColors">
    <div class="sidenav-header">
      <i id="iconSidenav"
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"></i>
      <a class="m-0 navbar-brand d-flex" href="/">
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
    <hr class="mb-0 horizontal dark" />
    <sidenav-list :card-bg="customClass" />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logo-ct.png";

export default {
  name: "IndexComponent",
  components: {
    SidenavList,
  },
  props: {
    customClass: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      logo,
      sidenavActiveBgColors: 'success'
    };
  },
};
</script>
