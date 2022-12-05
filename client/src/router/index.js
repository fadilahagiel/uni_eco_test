import { createBrowserRouter } from "react-router-dom";
import EditForm from "../pages/editForm";
import HomePage from "../pages/homePages";

const router = createBrowserRouter([
    {
        path: `/`,
        element: <HomePage/>
    },
    {
        path: `/form/:_id`,
        element: <EditForm/>
    }
])

export default router