function isWordInSentence(sentence, word) {
    const regex = new RegExp(`\\b${word}\\b`, 'i');  // 'i' for case-insensitive
    return regex.test(sentence);
}
async function getMatchData() {
    try {
        const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=b7050333-6602-4d9a-8e6b-9baa9335f70c&offset=0");
        const data = await response.json();

        if (data.status !== "success") {
            return ;
        }

        const matchdata = data.data;
        if (matchdata == null) {
            return [];
        }

        const relevant = matchdata.map(match => `${match.name},${match.date}, ${match.status}`);
        console.log(relevant);
        document.getElementById("matches").innerHTML=relevant.map(match=>`<li>${match}</li>`).join('');
        return relevant;
    } catch (error) {
        console.error("Error fetching match data:", error);
    }
}

getMatchData();
