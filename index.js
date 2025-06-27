const imageModal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const modalDesc = document.getElementById("modalDesc");
const closeModalBtn = document.getElementById("closeModal");
let ACCESS_TOKEN = "r_2qo-MoJ91YudFS7421RnJTesDEEFDkumqWFI1riD0";
let keyword = document.getElementById("searchbar");
let val;
let page = 1;
async function fetchImg(val) {
  let response = await fetch(
    `https://api.unsplash.com/search/photos?query=${val}&client_id=${ACCESS_TOKEN}&page=${page}`
  );
  let result = await response.json();
  displayImg(result);
}

document.getElementById("searchbtn").addEventListener("click", (e) => {
  e.preventDefault();
  page = 1;
  document.getElementById("loadmorebtn").style.display = "block";
  document.getElementById("clearbtn").style.display = "block";

  val = keyword.value;
  if (val == "") {
    document.getElementById("images").innerHTML = "";
    document.getElementById("loadmorebtn").style.display = "none";
    document.getElementById("clearbtn").style.display = "none";
    alert("Please enter any value in text box");
    return;
  } else {
    document.getElementById("loadmorebtn").classList.add("visible");
    document.getElementById("clearbtn").classList.add("visible");
    document.getElementById("images").innerHTML = "";
    keyword.value = "";

    fetchImg(val);
  }
});

function displayImg(res) {
  res.results.map((data) => {
    let div = document.createElement("div");
    // div.setAttribute("class", "singleimage");
    div.innerHTML = `<div class="singleimage">
        <div class="firstdiv">
            <img class="userimg" src="${data.user.profile_image.large}" alt="user image">
            <p class="username">${data.user.name}</p>
        </div>
        <div class="seconddic">
            <img class="mainimg" src="${data.urls.regular}" alt="flowerimage">
            <p class="imagedes">${data.alt_description}</p>
        </div>
</div>`;
    document.getElementById("images").appendChild(div);
  });
}

document.getElementById("loadmorebtn").addEventListener("click", () => {
  document.getElementById("images").innerHTML = "";
  page++;
  fetchImg(val);
});
document.getElementById("clearbtn").addEventListener("click", () => {
  page = 1;
  document.getElementById("images").innerHTML = "";
  document.getElementById("loadmorebtn").style.display = "none";
  document.getElementById("clearbtn").style.display = "none";
});
