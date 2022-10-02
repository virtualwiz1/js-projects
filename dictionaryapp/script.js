const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

var soundsrc = '';

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    console.log(inpWord);
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            
            for (let i = 0; i < 6; i++) {
                if (data[0].phonetics[i].audio != '' || data[0].meanings[0].definitions[i].definition != '' || data[0].meanings[0].definitions[i].example != '') {
                    soundsrc = data[0].phonetics[i].audio;
                    console.log(soundsrc);
                    sound.setAttribute("src", `${soundsrc}`);

                    result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
                    return;
                } else {
                    soundsrc = '';
                }
            }

            console.log(sound);
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});
function playSound() {
    sound.play();
}
