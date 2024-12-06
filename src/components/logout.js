import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Stack, Typography, Button } from "@mui/material";
function LogoutButton({ setAuth }) {
	return (
		<Button
			onClick={() => {
				localStorage.removeItem("type");
				localStorage.removeItem("token");
				setAuth(false);
			}}
			sx={{
				backgroundColor: "#000000",
				borderRadius: 4,
				marginLeft: 2,
				marginTop: 2,
				width: 290,
				height: 90,
			}}>
			<Stack direction={"row"}>
				<Typography
					sx={{
						color: "white",
						fontSize: 20,
						fontWeight: "bold",
						marginTop: 1,
					}}>
					Log Out
				</Typography>
				<LogoutIcon
					sx={{
						color: "white",
						fontSize: 40,
						marginLeft: 18,
						marginTop: 0.5,
					}}
				/>
			</Stack>
		</Button>
	);
}
export default LogoutButton;
