document.addEventListener("DOMContentLoaded", () => {
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptButton = document.getElementById("acceptCookies");
  const videoContainer = document.getElementById("videoContainer");
  let videoInserted = false;

  const loadThirdPartyScripts = () => {
    const emailjsScript = document.createElement("script");
    emailjsScript.src = "https://cdn.emailjs.com/dist/email.min.js";
    document.head.appendChild(emailjsScript);
  };

  const insertVideo = () => {
    if (videoInserted) return;
    videoInserted = true;

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
    videoContainer.innerHTML = `
      <img
        src="./images/city.webp"
        alt="Promo image"
        style="width: 100%; height: auto; display: block"
      />
    `;
  };

  const handleCookieAccepted = () => {
    cookieBanner.style.display = "none";
    loadThirdPartyScripts();
    insertImage();
    observeVideoSection();
  };

  const observeVideoSection = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && localStorage.getItem("cookieAccepted")) {
            insertVideo();
            observer.unobserve(videoContainer);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
      }
    );
    observer.observe(videoContainer);
  };

  if (localStorage.getItem("cookieAccepted")) {
    handleCookieAccepted();
  } else {
    insertImage();
  }

  acceptButton.addEventListener("click", () => {
    localStorage.setItem("cookieAccepted", "true");
    handleCookieAccepted();
  });
});
