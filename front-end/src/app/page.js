"use client";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./components/Form.js";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0 auto;
`;



export default function Home() {
  return (
    <>
    <Container>
      <Form/>
    </Container>
    <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  )


}

