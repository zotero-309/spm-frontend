why<template>
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
            <p class="mb-0 text-sm font-weight-bold">{{ managerPosition }}, {{ managerDept }}</p>
          </div>
        </div>
        <div class="col-auto my-auto">
          <vsud-badge :color="this.$route.query.managerStatus === 'In-Office' ? 'success' : 'secondary'" variant="gradient" size="sm"
            class="mx-auto">
            {{ this.$route.query.managerStatus }}
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
                  <span class="ms-1">View {{ managerName }}'s Schedule</span>
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
      <div :class="role == 3 || role == 1 ? 'col-12' : 'col-10'">
        <div class="mb-4 card">
          <div class="py-4 container-fluid">
            <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="first-tab" data-bs-toggle="tab" data-bs-target="#first"
                  type="button" role="tab" aria-controls="first" aria-selected="true">
                  <h6 class="mb-1">Teams</h6>
                  <p v-if="role == 3" class="text-sm">View WFH schedule of teams in <u>{{ dept }}</u>&nbsp;</p>
                  <p v-if="role == 2 || role == 1" class="text-sm">Viewing WFH status of employees in <u>{{ dept
                      }}</u>&nbsp;</p>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="second-tab" data-bs-toggle="tab" data-bs-target="#second" type="button"
                  role="tab" aria-controls="second" aria-selected="false">
                  <h6 class="mb-1">Calendar</h6>
                  <p class="text-sm">View Overall WFH Schedule of <u>{{ dept }}</u></p>
                </button>
              </li>
            </ul>
            <div class="tab-content p-3">
              <div class="tab-pane fade show active" id="first" role="tabpanel" aria-labelledby="first-tab"
                v-if="role == 3">
                <div class="p-3 card-body">
                  <div class="row">
                    <div v-for="(employee, index) in employees" :key="employee.id"
                      class="mb-4 col-xl-3 col-md-6 mb-xl-0">
                      <projects-card :img="images[employee.dept]" :number="index + 1" :title="employee.name"
                        scheduleLink="/HRViewOverallSchedule3" :managerId="employee.id" :managerName="employee.name"
                        :managerPosition="employee.position" :managerRole="employee.role" :managerStatus="employee.status" :img-team1="team1"
                        title-team1="Elena Morison" :img-team2="team2" title-team2="Ryan Milly" :img-team3="team3"
                        title-team3="Nick Daniel" :img-team4="team4" title-team4="Peterson" class="pb-4" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade show active" id="first" role="tabpanel" aria-labelledby="first-tab"
                v-if="role == 2 || role == 1">
                <div class="card-body px-0 pt-0 pb-2">
                  <div class="card-header py-0">
                    <p>Date: <b>{{ selectedDate }}</b> &nbsp; Timeslot: <b>{{ selectedSlot }}</b></p>
                  </div>
                  <div class="table-responsive p-0">
                    <table class="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Employee</th>
                          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Department/Position
                          </th>
                          <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Country
                          </th>
                          <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Status</th>
                          <th class="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(employee, index) in filteredEmployees" :key="employee.id">
                          <td>
                            <div class="d-flex px-3 py-1">
                              <div class="d-flex flex-column justify-content-center">
                                <h5 class="mb-0 text-sm">{{ employee.name }}</h5>
                                <p class="text-xs text-secondary mb-0">{{ employee.email }}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p class="text-xs font-weight-bold mb-0">{{ employee.dept }}</p>
                            <p class="text-xs text-secondary mb-0">{{ employee.position }}</p>
                          </td>
                          <td>
                            <p class="text-xs font-weight-bold mb-0">{{ employee.country }}</p>
                          </td>
                          <td class="align-middle text-center text-sm">
                            <vsud-badge :color="employee.status === 'In-Office' ? 'success' : 'secondary'"
                              variant="gradient" size="sm">
                              {{ employee.status }}
                            </vsud-badge>
                          </td>
                          <td class="align-middle" style="width: 15%;">
                            <!-- Only show the button if the displayed employee is a manager (role = 3) -->
                            <button class="btn btn-secondary btn-sm" style="margin-bottom: 0;"
                              @click="ViewManagerReportsSchedule(employee)">
                              View their schedule
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="second" role="tabpanel" aria-labelledby="second-tab">
                <!-- Add this HTML where you want the loading icon to appear -->
                <smart-scheduler id="schedulerhro2" disableEventMenu disableContextMenu hideNonworkingWeekdays
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
      <div class="col-2" v-if="role != 3">
        <div class="mb-4 card">
          <div class="controls-container">
            <smart-tree selection-mode="checkBox" toggle-element-position="far" id="countryFilter"
              @change="onCountryAndStatusChange">
              <smart-tree-items-group expanded>By Country
                <smart-tree-item id="Singapore" value="Singapore" disabled>Singapore</smart-tree-item>
                <smart-tree-item id="Hong Kong" value="Hong Kong" disabled>Hong Kong</smart-tree-item>
                <smart-tree-item id="Indonesia" value="Indonesia" disabled>Indonesia</smart-tree-item>
                <smart-tree-item id="Malaysia" value="Malaysia" disabled>Malaysia</smart-tree-item>
                <smart-tree-item id="Vietnam" value="Vietnam" disabled>Vietnam</smart-tree-item>
              </smart-tree-items-group>
            </smart-tree>
            <smart-tree selection-mode="checkBox" toggle-element-position="far" id="statusFilter"
              @change="onCountryAndStatusChange">
              <smart-tree-items-group expanded>WFH Status
                <smart-tree-item id="WFH" value="WFH" disabled>WFH</smart-tree-item>
                <smart-tree-item id="In-Office" value="In-Office" disabled>In-Office</smart-tree-item>
              </smart-tree-items-group>
            </smart-tree>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from 'vue-router'; // Import useRouter;
import axios from 'axios'; // Make sure to import axios if not already done
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.button.js";
import "smart-webcomponents/source/modules/smart.calendar.js";
import "smart-webcomponents/source/modules/smart.input.js";
import "smart-webcomponents/source/modules/smart.tree.js";
import "smart-webcomponents/source/modules/smart.scheduler.js";
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
  name: "schedulerhro2",
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
      ceoId: "",  // Initialize with null or an empty string
      employees: [], // To hold employee data from API
      percentStrength: "...",
      officeStrength: "calculating.",
      totalStrength: "",
      selectedSlot: "",
      managerId: "",  // Initialize with null or an empty string
      managerName: "",
      managerPosition: "",
      managerDept: "",
      dept: "",
      role: "",
      selectedDate: new Date().toLocaleDateString('en-CA'),
      selectedSlot: "",
      managerStatus: "",
      schedulerData: [],
      filteredEmployees: [], // Array to hold filtered employees
      availableCountries: [],
      availableStatus: [],
    };
  },
  setup() {
    // Accessing baseURL here
    const router = useRouter(); // Initialize the router for redirection to employeelist (upon clicking events)
    const { proxy } = getCurrentInstance();
    const baseURL = proxy.$baseURL; // Access $baseURL from global properties
    const mgrID = ref("");
  },
  methods: {
    availableCountriess() {
      // Define each country element
      const Singapore = document.getElementById("Singapore");
      const HongKong = document.getElementById("Hong Kong");
      const Indonesia = document.getElementById("Indonesia");
      const Malaysia = document.getElementById("Malaysia");
      const Vietnam = document.getElementById("Vietnam");

      // Put elements in an object for easier reference
      const countryElements = {
        Singapore,
        HongKong,
        Indonesia,
        Malaysia,
        Vietnam
      };

      // Create a set of unique countries based on employees' countries
      const uniqueCountries = new Set(this.employees.map(emp => emp.country));
      console.log("Available Countries:", Array.from(uniqueCountries));

      // Iterate over each country element
      for (const [country, element] of Object.entries(countryElements)) {
        if (uniqueCountries.has(country) || uniqueCountries.has("Hong Kong")) {
          // Remove 'disabled' attribute if it exists and add 'selected'
          element.removeAttribute("disabled");
          element.setAttribute("selected", true);
        } else {
          // If the country is not in uniqueCountries, ensure it’s disabled
          element.setAttribute("disabled", true);
          element.removeAttribute("selected");
        }
      }

      return Array.from(uniqueCountries); // Return the array
    },
    availableStatuss() {
      // Define each status element
      const WFH = document.getElementById("WFH");
      const InOffice = document.getElementById("In-Office");

      // Put elements in an object for easier reference
      const statusElements = {
        WFH,
        InOffice,
      };

      // Create a set of unique countries based on employees' countries
      const uniqueStatus = new Set(this.employees.map(emp => emp.status));
      console.log("Available Status:", Array.from(uniqueStatus));

      // Iterate over each country element
      for (const [status, element] of Object.entries(statusElements)) {
        if (uniqueStatus.has(status) || uniqueStatus.has("In-Office")) {
          // Remove 'disabled' attribute if it exists and add 'selected'
          element.removeAttribute("disabled");
          element.setAttribute("selected", true);
        } else {
          // If the country is not in uniqueCountries, ensure it’s disabled
          element.setAttribute("disabled", true);
          element.removeAttribute("selected");
        }
      }
      return Array.from(uniqueStatus); // Return the array
    },

    applyFilters(filters) {
      this.filteredEmployees = this.employees.filter(employee => {
        // Check if the country filter exists and matches any of the selected countries
        const matchesCountry = !filters.country || filters.country.includes(employee.country);

        // Apply the status filter (same as before)
        const matchesStatus = !filters.status || filters.status.includes(employee.status);

        // Return true if both filters match
        return matchesCountry && matchesStatus;
      });
    },

    onCountryAndStatusChange() {
      const countryFilter = document.getElementById("countryFilter");
      if (!countryFilter) {
        console.error("Country filter element not found.");
        this.applyFilters({ country: [] }); // Ensure filters are reset
        return; // Exit if the element does not exist
      }
      const selectedIndexesString = countryFilter.getAttribute("selected-indexes");
      if (!selectedIndexesString) {
        console.log("No countries selected.");
        this.applyFilters({ country: [] }); // Reset filters
        return; // Exit since there are no selected indexes
      }
      const selectedIndexes = JSON.parse(selectedIndexesString.replace(/&quot;/g, '"'));
      const indexToCountryMap = {
        "0.0": "Singapore",
        "0.1": "Hong Kong",
        "0.2": "Indonesia",
        "0.3": "Malaysia",
        "0.4": "Vietnam"
      };
      const selectedCountries = selectedIndexes.map(index => indexToCountryMap[index]).filter(Boolean);

      const statusFilter = document.getElementById("statusFilter");
      if (!statusFilter) {
        console.error("Status filter element not found.");
        this.applyFilters({ status: [] }); // Ensure filters are reset
        return; // Exit if the element does not exist
      }
      const selectedIndexesString1 = statusFilter.getAttribute("selected-indexes");
      if (!selectedIndexesString1) {
        this.applyFilters({ status: [] }); // Reset filters
        return; // Exit since there are no selected indexes
      }
      const selectedIndexes1 = JSON.parse(selectedIndexesString1.replace(/&quot;/g, '"'));
      const indexToStatusMap = {
        "0.0": "WFH",
        "0.1": "In-Office",
      };
      const selectedStatus = selectedIndexes1.map(index => indexToStatusMap[index]).filter(Boolean);
      this.applyFilters({ status: selectedStatus, country: selectedCountries });
    },
    calculatePercentage(events, today) {
      const hour = today.getHours();
      // Determine if it's am or pm based on the current time
      console.log("today's hours", hour);
      const timeKey = hour < 14 ? "am" : "pm";
      this.selectedSlot = timeKey.toUpperCase();
      // Calculate percentage strength based on selected timing
      console.log("slot", timeKey);
      const officeCount = events[timeKey].office;
      this.officeStrength = officeCount;
      const wfhCount = events[timeKey].wfh;
      const total = officeCount + wfhCount;
      this.totalStrength = total;

      const percentStrength = total > 0 ? (officeCount / total) * 100 : 0;

      this.percentStrength = percentStrength.toFixed(2);
    },
    async checkReportsRole() {
      try {
        const response = await axios.get(`${this.$baseURL}/schedule/manageremployeelist/${this.managerId}`);
        this.role = response.data[0].EmployeeList[0].role;
        const role = response.data[0].EmployeeList[0].role;
        if (role != 2) {
          this.fetchEmployeeData();
        } else {
          this.fetchEmployeeDataa()
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    },
    async fetchEmployeeData() {
      try {
        const response = await axios.get(`${this.$baseURL}/schedule/manageremployeelist/${this.managerId}`);
        this.employees = response.data[0].EmployeeList; // Store the fetched data in the employees array
        this.filteredEmployees = response.data[0].EmployeeList;
        this.managerDept = response.data[0].EmployeeList[0].dept;
        this.dept = response.data[0].EmployeeList[0].dept + " Department" // set page dept header dynamically
        this.role = response.data[0].EmployeeList[0].role
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    },
    async fetchEmployeeDataa() {
      try {
        const today = new Date();
        const hour = today.getHours();
        const timeKey = hour < 14 ? "am" : "pm";
        // Calculate percentage strength based on selected timing
        const timeKey1 = timeKey.toUpperCase();
        console.log(timeKey1);
        const response = await axios.get(`${this.$baseURL}/schedule/HRO_wfh_slot_stafflist/${this.managerId}/${this.selectedDate}/${timeKey1}`);
        this.employees = response.data[0][timeKey1].employees; // Store the fetched data in the employees array
        this.filteredEmployees = response.data[0][timeKey1].employees; // Store the fetched data in the employees array
        this.managerDept = response.data[0][timeKey1].employees[0].dept;
        this.dept = response.data[0][timeKey1].employees[0].dept + " Department" // set page dept header dynamically
        this.role = response.data[0][timeKey1].employees[0].role
        this.availableCountries = this.availableCountriess();
        this.availableStatus = this.availableStatuss();
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    },
    async fetchEmployeeData2() {
      document.getElementById('loading-icon').style.display = 'block';

      try {
        const response = await axios.get(`${this.$baseURL}/schedule/HRO_wfh_count/${this.managerId}`);
        document.getElementById('loading-icon').style.display = 'none';
        console.log("Scheduler Data recevied from API for: ", this.managerId);

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
    calculateBlockedDates(minStartDate, maxEndDate) {
      return new Promise((resolve, reject) => {
        const worker = new Worker('src/views/scheduleWorker.js');

        worker.onmessage = function (e) {
          // console.log("Main thread received blocked dates:", e.data); // Log received blocked dates
          resolve(e.data); // Resolve the promise with the received blocked dates
        };

        worker.onerror = function (error) {
          console.error("Worker error:", error); // Log any errors from the worker
          reject(error); // Reject the promise if there's an error
        };

        // Send minStartDate and maxEndDate as an array
        worker.postMessage([minStartDate, maxEndDate]);
      });
    },

    processScheduleData(data) {
      // Process the scheduler data into events format
      const events = [];
      for (let i = 0; i < data.length; i++) {
        let record = data[i]; // Access each object in the array
        let date = record.date; // Access the 'date' value
        let amWfh = record.am.wfh; // Access the 'wfh' value in 'am'
        let amOffice = record.am.office; // Access the 'office' value in 'am'
        let pmWfh = record.pm.wfh; // Access the 'wfh' value in 'pm'
        let pmOffice = record.pm.office; // Access the 'office' value in 'pm'
        const today = new Date();
        const todayDate = new Date().toLocaleDateString('en-CA');
        if (date == todayDate) {
          this.calculatePercentage(record, today);
        }

        events.push({
          label: `WFH: ${amWfh}\nIn-Office: ${amOffice}`,
          dateStart: new Date(new Date(date).setHours(9, 0, 0)),
          dateEnd: new Date(new Date(date).setHours(13, 0, 0)),
          class: "Pending",
          timeSlot: 'AM',
          eventDate: date
        });

        // PM Event
        events.push({
          label: `WFH: ${pmWfh}\nIn-Office: ${pmOffice}`,
          dateStart: new Date(new Date(date).setHours(14, 0, 0)),
          dateEnd: new Date(new Date(date).setHours(18, 0, 0)),
          class: "Pending",
          timeSlot: 'PM',
          eventDate: date
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
      const managerDept = this.managerDept;
      const router = this.$router;

      window.Smart(
        "#schedulerhro2",
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
      const schedulerhro2 = document.getElementById("schedulerhro2");

      if (!schedulerhro2.hasListener) {
        schedulerhro2.addEventListener("itemClick", function (event) {
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
        schedulerhro2.hasListener = "true";
      }
    },
    ViewManagerReportsSchedule(employee) {
      console.log('Navigating to Manager View Team Schedule');
      console.log('Employee ID:', employee.id);
      const queryParams = {
        managerid: employee.id,
        managerName: employee.name,
        managerPosition: employee.position,
        mangerRole: employee.role,
        managerStatus: employee.status,
        managerDept: employee.dept,
      };

      // Navigate to the schedule view for team members reporting to the manager
      this.$router.push({
        path: '/HRViewOverallSchedule4', // Ensure the name matches exactly
        query: queryParams
      }).catch(err => console.error(err)); // Catch potential errors in navigation
    },
    ViewManagerManagerSchedule() {
      console.log('Navigating to Manager View Team Schedule');
      console.log('Employee ID:', this.managerId);
      const queryParams = {
        managerid: this.$route.query.managerid,
        managerName: this.managerName,
        managerPosition: this.managerPosition,
        mangerRole: this.mangerRole,
        managerStatus: this.$route.query.managerStatus,
        managerDept: this.$route.query.managerDept,
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
    const router = useRouter();
    this.$store.state.isAbsolute = true;
    this.$store.state.isNavFixed = false;
    setNavPills();
    setTooltip();
    console.log("Initial query parameters:", this.$route.query);
    // Extract managerId from query parameters on component creation
    this.filteredEmployees = this.employees;
    this.managerId = this.$route.query.managerid;
    this.managerName = this.$route.query.managerName;
    this.managerPosition = this.$route.query.managerPosition;
    this.role = this.$route.query.managerRole;
    this.fetchEmployeeData2(); // Fetch employee data when component is mounted
    this.checkReportsRole();
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
