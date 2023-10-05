function fetchRecommendedPeaks (responses) {
    const apiUrl = "http://localhost:5000/api/recommend-peaks";
    return fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ responses })
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Invalid response");
        }
        return res.json();
    })
    .then((data) => {
        console.log(data);
        return data;
    })
    .catch((err) => {
        console.error(err);
    })
}

export default fetchRecommendedPeaks;