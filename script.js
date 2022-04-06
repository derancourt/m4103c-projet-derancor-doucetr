/*Variables tableaux*/

var civs =[]; //liste des civs[id,nomdlaciv]
var techs =[]; //liste des techs[id,nomtechs]
var units =[]; //liste des units[id,nomunits]
var armies =[]; //liste des armies[id,nomdlarmies]

var linkCivs = "https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations";
var linkCiv = "https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/";
var linkUnit = "https://age-of-empires-2-api.herokuapp.com/api/v1/unit/";
var linkUnits = "https://age-of-empires-2-api.herokuapp.com/api/v1/units";
var linkStruct = "https://age-of-empires-2-api.herokuapp.com/api/v1/structure/";
var linkStructs = "https://age-of-empires-2-api.herokuapp.com/api/v1/structures";
var linkTech = "https://age-of-empires-2-api.herokuapp.com/api/v1/technology/";
var linkTechs = "https://age-of-empires-2-api.herokuapp.com/api/v1/technologies";

var currentLinkS;
var currentLink;


function init(){
  init_civs();
  affichage_favoris();
}

function init_civs(){
  creer_liste_civs();
  affichage_civs();
  recherche_civs();
  affichage_favoris_civs();
}

function init_units(){
  creer_liste_units();
  affichage_units();
  recherche_units();
  affichage_favoris_units();
}

function choix_recherche(){
  if (document.getElementById('unit').checked) {
  var currentLinkS = linkUnits;
  var currentLink = linkUnit;
  document.getElementById("bloc-resultats").innerHTML="";
  init_units();
}
else if (document.getElementById('civ').checked) {
  document.getElementById("bloc-resultats").innerHTML="";
  init_civs();
}
else if (document.getElementById('tech').checked) {
  var currentLinkS = linkTechs;
  var currentLink = linkTech;
}
else{
  var currentLinkS = linkStructs;
  var currentLink = linkStruct;
}
}

function affichage_civs(){//affichage de toutes les civs à l'initialisation
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations')}`)
  .then(response => {
          if (response.ok) return response.json()
          throw new Error('Network response was not ok.')
  })
  .then((data) =>{
                    const json = data.contents;
                    const obj = JSON.parse(json);
                    let affichage = `</ul>`;
                    for(let structure of obj.civilizations){
                    affichage +=`<img src='images/civ/${structure.id}.png'/> `;
                    affichage +=`<li>Id : ${structure.id}</li>`;
                    affichage +=`<li>Name : ${structure.name}</li>`;
                    affichage +=`<li>Expansion : ${structure.expansion}</li>`;
                    affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${structure.id}","${structure.name}")>`;
                    }

                    affichage += `</ul>`;
                    document.getElementById("bloc-resultats").innerHTML = affichage;
    });

}

function affichage_units(){//affichage de toutes les units à l'initialisation
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkUnits}`)}`)
  .then(response => {
    if (response.ok) return response.json()
    throw new Error('Network response was not ok.')
  })
  .then((data) =>{
    const json = data.contents;
    const obj = JSON.parse(json);
    let affichage = `</ul>`;
    for(let structure of obj.units){
      //affichage +=`<img src='images/civ/${structure.id}.png'/> `;
      affichage +=`<li>Id : ${structure.id}</li>`;
      affichage +=`<li>Name : ${structure.name}</li>`;
      affichage +=`<li>Expansion : ${structure.expansion}</li>`;
      affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${structure.id+50}","${structure.name.replace(/ /g, "-")}")>`;
    }
    affichage += `</ul>`;
    document.getElementById("bloc-resultats").innerHTML = affichage;
  });
}

function creer_liste_civs(){//création de la liste des civs
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations')}`)
  .then(response => {
          if (response.ok) return response.json()
          throw new Error('Network response was not ok.')
  })
  .then((data) =>{
                    const json = data.contents;
                    const obj = JSON.parse(json);
                    var i =1;
                    for(let structure of obj.civilizations){
                      civs[i]=structure.name.toLowerCase();
                      i++;
                    }
    });
}

function creer_liste_units(){//création de la liste des units
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkUnits}`)}`)
  .then(response => {
    if (response.ok) return response.json()
    throw new Error('Network response was not ok.')
  })
  .then((data) =>{
    const json = data.contents;
    const obj = JSON.parse(json);
    var i =1;
    for(let structure of obj.units){
      units[i]=structure.name.toLowerCase();
      i++;
    }
  });

}

function recherche_units(){//affichage des units en fonction de l'input utilisateur (une partie de string suffit pour retrouver l'unit
  document.getElementById("rc").addEventListener('input', function(){//affichage des civs en fonction de l'input utilisateur (une partie de string suffit pour retrouver la civ)
    var val = this.value.toLowerCase();
    let affichage;
    if(this.value.length >0){
      document.getElementById("bloc-resultats").innerHTML ="";
      units.forEach(function(item, index, array) {
        if(item.includes(val)){
          fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkUnit}${index}`)}`)
            .then(response => {
              if (response.ok) return response.json()
              throw new Error('Network response was not ok.')
            })
            .then((data) =>{
              var json = data.contents;
              var obj = JSON.parse(json);
              affichage +=  '<ul>';
              //affichage +=`<img src='images/civ/${obj.id}.png'/> `;
              affichage +=`<li>Id : ${obj.id}</li>`;
              affichage +=`<li>Name : ${obj.name}</li>`;
              affichage +=`<li>Expansion : ${obj.expansion}</li>`;
              affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${obj.id+50}","${obj.name.replace(/ /g, "-")}")>`;
              affichage += `</ul>`;
              document.getElementById("bloc-resultats").innerHTML = affichage;
            })
          }
        });
      }else{//affichage de toutes les civs si rien n'est saisi
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkUnits}`)}`)
          .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
          })
          .then((data) =>{
            const json = data.contents;
            const obj = JSON.parse(json);
            let affichage = `</ul>`;
            for(let structure of obj.units){
              affichage +=`<img src='images/civ/${structure.id}.png'/> `;
              affichage +=`<li>Id : ${structure.id}</li>`;
              affichage +=`<li>Name : ${structure.name}</li>`;
              affichage +=`<li>Expansion : ${structure.expansion}</li>`;
              affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${structure.id+50}","${structure.name.replace(/ /g, "-")}")>`;
            }
            affichage += '</ul>';
            document.getElementById("bloc-resultats").innerHTML = affichage;
          });
        }
      });
}

function recherche_civs(){//affichage des civs en fonction de l'input utilisateur (une partie de string suffit pour retrouver la civ)

    document.getElementById("rc").addEventListener('input', function(){
      var val = this.value.toLowerCase();
      let affichage;
      if(this.value.length >0){
        document.getElementById("bloc-resultats").innerHTML ="";
              civs.forEach(function(item, index, array) {
                      if(item.includes(val)){
                        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/${index}`)}`)
                            .then(response => {
                                    if (response.ok) return response.json()
                                    throw new Error('Network response was not ok.')
                            })
                            .then((data) =>{
                                          var json = data.contents;
                                          var obj = JSON.parse(json);
                                          affichage +=  '<ul>';
                                          affichage +=`<img src='images/civ/${obj.id}.png'/> `;
                                          affichage +=`<li>Id : ${obj.id}</li>`;
                                          affichage +=`<li>Name : ${obj.name}</li>`;
                                          affichage +=`<li>Expansion : ${obj.expansion}</li>`;
                                          affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${obj.id}","${obj.name}")>`;
                                          affichage+= `</ul>`;
                                          document.getElementById("bloc-resultats").innerHTML = affichage;
                                        })
                      }
                      });
      }else{//affichage de toutes les civs si rien n'est saisi
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations')}`)
        .then(response => {
                if (response.ok) return response.json()
                throw new Error('Network response was not ok.')
        })
        .then((data) =>{
                          const json = data.contents;
                          const obj = JSON.parse(json);
                          let affichage = `</ul>`;
                          for(let structure of obj.civilizations){
                          affichage +=`<img src='images/civ/${structure.id}.png'/> `;
                          affichage +=`<li>Id : ${structure.id}</li>`;
                          affichage +=`<li>Name : ${structure.name}</li>`;
                          affichage +=`<li>Expansion : ${structure.expansion}</li>`;
                          affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${obj.id}","${obj.name}")>`;

                          }
                          affichage += '</ul>';
                          document.getElementById("bloc-resultats").innerHTML = affichage;
          });
      }
    });


}

function affichage_favoris(){//affichage de tous les favoris
  affichage_favoris_civs();
  affichage_favoris_units();
}

function affichage_favoris_civs(){//affichage des favoris de civs

  var affichage = '<ul>';
  for (let i = 1; i < 50; i++) { //cookies 0à50 sont pour les civs
    if(getCookie(i)!=""){
      //console.log(getCookie(i));
      //affichage += `<li>${getCookie(i)}</li>`; // La prochaine ligne est jste la pour dire qu'on peut le faire
      affichage += `<li><a href=https://api.allorigins.win/get?url=${encodeURIComponent(`https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/${i}`)} >${getCookie(i)}</a></li>`;
      affichage += `<input type="button" value="Supprimer" onclick=setCookie("${i}","")>`;
    }
  }
  affichage += '</ul>';
  document.getElementById("bloc-favoris-civs").innerHTML =affichage;//affichage des favoris a droite
}

function affichage_favoris_units(){//affichage des favoris de units

  var affichage = '<ul>';
  for (let i = 51; i < 200; i++) { //cookies 51 à 100 pour les units
    if(getCookie(i)!=""){
      //console.log(getCookie(i));
      //affichage += `<li>${getCookie(i)}</li>`; // La prochaine ligne est jste la pour dire qu'on peut le faire
      affichage += `<li><a href=https://api.allorigins.win/get?url=${encodeURIComponent(`https://age-of-empires-2-api.herokuapp.com/api/v1/units/${i}`)} >${getCookie(i)}</a></li>`;
      affichage += `<input type="button" value="Supprimer" onclick=setCookie("${i}","")>`;
    }
  }
  affichage += '</ul>';
  document.getElementById("bloc-favoris-units").innerHTML =affichage;//affichage des favoris a droite
}

function setCookie(cname, cvalue, exdays = 99) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();

  /* Encodage de la valeur pour éviter d'avoir des soucis
  	avec certains caractères spéciaux comme :
  		=> % qui sera transformé en %25
    	=> & qui sera transformé en %26
			=> / qui sera transformé en %2F
  */
  var encodedValue = encodeURIComponent(cvalue);

  document.cookie = cname + "=" + encodedValue + ";" + expires + ";SameSite=Lax";
	affichage_favoris();
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0 ; i < ca.length ; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

init();
