document.addEventListener("DOMContentLoaded", () => {
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptButton = document.getElementById("acceptCookies");

  const loadThirdPartyScripts = () => {
    // EmailJS
    const emailjsScript = document.createElement("script");
    emailjsScript.src = "https://cdn.emailjs.com/dist/email.min.js";
    document.head.appendChild(emailjsScript);

  };

  const insertVideo = () => {
    const videoContainer = document.getElementById("videoContainer");
    videoContainer.innerHTML = `
      <video
        muted
        playsinline
        autoplay
        loop
        preload="metadata"
        title="Promo video"
        class="video-background"
        style="width: 100%; height: auto; display: block"
        poster="./images/city.webp"
      >
        <source src="https://res.cloudinary.com/dkw7ke78q/video/upload/v1744379697/rrjvpj8bd3di1c0b4n48.mov" type="video/mp4" />
        Ваш браузер не підтримує відео.
      </video>
    `;
  };

  const insertImage = () => {
    const videoContainer = document.getElementById("videoContainer");
    videoContainer.innerHTML = `
      <img
        src="./images/city.webp"
        alt="Promo image"
        style="width: 100%; height: auto; display: block"
      />
    `;
  };

  if (localStorage.getItem("cookieAccepted")) {
    cookieBanner.style.display = "none";
    loadThirdPartyScripts();
    insertVideo();
  } else {
    insertImage();
  }

  acceptButton.addEventListener("click", () => {
    localStorage.setItem("cookieAccepted", "true");
    cookieBanner.style.display = "none";
    loadThirdPartyScripts();
    insertVideo();
  });
});
