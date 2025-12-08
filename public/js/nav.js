document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.querySelector(".menu-toggle");
    const closeBtn = document.querySelector(".close-menu");
    const navLinks = document.querySelector(".nav-links");
    const backdrop = document.getElementById("nav-backdrop");

    function openMenu() {
        navLinks.classList.add("open");
        backdrop.classList.add("show");
    }

    function closeMenu() {
        navLinks.classList.remove("open");
        backdrop.classList.remove("show");
    }

    // OPEN MENU
    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openMenu();
    });

    // CLOSE MENU (ONLY X BUTTON)
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeMenu();
    });

    // CLICK BACKDROP → CLOSE MENU
    backdrop.addEventListener("click", () => {
        closeMenu();
    });

    // *** FIX: Do NOT close menu when clicking nav links ***
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", (e) => {
            // Let the navigation happen normally
            // Do NOT close the menu here
            e.stopPropagation();  
        });
    });

});
