import React, { useState, useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Stack, Box, Typography, Avatar } from "@mui/material";
function ProfileInformation() {
	const [name, setName] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [address, setAddress] = useState("");
	const [profileLoaded, setProfileLoaded] = useState(false);
	useEffect(() => {
		async function getProfile(type, token) {
			const inputs = { type: type };
			const response = await fetch(
				"http://localhost:5000/dashboard/getProfile",
				{
					method: "POST",
					headers: {
						jwt_token: token,
						"Content-type": "application/json",
					},
					body: JSON.stringify(inputs),
				}
			);
			const res = await response.json();
			setName(res["name"]);
			setCompanyName(res["companyName"]);
			setAddress(res["address"]);
		}
		if (!profileLoaded) {
			const type = localStorage.getItem("type");
			const token = localStorage.getItem("token");
			getProfile(type, token);
			setProfileLoaded(true);
		}
	}, [profileLoaded]);
	return (
		<Stack direction={"column"} sx={{ marginLeft: 2 }}>
			{/* <Box
				sx={{
					width: 250,
					marginTop: 3,
					paddingLeft: 5,
					height: 80,
					backgroundColor: "#555555",
					borderRadius: 4,
				}}>
				<Typography
					sx={{
						marginLeft: 1,
						marginTop: 3,
						color: "white",
						fontWeight: "bold",
						fontSize: 25,
					}}>
					MY PROFILE
				</Typography>
			</Box> */}
			<Box
				sx={{
					width: 270,
					paddingLeft: 3,
					height: 240,
					backgroundColor: "#2F2F43",
					borderRadius: 5,
				}}>
				<Stack direction={"row"}>
					<Avatar
						sx={{
							backgroundColor: "#555555",
							width: 100,
							height: 100,
							fontSize: 60,
							fontWeight: "bold",
							marginTop: 8,
						}}>
						{name ? name[0] : "U"}
					</Avatar>
					<Stack direction={"column"}>
						<Typography
							sx={{
								color: "white",
								fontSize: 25,
								fontWeight: "bold",
								marginLeft: 4,
								marginTop: 8,
							}}>
							{name}
						</Typography>
						<Typography
							sx={{
								color: "white",
								fontSize: 20,
								fontWeight: "bold",
								marginLeft: 4,
								marginTop: 0.4,
							}}>
							{companyName}
						</Typography>
						<Stack direction={"row"}>
							<LocationOnIcon
								sx={{
									color: "white",
									marginLeft: 3,
									marginTop: 0.4,
								}}
							/>
							<Typography
								sx={{
									color: "white",
									fontSize: 18,
									fontWeight: "bold",

									marginTop: 0.4,
								}}>
								{address}
							</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Box>
		</Stack>
	);
}
export default ProfileInformation;
