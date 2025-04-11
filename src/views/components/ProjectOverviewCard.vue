<template>
  <div class="card card-blog card-plain">
    <div class="position-relative">
      <a class="shadow-xl d-block border-radius-xl">
        <img :src="img" alt="img-blur-shadow" class="shadow img-fluid border-radius-xl" />
      </a>
    </div>
    <div class="px-1 pb-0 card-body">
      <p class="mb-2 text-sm text-gradient text-dark">Team #{{ number }}</p>
      <a :href="projectTitleLink">
        <h5>{{ title }}</h5>
      </a>
      <p class="mb-4 text-sm">{{ description }}</p>
      <div class="d-flex align-items-center justify-content-between">
        <button type="button" class="mb-0 btn btn-outline-success btn-sm" @click="projectLinkOpenEvent">View
          Schedule</button>
        <div class="mt-2 avatar-group">
          <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip"
            data-bs-placement="bottom" :title="titleTeam1">
            <img alt="Image placeholder" :src="imgTeam1" />
          </a>
          <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip"
            data-bs-placement="bottom" :title="titleTeam2">
            <img alt="Image placeholder" :src="imgTeam2" />
          </a>
          <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip"
            data-bs-placement="bottom" :title="titleTeam3">
            <img alt="Image placeholder" :src="imgTeam3" />
          </a>
          <a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip"
            data-bs-placement="bottom" :title="titleTeam4">
            <img alt="Image placeholder" :src="imgTeam4" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectsCard",
  props: {
    img: {
      type: String,
      default: ""
    },
    // projectTitleLink: {
    //   type: String,
    //   default: "https://youtu.be/xvFZjo5PgG0?si=4nYC0ikfRvt9xEes"
    // },
    scheduleLink: {  // Accept a function as a prop
      type: String, // add relative path
      default: ""
    },
    managerId: { // New prop for dynamic managerId
      type: Number,
      default: 0
    },
    managerName: { // New prop for dynamic managerName
      type: String,
      default: ''
    },
    managerPosition: { // New prop for dynamic managerPosition
      type: String,
      default: ''
    },
    managerStatus:{
      type: String,
      default: ''
    },
    managerRole: { // New prop for dynamic managerPosition
      type: Number,
      default: 0
    },
    number: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    imgTeam1: {
      type: String,
      default: ""
    },
    imgTeam2: {
      type: String,
      default: ""
    },
    imgTeam3: {
      type: String,
      default: ""
    },
    imgTeam4: {
      type: String,
      default: ""
    },
    titleTeam1: {
      type: String,
      default: ""
    },
    titleTeam2: {
      type: String,
      default: ""
    },
    titleTeam3: {
      type: String,
      default: ""
    },
    titleTeam4: {
      type: String,
      default: ""
    },
  },
  methods: {
    projectLinkOpenEvent() {
      // Create an object for your query parameters
      const queryParams = {
        managerid: this.managerId,
        managerName: this.managerName,
        managerPosition: this.managerPosition,
        managerRole: this.managerRole,
        managerStatus: this.managerStatus
      };

      // Use Vue Router to navigate with query parameters
      this.$router.push({
        path: this.scheduleLink,  // Your base URL path
        query: queryParams  // Append the query parameters dynamically
      });
    }
  }
};
</script>
