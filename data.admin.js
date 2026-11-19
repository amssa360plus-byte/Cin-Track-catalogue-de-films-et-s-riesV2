        import { deletedata } from "./admin.js"
        import { update } from "./modfy-admin.js"

        async function getmovies(){
            try{
                const response = await fetch("https://6afae847730c1d152f32b6cc.mockapi.io/moviesv2")
                if(!response.ok){
                    throw new Error("Error " + response.status)
                }
                const movie = await response.json()

                const datainner = document.querySelector("#borderdata")
                let output = ``

                for(let i = 0; i < movie.length; i++){   
                    output += `
                    <tr class="tableuuu11">
                        <td class="px-6 py-4 text-red-500 font-bold">
                            ${movie[i].id}
                        </td>
                        <td class="px-6 py-4 font-medium">
                            ${movie[i].title}
                            <a><i class="fa-solid fa-trash-can relative left-20 btn-delete" data-id="${movie[i].id}" style="color: rgb(196, 17, 17);"></i></a>
                            <a><i class="fa-solid fa-paintbrush btn-modify" data-id="${movie[i].id}" style="color: rgb(196, 17, 17);"></i></a>
                        </td>
                    </tr>`
                }

                datainner.innerHTML = output
            
                document.querySelectorAll(".btn-delete").forEach(btn => {
                    btn.addEventListener("click", () => {
                        deletedata(btn.dataset.id)
                    })

                })

                const modal = document.querySelector("#modificationb_btn")
                document.querySelectorAll(".btn-modify").forEach(btn => {
                    btn.addEventListener("click", () => {
                        modal.classList.remove("hidden")
                        document.querySelector("#exitmodification").addEventListener("click",()=>{
                            modal.classList.add("hidden")
                        }
                        )
                        // input 1 
                        const inputtitle = document.querySelector("#inputtitle")
                        document.querySelector("#confirme_title").addEventListener("click", ()=>{
                                const idINput = inputtitle.value.trim()
                                update(btn.dataset.id, {title: idINput})
                            })
                        })
                        // input 2 
                        const inputyear = document.querySelector("#inputyear")
                        document.querySelector("#confirme_year").addEventListener("click", ()=>{
                            const idINput = inputyear.value.trim()
                            update(btn.dataset.id, {releaseYear: idINput} )
                        })

                        // input 3 
                        const inputdir = document.querySelector("#inputdir")
                        document.querySelector("#confirme_deriction").addEventListener("click", ()=>{
                            const idINput = inputdir.value.trim();
                            update(btn.dataset.id, {directors: idINput})
                        })

                        // input 4 
                        const INPUTimagelink = document.querySelector("#inputimage")
                        document.querySelector("#confirme_image").addEventListener("click", ()=>{
                            const idINput = INPUTimagelink.value.trim()
                            update(btn.dataset.id, {image: idINput})
                        })
                    })
                
            }
            catch(error){
                console.log(error)
            }
        }
        getmovies()