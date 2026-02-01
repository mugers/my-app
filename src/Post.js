function Post(props){

    function comentar(id,e){
    e.preventDefault();
    alert("comentado:  "+id)
    }

    return(
          <div className='postSingle'>
              <img src={props.info?.image}></img>
               <p><b>{props.info?.userName}</b>:{props.info?.titulo}</p>
               <form onSubmit={(e)=>comentar(props.val.id,e)}>
                <textarea></textarea>
                <input type='submit' value='comentar'></input>
              </form>
         </div>
    )

}

export default Post;