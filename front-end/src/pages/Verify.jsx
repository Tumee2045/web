import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { backendUrl, token } = useContext(ShopContext);
  const [status, setStatus] = useState('Verifying your payment…');

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const sessionId = q.get('session_id');      // provided by Stripe success_url
    const canceled = q.get('canceled');         // optional: from cancel_url logic

    const run = async () => {
      if (canceled === 'true') {
        toast.error('Payment was cancelled.');
        setStatus('Payment cancelled. Redirecting…');
        setTimeout(() => navigate('/cart'), 2200);
        return;
      }

      if (!sessionId) {
        toast.error('Missing session information.');
        setStatus('Missing session. Redirecting…');
        setTimeout(() => navigate('/cart'), 2000);
        return;
      }
      if (!token) {
        toast.info('Please log in to view your order.');
        setTimeout(() => navigate('/login'), 1500);
        return;
      }

      try {
        const res = await axios.post(
          `${backendUrl}/api/order/verify-session`,
          { sessionId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data?.success) {
          toast.success('Payment confirmed!');
          setStatus('Payment confirmed. Redirecting to your orders…');
        } else {
          toast.error(res.data?.message || 'Verification failed.');
          setStatus('Verification failed. Redirecting…');
        }
      } catch (err) {
        toast.error('Something went wrong verifying payment.');
        setStatus('Error verifying payment. Redirecting…');
      } finally {
        setTimeout(() => navigate('/orders'), 2500);
      }
    };

    run();
  }, [location.search, backendUrl, token, navigate]);

  return (
    <div className="text-white text-center pt-20">
      <h2>{status}</h2>
    </div>
  );
};

export default Verify;
