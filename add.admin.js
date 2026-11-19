async function newmovies(id, title , derctions, years, gernes, production ,image ,description){
    try{
        const response = await fetch("https://6afae847730c1d152f32b6cc.mockapi.io/moviesv2",{
            method:"POST",
            body:JSON.stringify({
                id: id,
                title:title,
                years:years,
                derctions: derctions,
                gernes:gernes,
                productionCountries:production,
                image:image,
                description:description
            })
          
        })
        if(!response.ok){
            throw new Error ("error"+response.status)
        }
        const data = await response.jsons()
    }
    catch(error){
        console.error(error)
    }
}