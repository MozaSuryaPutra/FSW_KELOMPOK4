import { useState, useEffect } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../services/auth/auth";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { setUser } from "../../redux/slices/auth";
import BgTiketkuImage from "/BG-Tiketku.png?url";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../styles/global.css";
export const Route = createLazyFileRoute("/auth/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  // Register Form Data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State untuk melacak proses

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);

  const { mutate: registerUser } = useMutation({
    mutationFn: (body) => {
      return register(body);
    },
    onSuccess: (result) => {
      dispatch(setUser(result?.user));
      navigate({ to: "/auth/otp" });
      setIsSubmitting(false); // Set ulang state setelah selesai
    },
    onError: (error) => {
      if (Array.isArray(error?.details)) {
        error.details.forEach((message) => toast.error(message));
      } else {
        const errorMessage = error?.message || "An unexpected error occurred.";
        toast.error(`Register Error: ${errorMessage}`);
      }
      setIsSubmitting(false); // Set ulang state meskipun gagal
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    if (isSubmitting) return; // Cegah klik berulang
    setIsSubmitting(true); // Atur state menjadi true
    const body = {
      name,
      email,
      numberPhone: phoneNumber,
      password,
    };
    registerUser(body);
  };

  return (
    <Container fluid className="h-100" style={{ backgroundColor: "#F8F8F8" }}>
      <Row className="g-0 h-100">
        <Col xs={12} md={6} className="p-0">
          <img
            src={BgTiketkuImage}
            alt="Background"
            className="img-fluid w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <Card
            className="p-4 w-100"
            style={{ maxWidth: "400px", border: "none" }}
          >
            <h3 className="text-center mb-4" style={{ fontWeight: "700" }}>
              Daftar
            </h3>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama Lengkap"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  style={{ borderRadius: "12px" }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Contoh: johndoe@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ borderRadius: "12px" }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ borderRadius: "12px" }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Buat Password</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Buat Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ borderRadius: "12px" }}
                  />
                  <Button
                    variant="link"
                    onClick={togglePassword}
                    style={{ textDecoration: "none" }}
                  >
                    {showPassword ? (
                      <FaEyeSlash
                        style={{
                          color: "#7126B5",
                        }}
                      />
                    ) : (
                      <FaEye
                        style={{
                          color: "#7126B5",
                        }}
                      />
                    )}
                  </Button>
                </div>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={isSubmitting} // Disable tombol saat proses
                style={{
                  borderRadius: "12px",
                  backgroundColor: isSubmitting ? "#CCC" : "#6C63FF",
                  border: "none",
                }}
              >
                {isSubmitting ? "Processing..." : "Daftar"}
              </Button>
            </Form>
            <p className="text-center mt-4">
              Sudah punya akun?{" "}
              <Link href="/auth/login" style={{ color: "#6C63FF", fontWeight: "500" }}>
                Masuk di sini
              </Link>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
