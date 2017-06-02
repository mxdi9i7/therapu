$(document).ready(function() {

    $('.toggle').on('click', function() {
      $('.container').stop().addClass('active');
    });

    $('.close').on('click', function() {
      $('.container').stop().removeClass('active');
    });
    $(".button-collapse").sideNav();
        $('select').material_select();
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
        
    //check admin logic
    
    if (parseInt($('#checkAuth').val()) == 1) {
      $('#loginBtn').hide()
      $('#logoutBtn').show()
      $('#createSurvey').hide()
    } else if (parseInt($('#checkAuth').val()) == 2) {
      $('#createSurvey').show()
      $('#loginBtn').hide()
      $('#logoutBtn').show()
    } else {
      $('#loginBtn').show()
      $('#logoutBtn').hide()
      $('#createSurvey').hide()
    }

    
})  

