
fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://age-of-empires-2-api.herokuapp.com/api/v1/structure/1')}`)
.then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
})
.then(data => console.log(data.contents));

document.getElementById("rc").addEventListener('input', function(){
  if(this.value.length == 5){
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://age-of-empires-2-api.herokuapp.com/api/v1/structure/1')}`)
    .then(response => {
            if (response.ok) return response.json()
            throw new Error('Network response was not ok.')
    })
    .then(data => console.log(data.contents));
  }
});
