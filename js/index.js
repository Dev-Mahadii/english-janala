const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((json) => displayData(json.data));
};

const loadLevelWord = (id) => {
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  //1. Get the container and make it empty.
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if(words.length == 0){
    alert("No word found");
    return;
  }

  //2. Get every Lessons
  words.forEach((word) => {
    // console.log(word);
    //3. Create Element
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
        
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word}</h2>
        <p class="font-semibold">Meaning / pronunciation</p>
        <div class="font-bangla text-2xl font-medium">"${word.meaning} / ${word.pronunciation}"</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1a91af10] hover:bg-[#1a91af80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1a91af10] hover:bg-[#1a91af80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
        
        `;

    wordContainer.appendChild(wordDiv);
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

        <button onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>

        `;

    //4. Append element
    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();
