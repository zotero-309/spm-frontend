<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>My Team Members</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Employee</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Department/Position</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee.id">
              <td>
                <div class="d-flex px-3 py-1">
                  <!-- <div>
                    <vsud-avatar :img="employee.image" size="sm" border-radius="lg" class="me-3" :alt="employee.name" />
                  </div> -->
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ employee.name }}</h6>
                    <p class="text-xs text-secondary mb-0">{{ employee.email }}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ employee.dept }}</p>
                <p class="text-xs text-secondary mb-0">{{ employee.position }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <vsud-badge :color="employee.status === 'In-Office' ? 'success' : 'secondary'" variant="gradient" size="sm">
                  {{ employee.status }}
                </vsud-badge>
              </td>
              <td class="align-middle">
                <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                >Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import VsudAvatar from "@/components/VsudAvatar.vue";
import VsudBadge from "@/components/VsudBadge.vue";
// import img1 from "../../assets/img/team-2.jpg"; // Image for Derek
// import img2 from "../../assets/img/team-3.jpg"; // Image for Eric
// import img3 from "../../assets/img/team-4.jpg"; // Image for Philip

export default {
  name: "EmployeesTable",
  components: {
    VsudAvatar,
    VsudBadge,
  },
  data() {
    return {
      employees: [
        {
          id: 140001,
          name: "Derek Tan",
          dept: "Sales",
          position: "Director",
          email: "Derek.Tan@allinone.com.sg",
          status: "WFH",
          // image: img1,
        },
        {
          id: 150008,
          name: "Eric Loh",
          dept: "Solutioning",
          position: "Director",
          email: "Eric.Loh@allinone.com.sg",
          status: "In-Office",
          // image: img2,
        },
        {
          id: 151408,
          name: "Philip Lee",
          dept: "Engineering",
          position: "Director",
          email: "Philip.Lee@allinone.com.sg",
          status: "WFH",
          // image: img3,
        },
      ],
    };
  },
};
</script>
