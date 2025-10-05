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
            <img src="../assets/img/CEO.jpg" alt="profile_image" class="shadow-sm w-100 border-radius-lg" />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">Jack Sim 130002</h5>
            <p class="mb-0 text-sm font-weight-bold">CEO / MD</p>
          </div>
        </div>
        <div class="col-auto my-auto">
          <vsud-badge :color="managerStatus === 'In-Office' ? 'success' : 'secondary'" variant="gradient" size="sm"
            class="mx-auto">
            {{ managerStatus }}
          </vsud-badge>
        </div>

        <div class="mx-auto mt-3 col-lg-6 col-md-6 my-sm-auto ms-sm-auto me-sm-0">
          <div class="nav-wrapper position-relative end-0 d-flex">
            <ul class="p-1 bg-transparent nav nav-pills nav-fill align-items-center" role="tablist" style="flex: 1;">
              <li class="nav-item">
                <a class="nav-link px-3 py-1 mb-0 active d-inline-flex align-items-center justify-content-center bg-white shadow"
                  @click="ViewManagerManagerSchedule()">
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
                  <span class="ms-1">View Jack's Schedule</span>
                </a>
              </li>
            </ul>
            <div class="flex-fill d-flex justify-content-between">
              <div
                class="mx-auto col-7 position-relative end-0 d-flex flex-column align-items-center justify-content-center">
                <div>
                  <h6 class="mb-1 text-sm pb-2">{{ officeStrength }} / {{ totalStrength }} In-Office now</h6>
                </div>
                <div class="w-100 text-center">
                  <vsud-progress color="info" class="mx-auto" variant="gradient" :percentage="percentStrength" />
                  ({{ percentStrength }}%)
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
            <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="first-tab" data-bs-toggle="tab" data-bs-target="#first"
                  type="button" role="tab" aria-controls="first" aria-selected="true">
                  <h6 class="mb-1">Department</h6>
                  <p class="text-sm">View WFH Schedule Based on Department</p>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="second-tab" data-bs-toggle="tab" data-bs-target="#second" type="button"
                  role="tab" aria-controls="second" aria-selected="false">
                  <h6 class="mb-1">Calendar</h6>
                  <p class="text-sm">View Overall WFH Schedule of Organisation</p>
                </button>
              </li>
            </ul>
            <div class="tab-content p-3">
              <div class="tab-pane fade show active" id="first" role="tabpanel" aria-labelledby="first-tab">
                <div class="p-3 card-body">
                  <div class="row">
                    <div v-for="(employee, index) in employees" :key="employee.id"
                      class="mb-4 col-xl-3 col-md-6 mb-xl-0">
                      <projects-card :img="images[employee.dept]" :number="index + 1" :title="employee.dept"
                        scheduleLink="/HRViewOverallSchedule2" :managerId="employee.id" :managerName="employee.name"
                        :managerPosition="employee.position" :managerRole="employee.role"
                        :managerStatus="employee.status" :img-team1="team1" title-team1="Elena Morison"
                        :img-team2="team2" title-team2="Ryan Milly" :img-team3="team3" title-team3="Nick Daniel"
                        :img-team4="team4" title-team4="Peterson" class="pb-4" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="second" role="tabpanel" aria-labelledby="second-tab">
                <smart-scheduler id="schedulerhro1" disableEventMenu disableContextMenu hideNonworkingWeekdays
                  disableSelection disableWindowEditor style="height: 40rem;">
                  <div id="loading-icon" class="loading" style="display: none;">
                    <div class="spinner"></div>
                  </div>
                </smart-scheduler>
              </div>
            </div>
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
import * as pkg from 'smart-webcomponents/common/rrule.min.js';
import { useRouter } from 'vue-router'; // Import useRouter;
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
import introJs from 'intro.js';
import 'intro.js/introjs.css';


export default {

  name: "schedulerhro1",
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
      images: {
        Finance,
        Solutioning,
        Consultancy,
        IT,
        Engineering,
        Sales,
        HR
      },
      team1,
      team2,
      team3,
      team4,
      bgImg,
      ceoId: "",  // Initialize with null or an empty string
      employees: [], // To hold employee data from API
      percentStrength: "...",
      officeStrength: "calculating.",
      totalStrength: "",
      selectedDate: "",
      selectedSlot: "",
      managerId: "130002",  // Initialize with null or an empty string
      managerName: "Jack Sim ",
      managerPosition: "MD",
      dept: "CEO",
      role: "1",
      selectedDate: new Date().toLocaleDateString('en-CA'),
      selectedSlot: "",
      managerStatus: "In-Office",
    };
  },
  setup() {
    const router = useRouter(); // Initialize the router for redirection to employeelist (upon clicking events)
    const data = ref([]); // Reactive reference for the data array
    const data1 = ref([]);
    // Access global properties inside setup() using getCurrentInstance()
    const { proxy } = getCurrentInstance();
    const baseURL = proxy.$baseURL;  // Access $baseURL from global properties
    const staff_id = localStorage.getItem("staff_id")
    const role = localStorage.getItem("role")
    console.log("you're logged in as:", staff_id, role)
  },
  methods: {
    startTutorial() {
      introJs()
        .setOptions({
          steps: [
            {
              element: '.page-header',
              intro: 'Welcome to the dashboard! This is the header with a background image and mask.',
            },
            {
              element: '.avatar-xl',
              intro: 'This is Jack Sim, the CEO. You can see his profile picture and role here.',
            },
            {
              element: 'vsud-badge',
              intro: 'This badge shows the current status of the manager — In-Office or WFH.',
            },
            {
              element: '.nav-pills',
              intro: 'Use these buttons to view the manager’s schedule or navigate through different sections.',
            },
            {
              element: '#first-tab',
              intro: 'This tab shows department-based schedules for your employees.',
            },
            {
              element: '#second-tab',
              intro: 'This tab shows the overall WFH schedule in a calendar view.',
            },
            {
              element: '#schedulerhro1',
              intro: 'Here is the scheduler. Click on any event to view details for that day and slot.',
            }
          ],
          showProgress: true,
          exitOnOverlayClick: false,
          nextLabel: 'Next ➜',
          prevLabel: '⬅ Prev',
          skipLabel: 'Skip Tutorial',
          doneLabel: 'Finish'
        })
        .start();
    },
    async fetchEmployeeData() {
      try {
        const response = await axios.get(`${this.$baseURL}/schedule/manageremployeelist/130002`);
        this.employees = response.data[0].EmployeeList; // Store the fetched data in the employees array
        this.employees = this.employees.slice(1); // remove CEO
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    },
    async fetchEmployeeData2() {
      // Mark as loading
      document.getElementById('loading-icon').style.display = 'block';

      try {
        const response = await axios.get(`${this.$baseURL}/schedule/HRO_overall`);
        document.getElementById('loading-icon').style.display = 'none';
        console.log("Schedule displayed for staff: ", this.managerId);

        // Process and store the fetched data for the scheduler
        const events = this.processScheduleData(response.data);
        const today = new Date(),
          minStartDate = (() => { // calculation of date from 2 months before today
            const startDate = new Date(today);
            startDate.setMonth(today.getMonth() - 2);
            return startDate;
          })(),

          maxEndDate = (() => { // calculation of date 3 months after today
            const endDate = new Date(today);
            endDate.setMonth(today.getMonth() + 3);
            return endDate;
          })(),
          restrictedDatesArray = [];

        // Ensure the scheduler only initializes if events data is available
        if (events && events.length > 0) {
          this.initializeScheduler(events, minStartDate, maxEndDate, restrictedDatesArray); // Initialize scheduler when data is ready
        } else {
          console.warn("No data available for the scheduler.");
        }

      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    },
    calculatePercentage(events, today) {
      const hour = today.getHours();
      console.log("today's hours", hour);
      // Determine if it's am or pm based on the current time
      const timeKey = hour < 14 ? "am" : "pm";
      console.log("slot", timeKey);
      // Calculate percentage strength based on selected timing
      const officeCount = events[timeKey].office;
      this.officeStrength = officeCount;
      const wfhCount = events[timeKey].wfh;
      const total = officeCount + wfhCount;
      this.totalStrength = total;

      const percentStrength = total > 0 ? (officeCount / total) * 100 : 0;

      this.percentStrength = percentStrength.toFixed(2);

    },
    processScheduleData(data) {
      const events = [];
      // Loop through response from /overall and create into visible events count on the scheduler
      for (let i = 0; i < data.length; i++) {
        let record = data[i]; // Access each object in the array
        let date = record.date;      // Access the 'date' value
        let amWfh = record.am.wfh;   // Access the 'wfh' value in 'am'
        let amOffice = record.am.office; // Access the 'office' value in 'am'
        let pmWfh = record.pm.wfh;   // Access the 'wfh' value in 'pm'
        let pmOffice = record.pm.office; // Access the 'office' value in 'pm'
        const today = new Date();
        const todayDate = today.toLocaleDateString('en-CA');
        if (date == todayDate) {
          this.calculatePercentage(record, today);
        }

        events.push({
          label: `WFH: ${amWfh}\nIn-Office: ${amOffice}`,
          dateStart: new Date(new Date(date).setHours(9, 0, 0)),
          dateEnd: new Date(new Date(date).setHours(13, 0, 0)),
          class: "Pending",
          // employees: currentDateData.am.employees,  // Attach the AM employee list
          timeSlot: 'AM',  // Tagging it as AM
          eventDate: date  // Adding date for further use if needed
        });

        // PM Event
        events.push({
          label: `WFH: ${pmWfh}\nIn-Office: ${pmOffice}`,
          dateStart: new Date(new Date(date).setHours(14, 0, 0)),
          dateEnd: new Date(new Date(date).setHours(18, 0, 0)),
          class: "Pending",
          // employees: currentDateData.pm.employees,  // Attach the PM employee list
          timeSlot: 'PM',  // Tagging it as PM
          eventDate: date  // Adding date for further use if needed
        });
      }
      return events;
    },
    initializeScheduler(events, minStartDate, maxEndDate, restrictedDatesArray) {
      const mgrID = this.managerId;
      const mgrName = this.managerName;
      const mgrPosition = this.managerPosition;
      const mgrRole = this.mangerRole;
      const mgrStatus = this.managerStatus;
      const managerDept = this.dept
      const router = this.$router;

      window.Smart(
        "#schedulerhro1",
        class {
          get properties() {
            return {
              view: "week",
              views: [
                { type: "day", label: "Day View" },
                { type: "week", label: "Week View" },
                { type: "month", label: "Month View" }
              ],
              nonworkingDays: [6, 7],
              dateCurrent: new Date(),
              dataSource: events,
              firstDayOfWeek: 1,
              currentTimeIndicator: true,
              restrictedDates: restrictedDatesArray,
              disableDrop: true,
              disableResize: true,
              disableDrag: true,
              min: minStartDate,
              max: maxEndDate,
              hourStart: 8,
              hourEnd: 18,
              hideAllDay: true,
              viewSelectorType: "tabs"
            };
          }
        }
      );

      // Initialize the DatePicker
      window.Smart(
        "#calendar",
        class {
          get properties() {
            return {
              min: minStartDate,  // Minimum date for DatePicker
              max: maxEndDate,  // Maximum date for DatePicker
            };
          }
        }
      );

      // Allows date selection from the DatePicker to reflect on the main calendar
      const schedulerhro1 = document.getElementById("schedulerhro1");

      if (!schedulerhro1.hasListener) {
        schedulerhro1.addEventListener("itemClick", function (event) {
          let queryParams = {
            managerid: mgrID,
            managerName: mgrName,
            managerPosition: mgrPosition,
            mangerRole: mgrRole,
            managerStatus: mgrStatus,
            managerDept: managerDept,
            selectedDate: event.detail.itemObj.eventDate,
            selectedSlot: event.detail.itemObj.timeSlot,
            strengthLabel: event.detail.itemObj.label
          };
          router.push({
            path: '/HROverallEmployeeList', // Ensure the name matches exactly
            query: queryParams
          }).catch(err => console.error(err)); // Catch potential errors in navigation
        })
        schedulerhro1.hasListener = "true";
      }
    },
    ViewManagerManagerSchedule() {
      const queryParams = {
        managerid: "130002",
        managerName: this.managerName,
        managerPosition: this.managerPosition,
        mangerRole: this.mangerRole,
        managerStatus: this.managerStatus,
        managerDept: this.dept,
        selectedDate: new Date().toLocaleDateString('en-CA'),
      };

      // Navigate to the schedule view for team members reporting to the manager
      this.$router.push({
        path: '/HRViewOverallSchedule4', // Ensure the name matches exactly
        query: queryParams
      }).catch(err => console.error(err)); // Catch potential errors in navigation
    }
  },
  mounted() {
    this.$store.state.isAbsolute = true;
    this.$store.state.isNavFixed = false;
    setNavPills();
    setTooltip();
    this.fetchEmployeeData2(); // Fetch employee data when component is mounted
    this.fetchEmployeeData(); // Fetch employee data when component is mounted
    // Ask user if they want to start tutorial
    // Delay the tutorial by 1 second to allow content to load
    setTimeout(() => {
      this.startTutorial();
    }, 1000); // 1000ms = 1 second
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
};
</script>


<style>
/* Add this CSS to your stylesheet */
.loading {
  position: fixed;
  /* Keep it fixed on the screen */
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Center the loading icon */
  z-index: 1000;
  /* Ensure it's above other elements */
}

.spinner {
  width: 50px;
  /* Size of the spinner */
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  /* Light color for the spinner */
  border-top: 5px solid #3498db;
  /* Spinner color */
  border-radius: 50%;
  /* Circular spinner */
  animation: spin 1s linear infinite;
  /* Spin animation */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>