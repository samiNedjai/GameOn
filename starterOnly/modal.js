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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal function (à utiliser si nécessaire)
function closeModal() {
  modalbg.style.display = "none";
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Validate form on submit
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  if(validateForm()) {
    // Si la validation est réussie, afficher le message de remerciement
    showModalThankYou();
  }
});

// Validate form en Real-time 
function validateForm() {
    let isValid = true; // Initialiser comme valide
    const today = new Date();
    const minimumAge = 18;
    const firstName = document.getElementById("first");
    const lastName = document.getElementById("last");
    const email = document.getElementById("email");
    const birthdate = document.getElementById("birthdate");
    const locations = document.querySelectorAll('input[name="location"]');
    const termsAccepted = document.getElementById("checkbox1").checked;

    // Validation pour firstName et lastName (doivent contenir au moins 2 caractères et pas de chiffres)
    [firstName, lastName].forEach(field => {
        if (field.value.length < 2 || /\d/.test(field.value)) {
            displayError(field, "Doit contenir au moins 2 caractères et pas de chiffres.");
            isValid = false;
        } else {
            clearError(field);
        }
    });

    // Validation pour email (doit respecter le format d'une adresse email)
    if (!/\S+@\S+\.\S+/.test(email.value)) {
        displayError(email, "Doit être une adresse email valide.");
        isValid = false;
    } else {
        clearError(email);
    }

    // Validation pour la date de naissance
    if (birthdate.value === "") {
      // Si l'utilisateur n'a pas sélectionné de date
      displayError(birthdate, "Veuillez sélectionner une date.");
      isValid = false;
  } else {
      let birthDate = new Date(birthdate.value);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      if (age < minimumAge) {
          // Si l'utilisateur a moins de 18 ans
          displayError(birthdate, `Vous devez avoir plus de ${minimumAge} ans.`);
          isValid = false;
      } else {
          clearError(birthdate);
      }
  }

    // Validation pour la sélection d'une ville (au moins une ville doit être sélectionnée)
    if (locations.length === 0) {
        displayError(document.querySelector(".text-label"), "Vous devez sélectionner une ville.", true);
        isValid = false;
    } else {
        clearError(document.querySelector(".text-label"), true);
    }

    // Validation des conditions d'utilisation (doit être cochée)
    if (!termsAccepted) {
        displayError(document.getElementById("checkbox1"), "Vous devez accepter les conditions d'utilisation.", true);
        isValid = false;
    } else {
        clearError(document.getElementById("checkbox1"), true);
    }

    return isValid;
}

// Afficher les messages d'erreur
function displayError(input, message, isCheckboxOrRadio = false) {
    const parent = isCheckboxOrRadio ? input.parentNode.parentNode : input.parentElement; // Parent correct pour les checkboxes/radios
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
    const parent = isCheckboxOrRadio ? input.parentNode.parentNode : input.parentElement; // Parent correct pour les checkboxes/radios
    const error = parent.querySelector(".error-message");
    if (error) {
        parent.removeChild(error);
    }
}

// Afficher le modal de remerciement et ajouter un bouton pour fermer le modal
function showModalThankYou() {
  // Nettoyer le contenu du modal pour afficher le message de remerciement
  modalbg.innerHTML = `
    
      <div class='content'>
          <span class='close' id='closeModal'></span>
          <div class='modal-body'>
              <h2>Merci pour votre inscription!</h2>
              <button class='btn-submit' id='closeThanks'>Fermer</button>
          </div>
      </div>`;

  // Sélectionner les nouveaux éléments pour fermer le modal
  const closeModalButton = document.getElementById('closeThanks');
  const closeModalCross = document.getElementById('closeModal');
 // Assurez-vous que cette ligne est présente pour capturer l'élément close
const closeBtn = document.getElementById('closebtn'); // Capture le bouton de fermeture

  // Ajoutez un écouteur d'événements pour fermer le modal lorsque la croix est cliquée
  closeBtn.addEventListener("click", closeModal);

  // Ajouter l'événement onclick pour fermer le modal avec le bouton
  closeModalButton.addEventListener('click', closeModal);

  // Ajouter l'événement onclick pour fermer le modal avec la croix (✕)
  closeModalCross.addEventListener('click', closeModal);
}



