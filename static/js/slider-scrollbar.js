let thumbMouseDown = false;
let sliderMouseDown = false;
let sliderDragged = false;
let startX;
let thumbPos;
let dragDistance = 0;

$(document).ready(function(){
    const slider = document.querySelector('.slider');
    dragNscrollOptions();
    if (isMobile){
        $('.slider').on('touchstart', function(e) {
            sliderMouseDown = true;
            startX = e.pageX;
            checkIfDragging();
            sliderAnimation("forward");
        });
        $('.slider').on('scroll', function(e) {
            let dragDistance = e.pageX - startX;
            if (Math.abs(dragDistance) > 200){
                sliderDragged = true;
            }
            let sliderWidth = $('.slider').width();
            let slidesWidth = $('.slider__slides').width();
            let thumbWidth = $('.scrollbar__thumb').width();
            let scrollbarWidth = $('.slider__scrollbar').width();
            let windowScrollbarWidth = getWindowScrollbarWidth('.slider');
            let sliderLeft = $('.slider').scrollLeft();
            let leftOffsetRatio = (scrollbarWidth - thumbWidth) / (slidesWidth - sliderWidth + windowScrollbarWidth);
            let thumbX = leftOffsetRatio * sliderLeft;
            $('.scrollbar__thumb').css('left', thumbX);
            checkIfDragging();
        });
        $('.scrollbar__thumb').on('touchstart', function(e){
            thumbMouseDown = true;
            startX = e.originalEvent.touches[0].pageX;
            thumbPos = $('.scrollbar__thumb').position().left;
            thumbAnimation('forward');
        });
        $(window).on('touchmove', function(e) {
            if (thumbMouseDown){
                let sliderWidth = $('.slider').width();
                let slidesWidth = $('.slider__slides').width();
                let thumbWidth = $('.scrollbar__thumb').width();
                let scrollbarWidth = $('.slider__scrollbar').width();
                let widthDiff = scrollbarWidth - thumbWidth;
                let windowScrollbarWidth = getWindowScrollbarWidth('.slider__scrollbar');
                let leftOffsetRatio = (scrollbarWidth - thumbWidth) / (slidesWidth - sliderWidth + windowScrollbarWidth);
                
                let moveX = e.originalEvent.touches[0].pageX - startX;
                let thumbX = thumbPos + moveX;
                let sliderX= 1/leftOffsetRatio * thumbX;
    
                if (thumbX > widthDiff) {
                    $('.scrollbar__thumb').css('left', widthDiff);
                    $('.slider').scrollLeft(sliderX);
                }
                else if (thumbX < 0) {
                    $('.scrollbar__thumb').css('left', 0);
                    $('.slider').scrollLeft(0);
                }
                else {
                    $('.scrollbar__thumb').css('left', thumbX);
                    $('.slider').scrollLeft(sliderX);
                };
            };
        });
        $(document).on('touchend', function() {
            if (sliderMouseDown){
                sliderMouseDown = false;
                sliderAnimation('backward');
            }
            if (thumbMouseDown){
                thumbMouseDown = false;
                sliderDragged = false;
                thumbAnimation('backward');
            }
        });
    } else {
        $('.slider').on('mousedown', function(e) {
            sliderMouseDown = true;
            startX = e.pageX;
            checkIfDragging();
            sliderAnimation("forward");
        });
        $('.scrollbar__thumb').on('mousedown', function (e) {
            thumbMouseDown = true;
            startX = e.pageX;
            thumbPos = $('.scrollbar__thumb').position().left;
            thumbAnimation('forward');
        });
        $(window).on('mousemove', function(e) {
            if (sliderMouseDown){
                let dragDistance = e.pageX - startX;
                if (Math.abs(dragDistance) > 200){
                    sliderDragged = true;
                }
                let sliderWidth = $('.slider').width();
                let slidesWidth = $('.slider__slides').width();
                let thumbWidth = $('.scrollbar__thumb').width();
                let scrollbarWidth = $('.slider__scrollbar').width();
                let windowScrollbarWidth = getWindowScrollbarWidth('.slider');
                let sliderLeft = $('.slider').scrollLeft();
                let leftOffsetRatio = (scrollbarWidth - thumbWidth) / (slidesWidth - sliderWidth + windowScrollbarWidth);
                let thumbX = leftOffsetRatio * sliderLeft;
                $('.scrollbar__thumb').css('left', thumbX);
                checkIfDragging();
            }
            if (thumbMouseDown){
                let sliderWidth = $('.slider').width();
                let slidesWidth = $('.slider__slides').width();
                let thumbWidth = $('.scrollbar__thumb').width();
                let scrollbarWidth = $('.slider__scrollbar').width();
                let widthDiff = scrollbarWidth - thumbWidth;
                let windowScrollbarWidth = getWindowScrollbarWidth('.slider__scrollbar');
                let leftOffsetRatio = (scrollbarWidth - thumbWidth) / (slidesWidth - sliderWidth + windowScrollbarWidth);
                let moveX = e.pageX - startX;
                let thumbX = thumbPos + moveX;
                let sliderX= 1/leftOffsetRatio * thumbX;
    
                if (thumbX > widthDiff){
                    $('.scrollbar__thumb').css('left', widthDiff);
                    $('.slider').scrollLeft(sliderX);
                }
                else if (thumbX < 0){
                    $('.scrollbar__thumb').css('left', 0);
                    $('.slider').scrollLeft(0);
                }
                else {
                    $('.scrollbar__thumb').css('left', thumbX);
                    $('.slider').scrollLeft(sliderX);
                };
            };
        });
        $(document).on('mouseup', function(){
            if (sliderMouseDown){
                sliderMouseDown = false;
                sliderDragged = false;
                sliderAnimation('backward');
            }
            if (thumbMouseDown){
                thumbMouseDown = false;
                thumbAnimation('backward');
            }
        });
    }

    $(window).on('resize', function(e){
        recalculateThumbPosition();
    });

    slider.addEventListener('wheel', (event) => {
        event.preventDefault();
        slider.scrollLeft += event.deltaY;
        let sliderWidth = $('.slider').width();
        let slidesWidth = $('.slider__slides').width();
        let thumbWidth = $('.scrollbar__thumb').width();
        let scrollbarWidth = $('.slider__scrollbar').width();
        let windowScrollbarWidth = getWindowScrollbarWidth('.slider');
        let sliderLeft = $('.slider').scrollLeft();
        let leftOffsetRatio = (scrollbarWidth - thumbWidth) / (slidesWidth - sliderWidth + windowScrollbarWidth);
        let thumbX = leftOffsetRatio * sliderLeft;
        $('.scrollbar__thumb').css('left', thumbX);
    });
});

const preventClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
};

function checkIfDragging(){
    const slides = document.getElementsByClassName('img__link');
    if (sliderDragged){
        for (let i = 0; i<slides.length; i++){
            slides[i].addEventListener('click', preventClick);
        }
    } else {
        for (let i = 0; i<slides.length; i++){
            slides[i].removeEventListener('click', preventClick);
        }
    }
};

function dragNscrollOptions(){
    $(function(){
        $('.slider').dragNscroll({
            acceleration:.65,
            deceleration:.85,
            decelRate:64,
            allowThrowing: true,
            throwOnOut: true,
        });
        $('.scrollbar__thumb').dragNscroll({
            acceleration:.65,
            deceleration:.85,
            decelRate:64,
            allowThrowing: true,
            throwOnOut: true,
        });
    });
};

function recalculateThumbPosition(){
    if (isMobile){
        $('.slider').trigger('touchend');
    } else {
        $('.slider').trigger('mouseup');
    }
};

function getWindowScrollbarWidth(el){
    let width;
    if (String($(el).css('overflow')) === "hidden" || String($(el).css('overflow-x')) === "hidden" || String($(el).css('overflow-x')) === "scroll"){ 
        width = 0; 
    } else { 
        width = $.scrollbarWidth(); 
    }
    return width;
}

function thumbAnimation(direction){
    let propertyVal;
    let thumbColor;
    let transformPropList = ["-webkit-transform", "-moz-transform", "-o-transform", "transform"];
    if (direction === "forward"){
        thumbColor = "white";
        propertyVal = "scaleY(var(--scrollbar--thumb-scale))";
        sliderAnimation(direction);
    }
    else if (direction === "backward"){
        thumbColor = "var(--scrollbar--thumb-color)";
        propertyVal = "";
        sliderAnimation(direction);
    }
    $('.scrollbar__thumb--inside').css('background-color', thumbColor);
    transformPropList.forEach((property) => {
        $('.scrollbar__thumb--inside').css(property, propertyVal);
    });
};

function sliderAnimation(direction){
    if (direction === "forward"){
        $('.slider__slides').css('transform', 'scale(var(--slider-scale))');
    }
    else if (direction === "backward"){
        $('.slider__slides').css('transform', 'scale(1.0)');
    }
}

$.scrollbarWidth=function(){var a,b,c;if(c===undefined){a=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b=a.children();c=b.innerWidth()-b.height(99).innerWidth();a.remove()}return c};