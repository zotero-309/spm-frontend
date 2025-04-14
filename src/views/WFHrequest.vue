<template>
    <div class="card mb-4">

        <!-- Loader displayed while data is being fetched -->
        <div v-if="loading" class="loader">Loading...
            <div id="loading-icon" class="loading" style="display: block;">
                <div class="spinner"></div>
            </div>
        </div>
        

        <!-- Main content displayed after loading completes -->
        <div v-else>
            <div class="card-header pb-0"> </div>

            <!-- Body section of the card -->
            <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                    <!-- Table to display the list of employees -->
                    <table class="table align-items-center mb-0">

                        <!-- Table Headers -->
                        <thead>
                            <tr>
                                <!-- Column Header: Employee Name -->
                                <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Employee</th>

                                <!-- Column Header: Date (Timeslot) -->
                                <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Date (Timeslot)</th>

                                <!-- Column Header: Request Type -->
                                <th class="text-center text-uppercase text-xs text-secondary font-weight-bolder opacity-7"> Request Type</th>

                                <!-- Column Header: Reason Provided -->
                                <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Reason Provided</th>

                                <!-- Column Header: Percentage (of WFH) -->
                                <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Percentage (of WFH)</th>

                                <!-- Column Header: Approve? -->
                                <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">Approve/Reject</th>
                            </tr>
                        </thead>

                        <!-- Table Body -->
                        <tbody>
                            <!-- Display "No requests available" only when data is empty and loading is false -->
                            <tr v-if="!loading && data.length === 0">
                                <td colspan="100%" class="text-center">There are no WFH requests as of this moment!</td>
                            </tr>

                            <!-- Render employee rows if data is not empty -->
                            <tr v-for="employee in data" :key="employee.application_id">

                                <!-- Column: Display employee's name and department -->
                                <td>
                                    <div class="d-flex px-3 py-1">
                                        <div class="d-flex flex-column justify-content-center">
                                            <h5 class="mb-0 text-sm">{{ employee.listofschedule[0].staff_name }}</h5>
                                            <p class="text-xs text-secondary mb-0">{{ employee.listofschedule[0].staff_dept
                                                }}</p>
                                        </div>
                                    </div>
                                </td>

                                <!-- Single Date or Date Range with Expand Dropdown for Recurring Requests -->
                                <td>
                                    <div class="d-flex px-3 py-1">
                                        <div class="d-flex flex-column justify-content-center">
                                            <!-- Display for a single schedule -->
                                            <p v-if="employee.listofschedule.length === 1">
                                                {{ formatDate(employee.listofschedule[0].dateStart) }} ({{ employee.listofschedule[0].label }})
                                            </p>
                                            <!-- Display for recurring schedules -->
                                            <p v-else @click="toggleExpand(employee.application_id)" style="cursor: pointer; margin-bottom: 0;" class="text-center text-decoration-underline transition-hover">
                                                {{ expandedRows[employee.application_id] ? 'Hide Details' : 'Recurring Dates' }}
                                            </p>
                                            <!-- Expanded view for recurring schedules -->
                                            <ul v-show="expandedRows[employee.application_id]" class="list-unstyled mt-1 ml-3">
                                                <li v-for="schedule in employee.listofschedule" :key="schedule.dateStart">
                                                    {{ formatDate(schedule.dateStart) }} ({{ schedule.label }})
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </td>

                                <!-- Column: Display the request type (Approval or Withdrawal) -->
                                <td class="align-middle text-center text-sm">
                                    <!-- Apply badge style based on status -->
                                    <vsud-badge :color="employee.listofschedule[0].class === 'Pending_Approval' ? 'secondary' : 'dark'" variant="gradient" size="sm">
                                        <!-- Show "WFH Application" if pending approval, otherwise show "WFH Withdrawal" -->
                                        <span v-if="employee.listofschedule[0].class === 'Pending_Approval'">WFH
                                            Application</span>
                                        <span v-else>WFH Withdrawal</span>
                                    </vsud-badge>
                                </td>

                                <!-- Column: Display the reason provided for the WFH request -->
                                <td>
                                    <div class="d-flex px-3 py-1">
                                        <div class="d-flex flex-column justify-content-center">
                                            <!-- Display the description (reason) provided by the employee -->
                                            <p class="mb-0 text-sm" style="white-space: normal;">{{ employee.listofschedule[0].description }}</p>
                                        </div>
                                    </div>
                                </td>

                                <!-- Column: Display the percentage of WFH requests for the date of WFH request -->
                                <td>
                                    <div class="d-flex px-3 py-1">
                                        <div class="d-flex flex-column justify-content-center">

                                            <!-- Check if the schedule is recurring -->
                                            <p v-if="employee.listofschedule.length > 1" @click="toggleExpand(employee.application_id)" style="cursor: pointer; margin-bottom: 0;" class="text-center text-decoration-underline transition-hover">
                                                {{ expandedRows[employee.application_id] ? 'Hide Details' : 'Recurring Dates' }} 
                                            </p>

                                            <!-- If the schedule is expanded and recurring, hide the recurring message -->
                                            <p v-if="expandedRows[employee.application_id]" style="margin-bottom: 0;">
                                                <ul class="list-unstyled mt-1 ml-3">
                                                    <li v-for="schedule in employee.listofschedule" :key="schedule.dateStart">
                                                        <span v-if="Array.isArray(schedule.percentage) && schedule.percentage.length > 1">
                                                            AM: {{ schedule.percentage[0] }}%, PM: {{ schedule.percentage[1] }}%
                                                        </span>
                                                        <span v-else>
                                                            {{ schedule.label }}: {{ schedule.percentage }}%
                                                        </span>
                                                    </li>
                                                </ul>
                                            </p>

                                            <!-- If there's only one schedule, display the percentage directly -->
                                            <p v-else-if="employee.listofschedule.length === 1" style="margin-bottom: 0;">
                                                <span v-if="Array.isArray(employee.listofschedule[0].percentage) && employee.listofschedule[0].percentage.length > 1">
                                                    AM: {{ employee.listofschedule[0].percentage[0] }}%, PM: {{ employee.listofschedule[0].percentage[1] }}%
                                                </span>
                                                <span v-else>
                                                    {{ employee.listofschedule[0].label }}: {{ employee.listofschedule[0].percentage }}%
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <!-- Column: Approve/Reject buttons -->
                                <td class="align-middle" style="width: 15%;">
                                    <div class="d-flex px-3 py-1">
                                        <p style="margin-bottom: 0;">
                                            <!-- Approve Button -->
                                            <button class="btn btn-success btn-sm"
                                                style="margin-bottom: 0;"
                                                @click="ApproveTheApplication(employee)">Approve</button>&nbsp;
                                            <!-- Reject Button -->
                                            <button class="btn btn-danger btn-sm" style="margin-bottom: 0;"
                                                @click="RejectTheApplication(employee)">
                                                Reject</button>
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VsudAvatar from "@/components/VsudAvatar.vue";
import VsudBadge from "@/components/VsudBadge.vue";
import { ref, onMounted, getCurrentInstance } from 'vue';
import axios from "axios";
// import { c } from "docker/src/languages";

export default {
    name: 'EmployeeList',
    components: {
        VsudAvatar,
        VsudBadge,
    },
    setup() {
        const data = ref([]);
        const loading = ref(true); // Loading state
        const expandedRows = ref({});
        const { proxy } = getCurrentInstance();
        const baseURL = proxy.$baseURL;
        const staff_id = localStorage.getItem("staff_id");

        onMounted(async () => {
            try {
                const response = await axios.get(`${baseURL}/application/wfhrequest/${staff_id}`);
                console.log("API Response:", response.data);
                data.value = response.data;
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                loading.value = false; // Set loading to false after the request completes
            }
        });

        function toggleExpand(applicationId) {
            expandedRows.value[applicationId] = !expandedRows.value[applicationId];
        }

        // Function to approve an employee's application
        async function ApproveTheApplication(employee) {
            console.log('Approving application for:', employee); // Log the employee object for debugging
            let application_id_wfh_id = String(employee.application_id)
            if (application_id_wfh_id.includes("-")) {
                let id_part = application_id_wfh_id.split("-");
                let application_id = parseInt(id_part[0],10);
                let wfh_id = parseInt(id_part[1],10);
                try {
                    // Send a POST request to approve the application
                    const response = await axios.post(`${baseURL}/application/approverejectapplication/${staff_id}`, {
                        application_id: application_id,
                        wfh_id: wfh_id,
                        status: "Approve",
                        staff_id: employee.listofschedule[0].staff_id,
                        manager_reject_reason: "", // No rejection reason needed for approval
                    });
                    console.log('Application approved:', response.data);
                    alert(response.data.success)
                } catch (error) {
                    console.error('Error approving application:', error);
                    alert(response.data.failed)
                }
            } else {
                try {
                // Send a POST request to approve the application
                const response = await axios.post(`${baseURL}/application/approverejectapplication/${staff_id}`, {
                    application_id: employee.application_id,
                    status: "Approve",
                    staff_id: employee.listofschedule[0].staff_id,
                    manager_reject_reason: "", // No rejection reason needed for approval
                });
                console.log('Application approved:', response.data);
                alert(response.data.success)
            } catch (error) {
                console.error('Error approving application:', error);
                alert(response.data.failed)
            }
            }
            
            window.location.reload(); // Reload the page to refresh data
        }

        // Function to reject an employee's application
        async function RejectTheApplication(employee) {
            console.log('Rejecting application for:', employee); // check what employee object looks like
            
            do { // Prompt user for a rejection reason; loop until valid input is provided
                var reason = prompt('Reason for rejecting? (Reason is required)');
            } while (reason !== null && reason === "") // Continue to prompt until a valid reason is provided

            let application_id_wfh_id = String(employee.application_id)
            if (application_id_wfh_id.includes("-")) {
                let id_part = application_id_wfh_id.split("-");
                let application_id = parseInt(id_part[0],10);
                let wfh_id = parseInt(id_part[1],10);
                try { // Send a POST request to reject the application
                const response = await axios.post(`${baseURL}/application/approverejectapplication/${staff_id}`, {
                    application_id: application_id,
                    wfh_id: wfh_id,
                    status: "Reject", // Set the status to Rejected
                    staff_id: employee.listofschedule[0].staff_id,
                    manager_reject_reason: reason, // Include the rejection reason

                });
                console.log('Application rejected:', response.data.success);
                alert(response.data.success)
            } catch (error) {
                console.error('Error rejecting application:', error);
                alert(response.data.failed)
            }
            }
            else {
                try { // Send a POST request to reject the application
                const response = await axios.post(`${baseURL}/application/approverejectapplication/${staff_id}`, {
                    application_id: employee.application_id,
                    status: "Reject", // Set the status to Rejected
                    staff_id: employee.listofschedule[0].staff_id,
                    manager_reject_reason: reason, // Include the rejection reason

                });
                console.log('Application rejected:', response.data.success);
                alert(response.data.success)
            } catch (error) {
                console.error('Error rejecting application:', error);
                alert(response.data.failed)
            }


            }



            
            window.location.reload(); // Reload the page to refresh data
        }

        // Function to format the date in the format YYYY-MM-DD
        function formatDate(dateStr) {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        return {
            data,
            loading,
            toggleExpand,
            expandedRows,
            ApproveTheApplication,
            RejectTheApplication,
            formatDate,
        };
    },
    
};
</script>

<style scoped>

.loading {
    position: fixed;
    /* Keep it fixed on the screen */
    top: 30%;
    left: 56%;
    /* transform: translate(-50%, -50%); */
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
/* Loader styling */
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    font-size: 1.2em;
    font-weight: bold;
    color: #555;
}
.v-icon {
    vertical-align: middle;
}

.transition-hover {
  transition: all 0.3s ease;
}

.transition-hover:hover {
  opacity: 0.6;
}

</style>
