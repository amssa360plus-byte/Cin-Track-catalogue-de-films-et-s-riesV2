export async function update(id, upadateinformation) {
    try{
        const response = await fetch(`https://6afae847730c1d152f32b6cc.mockapi.io/moviesv2/${id}`,  {
            method:"PUT",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify(upadateinformation)
        })
        if(!response.ok){
            throw new Error("Error," + response.status)
        }
        const data =  await response.json()
        console.log(data)

    }
    catch(error){
        console.error(error)
    }
}
