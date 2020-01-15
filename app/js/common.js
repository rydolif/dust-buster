$(function() {


//------------------------------acardeon---------------------------
  $(".block__content").slideUp("slow");
  $(".block").first().addClass('active');
  $(".faq__active .block__content").slideDown("slow");

  $(".block__header").on("click", function(){
    if ($(this).parent().hasClass('active')) {
      $(this).parent().removeClass('active');
      $(".block__content").slideUp("slow");
    }
    else {
      $(".faq__active .block__content").slideUp("slow");
      $(".faq__active").removeClass('faq__active');
      $(this).parent().addClass('faq__active');
      $(".faq__active .block__content").slideDown("slow");
    }
  });

//-------------------------------sliders---------------------------------------
  var swiper = new Swiper('.reviews__slider', {
    pagination: {
      el: '.reviews__pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.reviews__button-next',
      prevEl: '.reviews__button-prev',
    },
  });

  var swiper = new Swiper('.work__slider', {
    allowTouchMove: false,
    pagination: {
      el:  this.querySelector('.work__pagination'),
      type: 'fraction',
    },
    navigation: {
      nextEl: this.querySelector('.work__button-next'),
      prevEl: this.querySelector('.work__button-prev'),
    },
    
  });

//------------------------------гамбургер-----------------------------
  $('.hamburger').click(function() {
    $(this).toggleClass('hamburger--active');
    $('.nav').toggleClass('nav--active');
    $('.header').toggleClass('header--menu');
    $('body').toggleClass('no-scroll');
  });

//-------------------------------попандер---------------------------------------
  $('.modal').popup({transition: 'all 0.3s'});

//------------------------------------form-------------------------------------------
  $('input[type="tel"]').mask('+0 (000) 000-00-00');

  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
     return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, "Введите Ваш телефон");

  $(".form").each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        phone: {
          required: true,
          phoneno: true
        },
        name: 'required',
      },
      messages: {
        name: "Введите Ваше имя",
        phone: "Введите Ваш телефон",
        mail: "Введите Вашу почту",
      },
      submitHandler: function(form) {
        var t = {
          name: jQuery('.form-' + index).find("input[name=name]").val(),
          phone: jQuery('.form-' + index).find("input[name=phone]").val(),
          mail: jQuery('.form-' + index).find("input[name=mail]").val(),
          subject: jQuery('.form-' + index).find("input[name=subject]").val()
        };
        ajaxSend('.form-' + index, t);
      }
    });

  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

//----------------------------------------fixed----------------------------------
  $(window).scroll(function(){
      if($(this).scrollTop()>20){
          $('.header').addClass('header--active');
      }
      else if ($(this).scrollTop()<20){
          $('.header').removeClass('header--active');
      }
  });

  if ($(this).scrollTop()<20){
      $('.header').removeClass('header--active');
  }

//-------------------------скорость якоря---------------------------------------
  $(".header__list").on("click","a", function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top - 60}, 'slow', 'swing');
  });

//-------------------------------анімація цифр---------------------------------------
  // var show = true;
  // var countbox = ".about-statistics__container";
  // $(window).on("scroll load resize", function () {
  //     if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
  //     var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
  //     var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
  //     var w_height = $(window).height(); // Высота окна браузера
  //     var d_height = $(document).height(); // Высота всего документа
  //     var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
  //     if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
  //         $('.about-statistics__item h3').spincrement({
  //             thousandSeparator: "",
  //             duration: 2000
  //         });
  //         show = false;
  //     }
  // });

      
      

});

//----------------------------------------preloader----------------------------------
  $(window).on('load', function(){
    $('.preloader').delay(1000).fadeOut('slow');
  });


//----------------------------------------animation----------------------------------
  $(function(){
    $(".twentytwenty-container").twentytwenty();
  });