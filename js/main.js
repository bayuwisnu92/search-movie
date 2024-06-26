function mencari(){
  $('#movie-list').html('')
  $('#tulis').html('sedang mencari filmnya .....')
  $.ajax({
    url :'https://omdbapi.com',
    type : 'get',
    dataType : 'json',
    data : {
      'apikey': '73ba22ff',
      's' : $('#search-input').val()
    },
    success : function (result){
      if(result.Response == 'True'){
        $('#search-input').html('tulis titlenya')
        let movies = result.Search;
        $.each(movies,function(i,data){
          $('#tulis').html('')
            $('#movie-list').append(`
            <div class="col-md-4">
            <div class="card" >
            <img src="`+data.Poster +`" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">`+ data.Title +`</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">`+ data.Year +`</h6>
              <a href="#" class="see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ data.imdbID+`">see detail</a>
            </div>
            </div>
            </div>
            `)
        })

        $("#search-input").val('')

      }else {
        $('#tulis').html('')
        $('#movie-list').html('<h1 class="text-center">' + result.Error + '</h1>')
      }
    }
  })
}

$('#search-button').on('click', function(){
  mencari()
})

$('#search-input').on('keyup', function(e){
  if(e.keyCode === 13){
    mencari()
  }
})
$('#movie-list').on('click', '.see-detail',function(){
  $.ajax({
    url :'https://omdbapi.com',
    type : 'get',
    dataType : 'json',
    data : {
      'apikey': '73ba22ff',
      'i' : $(this).data('id') 
  },
  success : function(movie){
    if(movie.Response === "True"){
      $('.modal-body').html(`
        <div class="container-fluid">
          <div class="row">
          <div class="col-md-4">
            <img src="`+ movie.Poster +`" class="img-fluid">  
          </div>
          <div class="col-md-8">
            <ul class="list-group">
              <li class="list-group-item"><h3>`+ movie.Title+`</h3></li>
              
              <li class="list-group-item">release :`+ movie.Released+`</li>
              <li class="list-group-item">Genre :`+ movie.Genre+`</li>
              <li class="list-group-item">Director :`+ movie.Director+`</li>
              <li class="list-group-item">Actor :`+ movie.Actors+`</li>
              

              
            </ul>
          </div>
          </div>
        </div>
      `)
    }
  }
  })

})


