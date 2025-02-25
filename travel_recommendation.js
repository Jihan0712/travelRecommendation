let travelData = null;

document.addEventListener("DOMContentLoaded", () => {
    fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched data:", data); // Debugging
            travelData = data;
        })
        .catch(error => console.error("Error fetching data:", error));
});

function performSearch() {
    if (!travelData) {
        alert("Data is still loading. Please try again in a moment.");
        return;
    }

    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    const resultsContainer = document.getElementById("resultsContainer");

    if (!searchInput) {
        alert("Please enter a keyword to search.");
        return;
    }

    resultsContainer.innerHTML = "";

    const allItems = [
        ...travelData.countries.flatMap(country => country.cities.map(city => ({ ...city, category: "Country" }))),
        ...travelData.temples.map(temple => ({ ...temple, category: "Temple" })),
        ...travelData.beaches.map(beach => ({ ...beach, category: "Beach" }))
    ];

    let filteredResults = [];
    if (searchInput === "beach" || searchInput === "beaches") {
        filteredResults = travelData.beaches.slice(0, 2);
    } else if (searchInput === "temple" || searchInput === "temples") {
        filteredResults = travelData.temples.slice(0, 2);
    } else if (searchInput === "country" || searchInput === "countries") {
        filteredResults = travelData.countries.flatMap(country => country.cities).slice(0, 2);
    } else {
        filteredResults = allItems.filter(item => item.name.toLowerCase().includes(searchInput));
    }

    if (filteredResults.length > 0) {
        filteredResults.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("result-card");

            const image = document.createElement("img");
            image.src = item.imageUrl;
            image.alt = item.name;

            const title = document.createElement("h3");
            title.textContent = item.name;

            const description = document.createElement("p");
            description.textContent = item.description;

            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(description);

            resultsContainer.appendChild(card);
        });
    } else {
        resultsContainer.innerHTML = "<p>No results found for your search.</p>";
    }
}

function resetResults() {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";
    document.getElementById("searchInput").value = "";
}

function performSearch() {
    console.log("Search button clicked!"); // Debugging: Confirm the function is called

    if (!travelData) {
        console.error("Data is not loaded yet."); // Debugging: Check if data is loaded
        alert("Data is still loading. Please try again in a moment.");
        return;
    }

    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    console.log("Search input:", searchInput); // Debugging: Log the user's input

    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";

    const allItems = [
        ...travelData.countries.flatMap(country => country.cities.map(city => ({ ...city, category: "Country" }))),
        ...travelData.temples.map(temple => ({ ...temple, category: "Temple" })),
        ...travelData.beaches.map(beach => ({ ...beach, category: "Beach" }))
    ];

    let filteredResults = [];
    if (searchInput === "beach" || searchInput === "beaches") {
        filteredResults = travelData.beaches.slice(0, 2);
    } else if (searchInput === "temple" || searchInput === "temples") {
        filteredResults = travelData.temples.slice(0, 2);
    } else if (searchInput === "country" || searchInput === "countries") {
        filteredResults = travelData.countries.flatMap(country => country.cities).slice(0, 2);
    } else {
        filteredResults = allItems.filter(item => item.name.toLowerCase().includes(searchInput));
    }

    console.log("Filtered results:", filteredResults); // Debugging: Log the filtered results

    if (filteredResults.length > 0) {
        filteredResults.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("result-card");

            const image = document.createElement("img");
            image.src = item.imageUrl;
            image.alt = item.name;

            const title = document.createElement("h3");
            title.textContent = item.name;

            const description = document.createElement("p");
            description.textContent = item.description;

            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(description);

            resultsContainer.appendChild(card);
        });
    } else {
        resultsContainer.innerHTML = "<p>No results found for your search.</p>";
    }
}