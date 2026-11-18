
import { deletedata } from "./admin.js"

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
        for(let i = 0 ; i<= movie.length ; i++){
               output +=`
    <tr class="">

        <td class="px-6 py-4 text-red-500 font-bold">
            ${movie[i].id}            
        </td>

        <td class="px-6 py-4 font-medium">
            ${movie[i].title}
            <a><i class="fa-solid fa-trash-can relative left-20 btn-delete" data-id="${movie[i].id}" style="color: rgb(196, 17, 17);"></i></a>
            <a><i class="fa-solid fa-paintbrush btn-modify" data-id=${movie[i].id} style="color: rgb(196, 17, 17);"></i></a>
        </td>
    

    </tr>
`
               datainner.innerHTML = output 
            //    btn delete
            // document.querySelector(".btn-delete").forEach(btndelete => {
            //     btndelete.addEventListener("click",()=>{
            //         deletedata(btndelete.dataset.id)
            //     })
                
            // });

            const btndelete = document.querySelector('.btn-delete')
            btndelete.addEventListener("click",()=>{
                deletedata(btndelete.dataset.id)
            })
            
        }


    }
    catch(error){
        console.log(error)
        console.log("raaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahhhhh erroor")
    }
}
getmovies()