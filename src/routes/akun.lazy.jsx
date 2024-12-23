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
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "../redux/slices/auth";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateProfile, getUserById } from "../services/user";
import { toast } from "react-toastify";
import { createNotification } from "../services/notifications";
export const Route = createLazyFileRoute("/akun")({
  component: AccountSettings,
});

function AccountSettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => {
    const userString = state.auth.user; // Ambil string JSON dari state
    const user = userString ? JSON.parse(userString) : null; // Parse string menjadi objek
    return user?.id; // Kembalikan id jika user ada
  });
  const { token } = useSelector((state) => state.auth); // Ambil token dari Redux

  const [name, setName] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [email, setEmail] = useState("");

  // Redirect jika token tidak tersedia
  useEffect(() => {
    if (!token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);

  // Fetch data user
  const {
    data: userData,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId, // Hanya fetch jika userId ada
  });

  // Set state ketika data berhasil di-load
  useEffect(() => {
    if (isSuccess && userData) {
      setName(userData.user.name || "");
      setNumberPhone(userData.user.numberPhone || "");
      setEmail(userData.user.email || "");
    }
  }, [isSuccess, userData]);

  // Handle Update Profil
  const { mutate: updateProfileData, isPending: isUpdateProcessing } =
    useMutation({
      mutationFn: async (request) => {
        // Panggil fungsi updateProfile (misalnya) untuk update profil pengguna
        const result = await updateProfile(userId, request);
        return result;
      },
      onSuccess: async (result) => {
        // Jika update berhasil, tampilkan toast success
        toast.success(result.message || "Update Berhasil");

        // Kirim notifikasi setelah berhasil update profil
        const notificationRequest = {
          userId: userId, // Misalnya userId dari hasil update
          notifType: "INFO",
          title: "Profile Updated",
          message: "Profil kamu berhasil diperbarui!",
        };

        try {
          // Tunggu hingga notifikasi berhasil terkirim
          const notificationResult =
            await createNotification(notificationRequest);
          toast.success(
            notificationResult.message || "Notifikasi berhasil dikirim"
          );
        } catch (notificationError) {
          toast.error("Gagal mengirim notifikasi");
        }
      },
      onError: (error) => {
        toast.error("Terjadi kesalahan saat memperbarui profil");
      },
    });

  const handleLogout = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    localStorage.removeItem("flightSearch");
    navigate({ to: "/" });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const request = {
      name,
      numberPhone,
      email,
    };
    updateProfileData(request);
  };

  return (
    <Container className="mt-4">
      {/* Loading State */}
      {isLoading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
            color: "#555",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4697/4697990.png"
            alt="Loading"
            style={{
              width: "100px",
              marginBottom: "15px",
              animation: "spin 2s linear infinite",
            }}
          />
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            Sebentar ya, Tunggu Sebentar
          </p>
          <p style={{ fontSize: "14px", color: "#888" }}>
            Pastikan Kamu Menjalani Hari Dengan Semangat
          </p>
          <style>
            {`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}
          </style>
        </div>
      )}

      {isError && (
        <div style={{ color: "red" }}>
          Error: {error.message || "Gagal memuat data"}
        </div>
      )}

      {!isLoading && !isError && (
        <>
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
                onClick={() => navigate({ to: "/" })}
              >
                <FaArrowLeft className="me-2" />
                Beranda
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
                    <FaSignOutAlt
                      className="me-2"
                      style={{ color: "#9b59b6" }}
                    />
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
                  <Form onSubmit={onSubmit}>
                    <h6
                      className="fw-bold text-white px-3 py-1 rounded"
                      style={{ backgroundColor: "#9b59b6" }}
                    >
                      Data Diri
                    </h6>
                    <Form.Group className="mb-3" controlId="formFullName">
                      <Form.Label>Nama Lengkap</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="masukkan nama"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                      <Form.Label>Nomor Telepon</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="masukan no telp"
                        required
                        value={numberPhone}
                        onChange={(e) => setNumberPhone(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Masukkan email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      disabled={isUpdateProcessing}
                      style={{
                        backgroundColor: "#6a1b9a",
                        border: "none",
                        padding: "10px 30px",
                        borderRadius: "8px",
                      }}
                    >
                      {isUpdateProcessing ? "Menyimpan..." : "Simpan"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default AccountSettings;
