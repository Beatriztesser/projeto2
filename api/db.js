import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nova_senha",
  database: "db_cadastro"
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar com o banco de dados:", err);
    return;
  }
  console.log("Conexão com o banco de dados estabelecida!");
});
