'use strict';

$(document).ready(function () {
  //Declare variables
  var $searchButton = $('#searchButton');
  var appId;
  //Get app ID from server .env file
  $.get('/env')
  .done(function (data) {
    appId = data;
  });
  //Function to get images
  function getImage () {
    //base64 encode the AppId
    var azurekey = btoa(appId);
    //get the value from the search box
    var $searchQuery = $('#searchBox').val();
    //Create the search string
    var myurl = 'https://api.datamarket.azure.com/Bing/Search/v1/Composite?Sources=%27image%27&$top=50&$format=json&Query=%27'+ $searchQuery + '%27';
    //Make post request to bing
    $.ajax({
      method: 'post',
      url: myurl,
      //Set headers to authorize search with Bing
      headers:{
        'Authorization': 'Basic ' + azurekey
      },
      success: function (data) {
        //Insert random image in dom
        var randomIndex = Math.floor(Math.random() * 50);
        var imgLink = '<img width="500px" src="' + data.d.results[0].Image[randomIndex].MediaUrl + '" />';
        $('#output').html(imgLink);
      },
      failure: function (err) {
        console.error(err);
      }
    });
  };
  //Trigger function when button is clicked
  $searchButton.click(function (e) {
    e.preventDefault();
    getImage();
  });
});
