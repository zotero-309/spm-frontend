<template>
  <div class="container-fluid">
    <div class="mt-4 page-header min-height-300 border-radius-xl" :style="{
      backgroundImage: `url(${bgImg})`,

      backgroundPositionY: '50%',
    }">
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>
    <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
      <div class="row gx-4">
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img src="../assets/img/Derek Tan.jpg" alt="profile_image" class="shadow-sm w-100 border-radius-lg" />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">{{ managerName }} {{ managerId }}</h5>
            <p class="mb-0 text-sm font-weight-bold">{{ managerPosition }}, {{ dept }}</p>
          </div>
        </div>
        <div class="mx-auto mt-3 col-lg-6 col-md-6 my-sm-auto ms-sm-auto me-sm-0">
          <div class="nav-wrapper position-relative end-0 d-flex">
            <ul class="p-1 bg-transparent nav nav-pills nav-fill me-2" role="tablist" style="flex: 1;">
              <li class="nav-item">
                <a class="px-0 py-1 mb-0 nav-link active d-flex align-items-center justify-content-center"
                  href="https://youtu.be/xvFZjo5PgG0?si=4nYC0ikfRvt9xEes">
                  <svg class="text-dark" width="16px" height="16px" viewBox="0 0 610.398 610.398"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"
                    version="1.1" id="Capa_1" xml:space="preserve">
                    <g>
                      <g>
                        <path class="color-background"
                          d="M159.567,0h-15.329c-1.956,0-3.811,0.411-5.608,0.995c-8.979,2.912-15.616,12.498-15.616,23.997v10.552v27.009v14.052 c0,2.611,0.435,5.078,1.066,7.44c2.702,10.146,10.653,17.552,20.158,17.552h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553 V35.544V24.992C180.791,11.188,171.291,0,159.567,0z" />
                        <path class="color-background"
                          d="M461.288,0h-15.329c-11.724,0-21.224,11.188-21.224,24.992v10.552v27.009v14.052c0,13.804,9.5,24.992,21.224,24.992 h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553V35.544V24.992C482.507,11.188,473.007,0,461.288,0z" />
                        <path class="color-background"
                          d="M539.586,62.553h-37.954v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.247,0-40.349-19.79-40.349-44.117 V62.553H199.916v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.248,0-40.349-19.79-40.349-44.117V62.553H70.818 c-21.066,0-38.15,16.017-38.15,35.764v476.318c0,19.784,17.083,35.764,38.15,35.764h468.763c21.085,0,38.149-15.984,38.149-35.764 V98.322C577.735,78.575,560.671,62.553,539.586,62.553z M527.757,557.9l-446.502-0.172V173.717h446.502V557.9z" />
                        <path class="color-background"
                          d="M353.017,266.258h117.428c10.193,0,18.437-10.179,18.437-22.759s-8.248-22.759-18.437-22.759H353.017 c-10.193,0-18.437,10.179-18.437,22.759C334.58,256.074,342.823,266.258,353.017,266.258z" />
                        <path class="color-background"
                          d="M353.017,348.467h117.428c10.193,0,18.437-10.179,18.437-22.759c0-12.579-8.248-22.758-18.437-22.758H353.017 c-10.193,0-18.437,10.179-18.437,22.758C334.58,338.288,342.823,348.467,353.017,348.467z" />
                        <path class="color-background"
                          d="M353.017,430.676h117.428c10.193,0,18.437-10.18,18.437-22.759s-8.248-22.759-18.437-22.759H353.017 c-10.193,0-18.437,10.18-18.437,22.759S342.823,430.676,353.017,430.676z" />
                        <path class="color-background"
                          d="M353.017,512.89h117.428c10.193,0,18.437-10.18,18.437-22.759c0-12.58-8.248-22.759-18.437-22.759H353.017 c-10.193,0-18.437,10.179-18.437,22.759C334.58,502.71,342.823,512.89,353.017,512.89z" />
                        <path class="color-background"
                          d="M145.032,266.258H262.46c10.193,0,18.436-10.179,18.436-22.759s-8.248-22.759-18.436-22.759H145.032 c-10.194,0-18.437,10.179-18.437,22.759C126.596,256.074,134.838,266.258,145.032,266.258z" />
                        <path class="color-background"
                          d="M145.032,348.467H262.46c10.193,0,18.436-10.179,18.436-22.759c0-12.579-8.248-22.758-18.436-22.758H145.032 c-10.194,0-18.437,10.179-18.437,22.758C126.596,338.288,134.838,348.467,145.032,348.467z" />
                        <path class="color-background"
                          d="M145.032,430.676H262.46c10.193,0,18.436-10.18,18.436-22.759s-8.248-22.759-18.436-22.759H145.032 c-10.194,0-18.437,10.18-18.437,22.759S134.838,430.676,145.032,430.676z" />
                        <path class="color-background"
                          d="M145.032,512.89H262.46c10.193,0,18.436-10.18,18.436-22.759c0-12.58-8.248-22.759-18.436-22.759H145.032 c-10.194,0-18.437,10.179-18.437,22.759C126.596,502.71,134.838,512.89,145.032,512.89z" />
                      </g>
                    </g>
                  </svg>
                  <span class="ms-1">View {{ managerName }}'s Schedule</span>
                </a>
              </li>
            </ul>
            <div class="flex-fill d-flex justify-content-between align-items-center">
              <div class="mx-auto col-7 position-relative end-0 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <vsud-badge :color="managerStatus === 'In-Office' ? 'success' : 'secondary'" variant="gradient"
                    size="sm" class="mx-auto">
                    {{managerStatus}}
                  </vsud-badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="py-4 container-fluid">
    <div class="mt-4 row">
      <div class="col-12">
        <div class="mb-4 card">
          <div class="py-4 container-fluid">
            <smart-scheduler id="scheduler" disableEventMenu disableContextMenu hideNonworkingWeekdays disableSelection
              disableWindowEditor style="height: 40rem;"></smart-scheduler>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import axios from "axios";
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.button.js";
import "smart-webcomponents/source/modules/smart.calendar.js";
import "smart-webcomponents/source/modules/smart.input.js";
import "smart-webcomponents/source/modules/smart.tree.js";
import "smart-webcomponents/source/modules/smart.scheduler.js";
import "smart-webcomponents/source/modules/smart.validator.js";
import "smart-webcomponents/source/modules/smart.window.js";
import * as pkg from 'smart-webcomponents/common/rrule.min.js';
window.rrule = { RRule: pkg.default };
import VsudSwitch from "@/components/VsudSwitch.vue";
import ProfileCard from "./components/ProfileCard.vue";
import VsudAvatar from "../components/VsudAvatar.vue";
import sophie from "@/assets/img/kal-visuals-square.jpg";
import marie from "@/assets/img/marie.jpg";
import ivana from "@/assets/img/ivana-square.jpg";
import peterson from "@/assets/img/team-4.jpg";
import nick from "@/assets/img/team-3.jpg";
import Finance from "@/assets/img/finance.jpg";
import Solutioning from "@/assets/img/solutioning.jpg";
import Consultancy from "@/assets/img/consultancy.jpg";
import IT from "@/assets/img/IT.jpg";
import Engineering from "@/assets/img/engineering.jpg";
import Sales from "@/assets/img/sales.jpg";
import HR from "@/assets/img/HR.jpg";
import team1 from "@/assets/img/team-1.jpg";
import team2 from "@/assets/img/team-2.jpg";
import team3 from "@/assets/img/team-3.jpg";
import team4 from "@/assets/img/team-4.jpg";
import bgImg from "@/assets/img/curved-images/curved14.jpg"
import ProjectsCard from "./components/ProjectOverviewCard.vue";
import VsudProgress from "@/components/VsudProgress.vue";
import VsudBadge from "@/components/VsudBadge.vue";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";


export default {
  name: "Scheduler",
  components: {
    VsudSwitch,
    ProfileCard,
    VsudAvatar,
    ProjectsCard,
    VsudProgress,
    VsudBadge
  },
  data() {
    return {
      showMenu: false,
      sophie,
      marie,
      ivana,
      peterson,
      nick,
      Finance,
      images: {
        Finance,
        Solutioning,
        Consultancy,
        IT,
        Engineering,
        Sales,
        HR,
      },
      team1,
      team2,
      team3,
      team4,
      bgImg,
      managerId: "",  // Initialize with null or an empty string
      managerName: "",
      managerTitle: "",
      managerStatus:"",
      managerPosition: "",
      employees: [], // To hold employee data from API
      dept: "",
      role: "",
      selectedDate: "",
      selectedSlot: "",
    };
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const baseURL = proxy.$baseURL;  // Access $baseURL from global properties
    const staff_id = localStorage.getItem("staff_id");
    const role = localStorage.getItem("role");
    console.log("you're logged in as:", staff_id, role);
  },
  methods: {
    async fetchEmployeeData() {
      const data = ref([]); // Reactive reference for the data array
      const today = new Date(),
        minStartDate = (() => {   // calculation of date from 2 months before today
          const startDate = new Date(today);
          startDate.setMonth(today.getMonth() - 2);
          startDate.setDate(today.getDate());
          return startDate;
        })(),
        SmallCal_minStartDate = (() => {   // calculation of date from 2 months before today
          const startDate = new Date(today);
          startDate.setMonth(today.getMonth() - 2);
          startDate.setDate(today.getDate());
          return startDate;
        })(),
        maxEndDate = (() => {     // calculation of date 3 months after today
          const endDate = new Date(today);
          endDate.setMonth(today.getMonth() + 3);
          return endDate;
        })(),
        SmallCal_maxEndDate = (() => {   // calculation of date from 2 months before today
          const endDate = new Date(today);
          endDate.setMonth(today.getMonth() + 3);
          endDate.setDate(today.getDate() - 1);
          return endDate;
        })(),
        restrictedDatesArray = [];

      // Axios call to fetch aand populate schedule data from the backend
      axios.get(`${this.$baseURL}/schedule/own/${this.managerId}`) //140894 ${staff_id}
        .then(response => {
          console.log("schedule displayed of staff: ", this.managerId);
          // Update the data variable with the fetched schedule data
          data.value = response.data;

          // Loop through the data and convert date strings to JavaScript Date objects
          data.value.forEach(item => {
            item.dateStart = new Date(item.dateStart);
            item.dateEnd = new Date(item.dateEnd);
          });
          console.log("Schedule db data fetched and updated:", data.value);


          window.Smart(
            "#scheduler",
            class {
              get properties() {
                return {
                  //Properties
                  view: "week",
                  views: [
                    {
                      type: "day",
                      label: "Day View",
                    },
                    {
                      type: "week",
                      label: "Week View",
                    },
                    {
                      type: "month",
                      label: "Month View",
                    },
                  ],
                  nonworkingDays: [6, 7],
                  dateCurrent: new Date(),
                  dataSource: data.value,
                  firstDayOfWeek: 1,
                  // disableDateMenu: true,
                  currentTimeIndicator: true,
                  // hideOtherMonthDays: true,
                  restrictedDates: restrictedDatesArray,
                  disableDrop: true,
                  disableResize: true,
                  disableDrag: true,
                  min: minStartDate,
                  max: SmallCal_maxEndDate,
                  hourStart: 8,
                  hourEnd: 18,
                  hideAllDay: true,
                  viewSelectorType: "tabs",
                };
              }
            }
          );
        })
        .catch(error => {
          console.error("Error fetching schedule data:", error);
        });


      window.Smart(
        "#calendar",
        class {
          get properties() {
            return {
              min: SmallCal_minStartDate,
              max: SmallCal_maxEndDate,
            };
          }
        }
      );

      const primaryContainer = document.getElementById("primaryContainer"),
        calendar = document.getElementById("calendar"),
        scheduler = document.querySelector("smart-scheduler");


      // document
      //   .getElementById("toggleButton")
      //   .addEventListener("click", function () {
      //     primaryContainer.classList.toggle("collapse");
      //     scheduler.disableDateMenu = !primaryContainer.classList.contains(
      //       "collapse"
      //     );
      //   });

      // document
      //   .getElementById("calendar")
      //   .addEventListener("change", function (event) {
      //     scheduler.dateCurrent = event.detail.value;
      //   });

      // document
      //   .getElementById("tree")
      //   .addEventListener("change", function (event) {
      //     const tree = event.target,
      //       types = tree.selectedIndexes.map((i) => tree.getItem(i).value);
      //     scheduler.dataSource = data.value.filter(
      //       (d) => types.indexOf(d.class) > -1
      //     );
      //   });
    }
  },
  mounted() {
    this.$store.state.isAbsolute = true;
    this.$store.state.isNavFixed = false;
    setNavPills();
    setTooltip();
    // Extract managerId from query parameters on component creation
    this.managerId = this.$route.query.managerid;
    this.managerName = this.$route.query.managerName;
    this.managerPosition = this.$route.query.managerPosition;
    this.selectedDate = this.$route.query.selectedDate;
    this.selectedSlot = this.$route.query.selectedSlot;
    this.managerStatus = this.$route.query.managerStatus;
    this.dept = this.$route.query.managerDept;
    this.fetchEmployeeData(); // Fetch employee data when component is mounted
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
}
</script>


<style>
/* Normal state styles */
button.smart-button.smart-element.smart-confirm-button.flat {
  /* withdrawal form submission button */
  background: black;
  /* Normal background color */
  color: white;
  /* Normal text color */
}

/* Disabled state styles */
button.smart-button.smart-element.smart-confirm-button.flat:disabled {
  /* withdrawal form submission button */
  background: gray;
  /* Change this to your desired disabled background color */
  color: darkgray;
  /* Change this to your desired disabled text color */
  cursor: not-allowed;
  /* Change cursor to indicate it's not clickable */
  opacity: 0.6;
  /* Optional: make it slightly transparent */
}

.smart-multiline-prompt-window.smart-window .smart-content-container>.smart-content {
  padding-top: 20px;
}

.smart-multiline-prompt-window.smart-window smart-multiline-text-box {
  height: 100%;
}

.smart-window button,
.smart-dialog-window.smart-window .smart-button.material,
.smart-progress-window.smart-window .smart-button.material,
.smart-alert-window.smart-window .smart-button.material,
.smart-prompt-window.smart-window .smart-button.material,
.smart-multiline-prompt-window.smart-window .smart-button.material {
  padding-top: 4px;
  padding-bottom: 4px;
}

.smart-multiline-prompt-window.smart-window.material smart-multiline-text-box {
  width: 100%;
}


html,
body {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  --smart-scheduler-timeline-cell-min-width: 40px;
  --smart-scheduler-event-border-radius: 4px;
  --smart-scheduler-timeline-nonworking-color: var(--smart-background);
}


#app,
.vue-root {
  height: 93%;
}

.smart-scheduler {
  width: 100%;
  height: 100%;
  border-radius: initial;
}


#schedulerWindowContent>div>div.smart-scheduler-window-main>div:nth-child(4) {
  /* css for repeat button */
  display: flex;
  justify-content: flex-end;
  /* Align items to the right */
  align-items: center;
  /* Vertically center align the label and switch */
}

#primaryContainer,
#primaryContainer .content {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
}

#primaryContainer {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
}

#primaryContainer .content {
  height: calc(100% - 50px);
}

#primaryContainer.collapse #sideA {
  width: 0;
}

#primaryContainer #sideA {
  width: 280px;
  transition: width 0.2s ease-in-out;
}

#primaryContainer.collapse #sideB {
  width: 100%;
  transition: width 0.2s ease-in-out;
}

#primaryContainer #sideB {
  width: calc(100% - 280px);
  transition: width 0.2s ease-in-out;
}

#sideA,
#sideB {
  height: 100%;
  box-sizing: border-box;
}

#header {
  position: relative;
  width: 100%;
  height: 50px;
  background-color: var(--smart-background);
  color: var(--smart-background-color);
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

#sideA {
  border-top: var(--smart-border-width) solid var(--smart-border);
}

#sideA .controls-container {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  max-height: calc(100% - 150px);
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: 100%;
  grid-row-gap: 20px;
  overflow: auto;
}

.button-container {
  height: auto;
}

#sideA .smart-calendar {
  min-width: initial;
  max-width: 100%;
  height: 250px;
  min-height: initial;
  --smart-font-size: 12px;
  --smart-calendar-cell-size: 26px;
  --smart-calendar-cell-spacing: 4px;
  border: initial;
  --smart-surface: transparent;
}

.smart-input,
.smart-tree {
  width: 100%;
}

.smart-tree {
  height: auto;
  border: initial;
}

#toggleButton {
  position: relative;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: initial;
  background: transparent;
  margin-right: 10px;
}

#toggleButton::after {
  content: var(--smart-icon-align-left);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: var(--smart-font-family-icon);
  font-size: 25px;
  box-sizing: border-box;
  pointer-events: none;
}

#title {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  font-size: 20px;
  position: relative;
}

#logo {
  content: "";
  position: relative;
  width: 100%;
  height: 90px;
  background: url(https://www.htmlelements.com/wp-content/design/assets/images/csssprites.png) -465px -400px;
  filter: invert(0.8);
  box-sizing: border-box;
}

.smart-tree[selection-mode="checkBox"] smart-tree-items-group>.smart-tree-item-label-container::before,
.smart-tree[selection-mode="checkBox"] smart-tree-items-group>.smart-tree-item-label-container::after {
  content: initial !important;
}

.smart-tree .smart-tree-item[value="Approved"] {
  --smart-primary: green;
}

.smart-tree .smart-tree-item[value="Pending_Approval"] {
  --smart-primary: cornflowerblue;
}

/* .smart-tree .smart-tree-item[value="Rejected"] {
  --smart-primary: firebrick;
} */

.smart-tree .smart-tree-item[value="Pending_Withdrawal"] {
  --smart-primary: lightsteelblue;
}


/* .smart-tree .smart-tree-item[value="Withdrawn"] {
  --smart-primary: lightgrey;
} */


.Approved {
  --smart-scheduler-event-background-rgb: 0, 129, 0;
  --smart-scheduler-event-background: rgba(var(--smart-scheduler-event-background-rgb),
      1);
  --smart-scheduler-event-focus: rgba(var(--smart-scheduler-event-background-rgb),
      0.9);
  --smart-scheduler-event-hover: rgba(var(--smart-scheduler-event-background-rgb),
      0.8);
}

.Pending_Approval {
  --smart-scheduler-event-background-rgb: 100, 149, 237;
  --smart-scheduler-event-background: rgba(var(--smart-scheduler-event-background-rgb),
      1);
  --smart-scheduler-event-focus: rgba(var(--smart-scheduler-event-background-rgb),
      0.9);
  --smart-scheduler-event-hover: rgba(var(--smart-scheduler-event-background-rgb),
      0.8);
}

/* .Rejected {
  --smart-scheduler-event-background-rgb: 178, 34, 34;
  --smart-scheduler-event-background: rgba(var(--smart-scheduler-event-background-rgb),
      1);
  --smart-scheduler-event-focus: rgba(var(--smart-scheduler-event-background-rgb),
      0.9);
  --smart-scheduler-event-hover: rgba(var(--smart-scheduler-event-background-rgb),
      0.8);
} */

.Pending_Withdrawal {
  --smart-scheduler-event-background-rgb: 176, 196, 222;
  --smart-scheduler-event-background: rgba(var(--smart-scheduler-event-background-rgb),
      1);
  --smart-scheduler-event-focus: rgba(var(--smart-scheduler-event-background-rgb),
      0.9);
  --smart-scheduler-event-hover: rgba(var(--smart-scheduler-event-background-rgb),
      0.8);
}

/* .Withdrawn {
  --smart-scheduler-event-background-rgb: 211, 211, 211;
  --smart-scheduler-event-background: rgba(var(--smart-scheduler-event-background-rgb),
      1);
  --smart-scheduler-event-focus: rgba(var(--smart-scheduler-event-background-rgb),
      0.9);
  --smart-scheduler-event-hover: rgba(var(--smart-scheduler-event-background-rgb),
      0.8);
} */
</style>