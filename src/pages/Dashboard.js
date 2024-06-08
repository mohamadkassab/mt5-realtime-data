import DefaultLayout from "../layouts/DefaultLayout";
import { Menu } from "../utils/constants/Constants";

const Dashboard = () => {
  return <DefaultLayout componentName={Menu[0].name}>Dashboard</DefaultLayout>;
};
export default Dashboard;
