import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import EmployeeList from "@/views/EmployeeList.vue";
import Billing from "@/views/Billing.vue";
// import VirtualReality from "@/views/VirtualReality.vue";
import Profile from "@/views/Profile.vue";
// import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import Scheduler from "../views/Scheduler.vue";
import TeamSchedule from "@/views/TeamSchedule.vue";
import ManagerViewTeamSchedule from "@/views/ManagerViewTeamSchedule.vue";
import HRViewTeamSchedule from "@/views/HRViewTeamSchedule.vue";
import HRViewOverallSchedule1 from "@/views/HRViewOverallSchedule1.vue";
import HRViewOverallSchedule2 from "@/views/HRViewOverallSchedule2.vue";
import HRViewOverallSchedule3 from "@/views/HRViewOverallSchedule3.vue";
import HRViewOverallSchedule4 from "@/views/HRViewOverallSchedule4.vue";
import HROverallEmployeeList from "@/views/HROverallEmployeeList.vue";
import WFHrequest from "@/views/WFHrequest.vue"; 

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/sign-in",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/scheduler",
    name: "Scheduler",
    component: Scheduler,
  },
  {
    path: "/teamschedule",
    name: "TeamSchedule",
    component: TeamSchedule,
  },
  {
    path: "/managerviewteamschedule",
    name: "ManagerViewTeamSchedule",
    component: ManagerViewTeamSchedule,
  },
  {
    path: "/hrviewteamschedule",
    name: "HRViewTeamSchedule",
    component: HRViewTeamSchedule,
  },
  {
    path: "/HRViewOverallSchedule1",
    name: "HRViewOverallSchedule1",
    component: HRViewOverallSchedule1,
  },
  {
    path: "/HRViewOverallSchedule2",
    name: "HRViewOverallSchedule2",
    component: HRViewOverallSchedule2,
  },
  {
    path: "/HRViewOverallSchedule3",
    name: "HRViewOverallSchedule3",
    component: HRViewOverallSchedule3,
  },
  {
    path: "/HRViewOverallSchedule4",
    name: "HRViewOverallSchedule4",
    component: HRViewOverallSchedule4,
  },
  {
    path: "/HROverallEmployeeList",
    name: "HROverallEmployeeList",
    component: HROverallEmployeeList,
  },
  {
    path: "/employeelist",
    name: "EmployeeList",
    component: EmployeeList,
  },
  {
    path: "/wfhrequest",
    name: "WFHrequest",
    component: WFHrequest,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  // {
  //   path: "/virtual-reality",
  //   name: "Virtual Reality",
  //   component: VirtualReality,
  // },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  // {
  //   path: "/rtl-page",
  //   name: "Rtl",
  //   component: Rtl,
  // },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
