const firstButton = document.getElementById("first-button");
const secondButton = document.getElementById("second-button");
const rowContainer = document.getElementById("card-container");
const apiKey = "11WvHxW4UiHdG7JymLita9D75OsWbrmlDbkrXC0x6RnE7xiDGnVGhkDC";

const fetchImages = (query) => {
  fetch(`https://api.pexels.com/v1/search?query=${query}`, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella risposta");
      }
      return response.json();
    })
    .then((data) => {
      // pulisco le vecchie card
      rowContainer.innerHTML = "";

      data.photos.forEach((photo) => {
        // colonna
        const col = document.createElement("div");
        col.className = "col-md-4";

        // card
        const card = document.createElement("div");
        card.className = "card mb-4 shadow-sm";

        // img
        const img = document.createElement("img");
        img.className = "bd-placeholder-img card-img-top";
        img.src = photo.src.medium;

        card.appendChild(img);

        // body della card
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = photo.photographer;

        const text = document.createElement("p");
        text.className = "card-text";
        text.textContent = `Photo by ${photo.photographer}`;

        const cardFooter = document.createElement("div");
        cardFooter.className = "d-flex justify-content-between align-items-center";

        const btnContainer = document.createElement("div");
        btnContainer.className = "btn-group";

        const viewBtn = document.createElement("button");
        viewBtn.className = "btn btn-sm btn-outline-secondary";
        viewBtn.textContent = "View";

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-sm btn-outline-secondary";
        editBtn.textContent = "Edit";

        btnContainer.appendChild(viewBtn);
        btnContainer.appendChild(editBtn);

        cardFooter.appendChild(btnContainer);

        cardBody.appendChild(title);
        cardBody.appendChild(text);
        cardBody.appendChild(cardFooter);

        card.appendChild(cardBody);
        col.appendChild(card);
        rowContainer.appendChild(col);
      });
    })
    .catch((error) => {
      console.error("Errore durante la fetch:", error);
    });
};

firstButton.addEventListener("click", () => fetchImages("waves"));

secondButton.addEventListener("click", () => fetchImages("sea"));
