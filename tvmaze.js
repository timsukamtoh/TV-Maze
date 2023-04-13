"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const BASE_URL = "https://api.tvmaze.com";
const DEFAULT_IMG = 'https://tinyurl.com/tv-missing';
const $episodesList = $("#episodesList");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  // // ADD: Remove placeholder & make request to TVMaze search shows API.
  const showsResults = await axios({
    method: 'get',
    baseURL: BASE_URL,
    url: '/search/shows',
    params: {
      q: term,
    }
  });

  const showList = showsResults.data.map(function (result) {
    const { id, name, summary, image } = result.show;
    const imgSrc = image === null ? DEFAULT_IMG : image.medium;  //url to global

    return { id, name, summary, imgSrc };
  });

  return showList;
}


/** Given list of shows, create markup for each and append to DOM.
 *
 * A show is {id, name, summary, image}
 * */

function displayShows(shows) {
  $showsList.empty();

  for (const { id, name, summary, imgSrc } of shows) {

    const $show = $(`
        <div data-show-id="${id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src=${imgSrc}
              alt=${name}
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${name}</h5>
             <div><small>${summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($show);

      $("button").on("click", function(){
        const episodesList = getEpisodesOfShow(id);
        displayEpisodes(episodesList);

      })



  }

}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchShowsAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  displayShows(shows);
}

$searchForm.on("submit", async function handleSearchForm(evt) {
  evt.preventDefault();
  await searchShowsAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  const showsResults = await axios({
    method: 'get',
    baseURL: BASE_URL,
    url: `shows/${id}/episodes`,
  });

  console.log(showsResults.data)
  showsResults.data;

}

/** Write a clear docstring for this function... */

function displayEpisodes(episodes) {
  const AllEpisodes = getEpisodesOfShow();
  
   for (let episides of getEpisodesOfShow){
    const fullEpisodes = episodes[0];
    console.log(fullEpisodes);
    $episodesList.append(`<li>${fullEpisodes}<li>`);
  }



}



// add other functions that will be useful / match our structure & design
