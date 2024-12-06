import React, { useEffect } from "react";
import AdminSidebar from "../../components/sidebars/adminSidebar";
import "../background.css";
import {
    Stack,
    Typography,
    FormControl,
    OutlinedInput,
    InputAdornment,
    IconButton,
    InputLabel,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
    Slide,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function RevokeAccessPage() {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [retailers, setRetailers] = React.useState([]);
    const [dataOpen, setDataOpen] = React.useState(false);

    // Fetch retailer data from the backend
    async function getRetailers() {
        const token = localStorage.getItem("token");
        try {
            const inputs = { name: searchQuery };
            const response = await fetch(
                "http://localhost:5000/access/getListOfRetailers",
                {
                    method: "POST",
                    headers: {
                        jwt_token: token,
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(inputs),
                }
            );
            const parseRes = await response.json();
            const tempRows = parseRes.map((pr) => ({
                id: pr.r_id,
                Retailer_Name: pr.r_name,
                Mobile_Number: pr.r_mobile_num,
            }));
            setRetailers(tempRows);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getRetailers();
    }, [searchQuery]);

    const columns = [
        { field: "id", headerName: "Retailer_ID", width: 300 },
        { field: "Retailer_Name", headerName: "Retailer Name", width: 300 },
        { field: "Mobile_Number", headerName: "Mobile Number", width: 300 },
    ];

    const handleDataOpen = () => {
        setDataOpen(true);
    };

    const handleDataClose = () => {
        setDataOpen(false);
    };

    // Handle deletion request
    async function handleDeletion() {
        const token = localStorage.getItem("token");
        const r_id = localStorage.getItem("id");

        if (!r_id) {
            console.error("No retailer ID found in local storage.");
            return;
        }

        try {
            const inputs = { r_id };
            console.log("Sending request to delete retailer:", inputs);

            const response = await fetch(
                "http://localhost:5000/access/handleRetailerDeletion",
                {
                    method: "POST",
                    headers: {
                        jwt_token: token,
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(inputs),
                }
            );

            const parseRes = await response.json();
            console.log("Response from backend:", parseRes);

            if (response.ok) {
                console.log("Retailer successfully deleted.");
                handleDataClose();
                localStorage.removeItem("id");
                getRetailers();
            } else {
                console.error("Failed to delete retailer:", parseRes);
            }
        } catch (err) {
            console.error("Error during deletion:", err);
        }
    }

    return (
        <div className="co">
            <Stack direction={"row"}>
                <AdminSidebar />
                <Stack direction={"column"} sx={{ marginLeft: 5, marginTop: 4, height: 720 }}>
                    <Typography sx={{ fontSize: 40, marginLeft: 70, marginBottom: 1, color: "white" }}>
                        RETAILER ACCESSES
                    </Typography>
                    <FormControl variant="standard">
                        <Stack direction={"column"}>
                            <OutlinedInput
                                onChange={(e) => setSearchQuery(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton sx={{ color: "white", mr: 1, fontSize: "50px" }}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                sx={{
                                    backgroundColor: "#3D2A47",
                                    width: 550,
                                    borderRadius: 4,
                                    fontSize: 25,
                                    height: 60,
                                    color: "white",
                                }}
                            />
                            <InputLabel sx={{ color: "white", marginLeft: 2, marginTop: -1 }}>
                                <Typography sx={{ fontSize: 25, fontWeight: "bold" }}>Search</Typography>
                            </InputLabel>
                        </Stack>
                    </FormControl>
                    <DataGrid
                        sx={{
                            marginTop: 2,
                            fontSize: 20,
                            width: 1200,
                            color: "white",
                            "& .MuiDataGrid-cell": {
                                color: "white",
                                backgroundColor: "#29292b",
                            },
                        }}
                        onRowDoubleClick={(e) => {
                            handleDataOpen();
                            localStorage.setItem("id", e.row.id);
                        }}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        rows={retailers}
                    />
                    <Dialog open={dataOpen} TransitionComponent={Transition} onClose={handleDataClose} maxWidth="sm" fullWidth>
                        <DialogTitle>{"REVOKE ACCESS"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Are you sure you want to revoke access for this retailer?</DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{ display: "flex", justifyContent: "space-around" }}>
                            <Button onClick={handleDataClose} variant="outlined" color="primary">
                                Close
                            </Button>
                            <Button onClick={handleDeletion} variant="contained" color="error">
                                REVOKE
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Stack>
            </Stack>
        </div>
    );
}

export default RevokeAccessPage;
