import PropTypes from 'prop-types';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { ContextProvider } from "../../Context/Context";
import Loading from '../Loading';
import { SERVER_URL } from '../../App';
const Account = ({ onClose }) => {

	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [stage, setStage] = useState("email");
	const [error, setError] = useState("");
	const { setIsAuth, setToken } = useContext(ContextProvider);
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();
		if (stage === "email") {
			setIsLoading(true);
			try {
				await axios.post(`${SERVER_URL}/auth`, { email });
				setStage("otp");
				setError("");
				setIsLoading(false);
			} catch (error) {
				setError("Error sending OTP. Please try again.");
				console.log(error);
			}
		} else if (stage === "otp") {
			try {
				const response = await axios.post(`${SERVER_URL}/otp`, { email, otp });
				if (response.data.success) {
					localStorage.setItem("token", response.data.token);
					setIsAuth(true);
					setToken(response.data.token);
					onClose();
					console.log(response.data)
				} else {
					setError(response.data.message);
				}
			} catch (error) {
				setError("Error verifying OTP. Please try again.");
				console.log(error);
			}
		}
	}

	useEffect(() => {
		handleLogin()
	}, [])


	return (
		<div className="bg-black p-12 w-[500px] h-auto shadow-lg">
			<button className="float-right" onClick={onClose}>
				<IoCloseOutline className="w-6 h-6" />
			</button>
			<div className="mt-7 border border-gray-800 rounded-md flex items-center justify-center">
				<p className="basis-1/2 text-right">Login</p>
				<p className="border border-gray-200 rounded-md p-1 m-2">OR</p>
				<p className="basis-1/2">Create Account</p>
			</div>
			{
				stage === "email" ? <p className="m-4 text-center text-sm">Please enter your Email ID or Phone number</p> : <p className="m-4 text-center text-sm">Please Verify OTP</p>
			}
			<form className="text-center" onSubmit={handleLogin}>
				{stage === "email" ? (
					<>
						<input
							type="email"
							placeholder="Enter your Email ID"
							className="border border-gray-800 bg-black w-full h-14 text-center rounded-md"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<label className="text-red-600 text-xs">enter correct email, OTP will be send</label>
						<div className="flex items-center gap-2 text-xs justify-center m-4">
							<input type="checkbox" className="w-6 h-6" /> Keep me signed in
						</div>
						<p className="text-xs m-4">By continuing you agree to our <span className='text-teal-600 cursor-pointer'>Terms of Use</span>  & <span className='text-teal-600 cursor-pointer'>Privacy Policy</span> </p>
						<button type="submit" className="bg-teal-500 w-full h-14 rounded-md">{isLoading ? <><Loading text={"Sending OTP"} /></> : "Continue"}</button>
					</>
				) : (
					<>
						<input
							type="text"
							placeholder="Enter OTP"
							className="border border-gray-800 bg-black w-full h-14 text-center rounded-md"
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
						/>
						<button type="submit" className="bg-teal-500 w-full h-14 rounded-md mt-4">Verify OTP</button>
					</>
				)}
				{error && <p className="text-red-500 text-xs mt-2">{error}</p>}
			</form>
		</div>
	);
};

Account.propTypes = {
	onClose: PropTypes.func.isRequired,
};
export default Account;
