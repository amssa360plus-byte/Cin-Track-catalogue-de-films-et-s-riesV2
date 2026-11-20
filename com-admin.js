export async function comontaire(id, CententID, text, rating, author, createdAt    ){
    try{
        const response = await fetch("https://6afae847730c1d152f32b6cc.mockapi.io/comentaire",{
            method:"POST",
            headers:{"Contente-type": "application/JSON"},
            body: JSON.stringify({
                id:id,
                CententID:CententID,
                text: text,
                rating:rating,
                author:author,
                createdAt:createdAt
            })
        })
        if(!response.ok){
            throw new Error ("error" + response.status)
        }
        const data = await response.json()
        console.log(data)
    }
    catch(error){
        console.error(error)
    }
}