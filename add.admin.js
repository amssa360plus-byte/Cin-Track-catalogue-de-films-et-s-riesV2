async function newmovies(title, directors, releaseYear, genres, production, image, description) {
    try {
        console.log("sanding.....")
        const response = await fetch("https://6afae847730c1d152f32b6cc.mockapi.io/moviesv2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                releaseYear: releaseYear,
                directors: directors,
                genres: genres,
                productionCountries: production,
                image: image,
                description: description
            })
        })
        if (!response.ok) {
            throw new Error("error " + response.status)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

    // newmovies(
    //     "MAXVER", "JAWAD", 2021, "F1", "FIA", "https://m.media-amazon.com/images/M/MV5BNmVhZmQxY2QtNzQ1My00ODAyLTlmZDUtOWE0YjdiYTAxMGRlXkEyXkFqcGc@._V1_.jpg", "BEST DRIVER"
    // )