document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("join-team-form");
    const toast = document.getElementById("toast");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(form).entries());

        const res = await fetch("/join-team/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.ok) {
            form.reset();

            // Show toast
            toast.classList.remove("hidden");
            toast.classList.add("show");

            // Hide after 3 seconds
            setTimeout(() => {
                toast.classList.remove("show");
                setTimeout(() => toast.classList.add("hidden"), 400);
            }, 3000);
        } else {
            alert(data.message || "Something went wrong.");
        }
    });

});
