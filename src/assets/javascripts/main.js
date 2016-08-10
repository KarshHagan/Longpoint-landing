var Main = {

  init: function() {
    var _this = this;

    this.$categoryMenuItems = $('.scroll-link');
    this.$categoryMenuHeight = $('nav').outerHeight() + 13;
    this.$scrollItems = this.$categoryMenuItems.map(function() {
      var item = $($(this).attr('href'));
      if(item.length) {
        return item;
      }
    });

    this.$categoryMenuItems.on('click', function(e) {
      _this.navScrollTo(e);
    });

    this.desktopImages();
    this.navActiveOnScroll();
    this.handleWindowScroll();
    $(window).on('resize', function() {
      _this.handleWindowResize();
    });

    this.wasNavItemClicked = false;
  },

  navScrollTo: function(e) {
    $this = $(e.currentTarget),
    target = $this.attr('href'),
    gotoTarget = $(target);
    e.preventDefault();
    var _this = this;
    this.wasNavItemClicked = true;
    $('.scroll-link').removeClass('active');
    $(this).addClass('active');
    $('body, html').animate({
      scrollTop: gotoTarget.offset().top.toFixed(0) - 2
    }, 250, function() {
      _this.wasNavItemClicked = false;
    });

  },

  navActiveOnScroll: function() {
    var currentScrollTop = $(document).scrollTop();
    var _fromTop = currentScrollTop + this.$categoryMenuHeight;
    var _currentItem = this.$scrollItems.map(function() {
      if($(this).offset().top < _fromTop) {
        return this;
      }
    });
    _currentItem = _currentItem[_currentItem.length - 1];

    var _id = _currentItem && _currentItem.length ? _currentItem[0].id : " ";

    this.$categoryMenuItems.removeClass("active").filter("[href=#"+_id+"]").addClass("active");
    
    if(currentScrollTop <= 100) {
      $('[href="#intro"]').addClass('active');
    }
  },

  handleWindowScroll: function() {
    var _this = this;
    this.wasNavItemClicked = false;
    $(window).on('scroll', function() {
      if(_this.wasNavItemClicked == false) {
        _this.navActiveOnScroll();
      }
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