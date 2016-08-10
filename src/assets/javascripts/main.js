var Main = {

  init: function() {
    var _this = this;
    this.navScrollTo();
    this.desktopImages();
    $(window).on('resize', function() {
      _this.handleWindowResize();
    });
  },

  navScrollTo: function() {
    $('.scroll-link').on('click', function(e) {
      e.preventDefault();

      var _this = $(this);
      $('.scroll-link').parent().removeClass('active');
      window.location.hash = $(this).attr('href').replace('#', '_');
      $('body, html').animate({
        scrollTop: $($(this).attr('href')).offset().top - 10
      }, 250, function() {
        _this.parent().addClass('active');
      });
    });
  },

  desktopImages: function() {
    if($(window).width() >= 830) {
      $('.ourword-mobile-img').attr('src', 'build/images/ourword_type2.png');
    } else {
      $('.ourword-mobile-img').attr('src', 'build/images/ourword_type2-mobile.png');
    }
  },

  handleWindowResize: function() {
    this.desktopImages();
  }

};

(function() {
  Main.init();
})();