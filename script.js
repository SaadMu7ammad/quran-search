const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');
form.addEventListener('submit', (e) => {
  result.innerHTML = ' <p>Results will be displayed here...</p>'
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert('Please type in a search term');
  }
  console.log(searchTerm);
  // fetch(`http://api.alquran.cloud/v1/search/${searchTerm}/all/en`)
  fetch(`https://cors-anywhere.herokuapp.com/https://api.alquran.cloud/v1/search/${searchTerm}/all/en`)
    .then((d) => d.json())
    .then((d) => getVerses(d.data.matches))
    .catch((e) => {
      result.innerHTML = ' <p>Results will be displayed here</p>';
      result.querySelector('p').innerHTML = 'NOT FOUND A RESULT';
    }); //if the api not found a result
});
// console.log(verse.surah.name);
// console.log(verse.surah.englishName);
// console.log(verse.surah.englishNameTranslation);
// console.log(verse.surah);
// console.log(verse.text);

function getVerses(res) {
  // if (!res) return 'no result';
  let counter = 1;
  result.innerHTML = `<ul class="surahs"></ul>`;
  res.map((verse) => {
    console.log(verse);

    const li = document.createElement('li');
    li.innerHTML = `
    <div class="name">
    <span>${counter++}- ${verse.surah.name} | ${verse.surah.englishName}</span>
    <span>${verse.surah.englishNameTranslation}</span>
    <button class='btn' onclick='showTarget(event)'>show</button>
    </div>
   <p> ${verse.text}</p>`;
    console.log(li);
    result.querySelector('.surahs').appendChild(li);
  });
}
function showTarget(e) {
  console.log(e.target);
  // e.parent.querySelector('p').classlist=block
  e.target.parentNode.parentNode.querySelector('p').classList.toggle('show');
}
// function getVerses(res) {
//   res.forEach((verse) =>console.log(verse));
// }
