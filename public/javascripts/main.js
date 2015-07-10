document.addEventListener("DOMContentLoaded", function() {


  navigator.geolocation.getCurrentPosition(geoSuccess);
  getHeadlines("/news");

  var startPos;
  function geoSuccess(position) {
    startPos = position;
    var lat = startPos.coords.latitude;
    var long = startPos.coords.longitude;
    getWeather("/weather/" + lat + "/" + long);
  };

  function getWeather(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.addEventListener('load', function(e) {
      var data = xhr.responseText;
      var parsed = JSON.parse(data);
      var currentSummary = document.getElementById("currentSummary");
      var currentTemp = document.getElementById("currentTemp");
      var spinner = document.getElementById("loader");
      spinner.style.display="none";

      currentSummary.innerHTML = parsed.currently.summary;
      currentTemp.innerHTML = Math.round(parsed.currently.temperature) + "&deg;";

    });
    xhr.send();
  }

  function getHeadlines(url){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.addEventListener('load', function(e) {
      var data = xhr.responseText;
      var parsed = JSON.parse(data);
      var articles = parsed["results"];

      var newsSection = document.getElementById("newsSection");

      articles.forEach(function(article){
        var newsCard = document.createElement("li");
        newsCard.setAttribute("class", "card hoverable");

        var title = document.createElement("h4");
        var titleLink = document.createElement("a");
        titleLink.innerHTML = article.title;
        titleLink.setAttribute("href", article.url);
        titleLink.setAttribute("target", "_blank");

        var headline = document.createElement("div");
        headline.setAttribute("class", "card-content");

        title.appendChild(titleLink);


        headline.appendChild(title);

        newsCard.appendChild(headline);
        newsSection.appendChild(newsCard);
      });

      //Materialize.showStaggeredList('#newsSection');


    });
    xhr.send();
  }
}); //end DOMContentLoaded
