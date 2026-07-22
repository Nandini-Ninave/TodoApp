import { Button } from "@mui/material"
import Sidebar from "../atoms/sidemenu/Sidebar"
import { useState } from "react";
import Dialog from "../atoms/Dialog";

const Dashboard = () => {
    const [open, setOpen] = useState(false);

    return (<div>Dashboard
        <Button variant="outlined" onClick={() => setOpen(true)}>
            Open form dialog
        </Button>
        <Dialog open={open} handleClose={()=>setOpen(false)}></Dialog>
            <Sidebar />
    </div>)
}
export default Dashboard