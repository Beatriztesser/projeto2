import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { insertMaskinCpf } from "../functions/cpf";
import { insertMaskIPhone } from "../functions/phone";
import { useForm } from 'react-hook-form';  // Importe o useForm corretamente
import { checkCep } from "../functions/endereco";

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  justify-content: center;
  margin: 40px 0;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

const Input = styled.input`
  width: 200px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 1.7vw;
  font-size: 1vw;
`;

const Label = styled.label`
  font-family: 'Poppins';
  margin-bottom: 3px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #2c73d2;
  color: white;
  height: 38px;
  font-family: 'Poppins';
  
  &:hover {
    color: white;
    transition: all 0.3s ease; 
    background-color: green;
    transform: scale(1.02);
  }
`;

const SubContainer = styled.div`
  margin: 0 30px;
  position: relative;
  border: 2.7px solid rgb(200, 216, 280);
  border-radius: 20px;
  margin-top: 30px;
  padding: 5px;
`;

const SubTitle= styled.h2`
  font-size: 1.4vw;
  font-family: "Poppins";
  font-weight: 500;
  color: black;
  background: white;
  position: absolute;
  padding: 5px 10px;
  top: -21px;
  margin-left: 25px;
`;

const DivInputs = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px 0;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-around;
`;

const Title = styled.h1`
  margin-top: 20px;
  font-family: 'Poppins';
  font-weight: 600;
  font-size: 3.8vh;
`;

const DivHeader= styled.div`
  text-align: center;
  position: relative;
  padding-top: 10px;
`;

const Form = ({ addUser }) => {
  const { register, handleSubmit, setValue } = useForm(); 
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  const onSubmit = async (dados) => {
    const { nome, email, data_nascimento, telefone, cep, cidade, estado, endereco, bairro, numero } = dados;

    if (
      !nome ||
      !email ||
      !data_nascimento ||
      !cpf ||
      !telefone ||
      !cep ||
      !cidade ||
      !estado ||
      !endereco ||
      !bairro ||
      !numero
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    try {
      const response = await axios.post("http://localhost:8800/", {
        nome,
        email,
        data_nascimento,
        cpf,
        telefone,
        cidade,
        estado,
        endereco,
        bairro,
        numero
      });
      toast.success(response.data);
    } catch (error) {
      toast.error("Erro ao cadastrar o usuário");
    }
  };

  const handleCpfChange = (e) => {
    const value = e.target.value;
    setCpf(insertMaskinCpf(value)); 
  };

  const handleTelefoneChange = (e) => {
    const value = e.target.value;
    setTelefone(insertMaskIPhone(value));
  }

  const handleCepChange= (e)=>{
    const value = e.target.value
    checkCep(value, setValue, toast);
  }
  const handleNumeroChange = (e) => {
    let numero = e.target.value;
    numero = numero.replace(/\D/g, '');
    e.target.value = numero;  
    setValue('numero', numero);  
  }
 
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <DivHeader>
        <Title>Cadastrar cliente</Title>
      </DivHeader>
      <SubContainer>
        <SubTitle> Dados pessoais: </SubTitle>
        <DivInputs>
          <InputArea>
            <Label>Nome: </Label>
            <Input {...register('nome', { required: true })} />
          </InputArea>
          <InputArea>
            <Label>E-mail:</Label>
            <Input {...register('email', { required: true })} type="email" />
          </InputArea>
          <InputArea>
            <Label>Data de Nascimento:</Label>
            <Input {...register('data_nascimento', { required: true })} type="date" />
          </InputArea>
          <InputArea>
            <Label>CPF:</Label>
            <Input
              {...register('cpf', { required: true })}
              type="text"
              value={cpf}
              onInput={handleCpfChange}
            />
          </InputArea>
          <InputArea>
            <Label>Telefone:</Label>
            <Input 
              {...register('telefone', { required: true })}
              type="text" 
              value={telefone} 
              onInput={handleTelefoneChange}
            />
          </InputArea>
        </DivInputs> 
      </SubContainer>
      
      <SubContainer>
        <SubTitle> Endereço: </SubTitle>
        <DivInputs>
          <InputArea>
            <Label>Cep:</Label>
            <Input {...register('cep', { required: true })} type="text" onInput={handleCepChange}  />
          </InputArea>
          <InputArea>
            <Label>Cidade:</Label>
            <Input {...register('cidade', { required: true })} type="text" />
          </InputArea>
          <InputArea>
            <Label>Estado:</Label>
            <Input {...register('estado', { required: true })} type="text" />
          </InputArea>
          <InputArea>
            <Label>Endereço:</Label>
            <Input {...register('endereco', { required: true })} type="text" />
          </InputArea>
          <InputArea>
            <Label>Bairro:</Label>
            <Input {...register('bairro', { required: true })} type="text" />
          </InputArea>
          <InputArea>
            <Label>Número:</Label>
            <Input {...register('numero', { required: true })} type="text" onInput={handleNumeroChange} />
          </InputArea>
        </DivInputs>
      </SubContainer>
      
      <Button type="submit">Cadastrar</Button>
    </FormContainer>
  );
};

export default Form;
