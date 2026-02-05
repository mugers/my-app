import { useState } from 'react'; // Importante para controlar o que é digitado
import { db } from './firebase.js'; // Importe sua instância do banco
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Post(props) {
    const [comentario, setComentario] = useState("");

async function comentar(id, e) {
    e.preventDefault();

    // Validação: não envia se o comentário estiver vazio
    if (comentario.trim() === "") {
        alert("Digite algo antes de comentar!");
        return;
    }

    // Se o usuário não estiver logado, avise-o
    if (!props.user) {
        alert("Você precisa estar logado para comentar.");
        return;
    }

    try {
        await addDoc(collection(db, "posts", id, "comentarios"), {
            nome: props.user, // Agora o valor virá do App.js
            texto: comentario,
            timestamp: serverTimestamp()
        });
        
        alert("Comentário feito com sucesso!");
        setComentario(""); 
    } catch (error) {
        console.error("Erro ao salvar no Firebase: ", error);
    }
}
    return (
        <div className='postSingle'>
            <img src={props.info?.image} alt="Post" />
            <p><b>{props.info?.userName}</b>: {props.info?.titulo}</p>
            
            <form onSubmit={(e) => comentar(props.id, e)}>
                <textarea 
                    value={comentario} // Liga o valor ao estado
                    onChange={(e) => setComentario(e.target.value)} // Atualiza o estado ao digitar
                    placeholder="Escreva um comentário..."
                ></textarea>
                <input type='submit' value='comentar' />
            </form>
        </div>
    );
}

export default Post;