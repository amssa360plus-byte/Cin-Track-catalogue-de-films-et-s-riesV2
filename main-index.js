const listcontair = document.querySelector("#list");
const task = document.querySelector("#task");

async function comontaire(movieId, author, rating, date, text) {
  const response = await fetch("https://6afae847730c1d152f32b6cc.mockapi.io/comentaire", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      moviesv2Id: String(movieId),
      author: author,
      rating: rating,
      date: date,
      text: text
    })
  });

  if (!response.ok) {
    throw new Error("Error comment: " + response.status);
  }

  return await response.json();
}

async function getuser() {
  const response = await fetch(
    "https://6afae847730c1d152f32b6cc.mockapi.io/moviesv2"
  );
  const responsecomentaire = await fetch(
    "https://6afae847730c1d152f32b6cc.mockapi.io/comentaire"
  );

  const movies = await response.json();
  const comontaires0 = await responsecomentaire.json();

  console.log(comontaires0);
  const grid = document.querySelector("#movies-grid");
  const card = document.querySelector("#card");
  const fav = document.querySelector("#fav");
  const favcard = document.querySelector("#favcard");
  const input = document.querySelector("#searche");
  const card_commontaire = document.querySelector("#card_commontaire");
  let currentMovieIndex = null;

  let datamovie = JSON.parse(localStorage.getItem("fav")) || [];

  // ---------- PAGINATION ----------
  const paginationall = document.getElementById("paginationall");
  let pogiantion = document.createElement("ul");

  const perPage = 8;
  let page = 1;
  let list = movies;

  const pag = document.createElement("div");
  pag.className = "mt-6 text-center";
  grid.after(pag);

  function render() {
    const items = list.slice((page - 1) * perPage, page * perPage);

    grid.innerHTML = items.map(m => {
      const i = movies.indexOf(m);
      return `
        <div class="border-2 border-solid ">
          <button type="button" data-index="${i}">
            <img src="${m.image}" alt="${m.title || "Poster"}" class="border border-black rounded-xl">
          </button>
          <p class="text-gray-400 text-xs mt-2">
            ${m.releaseYear} · ${m.type}
            <i class="fa-solid fa-plus plus cursor-pointer" style="color: rgb(196, 17, 17);" data-index="${i}"></i>
          </p>
          <a class="modalcom cursor-pointer" data-index="${i}"><i class="fa-solid fa-message" style="color: rgb(196, 17, 17);"></i></a>
        </div>`;
    }).join("");

    pag.innerHTML = Array.from({ length: Math.ceil(list.length / perPage) }, (_, n) =>
      `<button data-page="${n + 1}" class="mx-1 mb-1 rounded-full border border-red-600 px-3 py-1 ${n + 1 === page ? "bg-red-600 text-black" : "text-red-600"}">${n + 1}</button>`
    ).join("");
  }

  function setList(newList) {
    list = newList;
    page = 1;
    render();
  }

  pag.addEventListener("click", e => {
    const b = e.target.closest("[data-page]");
    if (!b) return;
    page = Number(b.dataset.page);
    render();
  });

  // ---------- Details + Plus + Comment Modal ----------
  grid.addEventListener("click", e => {
    const msg = e.target.closest(".modalcom");
    if (msg) {
      e.preventDefault();
      currentMovieIndex = Number(msg.dataset.index);
      card_commontaire.classList.remove("hidden");
      return;
    }

    const plus = e.target.closest(".plus");
    if (plus) {
      const m = movies[Number(plus.dataset.index)];
      if (!datamovie.some(item => item.id === m.id)) {
        datamovie.push(m);
        localStorage.setItem("fav", JSON.stringify(datamovie));
      }
      return;
    }

    const btn = e.target.closest("button[data-index]");
    if (!btn) return;
    const m = movies[Number(btn.dataset.index)];
    const movieComments = comontaires0.filter(x => String(x.moviesv2Id) === String(m.id));

    const commentsHTML = movieComments.length
      ? movieComments.map(c => `
          <div class="border-2 border-solid border-red-600 rounded-lg p-2 mt-2">
            <div class="flex items-center justify-between">
              <span class="text-red-600 font-semibold">
                <i class="fa-solid fa-circle-user" style="color: rgb(196, 17, 17);"></i> ${c.author || "Anonyme"}
              </span>
              <span class="text-xs text-gray-500">${c.date || ""}</span>
            </div>
            <p class="mt-1">${c.text}</p>
            <p class="text-sm"><i class="fa-solid fa-star" style="color: rgb(196, 17, 17);"></i> = ${c.rating ?? "-"}</p>
          </div>
        `).join("")
      : `<p class="mt-2 text-gray-500">No comment yet</p>`;

    card.innerHTML = `<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <a class="relative left-90 bottom-14 cursor-pointer" id="exitmovie"><i class="fa-solid fa-x" style="color: rgb(196, 17, 17);"></i></a>
      <div class="box w-full max-w-sm max-h-[85vh] overflow-y-auto rounded-xl border-2 border-red-600 bg-white p-6 text-black shadow-lg">
        <h5 class="mb-3 text-2xl font-semibold text-red-600">${m.title}</h5>
        <h3>${m.type}</h3>
        <h3>${m.releaseYear}</h3>
        ${m.seasons ? `<h3>Seasons: ${m.seasons}</h3>` : ""}
        ${m.directors ? `<h3>Directors: ${m.directors}</h3>` : ""}

        <div class="mt-3">
          ${commentsHTML}
        </div>
      </div>
    </div>`;

    card.classList.remove("hidden");
    const exitmovie = document.querySelector("#exitmovie");
    exitmovie.addEventListener("click", function (e) {
      e.preventDefault();
      card.classList.add("hidden");
    });
  });

  card.addEventListener("click", e => {
    if (!e.target.closest(".box")) card.classList.add("hidden");
  });

  // ---------- Fermer card commentaire ----------
  document.querySelector("#exitCom").addEventListener("click", () => {
    card_commontaire.classList.add("hidden");
  });

  // ---------- Envoyer commentaire (POST) ----------
  // ---------- Envoyer commentaire (POST) ----------
  const confirmeComBtn = card_commontaire.querySelector("button");
  if (confirmeComBtn) {
    confirmeComBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      if (currentMovieIndex === null) return;

      const targetMovie = movies[currentMovieIndex];
      const authorInput = card_commontaire.querySelector('input[type="name"]');
      const ratingInput = card_commontaire.querySelector('input[type="number"]');
      const dateInput = card_commontaire.querySelector('input[type="date"]');
      const textInput = card_commontaire.querySelector("textarea");

      const author = authorInput ? authorInput.value.trim() : "";
      const rating = ratingInput ? ratingInput.value.trim() : "";
      const date = dateInput ? dateInput.value.trim() : "";
      const text = textInput ? textInput.value.trim() : "";

      if (!author || !text) {
        console.warn("3mr smiya o commentaire 3afak");
        return;
      }

      try {
        const savedComment = await comontaire(targetMovie.id, author, rating, date, text);
        comontaires0.push(savedComment);
        console.log("Commentaire t-sift:", savedComment);

        if (authorInput) authorInput.value = "";
        if (ratingInput) ratingInput.value = "";
        if (dateInput) dateInput.value = "";
        if (textInput) textInput.value = "";
        card_commontaire.classList.add("hidden");
      } catch (err) {
        console.error(err);
      }
    });
  }
  // ---------- Favoris ----------
  fav.addEventListener("click", e => {
    e.preventDefault();
    favcard.innerHTML = `<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div class="box w-full max-w-sm rounded-xl border-2 border-red-600 bg-white p-6 text-black shadow-lg">
        <h5 class="mb-3 text-2xl font-semibold text-red-600">Favoris</h5>
        <a class="relative left-80 bottom-10 cursor-pointer" id="exits"><i class="fa-solid fa-x" style="color: rgb(196, 17, 17);"></i></a>
        ${datamovie.length ? datamovie.map(m => `<img src="${m.image}" class="w-24 rounded-lg mb-1"><h3>${m.title}</h3><button id="remove" class="border border-solid bg-red-800 rounded-xl hover:bg-red-100">remove</button>`).join("") : "<p>Aucun favori</p>"}
      </div>
    </div>`;
    favcard.classList.remove("hidden");
    const exist = document.querySelector("#exits");
    exist.addEventListener("click", function (e) {
      e.preventDefault();
      favcard.classList.add("hidden");
    });
    const remove = document.querySelector("#remove");
    if (remove) {
      remove.addEventListener("click", function (e) {
        e.preventDefault();
      });
    }
  });

  favcard.addEventListener("click", e => {
    if (!e.target.closest(".box")) favcard.classList.add("hidden");
  });

  document.querySelector("#Tout").addEventListener("click", () => setList(movies));
  document.querySelector("#movie").addEventListener("click", () => setList(movies.filter(m => m.type === "movie")));
  document.querySelector("#Show").addEventListener("click", () => setList(movies.filter(m => m.type === "series")));
  input.addEventListener("input", () => setList(movies.filter(m => (m.title || "").toLowerCase().includes(input.value.toLowerCase()))));

  render();
}

getuser().catch(err => console.error(err));