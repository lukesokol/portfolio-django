var sendData = {};
let initFlag = 0;
let disableArrowButton = true;

$(document).ready(function () {
  getAPIData();

  if (initFlag == 0) {
    let ctgAll = $("#all_categories");
    adjustMenuThumbPosition(ctgAll);
    checkArrowButtonStatus($(".menu__arrow--left"), disableArrowButton);

    initFlag++;
  }

  $(".menu__slider").dragNscroll({
    acceleration: 0.65,
    deceleration: 0.85,
    decelRate: 64,
    allowThrowing: true,
    throwOnOut: true,
  });

  if (isMobile) {
    $(".menu__slider").on("touchend", function (e) {
      e.stopPropagation();
    });
    $(window).on("touchend", function () {
      $(".menu__slider").trigger("touchend");
    });
  } else {
    $(".menu__slider").on("mouseup", function (e) {
      e.stopPropagation();
    });
    $(window).on("mouseup", function () {
      $(".menu__slider").trigger("mouseup");
    });
  }

  $(".menu__category").on("click", function () {
    let clickedCategory = $(this);
    let activeCategory = $(".menu__category.active");
    let nextCategory = clickedCategory.next();
    let previousCategory = clickedCategory.prev();

    if (previousCategory.length === 0) {
      disableArrowButton = true;
      checkArrowButtonStatus($(".menu__arrow--left"), disableArrowButton);
    } else {
      disableArrowButton = false;
      checkArrowButtonStatus($(".menu__arrow--left"), disableArrowButton);
    }

    if (nextCategory.length === 0) {
      disableArrowButton = true;
      checkArrowButtonStatus($(".menu__arrow--right"), disableArrowButton);
    } else {
      disableArrowButton = false;
      checkArrowButtonStatus($(".menu__arrow--right"), disableArrowButton);
    }

    activeCategory.removeClass("active");
    retrieveCategoryData(clickedCategory);
    adjustMenuThumbPosition(clickedCategory);
    getAPIData();
  });
  $(".menu__arrow--right").on("click", function () {
    let activeCategory = $(".menu__category.active");
    let nextCategory = activeCategory.next();
    let previousCategory = activeCategory.prev();

    if (nextCategory.length > 0) {
      activeCategory.removeClass("active");
      nextCategory.addClass("active");

      if (previousCategory.length === 0) {
        disableArrowButton = false;
        checkArrowButtonStatus($(".menu__arrow--left"), disableArrowButton);
      } else if (nextCategory.next().length === 0) {
        disableArrowButton = true;
        checkArrowButtonStatus(nextCategory.next(), disableArrowButton);
      }

      checkArrowButtonStatus($(this), disableArrowButton);
      retrieveCategoryData(nextCategory);
      adjustMenuThumbPosition(nextCategory);
      getAPIData();
    }
  });
  $(".menu__arrow--left").on("click", function () {
    let activeCategory = $(".menu__category.active");
    let previousCategory = activeCategory.prev();
    let nextCategory = activeCategory.next();

    if (previousCategory.length > 0) {
      activeCategory.removeClass("active");
      previousCategory.addClass("active");

      if (nextCategory.length === 0) {
        disableArrowButton = false;
        checkArrowButtonStatus($(".menu__arrow--right"), disableArrowButton);
      } else if (previousCategory.prev().length === 0) {
        disableArrowButton = true;
        checkArrowButtonStatus(previousCategory.prev(), disableArrowButton);
      }

      checkArrowButtonStatus($(this), disableArrowButton);
      retrieveCategoryData(previousCategory);
      adjustMenuThumbPosition(previousCategory);
      getAPIData();
    }
  });
});

function putSliderData(result) {
  let slide;
  let slidePicture = "";
  if (result.length > 0) {
    $("#slides").html("");
    $.each(result, function (a, b) {
      if (b.picture) {
        slidePicture =
          '<a class="img__link" href="/portfolio/project/' +
          b.id +
          '">' +
          '<img src="' +
          b.picture +
          '">' +
          "</a>";
      }
      slide =
        '<div class="slide">' +
        '<div class="slide__img">' +
        slidePicture +
        "</div>" +
        '<div class="slide__title">' +
        b.title +
        "</div>" +
        '<div class="slide__subtitle">' +
        b.subtitle +
        "</div>" +
        '<div class="slide__description"><p>' +
        b.description +
        "</p></div>" +
        "</div>";
      $("#slides").append(slide);
    });
  } else {
    $("#slides").html(
      '<div id="no_results">There will be something for sure :)</div>'
    );
  }
}

function checkArrowButtonStatus(clickedArrow, disableArrowButton) {
  if (disableArrowButton) {
    clickedArrow.css("pointer-events", "none");
    clickedArrow
      .children()
      .css("opacity", "var(--menu-nav-arrow-disabled-opacity)");
  } else {
    clickedArrow.css("pointer-events", "auto");
    clickedArrow
      .children()
      .css("opacity", "var(--menu-nav-arrow-enabled-opacity)");
  }
}

function retrieveCategoryData(category) {
  const categoryName = category.attr("data-attr");
  if (categoryName == "ALL") {
    sendData["category"] = "";
    $(category).addClass("active");
  } else {
    sendData["category"] = categoryName;
    $(category).addClass("active");
  }
}

function adjustMenuThumbPosition(category) {
  let ctgsWidth = $(".menu__categories").width();
  let ctgWidth = $(category).width();
  let ctgOffset = $(category).offset().left;
  let menuSliderOffset = $(".menu__slider").offset().left;
  let menuSliderScrollLeft = $(".menu__slider").scrollLeft();

  if (ctgsWidth < ctgWidth + ctgOffset) {
    sizeDiff = ctgWidth + ctgOffset - ctgsWidth + menuSliderScrollLeft;
    $(".menu__slider").scrollLeft(sizeDiff);
  }

  if (menuSliderOffset > ctgOffset) {
    sizeDiff = menuSliderScrollLeft - (menuSliderOffset - ctgOffset);
    $(".menu__slider").scrollLeft(sizeDiff);
  }

  let thumbWidth = $("#menu_thumb").width();
  let thumbOffset = $("#menu_thumb").offset().left;
  let thumbPos = $("#menu_thumb").position().left;
  let thumbCalcPos =
    ctgOffset - thumbOffset + thumbPos - thumbWidth / 2 + ctgWidth / 2;
  let trackLeftCalcWidth = thumbCalcPos + thumbWidth;
  let trackRightCalcWidth = ctgsWidth - trackLeftCalcWidth + thumbWidth;

  $("#menu_thumb").css({ left: thumbCalcPos });
  $(".nav__track--left").css({
    width: trackLeftCalcWidth + "px",
    left: -3 * thumbWidth,
  });
  $(".nav__track--right").css({
    width: trackRightCalcWidth + "px",
    right: -3 * thumbWidth,
  });
}

function getAPIData() {
  let url = $("#slides").attr("url");
  $.ajax({
    method: "GET",
    url: url,
    data: sendData,
    beforeSend: function () {
      $("#no_results").html("Loading data...");
    },
    success: function (result) {
      putSliderData(result);
    },
    error: function (response) {
      $("#no_results").html("Something went wrong");
    },
  });
}
