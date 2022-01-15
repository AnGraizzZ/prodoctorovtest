//Вкладки
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

  //Список пользователей
  window.onload = function(){ 
    treeHTML=document.getElementById("treeHTML-catalog");
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://json.medrating.org/users/', true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(null);
   // setTimeout(1000);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status==200) {
        const res = JSON.parse(xhr.responseText);
        treeHTML.innerHTML='';
        for (var key in res)
        {
          console.log(key, res[key].name);
          var ContentHTML = ' \
          <div >\
          <p class="tree-parent" >'+res[key].name+'</p>\
          <details id="user'+res[key].id+'"><summary class="circle"  onclick="album('+res[key].id+')" ><div class="horizontal"></div><div class="vertical"></div></summary>\
          <div class="lbox"><div class="loading"></div></div>\
          </details>\
          </div>\
          ';
          treeHTML.innerHTML+= ContentHTML;
        }
      };
    };
  };
//Альбомы пользователей
  function album(user){
   // userHTML=document.getElementById("treeHTML-catalog");
    userHTML=document.getElementById("user"+user);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', ' https://json.medrating.org/albums?userId='+user, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(null); 
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status==200) {
        const res = JSON.parse(xhr.responseText);
        userHTML.innerHTML='<summary class="circle"><div class="horizontal"></div><div class="vertical"></div></summary>';
        for (var key in res)
        {
         // console.log(key, res[key].title);
          var ContentHTML = ' \
          <div >\
          <p class="tree-parent" >'+res[key].title+'</p>\
          <details id="user'+res[key].userId+res[key].id+'"><summary class="circle"  onclick="photo('+res[key].id+')" ><div class="horizontal"></div><div class="vertical"></div></summary>\
          <div class="lbox"><div class="loading"></div></div>\
          </details>\
          </div>\
          ';
          userHTML.innerHTML+= ContentHTML;
        }
      };
    };
  };
