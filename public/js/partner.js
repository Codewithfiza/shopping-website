document.addEventListener("DOMContentLoaded", () => {

    const animatedItems = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.2
    });

    animatedItems.forEach(item => observer.observe(item));
});
