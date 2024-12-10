document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navbarRight = document.querySelector(".navbar-right");

    // Toggle dropdown
    hamburger.addEventListener("click", () => {
        navbarRight.classList.toggle("active");
    });

    // Close dropdown on link click
    document.querySelectorAll(".navbar-right a").forEach(link => {
        link.addEventListener("click", () => {
            navbarRight.classList.remove("active");
        });
    });
});