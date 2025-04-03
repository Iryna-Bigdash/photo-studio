document.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll(".footer-list .item h3");

    headers.forEach((header) => {
        header.addEventListener("click", () => {
            const list = header.nextElementSibling;
            if (list && list.classList.contains("footer-menu")) {
                list.classList.toggle("is-open");
            }
        });
    });
});

  