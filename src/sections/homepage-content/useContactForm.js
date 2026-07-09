import { useState } from 'react';

export function useContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
  const [status, setStatus] = useState({ submitting: false, submitted: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send message');
      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({ name: '', email: '', message: '', website: '' });
      setTimeout(() => setStatus({ submitting: false, submitted: false, error: null }), 5000);
    } catch (error) {
      setStatus({ submitting: false, submitted: false, error: error.message || 'Failed to send message. Please try again.' });
    }
  };

  return { formData, status, handleChange, handleSubmit };
}
