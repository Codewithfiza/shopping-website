document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(
        ".reveal-left, .reveal-right, .reveal-down"
    );

    items.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add("active");
        }, 200 + index * 150);
    });
});
