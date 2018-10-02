
function carregaFilmes(){

    document.getElementById("titulo").innerHTML =
        "FILMES: (<a href='https://ghibliapi.herokuapp.com/films' target='_blank'>API</a>)";

    var request = new XMLHttpRequest();

    request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

    request.onload = function () {

        var data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {

            var i;
            var texto = "";
            for (i = 0; i < data.length; i++) {

                movie = data[i];

                texto +=  "<font color='blue'><b>"+movie.title +"</b></font>" +":"+ movie.description + "<br>";

                //console.log(movie.title);

            }

            document.getElementById("resultado").innerHTML = texto;

        } else {

            console.log("erro");
        }
    }

    request.send();
}


function carregaBestSellers(){

    document.getElementById("titulo").innerHTML =
        "BEST SELLERS: (<a href='https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=9e05e60e080945aeb798b8f084cf473c' target='_blank'>API</a>)";
    //Key
    //9e05e60e080945aeb798b8f084cf473c

    var url = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json";
    url += '?' + $.param({
        'api-key': "9e05e60e080945aeb798b8f084cf473c",
        'title': "economy"
    });
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(result) {

        var livros = result["results"];
        var livro;
        var i;
        var texto = "";
        for (i = 0; i < livros.length; i++) {
            livro = livros[i];
            texto +=  "<font color='blue'><b>"+livro.title +"</b></font>" +":"+ livro.author + "<br>";
        }

        document.getElementById("resultado").innerHTML = texto;

        //console.log(result);
    }).fail(function(err) {
        throw err;
    });
}

//https://developer.nytimes.com/