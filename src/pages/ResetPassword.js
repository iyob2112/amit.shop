import React, { useState } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { GrSearch } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigation
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const SendeCode = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const dataResponse = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const dataApi = await dataResponse.json();
      setLoading(false);

      if (dataApi.success) {
        toast.success("A verification code has been sent to your email");
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !verificationCode || !data.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    const dataResponse = await fetch(SummaryApi.resetPassword.url, {
      method: SummaryApi.resetPassword.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        verificationCode,
        newPassword: data.password,
      }),
    });

    const dataApi = await dataResponse.json();

    setLoading(false);

    if (dataApi.success) {
      toast.success("Your password has been reset successfully");
      navigate("/login"); // Redirect to the verification page
    } else {
      toast.error(dataApi.message);
    }
  };

  return (
    <section id="reset-password">
      <div className="mx-auto container p-4 flex items-center h-screen rounded-md">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded-2xl">
          <h2 className="text-2xl text-center">Reset Password</h2>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="grid">
              <label>Email :</label>
              <div className="bg-slate-100 flex items-center w-full justify-between max-w-sm border focus-within:shadow pl-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full outline-none bg-transparent p-2"
                />
                <button
                  className="text-lg whitespace-nowrap h-8 px-4 bg-black flex items-center justify-center text-white rounded-md"
                  onClick={SendeCode}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Code"}
                </button>
              </div>
            </div>

            {/* Verification Code Input */}
            <div className="grid">
              <label>Verification Code :</label>
              <div className="bg-slate-100 ">
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full h-10 outline-none bg-transparent px-2"
                />
              </div>
            </div>

            {/* New Password Input */}
            <div>
              <label>New Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="bg-black text-white whitespace-nowrap px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
