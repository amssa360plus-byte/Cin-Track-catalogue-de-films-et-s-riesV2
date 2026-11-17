
// fonction delete with data api 
async function deletedata(ID){
    try{
          const response = await fetch(`https://6afae847730c1d152f32b6cc.mockapi.io/moviesv2/${ID}`,
            {method : 'DELETE'}
          )
        {
       }
               if(!response.ok){
                throw new Error ("error"+response.status)
               }
               
               console.log("id is deleted"+ ID)
    }
    catch(error){
        console.error(error)
    }
}


deletedata(4)