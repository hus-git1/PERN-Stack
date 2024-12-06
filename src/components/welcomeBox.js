import React, { useState, useEffect } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Stack, Box, Typography } from "@mui/material";
function WelcomeBox() {
	const [name, setName] = useState("");
	const [nameLoaded, setNameLoaded] = useState(false);
	useEffect(() => {
		async function getName(type, token) {
			const inputs = { type: type };
			const response = await fetch(
				"http://localhost:5000/dashboard/getname",
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
			setName(res);
		}
		if (!nameLoaded) {
			const type = localStorage.getItem("type");
			const token = localStorage.getItem("token");
			getName(type, token);
			setNameLoaded(true);
		}
	}, [nameLoaded]);
	return (
		<Box
			sx={{
				width: 800,
				marginTop: 3,
				paddingLeft: 5,
				height: 200,
				backgroundColor: "#BEBEBE",
				borderRadius: 4,
			}}>
			<Stack direction={"column"}>
				<Box
					sx={{
						width: 200,
						marginTop: 2,
						height: 40,
						backgroundColor: "#000000",
						borderRadius: 4,
					}}>
					<Stack direction={"row"}>
						<CalendarMonthIcon
							sx={{
								marginLeft: 2,
								fontSize: 30,
								marginTop: 0.5,
								color : "white"
							}}
						/>
						<Typography
							sx={{
								marginLeft: 1,
								fontSize: 20,
								marginTop: 0.8,
								color: "white",
							}}>
							Dec 6, 2024
						</Typography>
					</Stack>
				</Box>
				<Typography
					sx={{
						marginLeft: 1,
						fontSize: 36,
						marginTop: 3,
						color: "black",
					}}>
					Hey there, {name}!
				</Typography>
				<Typography
					sx={{
						marginLeft: 1,
						fontSize: 24,
						marginTop: 1,
						color: "black",
					}}>
					Have a nice Friday!
				</Typography>
			</Stack>
		</Box>
	);
}
export default WelcomeBox;
