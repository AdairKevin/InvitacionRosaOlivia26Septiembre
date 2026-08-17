function abrirSobre() {
  const sobre = document.querySelector(".envelope");
  const musica = document.getElementById("musica1");

  if (!sobre.classList.contains("abierto")) {
    sobre.classList.add("abierto");
    sobre.onclick = null;
    musica.volume = 0.8;
    musica.loop = true;

    musica
      .play()
      .then(() => {
        console.log("🎵 Música iniciada");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const DATE_TARGET = new Date("09/26/2026 06:00 PM");

  const SPAN_DAYS = document.querySelector("span#days");
  const SPAN_HOURS = document.querySelector("span#hours");
  const SPAN_MINUTES = document.querySelector("span#minutes");
  const SPAN_SECONDS = document.querySelector("span#seconds");

  const MILLISECONDS_OF_A_SECOND = 1000;
  const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
  const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
  const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24;

  function updateCountdown() {
    const NOW = new Date();
    const DURATION = DATE_TARGET - NOW;
    const REMAINING_DAYS = Math.floor(DURATION / MILLISECONDS_OF_A_DAY);
    const REMAINING_HOURS = Math.floor(
      (DURATION % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR,
    );
    const REMAINING_MINUTES = Math.floor(
      (DURATION % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE,
    );
    const REMAINING_SECONDS = Math.floor(
      (DURATION % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND,
    );

    SPAN_DAYS.textContent = REMAINING_DAYS;
    SPAN_HOURS.textContent = REMAINING_HOURS;
    SPAN_MINUTES.textContent = REMAINING_MINUTES;
    SPAN_SECONDS.textContent = REMAINING_SECONDS;
  }

  updateCountdown();

  setInterval(updateCountdown, MILLISECONDS_OF_A_SECOND);
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Obtener el código de la URL
    const codigo = new URLSearchParams(window.location.search).get("id");

    if (!codigo) {
      document.getElementById("nombre").textContent = "Código no encontrado";
      return;
    }

    // Leer el archivo JSON
    const response = await fetch("./files/links.json");
    const boletos = await response.json();

    // Buscar invitado
    const invitado = boletos[codigo];

    if (!invitado) {
      document.getElementById("nombre").textContent = "Invitación inválida";
      return;
    }

    // Mostrar datos
    document.getElementById("nombre").textContent = invitado.nombre;
    document.getElementById("pasesAdulto").textContent = invitado.pasesAdulto;
  } catch (error) {
    console.error(error);
    document.getElementById("nombre").textContent = "Error al cargar datos";
  }
});
