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
    if(this.minWindowTop <= 0) {
        this.minWindowTop = 6;
    }

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
        // console.log('hi');
        var pct = (windowTop * 3 - this.minWindowTop) / this.activeRange;
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