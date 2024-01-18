import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')
    let navigate = useNavigate();
    let location = useLocation();

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/?keyword=${keyword.trim()}&page=1`);
        } else {
            navigate(location.pathname)
        }
    }

    return (
        <Form onSubmit={submitHandler} className="d-flex align-items-center">
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-2'
                style={{ flex: 3}} // Adjust as needed for better control of the width
            />
            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                Submit
            </Button>
        </Form>
    )
}

export default SearchBox;