import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { useNavigate } from 'react-router-dom';



const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
  
    setLoading(true);
  
    try {
      const dataResponse = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const dataApi = await dataResponse.json();
      setLoading(false);
  
      navigate('/ResetPassword'); // Redirect to the verification page
      if (dataApi.success) {
        toast.success('A verification code has been sent to your email');
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong. Please try again.');
    }
  };
  return (
    <section id="forgot-password">
      <div className="mx-auto container p-4 flex items-center h-screen rounded-md">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded-2xl">
          <h2 className="text-2xl text-center">Forgot Password</h2>
          <p className="text-center text-sm mb-4">Enter your email to reset your password</p>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <button
              className="bg-black text-white px-6 py-2 w-full  rounded-full hover:scale-110 transition-all mx-auto block mt-6"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
