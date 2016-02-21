'use strict';

$(document).ready(function () {
  var $searchButton = $('#searchButton');
  var appId;
  $.get('/env')
  .done(function (data) {
    appId = data;
  });
  function getImage () {
    var azurekey = btoa(appId);
    var $searchQuery = $('#searchBox').val();
    var myurl = 'https://api.datamarket.azure.com/Bing/Search/v1/Composite?Sources=%27image%27&$top=50&$format=json&Query=%27'+ $searchQuery + '%27';
    $.ajax({
      method: 'post',
      url: myurl,
      headers:{
        'Authorization': 'Basic ' + azurekey
      },
      success: function (data) {
        var randomIndex = Math.floor(Math.random() * 50);
        var imgLink = '<img width="500px" src="' + data.d.results[0].Image[randomIndex].MediaUrl + '" />';
        $('#output').html(imgLink);
      },
      failure: function (err) {
        console.error('Error : ', err);
      }
    });
  };

  $searchButton.click(function (e) {
    e.preventDefault();
    getImage();
  });
});
