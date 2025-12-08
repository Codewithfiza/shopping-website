document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("partner-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(form).entries());

        const res = await fetch("/partner/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.ok) {
            alert("Application submitted successfully!");
            form.reset();
        } else {
            alert(data.message || "Something went wrong.");
        }
    });

});
