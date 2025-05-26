document.addEventListener("DOMContentLoaded", () => {
    console.log("Navbar script loaded"); // Debugging log

    // Define the routes for navigation
    const routes = {
        home: "/index.html",
        about: "/index.html#about",
        rooms: "/index.html#services",
        programs: "/index.html#gallery",
        admissions: "/src/pages/admissions.html"
    };

    // Select the parent element (e.g., the <ul> or <nav>)
    const navbar = document.querySelector("#navbar-list");

    if (!navbar) {
        console.error("Navbar element not found. Check your HTML structure.");
        return;
    }

    // Use event delegation to handle clicks on dynamically added buttons
    navbar.addEventListener("click", (event) => {
        const button = event.target.closest(".nav-btn"); // Check if the clicked element is a button with the class 'nav-btn'
        if (button) {
            const routeKey = button.getAttribute("data-route"); // Get the route key from the data attribute
            console.log(`Button clicked: ${routeKey}`); // Debugging log
            if (routes[routeKey]) {
                window.location.href = routes[routeKey]; // Navigate to the corresponding route
            } else {
                console.error(`Route "${routeKey}" is not defined in routes.`);
            }
        }
    });
});