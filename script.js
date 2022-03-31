
document.getElementById("rc").addEventListener('input', function(){
  if(this.value.length == 5){
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://age-of-empires-2-api.herokuapp.com/api/v1/structure/${this.value}`)}`)
    .then(response => {
            if (response.ok) return response.json().then((data) =>{
              const json = data.contents;
              const obj = JSON.parse(json);
              let affichage = '<ul>';
              for(let structure of obj){
                affichage += `<li>${structure.id}</li>`;
              }
              affichage += '</ul>';
              document.getElementById("bloc-resultats").innerHTML = affichage;
            })
            throw new Error('Network response was not ok.')
    })
    .then(data => console.log(data));
  }
});
