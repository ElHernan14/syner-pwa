const modal = document.querySelector("#plan-modal");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const closeModalButton = document.querySelector("#close-modal");
const whatsappLink = document.querySelector("#whatsapp-link");
const planButtons = document.querySelectorAll(".js-open-plan");

/*
 * Reemplazar por el número real.
 * Formato internacional sin +, espacios ni guiones.
 *
 * Ejemplo Argentina:
 * 5492664000000
 */
const WHATSAPP_NUMBER = "5490000000000";

function buildWhatsappUrl(planName) {
  const message = [
    "Hola, quiero recibir información sobre SYNER.",
    `Me interesa el plan: ${planName}.`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openModal(title, description) {
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  whatsappLink.href = buildWhatsappUrl(title);

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
  closeModalButton.focus();
}

function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { title, description } = button.dataset;

    openModal(title, description);
  });
});

closeModalButton.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        "./service-worker.js",
      );

      console.info(
        "Service Worker registrado correctamente:",
        registration.scope,
      );
    } catch (error) {
      console.error("No se pudo registrar el Service Worker:", error);
    }
  });
}
