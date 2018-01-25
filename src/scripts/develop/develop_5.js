
// Clock Timer

var deadline = new Date('05/28/2017 23:59:59'); //( month / day / year / time )
var deadline_one = new Date('05/28/2017 23:59:59');
var deadline_two = new Date('05/28/2017 23:59:59');

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / 1000 / 60 / 60) % 24);
  var days = Math.floor((t / 1000 / 60 / 60) / 24);
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  
  if($("#"+id).length){
    var clock = document.getElementById(id);
    var days = clock.querySelector('.days');
    var hours = clock.querySelector('.hours');
    var minutes = clock.querySelector('.minutes');
    var seconds = clock.querySelector('.seconds');

    function updateClock() {
      var t = getTimeRemaining(endtime);


      days.innerHTML = ('0' + t.days).slice(-2);
     hours.innerHTML = ('0' + t.hours).slice(-2);
     minutes.innerHTML = ('0' + t.minutes).slice(-2);
     seconds.innerHTML = ('0' + t.seconds).slice(-2);
     

      if (t.total <= 0) {
        clearInterval(timeinterval);
        deadline.setDate(deadline.getDate()+10);
        deadline_one.setDate(deadline_one.getDate()+10);
        deadline_two.setDate(deadline_two.getDate()+10);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }
};

// Change Form Info

function changeFormInfo() {

  $('.change-button-form').on('click', function(e) {

    var thisFormAction = $(this).closest('form').attr('action');
    var thisFormVal = $(this).closest('form').find('input').val();    
    
    $(this).toggleClass('click-it');

    if ( $(this).hasClass('click-it') ) {

      e.preventDefault();
      // $(this).text('сохранить').attr('type', 'submit');
      $(this).text('сохранить');
      $(this).closest('form').find('input').removeAttr('disabled');

    } else{

      $.ajax({
          url : thisFormAction,
          data: thisFormVal,
          method:'POST',
      });
      
      // $(this).text('сменить').attr('type', 'button');
      $(this).text('сменить');
      $(this).closest('form').find('input').attr('disabled','');

    };
    
  });
};

// tabs private office

function privateOfficeTab() {

    if ($('.private-office').length) {

      // $('.wrap-cabinet .cabinet-content .navbar .cabinet-navbar li').eq(0).find('a').addClass('active');
      $('.private-office .office-box .office-content-box .office-tab').eq(0).addClass('active');

      $('.private-office .office-box .nav-bar .office-tab-links li a').click(function (e) {
        if (!$(this).hasClass('escape')) {
          e.preventDefault();
          $(this).closest('.office-tab-links').find('li a').removeClass('active');
          $(this).addClass('active');

          var index = $(this).closest('li').index();
          $(this).closest('.office-box').find('.office-content-box .office-tab').removeClass('active');
          $(this).closest('.office-box').find('.office-content-box .office-tab').eq(index + 1).addClass('active');

          // if ($(window).width() < 768) {
          //   $(this).closest('.cabinet-navbar').slideUp();
          //   $(this).closest('.cabinet-navbar').prev('.burger').toggleClass('active');
          // }
        }
      });

      $('.private-office .office-box .office-content-box .office-tab .office-link').click(function (e) {
        if (!$(this).hasClass('escape')) {
          e.preventDefault();
          var index = $(this).index();
          $(this).closest('.office-box').find('.nav-bar .office-tab-links li a').removeClass('active');
          $(this).closest('.office-box').find('.nav-bar .office-tab-links li').eq(index).find('a').addClass('active');

          $(this).closest('.office-box').find('.office-content-box .office-tab').removeClass('active');
          $(this).closest('.office-box').find('.office-content-box .office-tab').eq(index + 1).addClass('active');
        }
      });
    };
};


$(document).ready(function(){

// Clock Timer

    initializeClock('close-timer1', deadline);

// Change Form Info

    changeFormInfo();

// tabs private office

  privateOfficeTab();

  if ($(window).width() < 1280) {

    $('.about-us .wrap-text>img').appendTo('.about-us .wrap-text');
  };
  if ($(window).width() > 1280) {

    $('.about-us .wrap-text>img').prependTo('.about-us .wrap-text');
  };
  if ($(window).width() < 992) {

    $('.private-office .nav-bar>#office-title').prependTo('.private-office .office-content-box');
  };
  if ($(window).width() > 992) {

    $('.private-office .office-content-box>#office-title').prependTo('.private-office .nav-bar');
  };

});

$(window).load(function(){

});

$(window).resize(function(){

  if ($(window).width() < 1280) {

    $('.about-us .wrap-text>img').appendTo('.about-us .wrap-text');
  };
  if ($(window).width() > 1280) {

    $('.about-us .wrap-text>img').prependTo('.about-us .wrap-text');
  };

  if ($(window).width() < 992) {

    $('.private-office .nav-bar>#office-title').prependTo('.private-office .office-content-box');
  };
  if ($(window).width() > 992) {

    $('.private-office .office-content-box>#office-title').prependTo('.private-office .nav-bar');
  };

});