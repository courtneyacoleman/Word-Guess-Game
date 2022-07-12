function getApi() {
    let requestUrl = 'https://random-word-api.herokuapp.com/word;'

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data){
        console.log(data);
    } )
}
getApi();