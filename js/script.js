//Вкладки
catalog.onclick = function() {
  //Обновление каталога
  favotHTML=document.getElementById("content-favor");
  favotHTML.innerHTML='<div class="lbox"><div class="loading"></div></div>';
  catalogHTML=document.getElementById("treeHTML-catalog");
  catalogHTML.innerHTML='<div class="lbox"><div class="loading"></div></div>';
  upcatalog();

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
    //Обновление избранного
    favotHTML=document.getElementById("content-favor");
    favotHTML.innerHTML='<div class="lbox"><div class="loading"></div></div>';
    catalogHTML=document.getElementById("treeHTML-catalog");
    catalogHTML.innerHTML='<div class="lbox"><div class="loading"></div></div>';
    upfavourites();

    var acatalog = document.getElementById("catalog");
    var afavor = document.getElementById("favor");
    afavor.classList.add("active");
    acatalog.classList.remove("active");

    var acatalog = document.getElementById("content-catalog");
    var afavor = document.getElementById("content-favor");
    acatalog.classList.add("no-active-content");
    afavor.classList.remove("no-active-content");

    
    
  };
  window.onload = function(){ 
    upcatalog();
  };
  //Список пользователей
  function upcatalog(){ 
    treeHTML=document.getElementById("treeHTML-catalog");
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://json.medrating.org/users/', true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(null);
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status==200) {
        const res = JSON.parse(xhr.responseText);
        treeHTML.innerHTML='';
        for (var key in res)
        {
          var ContentHTML = ' \
          <div class="class-user">\
          <p class="tree-parent" >'+res[key].name+'</p>\
          <details id="user'+res[key].id+'"><summary class="circle"  onclick="album('+res[key].id+')" ><div class="horizontal"></div><div class="vertical"></div></summary>\
          <div class="lbox"><div class="loading"></div></div>\
          </details>\
          </div>\
          ';
          treeHTML.innerHTML+= ContentHTML;
        }
      }else if(xhr.status==500)
      {
        treeHTML.innerHTML='<div class="empty"><img src="img/error.png" >\
        <div class="empty-one-text">Сервер не отвечает</div>\
        <div class="empty-two-text">Уже работаем над этим</div></div>';
      };
    };
  };
  
//Альбомы пользователей
  function album(user){
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
          var ContentHTML = ' \
          <div class="class-album">\
          <p class="tree-parent" >'+res[key].title+'</p>\
          <details id="photo'+res[key].id+'"><summary class="circle"  onclick="photo('+res[key].id+')" ><div class="horizontal"></div><div class="vertical"></div></summary>\
          <div class="lbox"><div class="loading"></div></div>\
          </details>\
          </div>\
          ';
          userHTML.innerHTML+= ContentHTML;
        }
      }else if(xhr.status==500)
      {
        treeHTML.innerHTML='<div class="empty"><img src="img/error.png" >\
        <div class="empty-one-text">Сервер не отвечает</div>\
        <div class="empty-two-text">Уже работаем над этим</div></div>';
      };;
    };
  };
  //фото пользователей
  function photo(album){
     albumHTML=document.getElementById("photo"+album);
     const xhr = new XMLHttpRequest();
     xhr.open('GET', ' https://json.medrating.org/photos?albumId='+album, true);
     xhr.setRequestHeader('Accept', 'application/json');
     xhr.send(null); 
     xhr.onreadystatechange = function () {
       if (xhr.readyState === XMLHttpRequest.DONE && xhr.status==200) {
         const res = JSON.parse(xhr.responseText);
         albumHTML.innerHTML='<summary class="circle"><div class="horizontal"></div><div class="vertical"></div></summary><div class="photoalbum">';
         for (var key in res)
         {
           var ContentHTML = ' \
                                    <div class="photo">\
                                    <div class="overlay" id="urlphoto'+res[key].id+'">\
                                        <div class="overlay_container">\
                                            <a href="#close">\
                                                <img src="'+res[key].url+'"/>\
                                            </a>\
                                        </div>\
                                    </div>\
                                    <div class="star" id="starid'+res[key].id+'"><img src="img/star_empty.png" onclick="starActive('+res[key].albumId+','+res[key].id+')"></div>\
                                        <a href="#urlphoto'+res[key].id+'">\
                                            <img  id="usephoto'+res[key].id+'" src="'+res[key].thumbnailUrl+'" alt="'+res[key].title+'" title="'+res[key].title+'">\
                                        </a>\
                                    </div>\
           ';
           albumHTML.innerHTML+= ContentHTML;
         }
         albumHTML.innerHTML+='</div>';
       }else if(xhr.status==500)
       {
         treeHTML.innerHTML='<div class="empty"><img src="img/error.png" >\
         <div class="empty-one-text">Сервер не отвечает</div>\
         <div class="empty-two-text">Уже работаем над этим</div></div>';
       };;
     };
   };
   //Добавление в избранное
   function starActive(albumId,id){
    starHTML=document.getElementById("starid"+id);
    starHTML.innerHTML='<img src="img/star_active.png" onclick="starEmpty('+albumId+','+id+')">';
    const xhr = new XMLHttpRequest();
     xhr.open('GET', ' https://json.medrating.org/photos?albumId='+albumId, true);
     xhr.setRequestHeader('Accept', 'application/json');
     xhr.send(null); 
     xhr.onreadystatechange = function () {
       if (xhr.readyState === XMLHttpRequest.DONE && xhr.status==200) {
         const res = JSON.parse(xhr.responseText);
         
         for (var key in res)
         {
          if (res[key].id == id)
          {
            const obj = {
              albumId: res[key].albumId,
              id: res[key].id,
              title: res[key].title,
              url: res[key].url,
              thumbnailUrl: res[key].thumbnailUrl
            }
            localStorage['favorphoto'+id] = JSON.stringify(obj);
          }
         }
       }
      }
     }

     //Удаление из избранного
   function starEmpty(albumId,id){
    starHTML=document.getElementById("starid"+id);
    starHTML.innerHTML='<img src="img/star_empty.png" onclick="starActive('+albumId+','+id+')">';
    if (localStorage['favorphoto'+id]) {
      localStorage.removeItem('favorphoto'+id);
    }
    upfavourites();
   }
   
   //Обновление избранного
  
  function upfavourites()
  {
    favotHTML=document.getElementById("content-favor");
    
    if (localStorage.length==0)
    {
      favotHTML.innerHTML='\
     <div class="empty"><img src="img/empty.png" alt="">\
      <div class="empty-one-text">Список избранного пуст</div>\
      <div class="empty-two-text">Добавляйте изображения, нажимая на звездочки</div>\
      ';
    } else{
      favotHTML.innerHTML='';
    }
    for(let i=0; i<localStorage.length; i++) {
      let key = localStorage.key(i);
      const res = JSON.parse(localStorage.getItem(key));
      console.log(res);
           var ContentHTML = ' \
                                    <div class="photo">\
                                    <div class="overlay" id="urlphoto'+res.id+'">\
                                        <div class="overlay_container">\
                                            <a href="#close">\
                                                <img src="'+res.url+'"/>\
                                            </a>\
                                        </div>\
                                    </div>\
                                    <div class="star" id="starid'+res.id+'"><img src="img/star_active.png" onclick="starEmpty('+res.albumId+','+res.id+')"></div>\
                                        <a href="#urlphoto'+res.id+'">\
                                            <img  id="usephoto'+res.id+'" src="'+res.thumbnailUrl+'" alt="'+res.title+'" title="'+res.title+'">\
                                        </a>\
                                    </div>\
           ';
           favotHTML.innerHTML+= ContentHTML;
         
    }
  }