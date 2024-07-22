$(function () {
  "use strict";
  // Toggle menu
  // ------------------------------------

  var $box = $(".options-content .options .box");
  $box.click(function () {
    var $this = $(this),
      $boxWrapper = $this.closest(".box-wrapper");

    if ($this.hasClass("active")) {
      $boxWrapper.removeClass("box-wrapper-selected");
      $this.removeClass("active");
    } else {
      $boxWrapper.addClass("box-wrapper-selected");
      $this.closest(".options-content").find(".box").removeClass("active");
      $this.addClass("active");
    }
  });

  // Mobile - Dropdown menu
  // ------------------------------------

  $(".open-dropdown").on("click", function (e) {
    e.preventDefault();

    if ($(document).width() >= 992) {
      return false;
    }

    var $this = $(this),
      $li = $this.closest("li"),
      $drop = $li.find("ul");

    $li.toggleClass("expanded");

    if ($li.hasClass("expanded")) {
      $drop.slideDown();
    } else {
      $drop.slideUp();
    }
  });

  // Desktop - Dropdown menu
  //---------------------------

  $(".navigation-block > ul > li").on({
    mouseenter: function () {
      if ($(document).width() < 992) {
        return false;
      }
      $(this).addClass("hovered");
    },
    mouseleave: function () {
      if ($(document).width() < 992) {
        return false;
      }
      $(this).removeClass("hovered").removeAttr("class");
    },
  });

  // Wrap first word in title sections
  //----------------------------------

  $(".section-header .title").each(function () {
    var $this = $(this);
    $this.html($this.html().replace(/^(\w+)/, "<span>$1</span>"));
  });

  // Tooltip
  // ----------------------------------------------------------------

  $('[data-toggle="tooltip"]').tooltip();

  // Main popup
  // ----------------------------------------------------------------

  $(".mfp-open").magnificPopup({
    type: "inline",
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: "auto",
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: "my-mfp-zoom-in",
    callbacks: {
      open: function () {
        // wait on popup initalization
        // then load owl-carousel
        $(".popup-main .owl-carousel").hide();
        setTimeout(function () {
          $(".popup-main .owl-carousel").slideDown();
        }, 500);
      },
    },
  });

  // Main popup gallery
  // ----------------------------------------------------------------

  $(".open-popup-gallery").magnificPopup({
    delegate: "a",
    type: "image",
    tLoading: "Loading image #%curr%...",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: "auto",
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: "my-mfp-zoom-in",
  });

  // Rooms carousel
  // ----------------------------------------------------------------

  var arrowIcons = [
    '<span class="icon icon-chevron-left"></span>',
    '<span class="icon icon-chevron-right"></span>',
  ];

  $.each($(".owl-rooms"), function (i, n) {
    $(n).owlCarousel({
      autoHeight: false,
      pagination: true,
      navigation: true,
      navigationText: arrowIcons,
      items: 3,
      itemsDesktop: [1199, 3],
      itemsDesktopSmall: [979, 2],
      itemsTablet: [768, 2],
      itemsTabletSmall: true,
      itemsMobile: [479, 1],
      addClassActive: true,
      autoPlay: 5500,
      stopOnHover: true,
    });
  });

  // Frontpage slider
  // ----------------------------------------------------------------

  $.each($(".owl-slider"), function (i, n) {
    $(n).owlCarousel({
      autoHeight: false,
      navigation: true,
      navigationText: arrowIcons,
      items: 1,
      singleItem: true,
      addClassActive: true,
      //transitionStyle: "fadeUp",
      //afterMove: animatetCaptions,
      autoPlay: false,
      stopOnHover: true,
    });

    animatetCaptions();

    function animatetCaptions(event) {
      "use strict";
      var activeItem = $(n).find(".owl-item.active"),
        timeDelay = 100;
      $.each(activeItem.find(".animated"), function (j, m) {
        var item = $(m);
        item.css("animation-delay", timeDelay + "ms");
        timeDelay = timeDelay + 180;
        item.addClass(item.data("animation"));
        setTimeout(function () {
          item.removeClass(item.data("animation"));
        }, 2000);
      });
    }

    if ($(n).hasClass("owl-slider-fullscreen")) {
      $(".owl-slider-fullscreen .item").height($(window).height());
    }
  });

  // Quote carousel
  // ----------------------------------------------------------------

  $.each($(".quote-carousel"), function (i, n) {
    $(n).owlCarousel({
      navigation: true, // Show next and prev buttons
      slideSpeed: 300,
      items: 4,
      paginationSpeed: 400,
      singleItem: false,
      navigationText: arrowIcons,
      autoPlay: 8000,
      stopOnHover: true,
    });
  });

  // Strecher accordion
  // ----------------------------------------------------------------

  var $strecherItem = $(".stretcher-item");
  $strecherItem.on({
    mouseenter: function (e) {
      $(this).addClass("active");
      $(this).siblings().addClass("inactive");
    },
    mouseleave: function (e) {
      $(this).removeClass("active");
      $(this).siblings().removeClass("inactive");
    },
  });

  // Sticky header
  // ----------------------------------------------------------------

  var navbarFixed = $("header");

  // When reload page - check if page has offset

  // Add sticky menu on scroll


  // Payment options
  // ----------------------------------------------------------------

  $("#paymentCart").on("click", function () {
    if ($(this).is(":checked")) {
      $(".payment").removeClass("active");
      $(".payment-cart").addClass("active");
    }
  });

  $("#paymentPayPal").on("click", function () {
    if ($(this).is(":checked")) {
      $(".payment").removeClass("active");
      $(".payment-paypal").addClass("active");
    }
  });

  // About image caption
  // ----------------------------------------------------------------

  var $blogImage = $(".about .text-block .text img");
  $blogImage.each(function () {
    var $this = $(this);
    $this.wrap('<span class="image"></span>');
    if ($this.attr("alt")) {
      var caption = this.alt;
      var link = $this.attr("data");
      $this.after('<span class="caption">' + caption + "</span>");
    }
  });

  // Coupon code
  // ----------------------------------------------------------------

  $(".form-coupon").hide();
  $("#couponCodeID").on("click", function () {
    if ($(this).is(":checked")) {
      $(".form-coupon").fadeIn();
    } else {
      $(".form-coupon").fadeOut();
    }
  });
  $(".form-newsletter").on("submit", function (e) {
    e.preventDefault();
    var $this = $(this);
    $this
      .find(".btn")
      .append('<i class="fa fa-circle-notch fa-spin ml-2 iconx"></i>');
    $this.find(".alert").remove();
    $.ajax({
      type: "POST",
      url: "/Ajax/AjaxNewsletter.ashx",
      data: $this.serialize(),
      success: function (data, textStatus, jqXHR) {
        setTimeout(function () {
          $this.find(".btn").find(".iconx").remove();
          if (data.status == "ok") {
            $this.find(".form-control").val("");
            $this.append(
              '<div class="alert alert-success">' + data.content + "</div>"
            );
          } else {
            $this.append(
              '<div class="alert alert-danger">' + data.content + "</div>"
            );
          }
        }, 500);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText);
      },
    });
  });
  // Checkout login / register
  // ----------------------------------------------------------------
  var loginWrapper = $(".login-wrapper"),
    loginBtn = loginWrapper.find(".btn-login"),
    regBtn = loginWrapper.find(".btn-register"),
    signUp = loginWrapper.find(".login-block-signup"),
    signIn = loginWrapper.find(".login-block-signin");

  loginBtn.on("click", function () {
    signIn.show();
    signUp.hide();
  });

  regBtn.on("click", function () {
    signIn.hide();
    signUp.show();
  });

  // Team members hover effect
  // ----------------------------------------------------------------

  var $member = $(".team article");
  $member.on({
    mouseenter: function (e) {
      $member.addClass("inactive");
      $(this).addClass("active");
    },
    mouseleave: function (e) {
      $member.removeClass("inactive");
      $(this).removeClass("active");
    },
  });

  // Cards article
  // ----------------------------------------------------------------

  $(".cards figure").on({
    mouseenter: function (e) {
      $(this).addClass("active");
    },
    mouseleave: function (e) {
      $(this).removeClass("active");
    },
  });

  // Toggle contact form
  // ----------------------------------------------------------------

  $(".open-form").on("click", function () {
    var $this = $(this),
      parent = $this.parent();
    parent.toggleClass("active");
    if (parent.hasClass("active")) {
      $this.text($this.data("text-close"));
      $(".contact-form").slideDown();
    } else {
      $this.text($this.data("text-open"));
      $(".contact-form").slideUp();
    }
  });

  // Cookie
  function createCookie(cookieName, cookieValue, daysToExpire) {
    var date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    document.cookie =
      cookieName +
      "=" +
      cookieValue +
      "; path=/; expires=" +
      date.toGMTString();
  }

  function accessCookie(cookieName) {
    var name = cookieName + "=";
    var allCookieArray = document.cookie.split(";");
    for (var i = 0; i < allCookieArray.length; i++) {
      var temp = allCookieArray[i].trim();
      if (temp.indexOf(name) == 0)
        return temp.substring(name.length, temp.length);
    }

    return "";
  }

  // Datepicker
  // ------------------------------------------------------
  var dbook = new Date();
  $(".ngayden").datepicker({
    minDate: new Date(),
    //changeMonth: true,
    //changeYear: true,
    //showOn: "button",
    //buttonImage: "/images/calendar.png",
    //buttonImageOnly: true,
    numberOfMonths: 1,
    dateFormat: "d M yy",
    onSelect: function (dateStr) {
      var date = $(this).datepicker("getDate");
      if (date) {
        date.setDate(date.getDate() + 1);
      }
      $(".ngaydi")
        .datepicker("option", { minDate: date })
        .datepicker("setDate", date);
    },
  });
  $(".ngayden").datepicker("setDate", dbook);
  dbook.setDate(dbook.getDate() + 1);
  $(".ngaydi").datepicker({
    minDate: dbook,
    //changeMonth: true,
    //changeYear: true,
    numberOfMonths: 1,
    //showOn: "button",
    //buttonImage: "/images/calendar.png",
    //buttonImageOnly: true,
    dateFormat: "d M yy",
  });
  $(".ngaydi").datepicker("setDate", dbook);
  // Default calendar namespaces
  var dateFormat =
    "<span class='day'>d</span> <span class='month'>M</span> <span class='year'>yy</span>",
    dateArrival = "#dateArrival input",
    dateDeparture = "#dateDeparture input",
    dateArrivalVal = "#dateArrival .date-value",
    dateDepartureVal = "#dateDeparture .date-value";
  // Default calendar namespaces
  var dateFormat =
    "<span class='day'>d</span> <span class='month'>M</span> <span class='year'>yy</span>",
    dateArrival = "#dateArrival input",
    dateDeparture = "#dateDeparture input",
    dateArrivalVal = "#dateArrival .date-value",
    dateDepartureVal = "#dateDeparture .date-value";

  // Show arrival calendar
  $(dateArrival).datepicker({
    minDate: "D",
    dateFormat: dateFormat,
    // get value on selected date for departure
    onSelect: function (txt, inst) {
      // get arrival value
      $(dateArrivalVal).html($(dateArrival).val());
      // set date format
      $(dateDepartureVal).html(txt);
      // set day after
      //var NewDay = $(dateDepartureVal).find('.day'),
      //NewDayVal = NewDay.html();
      //NewDay.html(parseInt(NewDayVal) + 1);
    },
    onClose: function (selectedDate) {
      var myDate = $(this).datepicker("getDate");
      myDate.setDate(myDate.getDate() + 1);
      // Set min-date value and day after on date departure
      $(dateDeparture).datepicker("option", "minDate", myDate);
      $(dateDepartureVal)
        .find(".day")
        .html($.datepicker.formatDate("d", myDate));
      $(dateDepartureVal)
        .find(".month")
        .html($.datepicker.formatDate("M", myDate));
      $(dateDepartureVal)
        .find(".year")
        .html($.datepicker.formatDate("yy", myDate));
      createCookie(
        "checkin",
        $.datepicker.formatDate("d M yy", $(this).datepicker("getDate")),
        7
      );
    },
  });

  // Show departure calendar
  $(dateDeparture).datepicker({
    minDate: "D+1",
    dateFormat: dateFormat,
    // get value on selected date for return
    onSelect: function (txt, inst) {
      $(dateDepartureVal).html(txt);
      $(dateDepartureVal).html($(dateDeparture).val());
    },
    onClose: function (selectedDate) {
      var myDate = $(this).datepicker("getDate");
      createCookie("checkout", $.datepicker.formatDate("d M yy", myDate), 7);
    },
  });

  // set current date
  $(".datepicker").datepicker("setDate", "today");
  // get current value from departure
  $(dateArrivalVal).html($(dateArrival).val());
  // get current value from return
  $(dateDepartureVal).html($(dateDeparture).val());
  // hide return input field
  updateGuestNumber();
  // update number of guest list

  // Guests
  // -------------------------------------------------------

  var $guests = $(".guests"),
    $guestList = $(".guests .guest-list");

  // Guest list toogle event - dropdown
  $(".guests .result").on("click", function (e) {
    e.stopPropagation();
    $guests.toggleClass("show");

    if ($guests.hasClass("show")) {
      $guestList.fadeIn();
    } else {
      $guestList.fadeOut();
    }
  });

  // Close on page click
  $(".qty-apply").on("click", function (e) {
    $guestList.fadeOut();
    $guests.removeClass("show");
  });

  // Quantities (add remove guests numbers)
  // -------------------------------------------------------

  $(".qty-plus")
    .add(".qty-minus")
    .on("click", function (e) {
      e.preventDefault();

      var $this = $(this),
        fieldName = $this.attr("data-field"),
        $input = $("input#" + fieldName);

      var currentVal = parseInt($input.data("value"), 10),
        ticketType = $input.data("tickettype");

      if (!isNaN(currentVal)) {
        var isChanged = false,
          value = 0;

        if ($this.hasClass("qty-plus") && currentVal < 12) {
          value = currentVal + 1;
          isChanged = true;
        }

        if ($this.hasClass("qty-minus") && currentVal > 0) {
          value = currentVal - 1;
          isChanged = true;
        }

        if (isChanged) {
          $input.data("value", value);
          $(ticketType).val(ticketType + "-" + value);
          $input.val(value);
          // Update guests number
          updateGuestNumber();
        }
      }
    });

  // Passangers result
  function updateGuestNumber() {
    var adult = $("#ticket-adult").val(),
      children = $("#ticket-children").val(),
      infants = $("#ticket-infants").val(),
      qty = $("#qty-result");
    qty.val(
      parseInt(adult, 10) + parseInt(children, 10) + parseInt(infants, 10)
    );
    // DOM results
    $("#qty-result-text").text(qty.val());
  }
});

$(window).on("load", function () {
  setTimeout(function () {
    $(".page-loader").addClass("loaded");
  }, 1000);
});
