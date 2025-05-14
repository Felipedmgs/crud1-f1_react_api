import Cadastro from "./components/Cadastro";
import TabelaUsuarios from "./components/TabelaUsuarios";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [atualizaTabela, setAtualizaTabela] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

    function handleAtualizaTabela() {
        setAtualizaTabela(!atualizaTabela);
    }

    return (
        <>
            <div className="bg-gray-200">
                <Cadastro onCadastrado={handleAtualizaTabela} usuarioSelecionado={usuarioSelecionado} setUsuarioSelecionado={setUsuarioSelecionado} />
            </div>
            <div className="bg-gray-100">
                <TabelaUsuarios atualizaTabela={atualizaTabela} onAtualizaTabela={handleAtualizaTabela} setUsuarioSelecionado={setUsuarioSelecionado} />
            </div>
            <ToastContainer 
                position="top-center" // Define a posição do toast como centro superior
                autoClose={4000} // Define o tempo de exibição do toast em milissegundos (5 segundos neste exemplo)
                hideProgressBar={false} // Exibe a barra de progresso
                newestOnTop={false} // Exibe os novos toasts abaixo dos antigos
                closeOnClick // Fecha o toast ao clicar nele
                rtl={false} // Define o layout para leitura da direita para a esquerda (não é necessário no seu caso)
                pauseOnFocusLoss // Pausa a contagem regressiva do tempo de exibição ao perder o foco
                draggable // Permite arrastar o toast pela tela
                pauseOnHover // Pausa a contagem regressiva do tempo de exibição ao passar o mouse por cima
            />
        </>
    );
}

export default App;