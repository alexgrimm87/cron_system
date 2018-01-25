'use strict';

/**
* Check scroll-bar width
* exemple ->   let scroll = $.scrollbarWidth();
*/
$.scrollbarWidth = function () {
    var a, b, c;if (c === undefined) {
        a = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b = a.children();c = b.innerWidth() - b.height(99).innerWidth();a.remove();
    }return c;
};

/**
* Scroll to the block
* @param {block} str - For what we click
* @param {targetBlock} str - to what we should scroll
*/
function scrollUp(block, targetBlock) {
    $(block).click(function (e) {
        var target = $(targetBlock).offset().top;

        $('body,html').stop().animate({ scrollTop: target }, 800);
        return false;

        e.preventDefault();
    });
}

/**
* Scroll animation
* @param {item} jquery obj - Wrapper for class 'animate-it';
*/
function animationBlock(item) {

    $(window).scroll(function () {
        checkForAnimate();
    });

    function checkForAnimate() {
        var bottomCheck = $(window).height() + $(window).scrollTop();
        var windowTop = $(window).scrollTop() + $(window).height() / 1.5;
        item.each(function () {
            if (windowTop > $(this).offset().top || bottomCheck > $('body').height() * 0.98) {

                var itemSect = $(this);
                var point = 0;
                itemSect.find('.animate-it').addClass('animated');

                var timer = setInterval(function () {
                    itemSect.find('.animate-delay').eq(point).addClass('animated');
                    point++;
                    if (itemSect.find('.animate-delay').length == point) {
                        clearInterval(timer);
                    }
                }, 200);
            }
        });
    }
    checkForAnimate();
}

/**
* GO TO href (smooth)
*/
function goTo() {
    $('.header-menu a').click(function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var target = $(href).offset().top - 65;
        $('body,html').animate({ scrollTop: target }, 500);
    });
}

/**
* Cut text script
* (Add to  div class "cut-text" width data-attr "data-cut"(length letters to show) )
*/
function cutText() {
    var filler = '...';
    var filler_length = filler.length;
    $('.cut-text').each(function () {
        var value = $(this).data('cut') - filler_length;
        var text = $.trim($(this).text());
        if (text.length > value && value > 0) {
            var newText = text.substring(0, value) + filler;
            $(this).text(newText);
        }
    });
};

/**
* Functional header butter
* @param {menuMobile} jquery obj - For what we click
* @param {toggleMenu} jquery obj - to what menu we will slideToggle
*/
function headeButer(menuMobile, toggleMenu) {
    if (menuMobile) {
        menuMobile.click(function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                $(this).toggleClass('active');
                toggleMenu.stop().slideToggle();
            }
        });

        $(document).on('click touchstart', function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                var div = toggleMenu;
                if (!div.is(event.target) && div.has(event.target).length === 0 && !menuMobile.is(event.target) && menuMobile.has(event.target).length === 0) {
                    toggleMenu.slideUp();
                    menuMobile.removeClass('active');
                }
            }
        });
    }
}

/**
* Expresion for numbers with spaces
* @param {x} number
* @return {string}
*/
function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

$(document).ready(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());

    // goTo()
});

$(window).resize(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());
});
'use strict';

function topSlider(selector) {
    $(selector).slick({
        dots: false,
        fade: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1
    });
}

function brandSlider(selector) {
    var prev = $(selector).prev('.prev');
    var next = $(selector).next('.next');
    $(selector).slick({
        dots: false,
        infinite: true,
        // autoplay: true,
        // autoplaySpeed: 5000,
        prevArrow: prev,
        nextArrow: next,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1367,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 667,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 440,
            settings: {
                slidesToShow: 2,
                autoplay: true,
                arrows: false
            }
        }]
    });
}

function busketCount(selector) {
    $(selector).val(1);
    var count = 1;
    var price = 0;

    $(selector).find('input').on('change', function () {

        if ($(this).val() <= 0) {
            $(this).val(1);
        } else if ($(this).val() > 1000) {
            $(this).val(1000);
        }
        price = $(this).closest('.table-row').find('.price span').text().replace(/\s+/g, '');
        count = $(this).val();
        $(this).closest('.table-row').find('.product-summ span').text(price * count);

        var total = 0;
        $(this).closest('.busket-table').find('.table-row').each(function () {
            if ($(this).find('.js-number').length) {
                var i = $(this).find('.product-summ span').text().replace(/\s+/g, '');
                total += parseInt(i);
            }
        });
        $(this).closest('.busket-table').find('.table-footer .summ').text(total + " руб");
    });
}

$(document).ready(function () {
    topSlider('.index-slider');
    brandSlider('.brand-slider');

    $('.js_popup').fancybox();

    $('.el-radio').styler();
    $('.js-number').styler();

    busketCount('.js-number');

    var availableTags = ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"];
    $(".search-input").autocomplete({
        source: availableTags
    });

    $('.header .busket').click(function (e) {
        e.preventDefault();
        $(this).next('.busket-popup').slideToggle();
        return false;
    });

    $('.busket-popup .close').click(function (e) {
        e.preventDefault();
        $(this).closest('.busket-popup').slideUp();
        return false;
    });

    $('<a href="javascript:void(0)" class="slide-up"><span></span></a>').insertAfter('.menu-list li:has("ul") > a');

    $('.menu-list > li ul li .slide-up').click(function () {
        var parent_ul = $(this).parents('ul');
        $(this).closest('.menu-list').find('ul li ul').not(parent_ul).slideUp();

        if ($(this).next('ul').css('display') == "none") {
            $(this).next('ul').slideDown();
        } else {
            $(this).next('ul').slideUp();
        }
    });

    $('.menu-list > li > .slide-up').click(function () {
        if ($(this).next('ul').css('display') == "none") {
            $(this).next('ul').slideDown();
        } else {
            $(this).next('ul').slideUp();
        }
    });

    $('.header .catalogue').click(function (e) {
        e.preventDefault();
        $('.header-huge-menu').addClass('active');
    });

    $('.header .header-huge-menu .close').click(function (e) {
        e.preventDefault();
        $('.header-huge-menu').removeClass('active');
    });

    // removing product from busket

    if ($('.first-busket').length) {
        $('.busket-table .delete').click(function (e) {
            e.preventDefault();
            var id = $(this).attr('data-id');
            var product = $(this).closest('.table-row');
            $.ajax({
                url: removing_from_busket,
                data: { 'remove_id': id },
                method: 'POST',
                success: function success(data) {
                    if (data) {
                        product.remove();
                    }
                }
            });
        });
    };

    // /removing product from busket

    // show more button
    $('.more').on("click", function (e) {
        e.preventDefault();
        var products = $(this).closest('.products').find('.product-item');
        $.ajax({
            url: show_more,
            data: products,
            method: 'POST',
            success: function success(data) {
                if (data) {
                    products.empty();
                    products.append(data);
                    $(this).remove();
                }
            }
        });
    });
    // /show more button

    // burger
    $('.header-burger').click(function (e) {
        e.preventDefault();
        $(this).next('.header-menu').toggleClass('active');
    });

    $('.header-menu .close').click(function (e) {
        e.preventDefault();
        $(this).closest('.header-menu').toggleClass('active');
    });
    // /burger
});

jQuery(document).click(function (event) {
    if ($(event.target).closest(".busket-popup").length) return;
    jQuery(".busket-popup").slideUp();

    event.stopPropagation();
});

$(window).load(function () {});

$(window).resize(function () {});
'use strict';

// Clock Timer

var deadline = new Date('05/28/2017 23:59:59'); //( month / day / year / time )
var deadline_one = new Date('05/28/2017 23:59:59');
var deadline_two = new Date('05/28/2017 23:59:59');

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor(t / 1000 % 60);
  var minutes = Math.floor(t / 1000 / 60 % 60);
  var hours = Math.floor(t / 1000 / 60 / 60 % 24);
  var days = Math.floor(t / 1000 / 60 / 60 / 24);
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {

  if ($("#" + id).length) {
    var updateClock = function updateClock() {
      var t = getTimeRemaining(endtime);

      days.innerHTML = ('0' + t.days).slice(-2);
      hours.innerHTML = ('0' + t.hours).slice(-2);
      minutes.innerHTML = ('0' + t.minutes).slice(-2);
      seconds.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
        deadline.setDate(deadline.getDate() + 10);
        deadline_one.setDate(deadline_one.getDate() + 10);
        deadline_two.setDate(deadline_two.getDate() + 10);
      }
    };

    var clock = document.getElementById(id);
    var days = clock.querySelector('.days');
    var hours = clock.querySelector('.hours');
    var minutes = clock.querySelector('.minutes');
    var seconds = clock.querySelector('.seconds');

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }
};

// Change Form Info

function changeFormInfo() {

  $('.change-button-form').on('click', function (e) {

    var thisFormAction = $(this).closest('form').attr('action');
    var thisFormVal = $(this).closest('form').find('input').val();

    $(this).toggleClass('click-it');

    if ($(this).hasClass('click-it')) {

      e.preventDefault();
      // $(this).text('сохранить').attr('type', 'submit');
      $(this).text('сохранить');
      $(this).closest('form').find('input').removeAttr('disabled');
    } else {

      $.ajax({
        url: thisFormAction,
        data: thisFormVal,
        method: 'POST'
      });

      // $(this).text('сменить').attr('type', 'button');
      $(this).text('сменить');
      $(this).closest('form').find('input').attr('disabled', '');
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

$(document).ready(function () {

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

$(window).load(function () {});

$(window).resize(function () {

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
'use strict';

$(document).ready(function () {
  //Form Styler
  $('.js-file').styler();
  $('.js-select').styler();

  //ScrollPane
  $('.js-scrollpane').jScrollPane({
    verticalDragMinHeight: 28,
    verticalDragMaxHeight: 63
  });

  //Input File Remove Button
  $('.js-remove').on('click', function (e) {
    e.preventDefault();
    $('.jq-file input').val('');
    $('.jq-file__name').text('Загрузить резюме');
  });

  //Login/Reg/Recovery Height
  var enterHeight = $(window).outerHeight() - $('.enter-top').outerHeight();
  $('.enter-content').css('min-height', enterHeight);

  $('.js-title').on('click', function (e) {
    e.preventDefault();
    $(this).next('ul, div').slideToggle();
    $(this).find('.filter-arrow').toggleClass('active');
  });

  //Catalog Filter
  $('.burger').on('click', function (e) {
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
$(document).click(function (e) {
  if ($(e.target).closest('.catalog-filter-wrap').length) return;
  $('.catalog-filter-wrap').removeClass('active');
  $('.burger').removeClass('active open');

  e.stopPropagation();
});

$(window).load(function () {});

$(window).resize(function () {});