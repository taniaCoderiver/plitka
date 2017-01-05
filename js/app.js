  // Foundation JavaScript
  // Documentation can be found at: http://foundation.zurb.com/docs
  $(document).foundation({
    dropdown: {
      // specify the class used for active dropdowns
     is_hover: true
    },

    orbit: {
      animation: 'slide',
      animation_speed: 500,
      swipe: true,
      navigation_arrows: true,
      bullets: false,
      timer: false,
      next_on_click: false,
      timer_speed: 5000,
      slide_number: false
    },

    accordion: {
      content_class: 'content',
      active_class: 'active',
      multi_expand: true,
      toggleable: true
    }
    
  });

  $(document).ready(function(){

    jQuery.fn.exists = function(){return this.length>0;}

    function productTabs() {
      $('.js-item-tab').click(function() {
        var _this = $(this),
          p = _this.closest('.js-item-parent'),
          siblings = p.siblings();

        siblings.find($('.js-item-content')).slideUp();
        // siblings.find($('.js-item-content')).removeClass('is-active');
        p.find($('.js-item-content')).slideToggle();
        siblings.removeClass('is-active');
        p.toggleClass('is-active');
      });
    };
    productTabs();

    // text truncate inside the blocks
    if ($('.js-truncate').exists()) {
      $(".js-truncate").dotdotdot({
        ellipsis  : '... ',
        height: 36
      });
    };

    // mini function 
   
    if ($('.js-scroll-filter').exists()) {
      $('.js-scroll-filter').perfectScrollbar();
    };

    function desktop() {
      return window.matchMedia("(min-width: 768px)").matches;
    }

    // open/close mobile menu
    class Navigation {
      constructor(el) {
        this.el = $(el);
        this.btn = this.el.find('.js-nav-btn');
        this.nav = this.el.find('.js-mob-nav');

        $(window).resize(() => {
          this._hideNavOnResize();
        });
      }

      _showNav() {
        this.btn.click((e) => {
          e.preventDefault();

          this.btn.toggleClass('is-active');
          this.el.toggleClass('is-active');
          this.nav.toggleClass('is-visible');
          var scrollWidth = detectScrollWidth();

          if ( this.nav.hasClass('is-visible') ) {
            $('body')
              .addClass('is-overflow')
              .css('padding-right', scrollWidth + 'px');
          } else {
            $('body')
              .removeClass('is-overflow')
              .removeAttr('style');
          }
        });
      }

      _hideNavOnResize() {
        if ( $(window).width() > 1280 && this.nav.hasClass('is-visible') ) {
          this._hideNav();
        }
      }

      _hideNav() {
        this.btn.removeClass('is-active');
        this.el.removeClass('is-active');
        this.nav.removeClass('is-visible');
        $('body')
          .removeClass('is-overflow')
          .removeAttr('style');
      }

      init() {
        this._showNav();
        // this._hideNavOnClick();
      }
    }

    new Navigation('.js-top-nav').init();

    // detect scrollWidth
    function detectScrollWidth() {
      let outer = $('<div class="outer">')
                .css({ visibility: 'hidden', width: 100, overflow: 'scroll' })
                .appendTo('body'),
         inner = $('<div>')
                .css({width: '100%'})
                .appendTo(outer)
                .outerWidth();

      outer.remove();
      return 100 - inner;
    }

    // detect touch
    let isTouchDevice = () => { 'ontouchstart' in window };
    if ( !isTouchDevice() ) { $('body').addClass('no-touch') };


    // show/hide dropdown in navigation
    function initSubmenuToggle() {
      var navLink = $('.js-nav-link'),
        subnavLink = $('.js-subnav-link'),
        // navOption = $('.js-nav-option'),
        navDrop = $('.js-navdrop'),
        subDrop = $('.js-subnav-drop'),
        active = 'is-active';

      var hideCurrentNavDrop = function() {
        navLink.removeClass(active);
        navDrop.removeClass(active);
      };

      var showNavDrop = function(el) {
        $(el).addClass(active);
        $(el).parent().find(navDrop).addClass(active);
      };

      navLink.click(function(evt) {


        if ( $(window).width() <= 1024 ) {
          if ( $(this).siblings(navDrop).length ) {
            evt.preventDefault();
            var isActive = $(this).hasClass(active);

            hideCurrentNavDrop();
            if ( !isActive ) showNavDrop($(this));
          } else {
            hideCurrentNavDrop();
            $(this).addClass(active);
          }
        }
        else{
          if ( $(this).siblings(navDrop).length ) {
            evt.preventDefault();
            var isActive = $(this).hasClass(active);

            hideCurrentNavDrop();
            if ( !isActive ) $(this).addClass(active);
          } else {
            hideCurrentNavDrop();
            $(this).addClass(active);
          }
        }


      });

      subnavLink.click(function(evt) {
        if ( $(this).siblings(subDrop).length ) {
          evt.preventDefault();

          $(this).toggleClass(active);
          $(this).siblings(subDrop).toggleClass(active);
        }
      });

      $(window).resize(function() {
        if ( desktop() && navDrop.hasClass(active) ) {
          hideCurrentNavDrop();
        }
      });
    }

    initSubmenuToggle();

    // masonry for catalog-list
    if ($('.catalog-list-container').exists()) {
     $('.js-grid').isotope({
       itemSelector: '.js-grid-item',
       layoutMode: 'masonry',
       masonry: { 
         isFitWidth: true 
       }
     })
    };



    if ($('.js-modifications').exists()) {
      $('.js-delivery').removeClass('delivery_small');
    }
    else{
       $('.js-delivery').addClass('delivery_small');
    }

    if ($('.js-filters-btn').exists()) {
      $('.js-filters-btn').click(function(){
        if( $(window).width() >= 768 ){
          var btn      = $(this),
              parent  = btn.closest($('.js-filters-container')),
              mobCont = parent.find('.js-filters-mob');

          if (parent.hasClass('is-active') && mobCont.hasClass('is-active')) {
            parent.removeClass('is-active');
            mobCont.removeClass('is-active');
          }
          else{
            parent.addClass('is-active');
            mobCont.addClass('is-active');
          }
        }
      });
      
    };
    if( $(window).width() < 768 ){
      $('.js-filters-btn').attr("data-reveal-id", "filtersPop");
    }

    if ($('.orbit-container').exists()) {

      // добавляем в контейнер к слайдеру иконку с зумом
      // тк. слайдер изменяет ul писок на div
      $( "#slider1" ).parents(".orbit-container").append('<span class="zoom"></span>');

      // по клику на кнопку зума открываем модальое окно с слайдером
      $(".zoom").click(function () {
          $('#enlarged-photo').foundation('reveal', 'open');
          resizeModal();
      });

  // open any modal window
      $(".js-modal-toggle").click(function () {
          var modal = $(this).attr("data-modal");
          $('.'+modal).foundation('reveal', 'open');
          resizeModal();
          return false;
      });

      // тк. слайдер геренирует свой темплейт при нажатии 
      // кнопки вне его контейнера скриптом создаю ивент по нажати на мою кнопку
      $('.orbit-next.icon').click(function() {
          $('#slider1').siblings('.orbit-next').click();
      });

      $('.orbit-prev.icon').click(function() {
          $('#slider1').siblings('.orbit-prev').click();
      });
    }

    if ($('.js-multiple-items').exists()) {
        $('.js-multiple-items').slick({
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 5,
          draggable: true,
          responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2
            }
          }, {
            breakpoint: 767,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              arrows: false,
              variableWidth: true
            }
          }]

        });
    
      $(document).on({
          mouseenter: function(){
            if( $(window).width() >= 768 ){
              $(this).addClass("desk-visible");
            }
          },
          mouseleave: function(){
              $(this).removeClass("desk-visible");
          }
      }, '.multiple-items .slick-slide');

      $('.other-products').hover(
        function () {
          $(this).addClass('is_hover');
        },
        function () {
          $(this).removeClass('is_hover');
        }
      );
    }
    if ($('.js-multiple-items-6').exists()) {
      $('.js-multiple-items-6').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        draggable: true,
        responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            arrows: false,
            variableWidth: true
          }
        }]

      });
    }
    if ($('.js-multiple-items-4').exists()) {
        $('.js-multiple-items-4').slick({
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 4,
          draggable: true,
          responsive: [{
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2
            }
          }, {
            breakpoint: 767,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
              arrows: false,
              variableWidth: true
            }
          }]

        });
    }

    if ($('.js-multiple-items-2').exists()) {
        $('.js-multiple-items-2').slick({
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          draggable: true
        });
    }
    if ($('.js-multiple-items-1').exists()) {
        $('.js-multiple-items-1').slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          draggable: true,
          adaptiveHeight: true
        });
    }

    // destroy slick for mobile 
    if ($('.js-multiple-items-1').exists()) {
      if( $(window).width() < 768 ){
        $('.js-multiple-items-1').unslick();
      }    
    };
    
    if ($('.js-multiple-items-1').exists()) {
      // destroy slick for tab 
      if( $(window).width() < 1024 ){
        $('.js-unslick-tab').unslick();
      }
    };

    $("#modal-basket").click(function(){
      $('.js-multiple-items-4').slickNext();
    });


  $(document).on('open.fndtn.reveal.basket', '[data-reveal]', function () {
    $('.js-multiple-items-4').slickNext();

  });
    

    
    if ($('.f-dropdown').exists()) {
      // заменяет текст для дроп дауна
      $(".f-dropdown li a").click(function(){
        var selText = $(this).text();
        $(this).parents('.dropdown-content').find('button.open').text(selText);
        Foundation.libs.dropdown.close($('#city'));
      });
    }

    if ($('.js-range-slider').exists()) {
      // slider для цены
      var $range = $('.js-range-slider');
      $range.ionRangeSlider({
          type: "double",
          min: 300,
          max: 12000,
          grid: true,
          grid_num: 2,
          hide_min_max:true,
          hide_from_to:true
      });

      $range.on("change", function () {
          var $this = $(this);
          value = $this.prop("value").split(";");
          $("#before").val(value[0]);
          $("#after").val(value[1]);
      });

    }

    if ($('.js-range-slider-mob').exists()) {
      // slider для цены
      var $rangeMob = $('.js-range-slider-mob');
      if( $(window).width() < 768 ){
        $rangeMob.ionRangeSlider({
          type: "double",
          min: 300,
          max: 12000,
          grid: true,
          grid_num: 2,
          hide_min_max: true,
          hide_from_to: true
        });
      }
      else{
        $rangeMob.ionRangeSlider({
          type: "double",
          min: 300,
          max: 12000,
          grid: true,
          grid_num: 6,
          hide_min_max: true,
          hide_from_to: true
        });
      }

      $rangeMob.on("change", function () {
          var $this = $(this);
          value = $this.prop("value").split(";");
          $("#mobBefore").val(value[0]);
          $("#mobAfter").val(value[1]);
      });

    }

    if ($('.bulk-select').exists()) {
      var bulk =  $(".bulk-select");
          this_imp = bulk.find('.number');
          this_val = parseFloat(this_imp.val());

      bulk.find('.plus').click(function(){
        this_val = parseFloat(this_imp.val());
        this_val = this_val+1;
        this_imp.val(this_val);
      });
      bulk.find('.minus').click(function(){
        this_val = parseFloat(this_imp.val());
        if (this_val <= 0) {
          this_val=0;
        } else{
          this_val = this_val-1;
        };
        this_imp.val(this_val);
      });
    }

    $(document).on({
        mouseenter: function(){
          if( $(window).width() >= 1024 ){
            $(this).addClass("desk-visible");
          }
        },
        mouseleave: function(){
          $(this).removeClass("desk-visible");
      }
    }, '.item-filtered');

    if ($('.item-filtered').exists() && !$('.items').hasClass('grid')) {
        $('.item-filtered').find(".comment .all").each(function() {
        var comment = $(this),
            text,
            txlength,
            cuttext;

            text = comment.text();
            txlength = text.length;

            if(txlength > 58){
              cuttext = text.substring(0,58);
              comment.text(cuttext);
              comment.parents('.comment').append('<span class="readmore">'+text+'</span>');
            }
      });
      }

      function hideText(){
        var desk = $(".js-desk"),
            deskNativeHeight = desk.outerHeight(),
            heightFlag = 150;
        if(deskNativeHeight > heightFlag){
          desk.addClass('desk_short');
        }
      }

      hideText();

      $('a.auick-for').click(function(){
        var desk = $(".js-desk");
        
        if(desk.hasClass('desk_short')){
            desk.removeClass('desk_short');

        } else {
            desk.addClass('desk_short');
        };
        return false;
      });

      // $(".js-input-tel").mask("+38(999)-999-99-99");

      $(".js-show-all").on("click", function(){
        var attr = $(this).attr("data-text");
        var text = $(this).text();
        $(this).parent().find(".js-hidden-all").slideToggle(10);
        $(this).attr("data-text", text).children().text(attr);
        return false;
      });

      $(".js-dropdown-toggle").hover(
        function() {
          var menu = $("div[data-drop='"+$(this).attr("data-drop")+"']");
          var left = $(this).offset().left;
          var right = $(window).width() - left - $(this).outerWidth();
          var top = $(this).parent().position().top + $(this).parent().outerHeight(true);
          var reset = menu.width() + right;
          if ($(this).hasClass("js-dropdown-right")) {
            if (reset > $(window).width()) {
                menu.css({
                right: 'auto',
                left: 'auto',
                top: top
              }).show();
              // console.log("!!!!");
            }
            else{
              menu.css({
                right: right,
                left: 'auto',
                top: top
              }).show();
            }
            console.log(top);
          }
          else {
            menu.css({
              left: left,
              top: top
            }).show();
             
          }

        }, function() {
          var menu = $("div[data-drop='"+$(this).attr("data-drop")+"']");
          menu.hide();
        }
      );
      $(".js-dropdown").hover(
        function() {
          $(this).show();
          var menuLink = $("a[data-drop='"+$(this).attr("data-drop")+"']");
          menuLink.addClass("is-hovered");
        }, function() {
          $(this).hide();
          var menuLink = $("a[data-drop='"+$(this).attr("data-drop")+"']");
          menuLink.removeClass("is-hovered");
        }
      );

  });

  $(".js-toggle-description").on("click", function(){
    $(this).prev().toggleClass("is-visible");
    return false;
  });

  $(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
      resizeModal();
  });
  $(window).resize(function() {
      resizeModal();
  });

function resizeModal(){
  var modal = $('.reveal-modal'),
      htmlWidth =  $('html').width(),
      htmlHeight =  $('html').height(),
      modalDopBlockHeight = modal.find('.photo-header').height() + modal.find('.photo-footer').height(),
      modalDopBlockWidth = modal.find('.photo-header').width() + modal.find('.photo-footer').width();

      var heightImg = htmlHeight - modalDopBlockHeight -150
          heightModal = htmlHeight - 150;

      modal.find('.orbit-slides-container').css('height',htmlHeight+"px");
      modal.find('.orbit-container').css('height',heightImg+"px");
      modal.find('.orbit-slides-container img').css('max-height',heightImg+"px");
}
