
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/routers";


const App = () => (
  <div>
    
    <div className="min-h-screen bg-gray-50">
      <RouterProvider router={router} />
    </div>
  </div>
);

export default App;
