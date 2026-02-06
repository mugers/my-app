import { useState, useEffect } from 'react'; // Importante para controlar o que é digitado
import { db,} from './firebase.js'; // Importe sua instância do banco
import { collection, addDoc, serverTimestamp, doc, orderBy, onSnapshot } from "firebase/firestore";

function Post(props) {
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    // Referência: posts -> {id} -> comentarios
    const unsub = onSnapshot(
      collection(db, "posts", props.id, "comentarios"), 
      (snapshot) => {
        setComentarios(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      }
    );

    return () => unsub(); // Limpa o listener ao desmontar
  }, [props.id]);



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
            <div className='coments'>

{
    comentarios.map(function(val) {
        return (
            // Adicione sempre uma 'key' única para o React
            <div key={val.id} className='comente-single'>
                {/* Use os nomes exatos que você salvou na função comentar() */}
                <p><b>{val.nome}</b>: {val.texto}</p>
            </div>
        )
    })
}
            </div>


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