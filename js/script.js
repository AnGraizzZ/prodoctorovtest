catalog.onclick = function() {
    var acatalog = document.getElementById("catalog");
    var afavor = document.getElementById("favor");
    acatalog.classList.add("active");
    afavor.classList.remove("active");

    var acatalog = document.getElementById("content-catalog");
    var afavor = document.getElementById("content-favor");
    afavor.classList.add("no-active-content");
    acatalog.classList.remove("no-active-content");
  };

  favor.onclick = function() {
    var acatalog = document.getElementById("catalog");
    var afavor = document.getElementById("favor");
    afavor.classList.add("active");
    acatalog.classList.remove("active");

    var acatalog = document.getElementById("content-catalog");
    var afavor = document.getElementById("content-favor");
    acatalog.classList.add("no-active-content");
    afavor.classList.remove("no-active-content");
  };