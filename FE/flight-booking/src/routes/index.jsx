import { useRoutes } from "react-router-dom";
import webRoutes from "./WebRoutes";

const AppRoutes = () => {
  return useRoutes([...webRoutes]);
};

export default AppRoutes;