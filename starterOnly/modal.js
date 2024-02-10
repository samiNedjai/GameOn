function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("form[name='reserve']");
const closeBtn = document.querySelector(".close");

// Pour désactiver le défilement
function disableScroll() {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
}

// Pour réactiver le défilement
function enableScroll() {
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal function
function closeModal() {
  modalbg.style.display = "none";
  enableScroll(); // Réactive le défilement
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  closeBtn.addEventListener("click", closeModal);
  disableScroll(); // Désactive le défilement
}

// Validate form on submit
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  if (validateForm()) {
    // Si la validation est réussie, afficher le message de remerciement
    showModalThankYou();
  }
});
// Validate form en Real-time
document.getElementById("first").addEventListener("input", validateFirstName);
document.getElementById("last").addEventListener("input", validateLastName);
document.getElementById("email").addEventListener("input", validateEmail);
document
  .getElementById("birthdate")
  .addEventListener("input", validateBirthdate);
document
  .getElementById("quantity")
  .addEventListener("input", validateTournaments);

// Pour chaque input de type radio pour la ville, ajoutez un écouteur.
// Cela suppose que vous avez un groupe de boutons radio avec le nom "location".
const locationRadios = document.querySelectorAll('input[name="location"]');
locationRadios.forEach((radio) => {
  radio.addEventListener("change", validateCitySelection);
});

document.getElementById("checkbox1").addEventListener("change", validateTerms);

// Validate first name
function validateFirstName() {
  const firstName = document.getElementById("first");
  if (firstName.value.length < 2 || /\d/.test(firstName.value)) {
    displayError(
      firstName,
      "Prénom doit contenir au moins 2 caractères et pas de chiffres."
    );
    return false;
  } else {
    clearError(firstName);
    return true;
  }
}

// Validate last name
function validateLastName() {
  const lastName = document.getElementById("last");
  if (lastName.value.length < 2 || /\d/.test(lastName.value)) {
    displayError(
      lastName,
      "Nom doit contenir au moins 2 caractères et pas de chiffres."
    );
    return false;
  } else {
    clearError(lastName);
    return true;
  }
}

// Validate email
function validateEmail() {
  const email = document.getElementById("email");
  if (!/\S+@\S+\.\S+/.test(email.value)) {
    displayError(email, "Doit être une adresse email valide.");
    return false;
  } else {
    clearError(email);
    return true;
  }
}

// Validate Birthdate
function validateBirthdate() {
  const birthdate = document.getElementById("birthdate");
  const today = new Date();
  const minimumAge = 18;
  if (birthdate.value === "") {
    displayError(birthdate, "Veuillez sélectionner une date.");
    return false;
  } else {
    let birthDate = new Date(birthdate.value);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < minimumAge) {
      displayError(birthdate, `Vous devez avoir plus de ${minimumAge} ans.`);
      return false;
    } else {
      clearError(birthdate);
      return true;
    }
  }
}
//  Validate nombre de tournois
function validateTournaments() {
  const tournaments = document.getElementById("quantity");
  if (!tournaments.value || isNaN(tournaments.value) || tournaments.value < 0) {
    displayError(tournaments, "Veuillez entrer un nombre valide de tournois.");
    return false;
  } else {
    clearError(tournaments);
    return true;
  }
}
// Validation de la sélection d'une ville
function validateCitySelection() {
  const locations = document.querySelectorAll('input[name="location"]:checked');
  if (locations.length === 0) {
    displayError(
      document.querySelector(".text-label"),
      "Vous devez sélectionner une ville.",
      true
    );
    return false;
  } else {
    clearError(document.querySelector(".text-label"), true);
    return true;
  }
}
// Validation de l'acceptation des conditions d'utilisation
function validateTerms() {
  const termsAccepted = document.getElementById("checkbox1").checked;
  if (!termsAccepted) {
    displayError(
      document.getElementById("checkbox1"),
      "Vous devez accepter les conditions d'utilisation.",
      true
    );
    return false;
  } else {
    clearError(document.getElementById("checkbox1"), true);
    return true;
  }
}

// Validate form (including other validations)
function validateForm() {
  // Utilisez un opérateur logique AND pour combiner les validations
  const isFormValid =
    validateFirstName() &&
    validateLastName() &&
    validateEmail() &&
    validateBirthdate() &&
    validateTournaments() &&
    validateCitySelection() &&
    validateTerms();
  return isFormValid;
}

// Afficher les messages d'erreur
function displayError(input, message, isCheckboxOrRadio = false) {
  const parent = isCheckboxOrRadio
    ? input.parentNode.parentNode
    : input.parentElement; // Parent correct pour les checkboxes/radios
  let error = parent.querySelector(".error-message");
  if (!error) {
    error = document.createElement("div");
    error.className = "error-message";
    parent.appendChild(error);
  }
  error.textContent = message;
}

// Effacer les messages d'erreur
function clearError(input, isCheckboxOrRadio = false) {
  const parent = isCheckboxOrRadio
    ? input.parentNode.parentNode
    : input.parentElement; // Parent correct pour les checkboxes/radios
  const error = parent.querySelector(".error-message");
  if (error) {
    parent.removeChild(error);
  }
}

// Afficher le modal de remerciement et ajouter un bouton pour fermer le modal
function showModalThankYou() {
  // Nettoyer le contenu du modal pour afficher le message de remerciement
  modalbg.innerHTML = `
    <div class='bground-2'">
      <div class='content '>
          <span class='close' id='closeModal'></span>
          <div class='modal-body popupConfirm'>
              <h2 class= 'texe-confirm'>Merci pour votre inscription!</h2>
              <button class='btn-submit ' id='closeThanks'>Fermer</button>
          </div>
      </div>
    </div>`;

  // Sélectionner les nouveaux éléments pour fermer le modal
  const closeModalButton = document.getElementById("closeThanks");
  const closeModalCross = document.getElementById("closeModal");
  closeModalButton.addEventListener("click", closeModal);
  closeModalCross.addEventListener("click", closeModal);
}
