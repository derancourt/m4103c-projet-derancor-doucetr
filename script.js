/*Variables tableaux*/

var civs =[]; //liste des civs[id,nomdlaciv]
var techs =[]; //liste des techs[id,nomtechs]
var units =[]; //liste des units[id,nomunits]
var structs =[]; //liste des structs

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
  init_structs();
  affichage_favoris();
}

function init_civs(){
  resbar();
  creer_liste_civs();
  affichage_civs();
  recherche_civs();
  affichage_favoris();
}

function init_units(){
  resbar();
  creer_liste_units();
  affichage_units();
  recherche_units();
  affichage_favoris();
}

function init_structs(){
  resbar();
  creer_liste_structs();
  affichage_structs();
  recherche_structs();
  affichage_favoris();
}

function init_techs(){
  resbar();
  creer_liste_techs();
  affichage_techs();
  recherche_techs();
  affichage_favoris();
}

function resbar() {
    var el = document.getElementById('rc'),
    elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);
}

function choix_recherche(){
  if (document.getElementById('unit').checked) {
  document.getElementById("bloc-resultats").innerHTML="";
  init_units();
}
else if (document.getElementById('civ').checked) {
  document.getElementById("bloc-resultats").innerHTML="";
  init_civs();
}
else if (document.getElementById('struct').checked) {
  document.getElementById("bloc-resultats").innerHTML="";
  init_structs();
}
else if (document.getElementById('tech').checked) {
  document.getElementById("bloc-resultats").innerHTML="";
  init_techs();
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
                    let affichage = `<ul>`;
                    for(let structure of obj.civilizations){
                      affichage +=`<div id="div13">`
                      affichage +=`<li>Name : ${structure.name}</li>`;
                      affichage +=`<li>Expansion : ${structure.expansion}</li>`;
                      affichage +=`<li>Army type : ${structure.army_type}</li>`;
                      affichage +=`<li>Team Bonus : ${structure.team_bonus}</li>`;
                      affichage += `<li><input type="button" value="Ajouter aux favoris" onclick=setCookie("${structure.id}","${structure.name}")></li>`;
                      affichage +=`</div>`;
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
    let affichage = `<ul>`;
    for(let structure of obj.units){
      affichage +=`<div id="div12">`
      affichage +=`<li>Name : ${structure.name}</li>`;
      affichage +=`<li>Expansion : ${structure.expansion}</li>`;
      affichage +=`<li>Hit point : ${structure.hit_points}</li>`;
      affichage +=`<li>Range : ${structure.range}</li>`;
      affichage +=`<li>Attack : ${structure.attack}</li>`;
      affichage +=`<li>Armor : ${structure.armor}</li>`;
      affichage +=`<li><input type="button" value="Ajouter aux favoris" onclick=setCookie("${structure.id+50}","${structure.name.replace(/ /g, "-")}")></li>`;
      affichage +=`</div>`;
    }
    affichage += `</ul>`;
    document.getElementById("bloc-resultats").innerHTML = affichage;
  });
}

function affichage_structs(){//affichage de toutes les structures à l'initialisation
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkStructs}`)}`)
  .then(response => {
    if (response.ok) return response.json()
    throw new Error('Network response was not ok.')
  })
  .then((data) =>{
    const json = data.contents;
    const obj = JSON.parse(json);
    let affichage = `<ul>`;
    for(let structure of obj.structures){
      affichage +=`<div id="div15">`
      affichage +=`<li>Name : ${structure.name}</li>`;
      affichage +=`<li>Expansion : ${structure.expansion}</li>`;
      affichage +=`<li>Age : ${structure.age}</li>`;
      affichage +=`<li>Build Time : ${structure.build_time}</li>`;
      affichage +=`<li>Hit points : ${structure.hit_points}</li>`;
      affichage +=`<li>Armor : ${structure.armor}</li>`;
      affichage +=`<li><input type="button" value="Ajouter aux favoris" onclick=setCookie("${structure.id+200}","${structure.name.replace(/ /g, "-")}")></li>`;
      affichage +=`</div>`;
    }
    affichage += `</ul>`;
    document.getElementById("bloc-resultats").innerHTML = affichage;
  });
}

function affichage_techs(){//affichage de toutes les structures à l'initialisation
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkTechs}`)}`)
  .then(response => {
    if (response.ok) return response.json()
    throw new Error('Network response was not ok.')
  })
  .then((data) =>{
    const json = data.contents;
    const obj = JSON.parse(json);
    let affichage = `<ul>`;
    for(let structure of obj.technologies){
      affichage +=`<div id="div14">`
      affichage +=`<li>Name : ${structure.name}</li>`;
      affichage +=`<li>Description : ${structure.description}</li>`;
      affichage +=`<li>Expansion : ${structure.expansion}</li>`;
      affichage +=`<li>Age : ${structure.age}</li>`;
      affichage +=`<li>Build Time : ${structure.build_time}</li>`;
      affichage +=`<li><input type="button" value="Ajouter aux favoris" onclick=setCookie("${structure.id+400}","${structure.name.replace(/ /g, "-")}")></li>`;
      affichage +=`</div>`;
    }
    affichage += `</ul>`;
    document.getElementById("bloc-resultats").innerHTML = affichage;
  });
}

function creer_liste_structs(){//création de la liste des civs
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkStructs}`)}`)
  .then(response => {
          if (response.ok) return response.json()
          throw new Error('Network response was not ok.')
  })
  .then((data) =>{
                    const json = data.contents;
                    const obj = JSON.parse(json);
                    var i =1;
                    for(let structure of obj.structures){
                      structs[i]=structure.name.toLowerCase();
                      i++;
                    }
    });
}

function creer_liste_civs(){//création de la liste des civs
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkCivs}`)}`)
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

function creer_liste_techs(){//création de la liste des units
  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkTechs}`)}`)
  .then(response => {
    if (response.ok) return response.json()
    throw new Error('Network response was not ok.')
  })
  .then((data) =>{
    const json = data.contents;
    const obj = JSON.parse(json);
    var i =1;
    for(let structure of obj.technologies){
      techs[i]=structure.name.toLowerCase();
      i++;
    }
  });

}

function recherche_units(){//affichage des units en fonction de l'input utilisateur (une partie de string suffit pour retrouver l'unit
  document.getElementById("rc").addEventListener('input', function(){//affichage des civs en fonction de l'input utilisateur (une partie de string suffit pour retrouver la civ)
    var val = this.value.toLowerCase();
    let affichage;
    let ul;
    ul += `<ul id="ul"></ul>`;
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
              affichage += `<div id="div12">`;
              affichage +=`<li>Name : ${obj.name}</li>`;
              affichage +=`<li>Expansion : ${obj.expansion}</li>`;
              affichage +=`<li>Hit point : ${obj.hit_points}</li>`;
              affichage +=`<li>Range : ${obj.range}</li>`;
              affichage +=`<li>Attack : ${obj.attack}</li>`;
              affichage +=`<li>Armor : ${obj.armor}</li>`;
              affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${obj.id+50}","${obj.name.replace(/ /g, "-")}")>`;
              affichage+= `</div>`;
              document.getElementById("bloc-resultats").innerHTML = ul;
              document.getElementById("ul").innerHTML = affichage;
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
              affichage += `<div id="div12">`;
              affichage +=`<li>Name : ${structure.name}</li>`;
              affichage +=`<li>Expansion : ${structure.expansion}</li>`;
              affichage +=`<li>Hit point : ${structure.hit_points}</li>`;
              affichage +=`<li>Range : ${structure.range}</li>`;
              affichage +=`<li>Attack : ${structure.attack}</li>`;
              affichage +=`<li>Armor : ${structure.armor}</li>`;
              affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${structure.id+50}","${structure.name.replace(/ /g, "-")}")>`;
              affichage+= `</div>`;
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
      let ul;
      ul += `<ul id="ul"></ul>`;
      if(this.value.length >0){
        document.getElementById("bloc-resultats").innerHTML ="<ul>";
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
                                          affichage +=`<div id="div13">`
                                          affichage +=`<li>Name : ${obj.name}</li>`;
                                          affichage +=`<li>Expansion : ${obj.expansion}</li>`;
                                          affichage +=`<li>Army type : ${obj.army_type}</li>`;
                                          affichage +=`<li>Team Bonus : ${obj.team_bonus}</li>`;
                                          affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${obj.id}","${obj.name}")>`;
                                          affichage +=`</div>`;
                                          document.getElementById("bloc-resultats").innerHTML = ul;
                                          document.getElementById("ul").innerHTML = affichage;
                                        })
                      }
                      });
                      document.getElementById("bloc-resultats").innerHTML +="</ul>";//utile ?
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
                            affichage +=`<div id="div13">`
                            affichage +=`<li>Name : ${structure.name}</li>`;
                            affichage +=`<li>Expansion : ${structure.expansion}</li>`;
                            affichage +=`<li>Army type : ${structure.army_type}</li>`;
                            affichage +=`<li>Team Bonus : ${structure.team_bonus}</li>`;
                          affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${obj.id}","${obj.name}")>`;
                          affichage +=`</div>`;

                          }
                          affichage += '</ul>';
                          document.getElementById("bloc-resultats").innerHTML = affichage;
          });
      }
    });


}

function recherche_structs(){//affichage des civs en fonction de l'input utilisateur (une partie de string suffit pour retrouver la civ)

    document.getElementById("rc").addEventListener('input', function(){
      var val = this.value.toLowerCase();
      let affichage;
      let ul;
      ul += `<ul id="ul"></ul>`;
      if(this.value.length >0){
        document.getElementById("bloc-resultats").innerHTML ="";
              structs.forEach(function(item, index, array) {
                      if(item.includes(val)){
                        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkStruct}${index}`)}`)
                            .then(response => {
                                    if (response.ok) return response.json()
                                    throw new Error('Network response was not ok.')
                            })
                            .then((data) =>{
                                          var json = data.contents;
                                          var obj = JSON.parse(json);
                                          affichage += `<div id="div15">`;
                                          affichage +=`<li>Name : ${obj.name}</li>`;
                                          affichage +=`<li>Expansion : ${obj.expansion}</li>`;
                                          affichage +=`<li>Age : ${obj.age}</li>`;
                                          affichage +=`<li>Build Time : ${obj.build_time}</li>`;
                                          affichage +=`<li>Hit points : ${obj.hit_points}</li>`;
                                          affichage +=`<li>Armor : ${obj.armor}</li>`;
                                          affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${obj.id+200}","${obj.name.replace(/ /g, "-")}")>`;
                                          affichage+= `</div>`;
                                          document.getElementById("bloc-resultats").innerHTML = ul;
                                          document.getElementById("ul").innerHTML = affichage;
                                        })
                      }
                      });
      }else{//affichage de toutes les civs si rien n'est saisi
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkStructs}`)}`)
        .then(response => {
                if (response.ok) return response.json()
                throw new Error('Network response was not ok.')
        })
        .then((data) =>{
                          const json = data.contents;
                          const obj = JSON.parse(json);
                          let affichage = `</ul>`;
                          for(let structure of obj.structures){
                            affichage +=`<div id="div15">`
                            affichage +=`<li>Name : ${structure.name}</li>`;
                            affichage +=`<li>Expansion : ${structure.expansion}</li>`;
                            affichage +=`<li>Age : ${structure.age}</li>`;
                            affichage +=`<li>Build Time : ${structure.build_time}</li>`;
                            affichage +=`<li>Hit points : ${structure.hit_points}</li>`;
                            affichage +=`<li>Armor : ${structure.armor}</li>`;
                          affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${obj.id+200}","${obj.name.replace(/ /g, "-")}")>`;
                          affichage +=`</div>`;

                          }
                          affichage += '</ul>';
                          document.getElementById("bloc-resultats").innerHTML = affichage;
          });
      }
    });


}

function recherche_techs(){//affichage des civs en fonction de l'input utilisateur (une partie de string suffit pour retrouver la civ)

    document.getElementById("rc").addEventListener('input', function(){
      var val = this.value.toLowerCase();
      let affichage;
      let ul;
      ul += `<ul id="ul"></ul>`;
      if(this.value.length >0){
        document.getElementById("bloc-resultats").innerHTML ="";
              techs.forEach(function(item, index, array) {
                      if(index !=0 && item.includes(val)){
                        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkTech}${index}`)}`)
                            .then(response => {
                                    if (response.ok) return response.json()
                                    throw new Error('Network response was not ok.')
                            })
                            .then((data) =>{
                                          var json = data.contents;
                                          var obj = JSON.parse(json);
                                          affichage += `<div id="div14">`;
                                          affichage +=`<li>Name : ${obj.name}</li>`;
                                          affichage +=`<li>Description : ${obj.description}</li>`;
                                          affichage +=`<li>Expansion : ${obj.expansion}</li>`;
                                          affichage +=`<li>Age : ${obj.age}</li>`;
                                          affichage +=`<li>Build Time : ${obj.build_time}</li>`;
                                          affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${obj.id+400}","${obj.name.replace(/ /g, "-")}")>`;
                                          affichage+= `</div>`;
                                          document.getElementById("bloc-resultats").innerHTML = ul;
                                          document.getElementById("ul").innerHTML = affichage;
                                        })
                      }
                      });
      }else{//affichage de toutes les civs si rien n'est saisi
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkTechs}`)}`)
        .then(response => {
                if (response.ok) return response.json()
                throw new Error('Network response was not ok.')
        })
        .then((data) =>{
                          const json = data.contents;
                          const obj = JSON.parse(json);
                          let affichage = `</ul>`;
                          for(let structure of obj.technologies){
                            affichage += `<div id="div14">`;
                              affichage +=`<li>Name : ${structure.name}</li>`;
                              affichage +=`<li>Description : ${structure.description}</li>`;
                              affichage +=`<li>Expansion : ${structure.expansion}</li>`;
                              affichage +=`<li>Age : ${structure.age}</li>`;
                              affichage +=`<li>Build Time : ${structure.build_time}</li>`;
                          affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${obj.id+400}","${obj.name.replace(/ /g, "-")}")>`;
                          affichage+= `</div>`;

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
  affichage_favoris_structs();
  affichage_favoris_techs();
}

function recherche_favoris(index){
  document.getElementById("bloc-resultats").innerHTML ="";
  console.log(index);

  if(index<=50){

    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkCiv}${index}`)}`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then((data) =>{
        var json = data.contents;
        var obj = JSON.parse(json);
        var affichage ='<ul>';
        affichage +=`<div id="div13">`
        affichage +=`<li>Name : ${obj.name}</li>`;
        affichage +=`<li>Expansion : ${obj.expansion}</li>`;
        affichage +=`<li>Army type : ${obj.army_type}</li>`;
        affichage +=`<li>Team Bonus : ${obj.team_bonus}</li>`;
        affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${obj.id}","${obj.name.replace(/ /g, "-")}")>`;
        affichage +=`</div>`;
        affichage += '</ul>';
        document.getElementById("bloc-resultats").innerHTML = affichage;

      })

  }else if(index<=200){


    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkUnit}${index-50}`)}`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then((data) =>{
        var json = data.contents;
        var obj = JSON.parse(json);

        var affichage ='<ul>';
        affichage +=`<div id="div12">`
      affichage +=`<li>Name : ${obj.name}</li>`;
      affichage +=`<li>Expansion : ${obj.expansion}</li>`;
      affichage +=`<li>Hit point : ${obj.hit_points}</li>`;
      affichage +=`<li>Range : ${obj.range}</li>`;
      affichage +=`<li>Attack : ${obj.attack}</li>`;
      affichage +=`<li>Armor : ${obj.armor}</li>`;
        affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${obj.id+50}","${obj.name.replace(/ /g, "-")}")>`;
        affichage +=`</div>`;
        affichage += '</ul>';
        document.getElementById("bloc-resultats").innerHTML = affichage;

      })

  }else if(index<=400){
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkStruct}${index-200}`)}`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then((data) =>{

        var json = data.contents;

        var structure = JSON.parse(json);

        var affichage ='<ul>';
        affichage +=`<div id="div15">`;
      affichage +=`<li>Name : ${structure.name}</li>`;
      affichage +=`<li>Expansion : ${structure.expansion}</li>`;
      affichage +=`<li>Age : ${structure.age}</li>`;
      affichage +=`<li>Build Time : ${structure.build_time}</li>`;
      affichage +=`<li>Hit points : ${structure.hit_points}</li>`;
      affichage +=`<li>Armor : ${structure.armor}</li>`;
        affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${structure.id+200}","${structure.name.replace(/ /g, "-")}")>`;
        affichage +=`</div>`;
        affichage += '</ul>';
        document.getElementById("bloc-resultats").innerHTML = affichage;

      })

  }else {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`${linkTech}${index-400}`)}`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then((data) =>{
        var json = data.contents;
        var obj = JSON.parse(json);
        console.log(obj);
        var affichage ='<ul>';
        affichage +=`<div id="div14">`
      affichage +=`<li>Name : ${obj.name}</li>`;
      affichage +=`<li>Description : ${obj.description}</li>`;
      affichage +=`<li>Expansion : ${obj.expansion}</li>`;
      affichage +=`<li>Age : ${obj.age}</li>`;
      affichage +=`<li>Build Time : ${obj.build_time}</li>`;
        affichage += `<input type="button" value="Ajouter aux favoris" onclick=setCookie("${obj.id+400}","${obj.name.replace(/ /g, "-")}")>`;
        affichage +=`</div>`;
        affichage += '</ul>';
        document.getElementById("bloc-resultats").innerHTML = affichage;

      })

  }



}

function affichage_favoris_civs(){//affichage des favoris de civs

  var affichage = '<ul>';
  for (let i = 1; i < 50; i++) { //cookies 0à50 sont pour les civs
    if(getCookie(i)!=""){
      //console.log(getCookie(i));
      //affichage += `<li>${getCookie(i)}</li>`; // La prochaine ligne est jste la pour dire qu'on peut le faire
      affichage += `<li><a onclick="recherche_favoris(${i})">${getCookie(i)}</a></li>`;
      affichage += `<input type="button" value="Supprimer" onclick=setCookie("${i}","")>`;
    }
  }
  affichage += '</ul>';
  document.getElementById("bloc-favoris-civs").innerHTML =affichage;//affichage des favoris a droite
}

function affichage_favoris_units(){//affichage des favoris de units

  var affichage = '<ul>';
  for (let i = 51; i < 200; i++) { //cookies 51 à 200 pour les units
    if(getCookie(i)!=""){
      //console.log(getCookie(i));
      //affichage += `<li>${getCookie(i)}</li>`; // La prochaine ligne est jste la pour dire qu'on peut le faire
      affichage += `<li><a onclick="recherche_favoris(${i})">${getCookie(i)}</a></li>`;
      affichage += `<input type="button" value="Supprimer" onclick=setCookie("${i}","")>`;
    }
  }
  affichage += '</ul>';
  document.getElementById("bloc-favoris-units").innerHTML =affichage;//affichage des favoris a droite
}

function affichage_favoris_structs(){//affichage des favoris de units

  var affichage = '<ul>';
  for (let i = 201; i < 400; i++) { //cookies 201 à 400 pour les units
    if(getCookie(i)!=""){
      //console.log(getCookie(i));
      //affichage += `<li>${getCookie(i)}</li>`; // La prochaine ligne est jste la pour dire qu'on peut le faire
      affichage += `<li><a onclick="recherche_favoris(${i})">${getCookie(i)}</a></li>`;
      affichage += `<input type="button" value="Supprimer" onclick=setCookie("${i}","")>`;
    }
  }
  affichage += '</ul>';
  document.getElementById("bloc-favoris-structs").innerHTML =affichage;//affichage des favoris a droite
}

function affichage_favoris_techs(){//affichage des favoris de units

  var affichage = '<ul>';
  for (let i = 401; i < 500; i++) { //cookies 51 à 100 pour les units
    if(getCookie(i)!=""){
      //console.log(getCookie(i));
      //affichage += `<li>${getCookie(i)}</li>`; // La prochaine ligne est jste la pour dire qu'on peut le faire
      affichage += `<li><a onclick="recherche_favoris(${i})">${getCookie(i)}</a></li>`;
      affichage += `<input type="button" value="Supprimer" onclick=setCookie("${i}","")>`;
    }
  }
  affichage += '</ul>';
  document.getElementById("bloc-favoris-techs").innerHTML =affichage;//affichage des favoris a droite
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

//function attente(){
   //var img = document.getElementById("attente");
   //img.style.visibilty = 'visible';
//}

init();
//attente();
