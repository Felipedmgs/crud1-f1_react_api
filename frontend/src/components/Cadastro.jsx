import { useState, useEffect } from 'react';
import axios from 'axios';
import { PatternFormat } from 'react-number-format';
import { toast } from 'react-toastify';

const Cadastro = ({ onCadastrado, usuarioSelecionado, setUsuarioSelecionado, setUsuariosFiltrados }) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');


  function formatarDataParaOracle(dataBr) {
    const [dia, mes, ano] = dataBr.split('/');
    return `${ano}-${mes}-${dia}`; // retorna "YYYY-MM-DD"
}


  useEffect(() => {
    if (usuarioSelecionado) {
      setNome(usuarioSelecionado.NOME);
      setTelefone(usuarioSelecionado.TELEFONE);
      setEmail(usuarioSelecionado.EMAIL);
      setDataNascimento(usuarioSelecionado.DATA_NASCIMENTO);
    } else {
      setNome('');
      setTelefone('');
      setEmail('');
      setDataNascimento('');
    }
  }, [usuarioSelecionado]);

  function handleSubmit(event) {
    event.preventDefault();

    const novoUsuario = { nome, telefone, email, dataNascimento: formatarDataParaOracle(dataNascimento) };

    if (usuarioSelecionado) {
      axios
        .put(`http://localhost:3001/api/usuarios/${usuarioSelecionado.ID}`, novoUsuario)
        .then(() => {
          onCadastrado();
          limparFormulario();
          toast.success('Usuário alterado com sucesso!');
        }).catch((error) => {
            toast.error(error.response.data);
        });
    } else {
      axios.post('http://localhost:3001/api/usuarios', novoUsuario)
      .then(() => {
        onCadastrado();
        limparFormulario();
        toast.success('Usuário cadastrado com sucesso!');
      }).catch((error) => {
        toast.error(error.response.data);
    });
    }
  }

  function limparFormulario() {
    setNome('');
    setTelefone('');
    setEmail('');
    setDataNascimento('');
    setUsuarioSelecionado(null);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white shadow-md rounded px-8 pt-3 pb-8 mb-4 flex flex-col my-2">
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="nome"
            >
              Nome
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              id="nome"
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              required={true}
            />
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="telefone"
            >
              Telefone
            </label>
            <PatternFormat 
                required={true}
                format="(##) #####-####"
                placeholder="(##) #####-####"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="telefone"
                type="text"
                value={telefone}
                onChange={(event) => setTelefone(event.target.value)}
            />
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
                required={true}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="email"
                type="text"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="dataNascimento"
            >
              Data de Nascimento
            </label>
            <PatternFormat 
                required={true}
                format="##/##/####" 
                placeholder='DD/MM/YYYY'
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="dataNascimento"
                type="text"
                value={dataNascimento}
                onChange={(event) => setDataNascimento(event.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {usuarioSelecionado ? 'Atualizar Usuário' : 'Cadastrar'}
          </button>
          {usuarioSelecionado ? (
            <button
              type="button"
              onClick={limparFormulario}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Limpar
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </form>
  );
};

export default Cadastro;