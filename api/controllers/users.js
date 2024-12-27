import { db } from "../db.js";

  export const addUser = (req, res) => {
    const q =
      "INSERT INTO usuarios(`nome`, `email`, `data_nascimento`, `cpf`, `telefone`, `cep`, `cidade`, `estado`, `endereco`, `bairro`, `numero`) VALUES(?)";
  
    const values = [
      req.body.nome,
      req.body.email,
      req.body.data_nascimento,
      req.body.cpf,
      req.body.telefone, 
      req.body.cep,
      req.body.cidade,
      req.body.estado,
      req.body.endereco,
      req.body.bairro,
      req.body.numero
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Usuário criado com sucesso.");
    });
  };
  

  
