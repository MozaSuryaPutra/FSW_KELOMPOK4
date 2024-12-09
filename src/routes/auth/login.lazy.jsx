import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { login } from "../../services/auth/auth";

import BgTiketkuImage from "../../../public/BG-Tiketku.png";

//import logo from "../../assets/img/BG-Tiketku.png";
import { useDispatch } from "react-redux";

import { setToken, setUser } from "../../redux/slices/auth";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
export const Route = createLazyFileRoute("/auth/login")({
  component: Login,
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: loginUser } = useMutation({
    mutationFn: (body) => {
      console.log("Login mutation called with body:", body); // Debugging log
      return login(body);
    },
    onSuccess: (data) => {
      console.log("Data on success:", data); // Debugging log
      if (data?.token) {
        console.log("Data on success:", data?.token); // Debugging log
        console.log("Data on success:", data?.user); // Debugging log
        dispatch(setToken(data?.token));
        dispatch(setUser(data?.user));
        navigate({ to: "/" });
      } else {
        console.error("Token or user not found in response");
      }
    },
    onError: (err) => {
      console.error("Login error:", err.message);
      toast.error(err?.message);
    },
  });

  useEffect(() => {
    if (token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const body = {
      email,
      password,
    };
    console.log(body);
    // hit the login API with the data
    loginUser(body);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
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
            onSubmit={onSubmit}
            style={{ width: "100%", maxWidth: "452px", padding: "20px" }}
          >
            <h1
              className="mb-4"
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif",
                textAlign: "left",
                marginBottom: "1rem",
              }}
            >
              Masuk
            </h1>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                style={{ borderRadius: "16px" }}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <Form.Label>Password</Form.Label>
                <a
                  href={`/forget-pass-req`}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "light",
                    color: "#7126B5",
                    textDecoration: "none",
                  }}
                >
                  Forget password
                </a>
              </div>
              <div style={{ position: "relative" }}>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  style={{ paddingRight: "3rem", borderRadius: "16px" }}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
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
              style={{
                backgroundColor: "#7126B5",
                borderColor: "#7126B5",
                borderRadius: "16px",
              }}
            >
              Masuk
            </Button>
            <div className="text-center mt-3">
              <span>
                Don't have an account?{" "}
                <Link to="/auth/register" style={{ color: "#7126B5" }}>
                  Register here
                </Link>
              </span>
            </div>
          </Form>
        </Col>
      </Row>
    </section>
  );
}
