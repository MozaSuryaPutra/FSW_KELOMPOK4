import React, { useState } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import BgTiketkuImage from '../../../public/BG-Tiketku.png'

export const Route = createLazyFileRoute('/auth/forget-pass-req')({
  component: ResetRequest,
})

function ResetRequest() {
  const [email, setEmail] = useState('')

  // Mutation for sending request link through email
  const { mutate: sendRequest, isPending } = useMutation({
    mutationFn: async (email) =>
      await axios.post(
        url,
        { email },
        { headers: { 'Content-Type': 'application/json' } },
      ),

    onSuccess: () => {
      toast.success('Reset link was sent! Check your email', {
        autoClose: 4000,
      })
    },

    onError: (error) => {
      if (error.response?.status === 404) {
        toast.error('Your email was not found.', {
          autoClose: 4000,
        })
      } else {
        toast.error('An unexpected error occured')
      }
    },
  })

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Call mutation
    sendRequest(email)
  }

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
          className="d-flex flex-column align-items-center justify-content-center p-5"
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
            <ToastContainer
              position="bottom-center"
              style={{
                bottom: 10,
              }}
            />
            <h1
              className="mb-4"
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                fontFamily: 'Poppins, sans-serif',
                textAlign: 'left',
                marginBottom: '1rem',
              }}
            >
              Lupa Password
            </h1>

            <Form.Group controlId="email" className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Input your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderRadius: '16px',
                  marginTop: '4px',
                }}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <div className="d-grid">
                  <Button
                    as={Link}
                    href={`/login`}
                    style={{
                      backgroundColor: 'white',
                      borderColor: '#7126B5',
                      borderRadius: '16px',
                      color: '#7126B5',
                      boxShadow: '2px 2px 5px 1px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    Back to Login Page
                  </Button>
                </div>
              </Col>
              <Col md={6}>
                <div className="d-grid">
                  <Button
                    type="submit"
                    disabled={isPending}
                    style={{
                      backgroundColor: '#7126B5',
                      borderColor: '#7126B5',
                      borderRadius: '16px',
                      boxShadow: '4px 4px 10px 2px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    {isPending ? 'Mengirim...' : 'Kirim Permintaan'}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </section>
  )
}
