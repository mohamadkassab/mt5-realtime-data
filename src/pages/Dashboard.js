import DefaultLayout from "../layouts/DefaultLayout";
import { MainMenu } from "../utils/constants/Constants";

const Dashboard = () => {
  return <DefaultLayout componentName={MainMenu[0].name}>Dashboard</DefaultLayout>;
};
export default Dashboard;
