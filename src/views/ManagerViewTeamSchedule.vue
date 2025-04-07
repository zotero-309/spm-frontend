<template>
  <div class="vue-root">
    <div id="primaryContainer">
      <div id="header">
        <div id="title">{{ title }}</div>
      </div>
      <div class="content">
        <section id="sideA">
          <div class="controls-container">
            <smart-calendar id="calendar"></smart-calendar>
            <smart-tree id="tree" selection-mode="checkBox" toggle-element-position="far">
            </smart-tree>
          </div>
        </section>
        <section id="sideB">
          <smart-scheduler id="scheduler" @click="handleSchedulerClick" disableEventMenu disableContextMenu hideNonworkingWeekdays disableSelection>
            <div id="loading-icon" class="loading" style="display: none;">
              <div class="spinner"></div>
            </div>
          </smart-scheduler>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, getCurrentInstance } from "vue";
import axios from "axios";
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.button.js";
import "smart-webcomponents/source/modules/smart.calendar.js";
import "smart-webcomponents/source/modules/smart.input.js";
import "smart-webcomponents/source/modules/smart.tree.js";
import "smart-webcomponents/source/modules/smart.scheduler.js";
import * as pkg from 'smart-webcomponents/common/rrule.min.js';
import { useRoute, useRouter } from 'vue-router'; // Import useRouter
window.rrule = { RRule: pkg.default };


export default {

  name: "ManagerViewTeamSchedule",
  setup() {
    const data = ref([]); // Reactive reference for the data array
    const data1 = ref([]);
    const data2 = ref([]);
    // Access global properties inside setup() using getCurrentInstance()
    const { proxy } = getCurrentInstance();
    const baseURL = proxy.$baseURL;  // Access $baseURL from global properties
    const router = useRouter(); // Get the router instance
    const managerId = ref(null); // For manager ID from the query
    const managerName = ref(''); // For manager name from the query
    const staff_id = localStorage.getItem("staff_id")
    const role = localStorage.getItem("role")

    // Access the route
    const route = useRoute();
    managerId.value = route.query.managerId || null; // Get the manager ID from the query
    managerName.value = route.query.manager_name || ''; // Get the manager name from the query

    // Computed property for the title
    const title = computed(() => {
      return managerName.value
        ? `Viewing Team Schedule (of ${managerName.value}'s reports)`
        : 'View Team Schedule (of my reports)';
    });

    console.log("Manager ID:", managerId.value);
    console.log("Manager Name:", managerName.value);
    console.log("You're logged in as:", staff_id);

    onMounted(async () => {
      document.getElementById('loading-icon').style.display = 'block';
      // Use the managerId for the Axios request if available; otherwise, use the logged-in staff ID
      const idToUse = managerId.value || staff_id;

      console.log("You're logged in as:", staff_id);
      console.log("Using ID for reports:", idToUse);
      try {
        const response = await axios.get(`${baseURL}/schedule/team_schedule_manager/${idToUse}`);
        console.log("API Response:", response.data);
        data1.value = response.data;

        const response2 = await axios.get(`${baseURL}/schedule/manageremployeelist/${idToUse}`);
        data2.value = response2.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }


      const today = new Date(),
        minStartDate = (() => { // calculation of date from 2 months before today
          const startDate = new Date(today);
          startDate.setMonth(today.getMonth() - 2);
          return startDate;
        })(),
        SmallCal_minStartDate = (() => {   // calculation of date from 2 months before today
          const startDate = new Date(today);
          startDate.setMonth(today.getMonth() - 2);
          startDate.setDate(today.getDate());
          return startDate;
        })(),
        maxEndDate = (() => { // calculation of date 3 months after today
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



      const events = [];
      // Loop through each date from minStartDate to maxEndDate
      for (let d = new Date(minStartDate); d <= maxEndDate; d.setDate(d.getDate() + 1)) {
        const dayOfWeek = d.getDay(); // Get the day of the week (0 = Sunday, 6 = Saturday)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Weekdays only (Mon to Fri)
          const dateString = d.toISOString().split("T")[0]; // Format date as 'YYYY-MM-DD'

          // Default values for AM and PM
          const defaultAm = {
            wfh: 0,
            office: data2.value[0].EmployeeStrength,
            employees: data2.value[0].EmployeeList
          };
          const defaultPm = {
            wfh: 0,
            office: data2.value[0].EmployeeStrength,
            employees: data2.value[0].EmployeeList
          };

          // Check if the date exists in data1
          console.log("Data1 value:", JSON.stringify(data1.value, null, 2));
          console.log("dateString:", dateString);


          const currentDateData = data1.value.find(entry => entry.date === dateString);

          // If found, retrieve WFH and employee info
          if (currentDateData) {
            console.log("test if am found")
            // AM Event
            events.push({
              label: `WFH: ${currentDateData.am.wfh}\nIn-office: ${currentDateData.am.office}`,
              dateStart: new Date(d.setHours(9, 0, 0)),
              dateEnd: new Date(d.setHours(13, 0, 0)),
              class: "Pending",
              employees: currentDateData.am.employees,  // Attach the AM employee list
              timeSlot: 'AM',  // Tagging it as AM
              eventDate: dateString  // Adding date for further use if needed
            });

            // PM Event
            events.push({
              label: `WFH: ${currentDateData.pm.wfh}\nIn-office: ${currentDateData.pm.office}`,
              dateStart: new Date(d.setHours(14, 0, 0)),
              dateEnd: new Date(d.setHours(18, 0, 0)),
              class: "Pending",
              employees: currentDateData.pm.employees,  // Attach the PM employee list
              timeSlot: 'PM',  // Tagging it as PM
              eventDate: dateString  // Adding date for further use if needed
            });
          } else {
            // Default values for AM and PM when date is not found in data1
            // AM Event
            events.push({
              label: `WFH: ${defaultAm.wfh}\nIn-office: ${defaultAm.office}`,
              dateStart: new Date(d.setHours(9, 0, 0)),
              dateEnd: new Date(d.setHours(13, 0, 0)),
              class: "Pending",
              employees: defaultAm.employees,  // Use default employee list
              timeSlot: 'AM',  // Tagging it as AM
              eventDate: dateString  // Adding date for further use if needed
            });

            // PM Event
            events.push({
              label: `WFH: ${defaultPm.wfh}\nIn-office: ${defaultPm.office}`,
              dateStart: new Date(d.setHours(14, 0, 0)),
              dateEnd: new Date(d.setHours(18, 0, 0)),
              class: "Pending",
              employees: defaultPm.employees,  // Use default employee list
              timeSlot: 'PM',  // Tagging it as PM
              eventDate: dateString  // Adding date for further use if needed
            });
          }
        }
      }
      document.getElementById('loading-icon').style.display = 'none';


      // Initialize the Smart Scheduler
      window.Smart(
        "#scheduler",
        class {
          get properties() {
            return {
              view: "week", // Default view mode of the scheduler
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
              nonworkingDays: [6, 7], // Disable weekends (Sunday = 7, Saturday = 6)
              dateCurrent: new Date(), // Set the current date
              dataSource: events, // Assign event data source to the scheduler
              firstDayOfWeek: 1, // Set the first day of the week (Monday)
              currentTimeIndicator: true, // Show current time indicator on the scheduler
              restrictedDates: restrictedDatesArray,
              disableDrop: true,  // Disable dropping events on the calendar
              disableResize: true,  // Disable resizing events
              disableDrag: true,  // Disable dragging events
              min: minStartDate, // Set the minimum display date
              max: SmallCal_maxEndDate,  // Set the maximum display date
              hourStart: 8,  // Start of working hours (8 AM)
              hourEnd: 18,  // End of working hours (6 PM)
              hideAllDay: true,
              viewSelectorType: "tabs",
            };
          }
        }
      );


      // Initialize the DatePicker at Side A
      window.Smart(
        "#calendar",
        class {
          get properties() {
            return {
              min: SmallCal_minStartDate,  // Minimum date for DatePicker
              max: SmallCal_maxEndDate,  // Maximum date for DatePicker
            };
          }
        }
      );

      // Allows date selection from the DatePicker to reflect on the main calendar
      const primaryContainer = document.getElementById("primaryContainer"),
        calendar = document.getElementById("calendar"),
        scheduler = document.querySelector("smart-scheduler");

      // Event listener for DatePicker change event
      document
        .getElementById("calendar")
        .addEventListener("change", function (event) {
          // Update scheduler's current date based on selected date from DatePicker
          scheduler.dateCurrent = event.detail.value;
        });

      // Event listener for tree element change event (e.g., category or filter selection)
      document
        .getElementById("tree")
        .addEventListener("change", function (event) {
          const tree = event.target,
            // Get the selected categories (types) from the tree
            types = tree.selectedIndexes.map((i) => tree.getItem(i).value);

          // Filter the scheduler's data source based on selected categories
          scheduler.dataSource = data.value.filter(
            (d) => types.indexOf(d.class) > -1 // Only show events that match the selected categories
          );
        });



      scheduler.addEventListener("editDialogOpening", function (event) {
        console.log("Event Detail:", event.detail.item); // Log the event detail to check its structure

        // Get the current item's time slot
        const timeSlot = event.detail.item.timeSlot; // 'AM' or 'PM'

        const date = event.detail.item.eventDate;

        // Get the employee data from the event detail
        const employees = event.detail.item.employees || []; // default to an empty array if undefined

        // Get the manager's name from the current URL parameters
        const currentUrl = window.location.href; // Full URL including hash
        const urlHash = currentUrl.split('#')[1]; // Get the part after the hash
        const urlParamsString = urlHash.split('?')[1]; // Get the query string part

        // Retrieve manager name from URL params
        const hash = window.location.hash;
        const queryString = hash.split('?')[1];
        const urlParams = new URLSearchParams(queryString);

        const manager_name = urlParams.get('manager_name'); // Get the employee JSON string
        console.log(manager_name)

        // Navigate to the schedule view for team members reporting to the manager
        router.push({
          name: 'EmployeeList', // Ensure the name matches exactly with your router configuration
          query: {
              date: date,
              timeSlot: timeSlot, // Pass the time slot
              employees: JSON.stringify(employees), // Pass the employees array as a JSON string
              manager_name: manager_name // Include manager name in query parameters
          }
          }).catch(err => console.error(err)); // Catch potential errors in navigation
      });
    });

    return {
      title,
      data,
      data1,
      data2,
      managerId,
      managerName,
    };
  },
};

</script>


<style>
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

html,
body {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  --smart-scheduler-timeline-cell-min-width: 40px;
  --smart-scheduler-event-border-radius: 4px;
  --smart-scheduler-timeline-nonworking-color: var(--smart-background);
}


.vue-root {
  height: 100%;
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
  height: 150px;
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
  height: 200px;
  border: initial;
}

#primaryContainer.collapse #addNew {
  width: 45px;
  border-radius: 50%;
}

#primaryContainer.collapse #addNew::after {
  left: 0;
  width: 100%;
  height: 100%;
}

#primaryContainer.collapse #addNew span {
  display: none;
}

#addNew {
  top: 100%;
  left: 20px;
  margin-top: 100px;
  position: absolute;
  cursor: pointer;
  width: 120px;
  height: 45px;
  border-radius: 25px;
  box-shadow: var(--smart-elevation-2);
  z-index: 1;
}

#addNew button {
  padding-left: 45px;
}

#addNew::after {
  content: "+";
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 10px;
  width: 30px;
  height: 100%;
  font-family: var(--smart-font-family-icon);
  font-size: 40px;
  color: inherit;
  background: linear-gradient(217deg,
      rgba(255, 0, 0, 0.8),
      rgba(255, 0, 0, 0) 70.71%),
    linear-gradient(127deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0) 70.71%),
    linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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

.smart-tree .smart-tree-item[value="Pending"] {
  --smart-primary: cornflowerblue;
}

.smart-tree .smart-tree-item[value="Rejected"] {
  --smart-primary: purple;
}

.Approved {
  --smart-scheduler-event-background-rgb: 0, 129, 0;
  --smart-scheduler-event-background: rgba(var(--smart-scheduler-event-background-rgb),
      1);
  --smart-scheduler-event-focus: rgba(var(--smart-scheduler-event-background-rgb),
      0.9);
  --smart-scheduler-event-hover: rgba(var(--smart-scheduler-event-background-rgb),
      0.8);
}

.Pending {
  --smart-scheduler-event-background-rgb: 100, 149, 237;
  --smart-scheduler-event-background: rgba(var(--smart-scheduler-event-background-rgb),
      1);
  --smart-scheduler-event-focus: rgba(var(--smart-scheduler-event-background-rgb),
      0.9);
  --smart-scheduler-event-hover: rgba(var(--smart-scheduler-event-background-rgb),
      0.8);
}

.Rejected {
  --smart-scheduler-event-background-rgb: 128, 0, 128;
  --smart-scheduler-event-background: rgba(var(--smart-scheduler-event-background-rgb),
      1);
  --smart-scheduler-event-focus: rgba(var(--smart-scheduler-event-background-rgb),
      0.9);
  --smart-scheduler-event-hover: rgba(var(--smart-scheduler-event-background-rgb),
      0.8);
}
</style>