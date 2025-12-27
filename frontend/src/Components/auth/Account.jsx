import PropTypes from "prop-types";
import axios from "axios";
import { useContext, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { ContextProvider } from "../../Context/Context";
import Loading from "../Loading";

const Account = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState("email");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setIsAuth, setToken } = useContext(ContextProvider);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // ===== SEND OTP =====
    if (stage === "email") {
      setIsLoading(true);
      try {
        await axios.post("http://127.0.0.1:8000/api/auth/send-otp/", {
          email,
        });
        setStage("otp");
      } catch (error) {
        setError("Error sending OTP. Please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // ===== VERIFY OTP =====
    if (stage === "otp") {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/auth/verify-otp/",
          { email, otp }
        );

        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          setIsAuth(true);
          onClose(); // close modal after login
        } else {
          setError(response.data.message || "Invalid OTP");
        }
      } catch (error) {
        setError("Error verifying OTP. Please try again.");
        console.error(error);
      }
    }
  };

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

      <p className="m-4 text-center text-sm">
        {stage === "email"
          ? "Please enter your Email ID or Phone number"
          : "Please Verify OTP"}
      </p>

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

            <label className="text-red-600 text-xs">
              Enter correct email, OTP will be sent
            </label>

            <div className="flex items-center gap-2 text-xs justify-center m-4">
              <input type="checkbox" className="w-6 h-6" /> Keep me signed in
            </div>

            <p className="text-xs m-4">
              By continuing you agree to our{" "}
              <span className="text-teal-600 cursor-pointer">
                Terms of Use
              </span>{" "}
              &{" "}
              <span className="text-teal-600 cursor-pointer">
                Privacy Policy
              </span>
            </p>

            <button
              type="submit"
              className="bg-teal-500 w-full h-14 rounded-md"
            >
              {isLoading ? <Loading text="Sending OTP" /> : "Continue"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="border border-gray-800 bg-black w-full h-14 text-center rounded-md"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-teal-500 w-full h-14 rounded-md mt-4"
            >
              Verify OTP
            </button>
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