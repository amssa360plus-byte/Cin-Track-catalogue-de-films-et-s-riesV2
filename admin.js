
// fonction delete with data api 
async function deletedata(id){
    try{
          const response = await fetch(`https://6afae847730c1d152f32b6cc.mockapi.io/moviesv2/${id}`,
            {method : 'DELETE'}
          )
        {
       }
               if(!response.ok){
                throw new Error ("error"+response.status)
               }
               
               console.log("id is deleted"+ id)
    }
    catch(error){
        console.error(error)
    }
}


deletedata() 

const btndelete = document.querySelector("#btn-delete")
const deletecard = document.querySelector("#deletecard")
btndelete.addEventListener("click",()=>{
  deletecard.classList.remove("hidden")
})

const exitdelete = document.querySelector("#exitdelete")
exitdelete.addEventListener("click",()=>{
   deletecard.classList.add("hidden")
})

const confirme_delete = document.querySelector("#confirme_delete")
const input1 = document.querySelector('#input1')

confirme_delete.addEventListener("click", ()=>{
  const idINput = input1.value
  deletedata(idINput) 
})