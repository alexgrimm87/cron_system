$(document).ready(function(){
//Form Styler
  $('.js-file').styler();
  $('.js-select').styler();

//ScrollPane
  $('.js-scrollpane').jScrollPane({
    verticalDragMinHeight: 28,
    verticalDragMaxHeight: 63
  });

//Input File Remove Button
  $('.js-remove').on('click', function(e){
    e.preventDefault();
    $('.jq-file input').val('');
    $('.jq-file__name').text('Загрузить резюме');
  })

 //Login/Reg/Recovery Height
  var enterHeight = $(window).outerHeight()-$('.enter-top').outerHeight();
  $('.enter-content').css('min-height', enterHeight);

  $('.js-title').on('click', function(e){
    e.preventDefault();
    $(this).next('ul, div').slideToggle();
    $(this).find('.filter-arrow').toggleClass('active');
  })

//Catalog Filter
  $('.burger').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('open');
    var filter = $('.catalog-filter-wrap');

    if ($('.burger').hasClass('active')) {
      filter.removeClass('active');
      $(this).removeClass('active');
    } else {
      filter.addClass('active');
      $(this).addClass('active');
    }
    return false;
  });
});

//Catalog Filter Hide
$(document).click(function(e) {
  if ($(e.target).closest('.catalog-filter-wrap').length)
    return;
  $('.catalog-filter-wrap').removeClass('active');
  $('.burger').removeClass('active open');

  e.stopPropagation();
});

$(window).load(function(){

});

$(window).resize(function(){

});