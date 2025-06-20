import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import Albums from "../pages/Albums";
import Blogs from "../pages/Blogs";
import BlogDetail from "../pages/BlogDetail";
import Layout from "../components/Navigation";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Index /> },
      { path: "albums", element: <Albums /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/:id", element: <BlogDetail /> },
    ],
  },
]);
