//requete fetch vers mon json dans le dossier data
fetch('data/movies.json')
  //then est ici une instruction qui specifie à javascript d'attendre que mon fecth soit fini
  .then(function (response) {
    //response contient ici la réponse à ma requete fetch puis reconverti en un json
    return response.json();
  })
  // dans ce then, la réponse est transformer dans une fonction anonyme dans le tableau data
  .then(function (data) {
    //je cible le container où j'injecterais mon code html
    let cardContainer = document.querySelector('#card-container');

    //je boucle ensuite sur le tableau provenant de la réponse de ma requete
    data.forEach(function (movie) {
      //dans ma boucle je vais appeler une fonction qui construit une card et me la renvoie dans la variable card
      let card = createMovieCard(movie);
      //ici, toujour dans ma boucle, j'ajoute la card à mon container de card que j'ai sélectioné plus haut
      cardContainer.appendChild(card);
    });
  });

//ici c'est la fonction qui va me créer mes card, elle prend en argument toutes les informations pour construire un card et qui viendra de ma boucle.
function createMovieCard(movie) {
  //ici je créé une div et je lui ajoute une class pour le style css
  let card = document.createElement('div');
  card.classList.add('horizontal-card');

  //cette variable me permet d'ecrire du code HTML avec des données provenant de la variable movie
  //la variable movie contient une ligne du tableau data à chaque passage dans la boucle
  let cardContent = `
    <div class="card mb-3">
        <div class="row g-0">
        <div class="col-md-4">
            <img src="${movie.Poster}" class="card-img" alt="Movie Poster">
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <ul class="list-inline">
                <li class="card-text"><strong>imdb Rating:</strong> ${movie.imdbRating}</li>
                <li class="card-text">${movie.Year}</li>
                <li class="card-text">${movie.Genre}</li>
            </ul>
            <p class="card-text">${movie.Plot}</p>
            <div>
                <p><strong>Written by:</strong> ${movie.Writer}</p>
                <p><strong>Directed by:</strong> ${movie.Director}</p>
                <p><strong>Starring:</strong> ${movie.Actors}</p>
                <div class="row">
                ${
    //ici j'appel une fonction qui contiendra une boucle pour traiter le tableau d'images du film
    createThumbnailImages(movie.Images)
    }
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
`;

  // ici je prend le card content pour qu'il devienne le code HTML de la div card construite plus haut
  card.innerHTML = cardContent;
  return card;
}


//voici la fonction qui va traiter mon tableau d'images
function createThumbnailImages(images) {
  //je defini une variable avec une string vide
  let thumbnails = '';

  //je boucle sur mon tableau d'images
  images.forEach(function (image) {
    //à chaque itération de ma boucle, je concataine une div avec le lien de l'image dans une balise image
    thumbnails += `
                <div class="col-md-3">
                    <img src="${image}" class="thumbnail img-fluid rounded" alt="Thumbnail">
                </div>
                `;
  });

  //à la fin je retourne toute la variable thumbnails qqui viendra ecrire son contenu dans ma variable cardContent
  return thumbnails;
}