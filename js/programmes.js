const API_URL = "http://localhost:3000/programmes";
const programmesList = document.getElementById("programmes-list");
const form = document.getElementById("programme-form");

const loadProgrammes = () => {
  axios.get(API_URL)
    .then(res => {
      programmesList.innerHTML = "";

      res.data.forEach(prog => {
        const card = document.createElement("div");
        card.classList.add("programme-card");
        card.innerHTML = `
          <h3>${prog.titre}</h3>
          <p>${prog.description}</p>
          <p><strong>Durée :</strong> ${prog.duree}</p>
          <p><strong>Compétences :</strong> ${prog.competences.join(", ")}</p>
        `;
        programmesList.appendChild(card);
      });
    })
    .catch(err => console.log("Erreur de chargement des programmes", err));
};

form.addEventListener("submit", e => {
  e.preventDefault();

  const newProgramme = {
    titre: document.getElementById("titre").value,
    description: document.getElementById("description").value,
    duree: document.getElementById("duree").value,
    competences: document.getElementById("competences").value.split(",").map(c => c.trim())
  };

  axios.post(API_URL, newProgramme)
    .then(() => {
      form.reset();
      loadProgrammes();
    })
    .catch(err => console.log("Erreur lors de l'ajout du programme", err));
});

loadProgrammes();
