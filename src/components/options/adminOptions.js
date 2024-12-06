import React from "react";
import { Link } from "react-router-dom";
import { Stack, Typography, Button } from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import GroupsIcon from "@mui/icons-material/Groups";
function AdminOptions() {
	return (
		<>
			<Stack direction={"row"} sx={{ marginTop: 3 }}>
				<Link
					to="/dashboard/admin/approval"
					style={{ textDecoration: "none" }}>
					<Button
						sx={{
							backgroundColor: "#3D2A47",
							borderRadius: 4,
							height: 200,
							width: 400,
						}}>
						<Stack
							direction={"row"}
							sx={{ marginLeft: 1, textAlign: "left" }}>
							<Stack direction={"column"} sx={{ marginTop: 4 }}>
								<Typography
									sx={{
										fontSize: 30,
										fontWeight: "bold",
										color: "white",
									}}>
									Pending
								</Typography>
								<Typography
									sx={{
										fontSize: 30,
										fontWeight: "bold",
										color: "white",
									}}>
									Approvals
								</Typography>
							</Stack>
							<AccessTimeFilledIcon
								sx={{
									color: "#E1E8EB",
									fontSize: 160,
									marginLeft: 4,
								}}
							/>
						</Stack>
					</Button>
				</Link>
				<Link
					to="/dashboard/admin/userAccesses"
					style={{ textDecoration: "none" }}>
					<Button
						sx={{
							marginLeft: 5,
							backgroundColor: "#3D2A47",
							borderRadius: 4,
							height: 200,
							width: 400,
						}}>
						<Stack
							direction={"row"}
							sx={{ marginLeft: 1, textAlign: "left" }}>
							<Stack direction={"column"} sx={{ marginTop: 4 }}>
								<Typography
									sx={{
										fontSize: 30,
										fontWeight: "bold",
										color: "white",
									}}>
									Stock
								</Typography>
								<Typography
									sx={{
										fontSize: 30,
										fontWeight: "bold",
										color: "white",
									}}>
									History
								</Typography>
							</Stack>
							<CloudUploadIcon
								sx={{
									color: "#E1E8EB",
									fontSize: 160,
									marginLeft: 4,
								}}
							/>
						</Stack>
					</Button>
				</Link>
			</Stack>
			<Stack direction={"row"} sx={{ marginTop: 3 }}>
				<Link
					to="/dashboard/admin/revokeAccesses"
					style={{ textDecoration: "none" }}>
					<Button
						sx={{
							backgroundColor: "#3D2A47",
							borderRadius: 4,
							height: 200,
							width: 400,
						}}>
						<Stack
							direction={"row"}
							sx={{ marginLeft: 1, textAlign: "left" }}>
							<Stack
								direction={"column"}
								sx={{ marginTop: 4, marginRight: 2 }}>
								<Typography
									sx={{
										fontSize: 30,
										fontWeight: "bold",
										color: "white",
									}}>
									Revoke
								</Typography>
								<Typography
									sx={{
										fontSize: 30,
										fontWeight: "bold",
										color: "white",
									}}>
									Access
								</Typography>
							</Stack>
							<DeleteSweepIcon
								sx={{
									color: "#E1E8EB",
									fontSize: 160,
									marginLeft: 10,
								}}
							/>
						</Stack>
					</Button>
				</Link>
				<Link
					to="/dashboard/admin/viewClients"
					style={{ textDecoration: "none" }}>
					<Button
						sx={{
							marginLeft: 5,
							backgroundColor: "#3D2A47",
							borderRadius: 4,
							height: 200,
							width: 400,
						}}>
						<Stack
							direction={"row"}
							sx={{ marginLeft: 1, textAlign: "left" }}>
							<Stack direction={"column"} sx={{ marginTop: 4 }}>
								<Typography
									sx={{
										fontSize: 30,
										fontWeight: "bold",
										color: "white",
									}}>
									View
								</Typography>
								<Typography
									sx={{
										fontSize: 30,
										fontWeight: "bold",
										color: "white",
									}}>
									Clients
								</Typography>
							</Stack>
							<GroupsIcon
								sx={{
									color: "#E1E8EB",
									fontSize: 160,
									marginLeft: 8,
								}}
							/>
						</Stack>
					</Button>
				</Link>
			</Stack>
		</>
	);
}
export default AdminOptions;
