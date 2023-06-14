const MovieList = document.getElementById('movie');
let list = [];

const fetchData = () => {
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=1")
        .then((res) => res.json())
        .then((data) => {
            list = data.results;
            // console.log(list);
            // list.map((item)=>{
            //     console.log(item);
            //     createCard(item);
            // });
            renderList(list,MovieList);
        })
        .catch((err) => console.log(err))
}
fetchData();
// const reRenderCardGrid = (updatedMoviesList, movieGrid) => {
//     movieGrid.innerHTML = "";
  
//     updatedMoviesList.forEach((movie) => createMovieCard(movie, movieGrid));
//   };

const renderList = (list, cardId) => {
    cardId.innerHTML="";
    // console.log(list);
    list.map((item) => {
        // console.log(item);
        createCard(item ,cardId);
    });
}
const createCard = (item, cardId) => {
    const{original_title,poster_path,release_date,vote_count}=item;
    const parentDiv = document.createElement("div");
    parentDiv.className = "card-container";
    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
    img.className = "card-image";

    const textDiv = document.createElement("div");
    textDiv.className = "card-textdiv";
    const title = document.createElement("h2");
    title.innerHTML = original_title;
    title.className = "card-title";

    const para = document.createElement("p");
    para.className = "card-para"
    const year = document.createElement("span");
    year.innerHTML = `Year : ${release_date}`;
    const rating = document.createElement("span");
    rating.innerHTML = `Number of Ratings-${vote_count}`;
    para.append(year, rating);
    // button
    const button=document.createElement("button");
    button.addEventListener('click',()=>{
        
    })

    textDiv.append(title, para);

    parentDiv.append(img, textDiv);
    // console.log(parentDiv);
    cardId.append(parentDiv); // MovieList.append(parentDiv);
}

// toggle theme
function toggleTheme() {
    let toggleIcon = document.getElementById("toggleIcon");
    if (document.body.style.backgroundColor == 'black') {
        document.body.style.backgroundColor = 'lime';
        toggleIcon.classList.remove("fa-moon");
        toggleIcon.style.color = "yellow";
        toggleIcon.classList.add("fa-sun");
    } else {
        document.body.style.backgroundColor = 'black';
        toggleIcon.classList.remove("fa-sun");
        toggleIcon.classList.add("fa-moon");
        toggleIcon.style.color = "white";
    }
}


const searchMovies = (elem) => {
    const filteredMovies = list.filter((item) =>
      item.title.toLowerCase().includes(elem.value.toLowerCase())
    );
  renderList(filteredMovies, MovieList);
};