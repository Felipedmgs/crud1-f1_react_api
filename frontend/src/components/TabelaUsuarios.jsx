import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TabelaUsuarios = ({ atualizaTabela, onAtualizaTabela, setUsuarioSelecionado, usuariosFiltrados }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');

    useEffect(() => {
        if(usuariosFiltrados) {
            setUsuarios(usuariosFiltrados);
        }
    }, [usuariosFiltrados]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/usuarios')
            .then((response) => setUsuarios(response.data));
    }, [atualizaTabela]);

    function handleEditar(id) {
        const usuario = usuarios.find((u) => u.ID === id);
        setUsuarioSelecionado(usuario);
    }

    function handleExcluir(id) {
        axios.delete(`http://localhost:3001/api/usuarios/${id}`)
            .then(() => {
                setUsuarioSelecionado(null);
                onAtualizaTabela();
                toast.success('Usuário excluído com sucesso!');
            });
    }

    function localizar() {
        const filtros = { nome, telefone, email, dataInicial, dataFinal };
        axios.get('http://localhost:3001/api/usuarios', {params: filtros})
            .then(response => {
                setUsuarios(response.data)
                if(response.data.length) {
                    toast.success('Consulta realizada com sucesso!', {autoClose: 1000});
                } else {
                    toast.warn('Não foram encontrados registros para esses filtros', {autoClose: 2000});
                }
            }).catch(err => {
                toast.error(err);
            });
    }

    return (
        <div className="overflow-x-auto px-8 pt-2 pb-8 mb-4 flex flex-col my-2 bg-white">
            <div className="flex flex-wrap mb-4 bg-gray-200 p-2 rounded-md">
                <div className="w-full lg:w-1/5 lg:pl-0 lg:pr-3 px-0">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                        Nome:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nome"
                        type="text"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                    />
                </div>
                <div className="w-full lg:w-1/5 lg:pl-0 lg:pr-3 px-0">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefone">
                        Telefone:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="telefone"
                        type="text"
                        placeholder="Digite seu telefone"
                        value={telefone}
                        onChange={(event) => setTelefone(event.target.value)}
                    />
                </div>
                <div className="w-full lg:w-1/5 lg:pl-0 lg:pr-3 px-0">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="w-full lg:w-1/5 lg:pl-0 lg:pr-3 px-0">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataInicial">
                        Dt de Nascimento Inicial:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dataInicial"
                        type="date"
                        placeholder="Selecione a data inicial"
                        value={dataInicial}
                        onChange={(event) => setDataInicial(event.target.value)}
                    />
                </div>
                <div className="w-full lg:w-1/5 lg:pl-0 lg:pr-3 px-0">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataFinal">
                        Dt de Nascimento Final:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dataFinal"
                        type="date"
                        placeholder="Selecione a data final"
                        value={dataFinal}
                        onChange={(event) => setDataFinal(event.target.value)}
                    />
                </div>
            </div>
            <div className="flex items-center justify-start mb-2">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={localizar}
                >
                    Buscar
                </button>
            </div>
            <table className="min-w-full border-collapse">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold uppercase">Nome</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold uppercase">Telefone</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold uppercase">E-mail</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold uppercase">Data de Nascimento</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold uppercase">Data de Cadastro</th>
                        <th className="py-3 px-4 text-left text-gray-700 font-bold uppercase">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.ID} className="hover:bg-gray-100 border-b border-gray-200">
                            <td className="py-4 px-6 whitespace-nowrap">{usuario.NOME}</td>
                            <td className="py-4 px-6 whitespace-nowrap">{usuario.TELEFONE}</td>
                            <td className="py-4 px-6 whitespace-nowrap">{usuario.EMAIL}</td>
                            <td className="py-4 px-6 whitespace-nowrap">{usuario.DATA_NASCIMENTO}</td>
                            <td className="py-4 px-6 whitespace-nowrap">{usuario.DATA_CADASTRO}</td>
                            <td className="py-4 px-6 whitespace-nowrap">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded m-1" onClick={() => handleEditar(usuario.ID)}>Editar</button>
                                <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded m-1" onClick={() => handleExcluir(usuario.ID)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}

export default TabelaUsuarios;