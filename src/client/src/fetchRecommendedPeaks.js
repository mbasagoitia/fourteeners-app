function fetchRecommendedPeaks (responses) {
    const apiUrl = "http://localhost:5000/api/recommend-peaks";
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ responses })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("recommended peaks:", data);
    })
    .catch((err) => {
        console.error(err);
    })
}

export default fetchRecommendedPeaks;