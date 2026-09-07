/* ==========================================================
   CONFIGURACIÓN
   ========================================================== */

/*
   FECHA DE INICIO:
   Cambia esta fecha por la fecha que quieras utilizar
   para el contador.
*/

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
        
         <br><br>
         Hay algo especial en poder volver a compartir momentos contigo después de tantos años, descubrirnos nuevamente y ver todo lo que hemos cambiado desde entonces.
         <br><br>
         No voy a negar que contigo he empezado a imaginar cosas que antes simplemente no estaban en mis plans. He pensado en compartir más momentos, en crecer juntos, en construir algo bonito y, algún día, formar una familia. Es algo que te he dicho porque es lo que realmente quiero, no porque espere que tú tengas que sentir exactamente lo mismo ahora.
         También entiendo que tienes tus propios miedos, tus dudas y tu propio camino. Y quiero aprender a respetar eso.
        <br><br>
        <strong>No quiero que sientas que tienes que tener todas las respuestas hoy </strong>
        <br><br> 
        Quizás no sepamos exactamente qué va a pasar con nosotros. Quizás todavía tengamos muchas cosas que aprender, sanar y descubrir. Pero creo que algunas historias no necesitan tener todo escrito para que valga la pena seguir viviéndolas.

        <br><br>
        Por eso hice esta pequeña cápsula.
         <br>
         No por una fecha especial.
          <br>
         No porque espere algo de ti.
          <br>
         No para convencerte de nada.
         <br> <br>
         La hice simplemente porque hoy pensé en ti y quise dejarte un recuerdo de lo que siento.
         <br>
         <strong> Con cariño,
         Joe </strong>

      </div>
    `
  },

  photo: {
    icon: "📸",
    title: "Un recuerdo",
    body: `
      <img class="modal-image" src="img/foto1.jpg" alt="Recuerdo">
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
        Admiro tu fortaleza, incluso en esos momentos en los que quizá tú misma no te das cuenta de lo fuerte que eres.
        <br><br>
        Admiro tu forma de sentir, de pensar y de defender lo que quieres, porque detrás de todo eso hay una mujer con mucho valor.
        <br><br>
        Y sobre todo, admiro esa esencia que tienes, porque incluso con todo lo que hemos vivido, sigues siendo alguien que quiero conocer, cuidar y valorar cada día más. ❤️
      </div>
    `
  },

  future: {
    icon: "✨",
    title: "Lo que todavía quiero vivir",
    body: `
      <div class="modal-text">
       
        Quiero vivir un camino contigo, no uno perfecto, sino uno real.
        Un camino donde, aunque aparezcan obstáculos, aprendamos a tomarnos de la mano y seguir adelante.
        <br>
        Quiero vivir más momentos, más risas, más conversaciones, más aventuras y también esos días difíciles en los que podamos elegirnos nuevamente.
        <br>
          No quiero apresurar el futuro. Quiero construirlo poco a poco, convirtiéndome en la persona que pueda caminar a tu lado y demostrártelo con hechos..
        <br>
        <br>
         Tener una album con muchos recuerdos, y que cada uno de ellos sea un testimonio de lo que hemos vivido juntos.
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
