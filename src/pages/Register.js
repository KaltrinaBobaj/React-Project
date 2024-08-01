import axios from "axios";
import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";



function Register() {
  const navigate = useNavigate()

  const handleRegister = e =>{
    e.preventDefault()
    const elements = e.target.elements
    const name = elements['name'].value
    const surname = elements['surname'].value
    const email = elements['email'].value
    const password = elements['password'].value
  
    axios(
      {
        method: 'POST',
        url: 'https://66aab426636a4840d7c863d4.mockapi.io/api/v1/users',
        data: {name, surname, email, password}
        
      }
    ).then(
      resp => {
      if(resp.status ===201) navigate('/login'); else alert('Something went wrong')
      }
      ).catch(e =>console.log(e))
  }
  return (
    <section className="py-5">
      <Container>
        <form onSubmit={handleRegister}>
          <Card className="w-50 mx-auto">
            <Card.Body className="">
              <Card.Title>Register</Card.Title>
              <Card.Text className="">
                <Form.Control
                  name="name"
                  placeholder="Name"
                  aria-label="Name"
                  className="mb-3"
                />
                <Form.Control
                  name="surname"
                  placeholder="Surname"
                  aria-label="Surname"
                  className="mb-3"
                />
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  className="mb-3"
                />
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  className="mb-3"
                />
              </Card.Text>
              <Button variant="outline-primary me-2" type="submit">Register</Button>
              <Link to="/login" className="btn btn-outline-secondary">
                Login
              </Link>
            </Card.Body>
          </Card>
        </form>
      </Container>
    </section>
  );
}

export default Register;
