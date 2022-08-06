const cardOfHumans = document.getElementById("allHumans");
const searchBar = document.getElementById("search");
const checkboxesGender = document.getElementById("filter_gender");

let arrFiltered;
fetch("https://randomuser.me/api/?results=10")
  .then((response) => response.json())
  .then((users) => {
    const friends = users.results;
    displayUsers(friends);
    sortFriends(friends);
    selectFriends(friends);
    filterByGender(friends);
    searchFriends(friends);
  });
// function renderFriends () {

// }
const displayUsers = (friends) => {
  const htmlString = friends
    .map((item) => {
      return `<div class="card_person">
    <div class="card_container">
    <img src="${item.picture.large}">
    <h3 class="card_h3">${item.name.first} ${item.name.last}</h3>
    <p class="card_age">Age: ${item.dob.age}</p>
    <p class="card_gender">Gender: ${item.gender}</p>
    </div>
    </div>`;
    })
    .join("");
  cardOfHumans.innerHTML = htmlString;
};

function increaseSortByName(friends) {
  let sortedIncrease = friends.sort(function (a, b) {
    if (a.name.first.toLowerCase() < b.name.first.toLowerCase()) return -1;
    if (a.name.first.toLowerCase() > b.name.first.toLowerCase()) return 1;
    return 0;
  });
  displayUsers(sortedIncrease);
}
function decreaseSortByName(friends) {
  let sortedDecrease = friends.sort(function (a, b) {
    if (a.name.first.toLowerCase() > b.name.first.toLowerCase()) return -1;
    if (a.name.first.toLowerCase() < b.name.first.toLowerCase()) return 1;
    return 0;
  });
  displayUsers(sortedDecrease);
}
function sortFriends(friends) {
  document.querySelector(".filter_menu").addEventListener("click", (event) => {
    const button = event.target.id;
    switch (button) {
      case "a-z":
        increaseSortByName(friends);
        break;
      case "z-a":
        decreaseSortByName(friends);
        break;
      case "0-9":
        increaseSortByAge(friends);
        break;
      case "9-0":
        decreaseSortByAge(friends);
        break;
    }
  });
}
function increaseSortByAge(friends) {
  let sortedAgeIncrease = friends.sort(function (a, b) {
    return a.dob.age - b.dob.age;
  });
  displayUsers(sortedAgeIncrease);
}
function decreaseSortByAge(friends) {
  let sortedAgeDecrease = friends.sort(function (a, b) {
    return b.dob.age - a.dob.age;
  });
  displayUsers(sortedAgeDecrease);
}
function filterByGender(friends) {
  let checkboxes = Array.from(
    document.querySelectorAll(".gender_checkbox:checked")
  );
  arrFiltered = friends.filter((item) => {
    return checkboxes.some((gender) => {
      return item.gender === gender.value;
    });
  });
  console.log(arrFiltered);
  displayUsers(arrFiltered);
}
function selectFriends(friends) {
  filterByGender(friends);
  if (arrFiltered.length == 0) {
    cardOfHumans.innerHTML = "";
  } else {
    displayUsers(arrFiltered);
  }
}

// SEARCH

function searchFriends() {
  searchBar.addEventListener("keyup", (e) => {
    let searchedFriend = e.target.value.toLowerCase();
    let filteredFriends = arrFiltered.filter((item) => {
      return (
        item.name.first.toLowerCase().includes(searchedFriend) ||
        item.name.last.toLowerCase().includes(searchedFriend)
      );
    });
    displayUsers(filteredFriends);
  });
}
