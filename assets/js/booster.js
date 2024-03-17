document.addEventListener("DOMContentLoaded", async function () {
  const generateButton = document.getElementById("generateButton");
  // Assure-toi que l'élément avec l'ID 'cardsContainer' existe dans ton HTML
  const cardsContainer = document.getElementById("cardsContainer");

  generateButton.addEventListener("click", generateCards);

  async function fetchCards() {
    const url = `https://hp-api.lainocs.fr/characters`;
    const response = await fetch(url);
    if (!response.ok) {
      // Gestion des erreurs de réponse de l'API
      console.error(
        "Erreur lors de la récupération des données de l'API:",
        response.statusText
      );
      return [];
    }
    const data = await response.json();
    return data;
  }

  async function generateCards() {
    cardsContainer.innerHTML = ""; // Efface les cartes précédentes
    const cards = await fetchCards();

    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * cards.length);
      const card = cards[randomIndex];
      const divCard = document.createElement("div");
      divCard.classList.add("card");

      const img = document.createElement("img");
      img.src = card.image;
      img.alt = card.name;

      const h2 = document.createElement("h2");
      h2.textContent = card.name;

      const p = document.createElement("p");
      p.textContent = `Maison : ${card.house ? card.house : "????"}`;

      // Ajout du lien de détails (si applicable)
      const detailsLink = document.createElement("a");
      detailsLink.classList.add("card-details-link");
      detailsLink.href = `details.html?id=${card.slug}`;
      detailsLink.textContent = "Détails";

      divCard.appendChild(img);
      divCard.appendChild(h2);
      divCard.appendChild(p);
      divCard.appendChild(detailsLink); // Ajoute le lien de détails à la carte

      cardsContainer.appendChild(divCard);

      // Applique une animation d'apparition pour chaque carte
      divCard.style.opacity = 0;
      divCard.style.transform = "scale(0.5)";
      divCard.style.transition = "opacity 0.5s, transform 0.5s";

      setTimeout(() => {
        divCard.style.opacity = 1;
        divCard.style.transform = "scale(1)";
      }, i * 300); // Délai d'animation entre chaque carte pour créer un effet de cascade
    }
  }
});
