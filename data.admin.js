async function getmovies(){
    try{
        const response = await fetch("https://6afae847730c1d152f32b6cc.mockapi.io/moviesv2")
        if(!response.ok){
            throw new Error("Error" + response.status)

        }
        const movie = await response.json()
        console.log(movie)
        const datainner = document.querySelector("#borderdata")
        const idd = document.querySelector("#IDD")
        const title1 = document.querySelector("#title")
        const year1 = document.querySelector("#year")
        let output = ``
        for(let moviess of movie){
               output +=`
    <tr class="">

        <td class="px-6 py-4 text-red-500 font-bold">
            ${moviess.id}
        </td>

        <td class="px-6 py-4 font-medium">
            ${moviess.title}
        </td>

    </tr>
`
               datainner.innerHTML = output 
            
        }
    }
    catch(error){
        console.log(error)
        console.log("raaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahhhhh erroor")
    }
}
getmovies()