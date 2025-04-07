<template>
  <!-- Multiline Prompt Window -->
  <smart-multiline-prompt-window id="multilinePromptWindow" label="Withdrawal"
    prompt-label="Let your staff know why you are withdrawing!" class="material" placeholder="enter your reasons"
    value></smart-multiline-prompt-window>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h4> {{ title }}</h4>
      <p>Date: {{ date }} ({{ timeSlot }})</p>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Employee</th>
              <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">Department/Position
              </th>
              <th class="text-center text-uppercase text-xs text-secondary font-weight-bolder opacity-7">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee, index in displayedEmployees" :key="employee.id">
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
              <td class="align-middle text-center text-sm">
                <vsud-badge :color="employee.status === 'In-Office' ? 'success' : 'secondary'" variant="gradient"
                  size="sm">
                  {{ employee.status }}
                </vsud-badge>
              </td>

              <td class="align-middle" style="width: 15%;">
                <!-- Only show the button if the displayed employee is a manager (role = 3) -->
                <button v-if="employee.role === 3" class="btn btn-secondary btn-sm" style="margin-bottom: 0;"
                  @click="ViewManagerReportsSchedule(employee)">
                  View their team's schedule
                </button>
              </td>

              <td class="align-middle" style="width: 10%;">
                <!-- Conditionally display the Withdraw button -->
                <button v-if="isDirectReport(employee)"
                  :class="employee.status === 'WFH' ? 'btn btn-danger btn-sm' : 'btn btn-secondary btn-sm'"
                  :disabled="employee.status !== 'WFH'" class="btn btn-secondary btn-sm" style="margin-bottom: 0;"
                  @click="withdrawWFH(employee, index)">
                  Withdraw
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import "smart-webcomponents/source/modules/smart.window.js";
import VsudAvatar from "@/components/VsudAvatar.vue";
import VsudBadge from "@/components/VsudBadge.vue";
import { ref, onMounted, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Import useRouter
import { computed } from 'vue';
import axios from "axios";

export default {
  name: 'EmployeeList',
  components: {
    VsudAvatar,
    VsudBadge,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const baseURL = proxy.$baseURL;
    const employees = ref([]);
    const timeSlot = ref('');
    const date = ref('');
    const displayedEmployees = ref([]); // To manage displayed employees
    const route = useRoute();
    const router = useRouter(); // Create a router instance
    const user_role = ref(null);
    const user_id = ref(null);

    // Computed property for the title
    const title = computed(() => {
      const managerName = route.query.manager_name; // Get the manager name from query params
      if (managerName) {
        return `Viewing Team Schedule of ${managerName}'s Reports`; // Dynamic title
      }
      return 'My Team Members'; // Default title if no manager name is present
    });


    onMounted(() => {
      user_role.value = localStorage.getItem("role")
      user_id.value = localStorage.getItem("staff_id")


      const hash = window.location.hash;
      const queryString = hash.split('?')[1];
      const urlParams = new URLSearchParams(queryString);

      timeSlot.value = urlParams.get('timeSlot') || '';
      date.value = urlParams.get('date') || '';
      const employeesParam = urlParams.get('employees'); // Get the employee JSON string

      // Parse employees if it exists
      employees.value = employeesParam ? JSON.parse(decodeURIComponent(employeesParam)) : [];

      console.log("Extracted Time Slot:", timeSlot.value);
      console.log("Extracted Date:", date.value);
      console.log("Extracted Employees:", employees.value);

      // If no employees, create a display of all employees with "In-Office" status
      if (employees.value.length === 0) {
        // Map the allEmployees array to set all to "In-Office" status
        displayedEmployees.value = allEmployees.map(emp => ({
          ...emp,
          status: 'In-Office' // Set status to In-Office for display
        }));
      } else {
        // If employees are present, use their current statuses
        displayedEmployees.value = employees.value.map(emp => ({
          ...emp,
          // Ensure status is properly set based on existing data
          status: emp.status || 'In-Office' // Use existing status or default to "In-Office"
        }));
      }
    });

    function ViewManagerReportsSchedule(employee) {
      if (employee.role === 3) {
        console.log('Navigating to Manager View Team Schedule');
        console.log('Employee ID:', employee.id);

        // Navigate to the schedule view for team members reporting to the manager
        router.push({
          name: 'ManagerViewTeamSchedule', // Ensure the name matches exactly
          query: {
            managerId: employee.id,
            manager_name: employee.name
          }
        }).catch(err => console.error(err)); // Catch potential errors in navigation
      }
    }
    function isDirectReport(employee) {
      // Logic to determine if the logged-in user is the direct reporting manager of the employee
      console.log(user_id.value, employee.reporting_manager)
      return user_id.value == employee.reporting_manager; //
    }


    function withdrawWFH(employee, index) {
      do {
        var reason = prompt('Reason for Withdrawal? Reason is required');
      } while (reason !== null && reason === "")

      if (reason != null) {
        const dateValue = new Date(date.value);
        // Example data structure for API call
        const manager_withdraw_json = {
          "time_slot": timeSlot.value,
          "manager_withdraw_reason": reason,
          "date": dateValue.toISOString(),
        };

        const jsonString = JSON.stringify(manager_withdraw_json);
        console.log("resulting json structure", jsonString);
        console.log(employee.id)
        console.log("withdrawal axios reached");
        axios.post(`${baseURL}/application/manager_withdraw/${employee.id}`, jsonString, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then(response => {
            console.log("Event withdrawn successfully:", response.data);
            let key = Object.keys(response.data)[0]; // Get the first key in the object  // 15 OCT
            alert(response.data[key]); // 15 OCT
            employee.status = "In-Office"
            employees.value[index].status = "In-Office"

            // Navigate to the schedule view for team members reporting to the manager
            router.push({
              name: 'EmployeeList', // Ensure the name matches exactly with your router configuration
              query: {
                date: date.value,
                timeSlot: timeSlot.value, // Pass the time slot
                employees: JSON.stringify(employees.value)
              }
            })

            // setInterval(function () { location.reload(); }, 1000); // 1000 milliseconds = 1 second
          })
          .catch(error => {
            if (error.response) {
              console.log('Error status:', error.response.status);
              console.log('Error response data:', error.response.data);
              let key = Object.keys(error.response.data)[0]; // Get the first key in the object  // 15 OCT
              alert(error.response.data[key]); // 15 OCT
              // setInterval(function () { location.reload(); }, 1000); // 1000 milliseconds = 1 second
            }
          })
      }
    }
    return {
      title,
      displayedEmployees,
      timeSlot,
      date,
      user_role,
      user_id,
      ViewManagerReportsSchedule,
      isDirectReport,
      withdrawWFH,
    };
  },
};
</script>
