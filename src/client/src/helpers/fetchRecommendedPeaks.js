function fetchRecommendedPeaks (responses) {
    console.log(responses);
    const apiUrl = "http://localhost:5000/recommend-peaks";
    return fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ responses }),
        credentials: "include"
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Invalid response");
        }
        return res.json();
    })
    .then((data) => {
        return data;
    })
    .catch((err) => {
        console.error(err);
    })
}

export default fetchRecommendedPeaks;