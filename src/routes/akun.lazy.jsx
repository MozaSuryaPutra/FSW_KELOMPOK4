import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import { FaPen, FaSignOutAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser, setToken } from "../redux/slices/auth";
import { useEffect } from "react";
export const Route = createLazyFileRoute("/akun")({
  component: AccountSettings,
});

function AccountSettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth); // Ambil token dari Redux

  useEffect(() => {
    if (!token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate({ to: "/" });
  };
  return (
    <Container className="mt-4">
      {/* Header */}
      <Row className="align-items-center mb-3">
        <Col xs={12}>
          <h5 style={{ fontWeight: "bold" }}>Akun</h5>
        </Col>
      </Row>
      <Row className="align-items-center mb-4">
        <Col xs="12" className="text-start">
          <Button
            style={{
              backgroundColor: "#9b59b6",
              color: "#fff",
              borderRadius: "10px",
              border: "none",
              width: "100%",
              textAlign: "left",
            }}
          >
            <div className="text-left">
              <FaArrowLeft
                onClick={() => navigate({ to: "/" })}
                className="me-2"
              />
              Beranda
            </div>
          </Button>
        </Col>
      </Row>

      <Row>
        {/* Sidebar */}
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <ListGroup variant="flush">
              <ListGroup.Item action>
                <FaPen className="me-2" style={{ color: "#9b59b6" }} />
                Ubah Profile
              </ListGroup.Item>
              <ListGroup.Item onClick={handleLogout} action>
                <FaSignOutAlt className="me-2" style={{ color: "#9b59b6" }} />
                Keluar
              </ListGroup.Item>
            </ListGroup>
            <Card.Footer className="text-center text-muted">
              Version 1.1.0
            </Card.Footer>
          </Card>
        </Col>

        {/* Main Content */}
        <Col md={9}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h4 className="fw-bold">Ubah Data Profil</h4>
              <hr />
              <Form>
                <h6
                  className="fw-bold text-white px-3 py-1 rounded"
                  style={{ backgroundColor: "#9b59b6" }}
                >
                  Data Diri
                </h6>
                <Form.Group className="mb-3" controlId="formFullName">
                  <Form.Label>Nama Lengkap</Form.Label>
                  <Form.Control type="text" defaultValue="Harry" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhoneNumber">
                  <Form.Label>Nomor Telepon</Form.Label>
                  <Form.Control type="text" defaultValue="+62 897823232" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" defaultValue="Johndoe@gmail.com" />
                </Form.Group>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#6a1b9a",
                    border: "none",
                    padding: "10px 30px",
                    borderRadius: "8px",
                  }}
                >
                  Simpan
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AccountSettings;
