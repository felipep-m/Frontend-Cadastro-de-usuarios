import { useState, useEffect } from "react";
import "./App.css";
import UserCards from "./components/UserCards";
import axios from "axios";


function App() {
  const [name, setName] = useState("Usuário");
  const [email, setEmail] = useState("Usuario@gmail.com");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function buscarUsuarios() {
      const resposta = await axios.get('/api/usuarios')
    setUsers(resposta.data)
    }
    buscarUsuarios()

  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    await axios.post('/api/usuarios', {nome: name, email, idade: age})
  }

  return (
    <div className="app">
      <h1> Cadastro de Usuários </h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          placeholder="Idade"
          type="number"
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />

        <button type="submit"> Cadastrar </button>
      </form>
      <div className="userlist">
        {users.map((user) => (
          <UserCards key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;
