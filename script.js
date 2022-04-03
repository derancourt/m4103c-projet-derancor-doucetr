document.getElementById("rc").addEventListener('input', function(){
  if(this.value.length == 4){
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://age-of-empires-2-api.herokuapp.com/api/v1/structure/${this.value}`)}`)
    .then(response => {
            if (response.ok) return response.json().then((data) =>{
              const json = data.contents;
              const obj = JSON.parse(json);
              let affichage = '<ul>';
              for(let structure of obj){
                affichage += `<li><div class="structures"><div class="name"><div class="st"><h1>Name : </h1><p>${structure.name}</p></div></div><div class="infos"><div class="info1"><div class="st2"><h2>Expansion :</h2><p>${structure.expansion}</p></div><div class="st2"><h2>Cost :</h2><p>${structure.cost}</p></div><div class="st2"><h2>Age :</h2><p>${structure.age}</p></div><div class="st2"><h2>Hit_Point :</h2><p>${structure.hit_point}</p></div></div><div class="info2"><div class=""><img src="" alt=""></div><div class="st2"><h2>Build_Time :</h2><p>${structure.build_time}</p></div><div class="st2"><h2>Armor :</h2><p>${structure.armor}</p></div><div class="st2"><h2>Special :</h2><p>"${structure.special}"</p></div></div></div></div></li>`;
              }
              affichage += '</ul>';
              document.getElementById("bloc-resultats").innerHTML = affichage;
            })
            throw new Error('Network response was not ok.')
    })
    .then(data => console.log(data));
  }
});

/*
function addFavoris() {
  if (document.getElementById("btn-favoris") == true) {

  }
}
*/
