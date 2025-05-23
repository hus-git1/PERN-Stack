import React, { useEffect } from "react";
import RetailerSidebar from "../../components/sidebars/retailerSidebar";
import "../background.css";
import {
	Stack,
	Typography,
	FormControl,
	OutlinedInput,
	InputAdornment,
	IconButton,
	InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
function HistoryPage() {
	const [history, setHistory] = React.useState([]);
	const [searchQuery, setSearchQuery] = React.useState("");
	async function getHistory() {
		const token = localStorage.getItem("token");
		try {
			const inputs = { name: searchQuery };
			const response = await fetch(
				"http://localhost:5000/dashboard/getHistory",
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
			console.log(parseRes);
	
			const tempRows = parseRes.map((pr, index) => ({
				id: pr.history_id || `${index+3}`, // Use history_id or generate a fallback unique id
				ID: pr.inbound_id ? pr.inbound_id : pr.outbound_id,
				Transaction_Status: "Approved",
				Timestamp: pr.entry_time || "N/A", // Handle null timestamps
				Product_Name: pr.product_name || "Unknown",
				Product_Count: pr.product_count || 0,
			}));
	
			setHistory(tempRows);
		} catch (err) {
			console.error(err);
		}
	}
	
	useEffect(() => {
		getHistory();
	}, [searchQuery]);
	const columns = [
		{ field: "id", headerName: "Transaction_ID", width: 200 },
		{
			field: "ID",
			headerName: "ID",
			width: 300,
		},
		{
			field: "Product_Name",
			headerName: "Product_Name",
			width: 300,
		},
		{
			field: "Product_Count",
			headerName: "Product_Count",
			width: 300,
		},
		{
			field: "Transaction_Status",
			headerName: "Transaction_Status",
			width: 300,
		},
		{ field: "Timestamp", headerName: "Timestamp", width: 300 },
	];
	return (
		<div className="co">
			<Stack direction={"row"}>
				<RetailerSidebar />
				<Stack
					direction={"column"}
					sx={{ marginLeft: 5, marginTop: 4, height: 720 }}>
					<Typography
						sx={{
							fontSize: 40,
							marginLeft: 70,
							marginBottom: 1,
							color: "white",
						}}>
						HISTORY
					</Typography>
					<FormControl variant="standard">
						<Stack direction={"column"}>
							<OutlinedInput
								onChange={(e) => {
									setSearchQuery(e.target.value);
								}}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											sx={{
												color: "white",
												mr: 1,
												my: 0.5,
												fontSize: "50px",
											}}>
											<SearchIcon />
										</IconButton>
									</InputAdornment>
								}
								inputProps={{
									disableunderline: "true",
								}}
								sx={{
									backgroundColor: "#3D2A47",
									width: 550,
									borderRadius: 4,
									fontSize: 25,
									height: 60,
									color: "white",
								}}
							/>
							<InputLabel
								style={{ fontSize: 20, marginTop: -10 }}
								sx={{
									color: "white",
									marginLeft: 2,
								}}>
								<Typography
									sx={{ fontSize: 25, fontWeight: "bold" }}>
									Search
								</Typography>
							</InputLabel>
						</Stack>
					</FormControl>
					<DataGrid
						sx={{
							marginTop: 2,
							fontSize: 20,
							width: 1200,
							"& .MuiDataGrid-cell": {
								color: "white",
								backgroundColor: "#29292b",
							},
							color: "white",
						}}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[5]}
						rows={history}
					/>
				</Stack>
			</Stack>
		</div>
	);
}
export default HistoryPage;
