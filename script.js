
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

/*Détermine catégorie radio bouton*/

if (document.getElementById('unit').checked) {
  var currentLinkS = linkUnits;
  var currentLink = linkUnit;
}
else if (document.getElementById('civ').checked) {
  var currentLinkS = linkCivs;
  var currentLink = linkCiv;
}
else if (document.getElementById('tech').checked) {
  var currentLinkS = linkTechs;
  var currentLink = linkTech;
}
else{
  var currentLinkS = linkStructs;
  var currentLink = linkStruct;
}


fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkUnits}`)}`)//création de la liste des civs
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
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkUnits}`)}`)//affichage de toutes les civs à l'initialisation
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
        affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${structure.id}","${structure.name}")>`;
      }
      affichage += `</ul>`;
      document.getElementById("bloc-resultats").innerHTML = affichage;
    });
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
                affichage +=`<img src='images/civ/${obj.id}.png'/> `;
                affichage +=`<li>Id : ${obj.id}</li>`;
                affichage +=`<li>Name : ${obj.name}</li>`;
                affichage +=`<li>Expansion : ${obj.expansion}</li>`;
                affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${obj.id}","${obj.name}")>`;
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


        var affichage = '<ul>'
        for (let i = 1; i < 50; i++) { //civs.length ne marche pas ici :/
          if(getCookie(i)!=""){
            //console.log(getCookie(i));
            //affichage += `<li>${getCookie(i)}</li>`; // La prochaine ligne est jste la pour dire qu'on peut le faire
            affichage += `<li><a href=https://api.allorigins.win/get?url=${encodeURIComponent(`${linkUnit}${i}`)} >${getCookie(i)}</a></li>`;
            affichage += `<input type="button" value="Supprimer" onclick=setCookie("${i}","")>`;
          }
        }
        affichage += '</ul>'
        document.getElementById("bloc-favoris").innerHTML =affichage;
        /*
        else if (document.getElementById('unit').checked) {
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkStruct}`)}`)//création de la liste des civs
        .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then((data) =>{
      const json = data.contents;
      const obj = JSON.parse(json);
      var i =1;
      for(let structure of obj.civilizations){
      units[i]=structure.name.toLowerCase();
      i++;
    }
  });
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkStruct}`)}`)//affichage de toutes les civs à l'initialisation
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
document.getElementById("rc").addEventListener('input', function(){//affichage des civs en fonction de l'input utilisateur (une partie de string suffit pour retrouver la civ)
var val = this.value.toLowerCase();
let affichage;
if(this.value.length >0){
document.getElementById("bloc-resultats").innerHTML ="";
units.forEach(function(item, index, array) {
if(item.includes(val)){
fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkStruct}`+ '/' + `${index}`)}`)
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
fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkStruct}`)}`)
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


var affichage = '<ul>'
for (let i = 1; i < 50; i++) { //civs.length ne marche pas ici :/
if(getCookie(i)!=""){
//console.log(getCookie(i));
//affichage += `<li>${getCookie(i)}</li>`; // La prochaine ligne est jste la pour dire qu'on peut le faire
affichage += `<li><a href=https://api.allorigins.win/get?url=${encodeURIComponent(`${linkStruct}` + "/"`${i}`)} >${getCookie(i)}</a></li>`;
affichage += `<input type="button" value="Supprimer" onclick=setCookie("${i}","")>`;
}
}
affichage += '</ul>'
document.getElementById("bloc-favoris").innerHTML =affichage;
}



//init();

//
//   var boutonade = document.getElementsByClassName("favoris");
// var i =0;
// while(boutonade[i]){
//   //recuperer la valueur dans le Cookie
//   var cookie = getCookie(boutonade[i].getAttribute('id'));
//   //initialiser le bouton avec la valeur recuperer
//   boutonade[i].setAttribute('value',cookie);
//   i++;
// }
// }



// document.getElementById("rc").addEventListener('input', function(){
//   if(this.value.length >= 5){
//     fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://age-of-empires-2-api.herokuapp.com/api/v1/structure/${this.value}`)}`)
//     .then(response => {
//             if (response.ok) return response.json().then((data) =>{
//               const json = data.contents;
//               const obj = JSON.parse(json);
//               let affichage = '<ul>';
//               for(let structure of obj){
//                 affichage += `<li>${structure.id}</li>`;
//               }
//               affichage += '</ul>';
//               document.getElementById("bloc-resultats").innerHTML = affichage;
//             })
//             throw new Error('Network response was not ok.')
//     })
//     .then(data => console.log(data));
//   }
// });
// document.getElementById("rc").addEventListener('input', function(){
//   if(this.value.length > 3){
//     fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/${this.value}`)}`)
//     .then(response => {
//             if (response.ok) return response.json()
//             throw new Error('Network response was not ok.')
//     })
//     .then((data) =>{
//
//                   const json = data.contents;
//
//                   const obj = JSON.parse(json);
//                   console.log(obj);
//                   let affichage = '<ul>';
//                   //for(let structure of obj){
//                   affichage +=`<img src='images/civ/${obj.id}.png'/> `;
//                   affichage +=`<li>Id : ${obj.id}</li>`;
//                   affichage +=`<li>Name : ${obj.name}</li>`;
//                   affichage +=`<li>Expansion : ${obj.expansion}</li>`;
//                   //}
//                   affichage += '</ul>';
//                   document.getElementById("bloc-resultats").innerHTML = affichage;
//                 })
//
//   }
// });
//
//
// fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations')}`)
// .then(response => {
//         if (response.ok) return response.json()
//         throw new Error('Network response was not ok.')
// })
// .then((data) =>{
//                   //console.log(data.contents);
//                   const json = data.contents;
//                   const obj = JSON.parse(json);
//
//                   console.log(obj);
//
//                   let affichage = '<ul>';
//                   for(let structure of obj.civilizations){
//
//                   affichage +=`<img src='images/civ/${structure.id}.png'/> `;
//                   affichage +=`<li>Id : ${structure.id}</li>`;
//                   affichage +=`<li>Name : ${structure.name}</li>`;
//                   affichage +=`<li>Expansion : ${structure.expansion}</li>`;
//
//                   }
//                   affichage += '</ul>';
//                   document.getElementById("bloc-resultats").innerHTML = affichage;
//   });

/*

var link = "https://age-of-empires-2-api.herokuapp.com/api/v1/structure/";

document.getElementById("rc").addEventListener('input', function(){
if(this.value.length == 4){
fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${link}${this.value}`)}`)
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

//fonction permettant d'incruster la structure html des données
function strcutHTML() {
let list = document.createElement('ul');
let liList = document.createElement('li');
let divStruct = document.createElement('div', { class : 'structures'});
let divName = document.createElement('div', { class : 'name'});
let divInfo = document.createElement('div', { class : 'infos'})
let divSt = document.createElement('div', { class : 'st'});
let divSt2 = document.createElement('div', { class : 'st2'});
let h1 = document.createElement('h1');
let h2 = document.createElement('h2');
let p = document.createElement('p');

}

*/
/*
//fonction permettant le choix des différentes catégories et qui vérifie si elle est bien sélectionner (unités, technologies, structures ou civilisations)
function choixCategories() {
if (document.getElementByClassName("choix").value == "unit") {
link = "https://age-of-empires-2-api.herokuapp.com/api/v1/unit/";
}
else if (document.getElementByClassName("choix").value == "civ") {
link = "https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/";
}
else if (document.getElementByClassName("choix").value == "struct") {
link = "https://age-of-empires-2-api.herokuapp.com/api/v1/structure/";
}
else if (document.getElementByClassName("choix").value == "tech") {
link = "https://age-of-empires-2-api.herokuapp.com/api/v1/technology/";
}
}


/*
//fonction permettant d'ajouter une recherche en favoris
function addFavoris() {
if (document.getElementById("btn-favoris") == true) {

}
}
*/
