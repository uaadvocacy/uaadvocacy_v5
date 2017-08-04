$(function() {
  $("form#get-zip").submit(function() {
    $("ul#legislators").empty();
    var zip = $("input#zip").val();
    $("input#zip").val("");
    $.get("http://congress.api.sunlightfoundation.com/legislators/locate?apikey=d4e0c5f54e8a4f56b48bc4bb65e7acda&zip=" + zip, function(responseBody) {
      responseBody.results.forEach(function(legislator) {
        $("ul#legislators").append(
          "<li id='name'>" +
            "<h3>" + legislator.first_name + " " +legislator.last_name + " (" + legislator.chamber + ")</h3>" +
          "<li class='center'>" + "<button type='submit' value= '" + legislator.bioguide_id + "' class='btn btn-warning btn-small info'>DETAILS</button></li>" + 
          "<ul id='info-list'>" + 
            "<li>Party: " + legislator.party + "</li>" + 
            "<li>" + "Phone: " + legislator.phone + "</li>" + 
            "<li>" + "Office: " + legislator.office + "</li>" +
            "<li>" + "State: " + legislator.state + "</li>" + 
            "<li>" +  "<a href='" + legislator.website + "'>" + legislator.website + "</a>"+ "</li>" +
            "<li>" + "<a href= 'https://twitter.com/" + legislator.twitter_id + "'>" + "Twitter" + "</a>" + " - " + "<a href= 'https://facebook.com/" + legislator.facebook_id + "'>" + "Facebook" + "</a>" + " - " + "<a href= 'https://youtube.com/" + legislator.youtube_id + "'>" + "YouTube" + "</a>" +"</li>" + 
          "</ul>" +
        "</li>" +
        "<li class='center'>" + 
          "<button type='submit' value= '" + legislator.bioguide_id + "' class='btn btn-warning btn-small bills'>FIND BILLS I'VE SPONSORED</button>" +
        "</li>" + 
        "<ul id='bills-list'></ul>" 
         );  
      }); 

      $("button.info").click(function() {
        $(this).parent().next("#info-list").slideToggle();
      }); 

      $("button.bills").click(function() {
        var id = $(this).attr("value"); 
        if (!$(this).hasClass('populated')) {
          $(this).addClass('populated');
          var target = $(this).parent().next("#bills-list");
          $.get("http://congress.api.sunlightfoundation.com/bills/search?apikey=d4e0c5f54e8a4f56b48bc4bb65e7acda&sponsor_id=" + id, function(responseBody) {
            responseBody.results.forEach(function(bill) {
              $(target).append(
                "<li>" + "-" + bill.official_title.slice(0,150) + "...</li>" + 
                "<li> More info at: <a href='" + bill.urls.congress + "'>Congress.gov, </a><a href='" + bill.urls.opencongress + "'>OpenCongress</a></li>"
              );
            });
          });
        };
        $(this).parent().next("#bills-list").slideToggle(); 
      });
    }); 
    return false;
  });
});
