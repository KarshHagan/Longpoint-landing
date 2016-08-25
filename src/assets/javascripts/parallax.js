'use strict';

function ChangeScrollSpeed() {

    // elem to move
    this.$imgMove = $('.img-move');

    // height of image to move
    this.imgMoveHeight = this.$imgMove.height();

    // container
    this.$container = this.$imgMove.parent();

    // container height
    this.containerHeight = this.$container.height();

    // container from top
    this.containerOffsetTop = this.$container.offset().top.toFixed(2);

    // min window top
    this.minWindowTop = parseInt(this.containerOffsetTop) - parseInt($(window).height());

    // max window top
    this.maxWindowTop = parseInt(this.containerOffsetTop) + parseInt(this.containerHeight);

    this.activeRange = parseInt(this.maxWindowTop) - parseInt(this.minWindowTop);

    this.imageHeightMinusContainerHeight = this.$imgMove.height() - this.containerHeight;
    if(this.imageHeightMinusContainerHeight <= 100) {
        this.imageHeightMinusContainerHeight = 200;
    }
}
    
ChangeScrollSpeed.prototype.updatePosition = function(windowTop) {
    if(windowTop > this.minWindowTop && windowTop < this.maxWindowTop) {
        var pct = (windowTop * 2.25 - this.minWindowTop) / this.activeRange;
        var move = (this.imageHeightMinusContainerHeight * pct) - this.imageHeightMinusContainerHeight;

        var _translateString = "translate3d(0px," + -move.toFixed(2) + "px, 0px)";
        this.$imgMove.css({
            '-webkit-transform': _translateString,
            '-moz-transform': _translateString,
            '-ms-transform': _translateString,
            'transform': _translateString,
        });
    }
};

$(window).load(function() {
  if($(window).width() >= 900 && !Modernizr.touch) {
    var changeScrollSpeed = new ChangeScrollSpeed();
    changeScrollSpeed.updatePosition($(window).scrollTop());
    $(window).on('scroll', function() {
      changeScrollSpeed.updatePosition($(window).scrollTop());
    });
  }
});