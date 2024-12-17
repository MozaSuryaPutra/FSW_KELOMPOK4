import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import BgTiketkuImage from "../../../public/BG-Tiketku.png";
import { resetPassword } from "../../services/auth/auth";

export const Route = createLazyFileRoute('/auth/forget-pass')({
  component: ResetPassword,
})

function ResetPassword() {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Mutation for password reset
  const { mutate: savePassword, isPending } = useMutation({
    mutationFn: (data) => resetPassword(data),
    onSuccess: () => {
      toast.success('Password reset successful. Redirecting to login page...', {
        autoClose: 4000,
      });
      setTimeout(() => navigate({ to: '/login' }), 4000);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || 'An unexpected error occurred.',
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.warn('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.warn('Passwords do not match.');
      return;
    }
    const data = { token, newPassword };
    savePassword(data);
  };

  return (
  <section style={{ height: "100vh", backgroundColor: "white" }}>
    <Row className="h-100 mx-auto gap-0">
      <Col
        lg={6}
        md={12}
        className="d-none d-lg-block p-0"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <img
          src={BgTiketkuImage}
          alt="Logo"
          style={{ height: "100vh", width: "100%", objectFit: "cover" }}
        />
      </Col>
      <Col
          lg={6}
          md={12}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Form
              style={{
                width: '100%',
                maxWidth: '452px',
                padding: '20px',
              }}
              className="bg-white bg-opacity-75 border-1 rounded-xl p-5 shadow-sm"
              onSubmit={handleSubmit}
            >
              <ToastContainer position="bottom-center" />

              <h1
                className="mb-4"
                style={{ fontSize: '2rem', fontWeight: 'bold' }}
              >
                Reset Password
              </h1>

              <Form.Group controlId="newPassword" className="mb-3">
                <Form.Label>New Password</Form.Label>
                <div style={{ position: 'relative' }}>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      cursor: 'pointer',
                    }}
                    onClick={togglePassword}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <div style={{ position: 'relative' }}>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      cursor: 'pointer',
                    }}
                    onClick={togglePassword}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </Form.Group>

              <Button
                type="submit"
                className="w-100"
                disabled={isPending}
                style={{ borderRadius: '16px' }}
              >
                {isPending ? 'Resetting...' : 'Reset Password'}
              </Button>

              <div className="text-center mt-3">
                <span>
                  Remembered your password?{' '}
                  <Link
                    to={`/login`}
                    style={{
                      color: '#7126B5',
                      fontWeight: 'bold',
                    }}
                  >
                    Log in now
                  </Link>
                </span>
              </div>
            </Form>
        </Col>
      </Row>
    </section>
  );
}

export default ResetPassword;