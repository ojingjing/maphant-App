import HomeRoute from "./HomeRoute";
import BoardRoute from "./BoardRoute";
import SignupRoutes from "./SigninRoutes";
import SigninRoutes from "./SigninRoutes";
// ... import all other pages

const Routes = [
  ...HomeRoute,
  ...BoardRoute,
  ...SigninRoutes,
  ...SignupRoutes,
  // {
  //   name: "login",
  //   component: Login,
  // },
  // {
  //   name: "alarm",
  //   component: Alarm,
  // },
];

export default Routes;
