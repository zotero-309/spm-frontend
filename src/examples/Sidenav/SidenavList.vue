<template>
  <div id="sidenav-collapse-main" class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100">
    <ul class="navbar-nav">
      <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6">PAGES
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Scheduler" :to="{ name: 'Scheduler' }">
          <template #icon>
            <icon name="calendar" />
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse nav-text="Team Schedule" :to="{ name: 'TeamSchedule' }">
          <template #icon>
            <icon name="calendar" />
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item" v-if="role == '3'">
        <sidenav-collapse nav-text="My Reports' Schedule" :to="{ name: 'ManagerViewTeamSchedule' }">
          <template #icon>
            <icon name="calendar" />
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item" v-if="showReportScheduleAndWFHRequest && role == '1'">
        <sidenav-collapse nav-text="My Reports' Schedule" :to="{ name: 'HRViewTeamSchedule' }">
          <template #icon>
            <icon name="calendar" />
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item" v-if="role == '1'">
        <sidenav-collapse nav-text="HR View Overall Schedule" :to="{ name: 'HRViewOverallSchedule1' }"
          :class="{ 'active': isHrScheduleRoute }">
          <template #icon>
            <icon name="calendar" />
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item" v-if="showReportScheduleAndWFHRequest">
        <sidenav-collapse nav-text="WFH Requests" :to="{ name: 'WFHrequest' }">
          <template #icon>
            <icon name="dashboard" />
          </template>
        </sidenav-collapse>
      </li>


      <!-- <li class="nav-item">
        <sidenav-collapse nav-text="Profile" :to="{ name: 'Profile' }">
          <template #icon>
            <icon name="customer-support" />
          </template>
        </sidenav-collapse>
      </li> -->
      <!-- <li class="nav-item">
        <sidenav-collapse nav-text="Sign In" :to="{ name: 'Sign In' }">
          <template #icon>
            <icon name="sign-in" />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Sign Up" :to="{ name: 'Sign Up' }">
          <template #icon>
            <icon name="sign-up" />
          </template>
        </sidenav-collapse>
      </li> -->
    </ul>
  </div>
</template>
<script>
import Icon from "@/components/Icon.vue";
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCard from "./SidenavCard.vue";
import axios from "axios";
import { getCurrentInstance } from "vue";



export default {
  name: "SidenavList",
  components: {
    Icon,
    SidenavCollapse,
    SidenavCard,
  },
  props: {
    cardBg: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      title: "Vite Soft UI Dashboard",
      controls: "dashboardsExamples",
      isActive: "active",
      role: null,
      showReportScheduleAndWFHRequest: false,
      scheduleData: [],
      hrScheduleRoutes: [
        "HRViewOverallSchedule1",
        "HRViewOverallSchedule2",
        "HRViewOverallSchedule3",
        "HRViewOverallSchedule4",
        "HROverallEmployeeList"
      ],
    };
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    async checkEmployeeData() {
      try {
        const { proxy } = getCurrentInstance();
        const baseURL = proxy.$baseURL;  // Access $baseURL from global properties
        const staff_id = localStorage.getItem("staff_id");
        const response = await axios.get(`${baseURL}/schedule/team_schedule_manager/${staff_id}`);
        this.scheduleData = response.data; // Assume response.data is an array of days

        // Set the flag based on role and employee presence
        if (this.role === '3') {
          // Managers can always see the tab
          this.showReportScheduleAndWFHRequest = true;
        } else if (Array.isArray(this.scheduleData)) {
          // Non-managers need to have employees in their schedule data
          this.showReportScheduleAndWFHRequest = this.scheduleData.some(day =>
            (day.am && day.am.employees && day.am.employees.length > 0) ||
            (day.pm && day.pm.employees && day.pm.employees.length > 0)
          );
        } else {
          // Default to hiding if data is not an array or there’s an error
          this.showReportScheduleAndWFHRequest = false;
        }
      } catch (error) {
        console.error("Error fetching schedule data:", error);
        // Hide tab on error
        this.showReportScheduleAndWFHRequest = false;
      }
    }
  },
  mounted() {
    // Retrieve role from localStorage
    this.role = localStorage.getItem("role");
    this.checkEmployeeData();
  },
  computed: {
    isNormalStaff() {
      return this.role === '1';  // Compare as a string since localStorage returns strings
    },
    isHrScheduleRoute() {
      return this.hrScheduleRoutes.includes(this.$route.name);
    },
  }
};
</script>
