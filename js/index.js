//listening words
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

//creating synonym
const createElements = (arr) => {
  // console.log(arr);
  if (arr.length == 0) {
    return "No synonym found";
  } else {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElements.join(" "); // adding space instead of comma in array elements
  }
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((json) => displayData(json.data));
};

const removeActive = () => {
  const lessonButton = document.querySelectorAll(".lesson-btn");
  // console.log(lessonButton);
  //remove all active class
  lessonButton.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true); // show spinner while loading words
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const clickedBtn = document.getElementById(`lesson-btn-${id}`);
      removeActive(); // remove all active class
      clickedBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(url);
  const response = await fetch(url);
  const details = await response.json();
  // console.log(details);
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  // console.log(word);

  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `

        <div>
            <h2>${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })</h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Synonym</h2>
            <div class="">${createElements(word.synonyms)}</div>
          </div>
    
    `;
  document.getElementById("my_modal_5").showModal();
};

const displayLevelWord = (words) => {
  //1. Get the container and make it empty.
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `

    <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
        <img src="./resources/images/alert-error.png" alt="" class="mx-auto">
        <p class="text-xl font-medium text-gray-400">এই lesson এ এখনো কোনো vocabulary যুক্ত করা হয়নি</p>
        <h2 class="font-medium text-3xl">নেক্সট lesson এ যান</h2>
      </div>
    
    `;

    manageSpinner(false);
    return;
  }

  //2. Get every Lessons
  words.forEach((word) => {
    // console.log(word);
    //3. Create Element
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
        
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h2>
        <p class="font-semibold">Meaning / pronunciation</p>
        <div class="font-bangla text-2xl font-medium">"${
          word.meaning ? word.meaning : "শব্দার্থ পাওয়া যায়নি"
        } / ${
      word.pronunciation ? word.pronunciation : "উচ্চারন পাওয়া যায়নি"
    }"</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetails(${
            word.id
          })" class="btn bg-[#1a91af10] hover:bg-[#1a91af80]"><i class="fa-solid fa-circle-info"></i></button>
          <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1a91af10] hover:bg-[#1a91af80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
        
        `;

    wordContainer.appendChild(wordDiv);
    manageSpinner(false); //hide spinner after displaying words
  });
};

const displayData = (lessons) => {
  //1. Get the container and make it empty.
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  //2. Get every lessons
  for (let lesson of lessons) {
    //3. Create elements
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `

        <button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>

        `;

    //4. Append element
    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();

document.getElementById("btn-search").addEventListener("click", ()=>{

    removeActive();
    const inputSearch = document.getElementById("input-search");
    const searchValue = inputSearch.value.trim().toLowerCase();

    console.log(searchValue);

    //fetch all words

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(data=> {
        const allWords = data.data;
        console.log(allWords);
        const filterdWord = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
        console.log(filterdWord);
        displayLevelWord(filterdWord);
    })


})
