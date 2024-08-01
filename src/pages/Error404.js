import React from 'react'
import Alert from 'react-bootstrap/Alert';

function Error404() {
  return (
    <>
        <Alert variant="danger">
          <h1>Error 404</h1>
          <p>Page was not found!</p>
        </Alert>
    </>
  )
}

export default Error404
