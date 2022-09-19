
const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    nav: false,
    controls: false,
    responsive: {
      575: {
        center: true,
        prevButton: false,
        nextButton: false,
        nav: true,
      },
      767: {
        center: true,
        prevButton: false,
        nextButton: false,
        nav: true
      },
      768: {
        nav: false
      }
   }
});

document.querySelector('.prev').addEventListener('click', () => {
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', () => {
    slider.goTo('next');
});


(function($) {
    $(function() {
      
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      function toggleSlide (linkClass){
        $(linkClass).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
          });
      };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal
    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i){
      $(this).on('click', function(){
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      })
    });

    function validateForm(form) {
      $(form).validate({
        rules: {
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true
          } 
        },
        messages: {
          name: "Пожалуйста, введите своё имя",
          phone: "Пожалуйста, введите номер телефона",
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Введите адрес в формате name@domain.com"
          }
        }
      });
    };

    validateForm('#consultation-form');
    validateForm('#consultation form');
    validateForm('#order form');

    $('input[name=phone]').mask("+38 (999) 999-99-99");

    $('form').submit(function(e) {
      e.preventDefault();
      if(!$(this).valid()) {
        return;
      };
      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
      });
      return false;
    });

    //Smooth scroll and pageup

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $("a[href^='#']").click(function() {
      const _href = $(this).attr("href");
      $("html, body").animate({
        scrollTop: $(_href).offset().top+"px"
      });
      return false;
    });

  });

  new WOW({
    animateClass: 'animate__animated'
  }).init();

})(jQuery);
    