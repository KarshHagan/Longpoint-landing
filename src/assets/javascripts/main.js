var Main = {

  init: function() {

    // variables
    var _this = this;
    this.$contact = $('[href="#contact"]');
    this.$wordImg = $('.ourword-mobile-img');
    this.$categoryMenuItems = $('.scroll-link');
    this.$categoryMenuHeight = $('nav').outerHeight() + 13;
    this.wasNavItemClicked = false;
    this.$scrollItems = this.$categoryMenuItems.map(function() {
      var item = $($(this).attr('href'));
      if(item.length) {
        return item;
      }
    });

    // init functions
    this.$categoryMenuItems.on('click', function(e) {
      _this.navClickScrollTo(e);
    });
    this.desktopImages();
    this.navActiveOnScroll();
    this.handleWindowScroll();
    this.handleDownArrowClick();
    $(window).on('resize', function() {
      _this.handleWindowResize();
    });
  },

  navClickScrollTo: function(e) {
    e.preventDefault();
    var _this = this;
    var target = $(e.currentTarget).attr('href');
    
    this.wasNavItemClicked = true;
    this.$categoryMenuItems.removeClass('active');

    $(e.currentTarget).addClass('active');
    
    $('body, html').animate({
      scrollTop: $(target).offset().top.toFixed(0) - 2
    }, 250, function() {
      _this.wasNavItemClicked = false;
    });

  },

  navActiveOnScroll: function() {
    var currentScrollTop = $(document).scrollTop();
    var pageHeight = $(document).height() - $(window).height();
    var _fromTop = currentScrollTop + this.$categoryMenuHeight;

    // figure out if the panel is in our range. 
    var _currentItem = this.$scrollItems.map(function() {
      if($(this).offset().top < _fromTop) {
        return this;
      }
    });
    _currentItem = _currentItem[_currentItem.length - 1];

    var _id = _currentItem && _currentItem.length ? _currentItem[0].id : " ";

    this.$categoryMenuItems.removeClass("active").filter("[href=#"+_id+"]").addClass("active");
    
    // add active class to nave when you hit bottom of page
    if((pageHeight - 100) <= currentScrollTop) {
      this.$categoryMenuItems.removeClass('active');
      this.$contact.addClass('active');
    } else {
      this.$contact.removeClass('active');
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

  handleDownArrowClick: function() {
    $('.down-arrow').on('click', function(e) {
      e.preventDefault();
      $('.arrow-down-click').trigger('click');
    });
  },

  desktopImages: function() {
    if($(window).width() >= 830) {
      this.$wordImg.attr('src', 'build/images/ourword_type2.png');
    } else {
      this.$wordImg.attr('src', 'build/images/ourword_type2-mobile.png');
    }
  },

  handleWindowResize: function() {
    this.desktopImages();
  }

};

(function() {
  Main.init();
})();