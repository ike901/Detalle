/* ==========================================================
   CONFIGURACIÓN
   ========================================================== */

/*
   FECHA DE INICIO:
   Cambia esta fecha por la fecha que quieras utilizar
   para el contador.
*/
const fechaInicio = "2026-08-01";

/*
   CONTENIDO DE LAS CARTAS
   Puedes modificar libremente los textos.
*/
const cards = {

  letter: {
    icon: "💌",
    title: "Una carta para ti",
    body: `
      <div class="modal-text">
        Hay cosas que a veces no digo porque simplemente
        me cuesta encontrar el momento adecuado.
        <br><br>
        Pero quería dejar esto aquí para que pudieras leerlo
        cuando quisieras:
        <br><br>
        <strong>Me alegra que nuestras historias hayan vuelto
        a encontrarse.</strong>
        <br><br>
        Y aunque no sé exactamente qué nos espera,
        me gusta saber que todavía podemos crear recuerdos
        que algún día vamos a mirar con cariño.
        <br><br>
        No hice esta cápsula porque hubiera una fecha especial.
        La hice porque hoy pensé en ti.
      </div>
    `
  },

  photo: {
    icon: "📸",
    title: "Un recuerdo",
    body: `
      <img class="modal-image" src="img/foto3.jpg" alt="Recuerdo">
      <div class="modal-text">
        Este es uno de esos momentos que quiero conservar.
        <br><br>
        Quizá para alguien más sea solamente una fotografía,
        pero para mí tiene una historia detrás.
      </div>
    `
  },

  admire: {
    icon: "🌷",
    title: "Lo que admiro de ti",
    body: `
      <div class="modal-text">
        Admiro tu forma de seguir adelante incluso cuando
        las cosas no son fáciles.
        <br><br>
        Admiro las pequeñas cosas que haces y que quizá
        tú misma no consideras importantes.
        <br><br>
        Y sobre todo, admiro esa parte de ti que todavía
        puede sorprenderme.
      </div>
    `
  },

  future: {
    icon: "✨",
    title: "Lo que todavía quiero vivir",
    body: `
      <div class="modal-text">
        No quiero llenar esta parte con promesas enormes.
        <br><br>
        Prefiero cosas sencillas:
        <br><br>
        Una salida improvisada.<br>
        Una noche hablando hasta tarde.<br>
        Un viaje juntos.<br>
        Una fotografía que todavía no existe.<br>
        Una tarde en la que no tengamos absolutamente nada
        que hacer.
        <br><br>
        Porque quizá los mejores recuerdos terminen siendo
        precisamente los que no planeamos demasiado.
      </div>
    `
  }
};


/* ==========================================================
   ELEMENTOS
   ========================================================== */

const intro = document.getElementById("intro");
const capsule = document.getElementById("capsule");
const openCapsule = document.getElementById("openCapsule");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

document.getElementById("year").textContent = new Date().getFullYear();


/* ==========================================================
   ABRIR CÁPSULA
   ========================================================== */

openCapsule.addEventListener("click", () => {

  intro.classList.remove("active");

  setTimeout(() => {
    capsule.classList.add("active");
    startRevealAnimation();
    calculateDays();
  }, 300);

  /*
    Los navegadores, especialmente iPhone/Safari,
    permiten reproducir audio después de una interacción.
  */
  music.play()
    .then(() => {
      musicBtn.classList.add("playing");
    })
    .catch(() => {
      console.log("El navegador bloqueó el autoplay.");
    });
});


/* ==========================================================
   MODALES
   ========================================================== */

document.querySelectorAll(".open-card").forEach(button => {

  button.addEventListener("click", () => {

    const cardName = button.dataset.card;
    const data = cards[cardName];

    modalIcon.textContent = data.icon;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.body;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

});


function closeModalFunction() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

closeModal.addEventListener("click", closeModalFunction);

document.querySelector(".modal-backdrop").addEventListener(
  "click",
  closeModalFunction
);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModalFunction();
  }
});


/* ==========================================================
   CONTADOR
   ========================================================== */

function calculateDays() {

  const start = new Date(fechaInicio + "T00:00:00");
  const today = new Date();

  const difference = today - start;
  const days = Math.max(
    0,
    Math.floor(difference / (1000 * 60 * 60 * 24))
  );

  document.getElementById("daysCounter").textContent = days;
}


/* ==========================================================
   ANIMACIONES AL HACER SCROLL
   ========================================================== */

function startRevealAnimation() {

  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  elements.forEach(element => observer.observe(element));
}


/* ==========================================================
   MÚSICA
   ========================================================== */

musicBtn.addEventListener("click", () => {

  if (music.paused) {

    music.play()
      .then(() => {
        musicBtn.classList.add("playing");
        musicBtn.textContent = "♫";
      });

  } else {

    music.pause();
    musicBtn.classList.remove("playing");
    musicBtn.textContent = "♪";
  }

});


/* ==========================================================
   INTENTO DE AUTOPLAY
   ========================================================== */

window.addEventListener("load", () => {

  /*
    Algunos navegadores permiten autoplay si el audio
    está silenciado inicialmente. Aquí no forzamos el audio
    para evitar problemas en iPhone.

    El primer clic en "Abrir cápsula" activa la música.
  */

  intro.classList.add("active");

});
