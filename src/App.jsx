import { RouterProvider } from "react-router";
import { routers } from "./routes";

const App = () => {
  return <RouterProvider router={routers} />;
};

export default App;
