var menuBtn = '';
var menuBtnCloser = '';
var menuMobile = '';
var menuHeader = '';

var footerContainer = '';
var footerSidebar1 = '';
var footerSidebar2 = '';
var footerSidebar3 = '';

var windowWidth = 0;

/* CUSTOM ON LOAD FUNCTIONS */
function yamCustomLoad() {
    "use strict";
    console.log('Functions Correctly Loaded');

    window.onscroll = function (e) {  
        var scroll = $(window).scrollTop();
        if (scroll > 120) {
            jQuery('.top-bar-landing').addClass('top-bar-landing-fixed');
        } else {
            jQuery('.top-bar-landing').removeClass('top-bar-landing-fixed');
        }
    } 

    footerContainer = document.getElementById('footerCnt');

    /* MENU MOBILE BEHAVIOR */
    menuBtn = document.getElementById('menuBtn');
    menuMobile = document.getElementById('menuCntr');
    menuHeader = document.getElementById('headerMenu');

    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('open');
            menuMobile.classList.toggle('show-menu');
            menuHeader.classList.toggle('showed-menu');
        });
    }

    /* EQUALIZE FOOTER HEIGHTS */
    windowWidth = footerContainer.clientWidth;
    reportWindowSize();
    window.addEventListener('resize', reportWindowSize);


    /* SMALL MENU ON CONCIERGES */
    minimizeMenuConcierges();
    jQuery(window).resize(function() {
        minimizeMenuConcierges();
    });

    /* BUTTON PLAY ON FEATURED LOCATION */
    jQuery('.img-play').on('click', function(e) {
        e.preventDefault();
        var video_url = jQuery(this).data('video');
        jQuery('#embedModalVideo').attr('src', video_url);
        jQuery('#homeVideoModal').modal('toggle');
    });

    jQuery('#homeVideoModal').on('hidden.bs.modal', function(event) {
        jQuery('#embedModalVideo').attr('src', '');
    });

    jQuery('.btn-concierge-modal').on('click', function(e) {
        jQuery('#galleryModal').modal('hide');
        jQuery('#quoteModal').modal('show');
    });

    /* GENERATE PDF FILE FOR AGENTS */
    jQuery('.generate-pdf').on('click', function(e) {
        e.preventDefault();
        jQuery.ajax({
            type: 'POST',
            url: custom_admin_url.ajax_url,
            data: {
                action: 'create_report_by_location',
                id: jQuery(this).data('roomid')
            },
            success: function(response) {
                var urlFile = decodeURIComponent(response);
                urlFile = urlFile.replace(/['"]+/g, '');
                var link = document.createElement('a');
                link.href = urlFile;
                link.download = 'property.pdf';
                document.body.appendChild(link);
                link.click();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", yamCustomLoad, false);

/* CHANGE FOOTER HEIGHTS */
function reportWindowSize() {
    footerSidebar1 = document.getElementById('sidebar-footer1');
    footerSidebar2 = document.getElementById('sidebar-footer2');
    footerSidebar3 = document.getElementById('contact');
    if ((footerSidebar1) && (footerSidebar2) && (footerSidebar3)) {
        var footerHeight = footerSidebar1.clientHeight;
        windowWidth = footerContainer.clientWidth;
        if (windowWidth <= 767) {
            footerSidebar1.style.height = 'auto';
            footerSidebar2.style.height = 'auto';
            footerSidebar3.style.height = 'auto';
        } else {
            footerSidebar2.style.height = footerHeight + 'px';
            footerSidebar3.style.height = footerHeight + 'px';
        }
    }
}

/* CHANGE MENU CONCIERGES */
function minimizeMenuConcierges() {
    var menuConcierges = parseInt(jQuery('.menu-concierges').width() - 150);
    var menuConciergesLi = 0;

    jQuery('#menu_ul li').each(function() {
        jQuery(this).removeClass('d-none');
    });

    jQuery('#menu_ul li').each(function() {
        menuConciergesLi = menuConciergesLi + jQuery(this).width();

        var lastId = jQuery(this).attr('id').slice(0, -4);
        if (parseInt(menuConciergesLi) > menuConcierges) {
            jQuery(this).addClass('d-none');
            jQuery('#' + lastId + 'Over').removeClass('d-none');
        } else {
            jQuery(this).removeClass('d-none');
            jQuery('#' + lastId + 'Over').addClass('d-none');
        }

    });
}

/* SWIPER HOME MAIN SLIDER */
var mainHomeSwiper = new Swiper('.home-swiper-container', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

/* SWIPER HOME ABOUT */
var aboutHomeSwiper = new Swiper('.about-swiper-container', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

function showGallery(currentID) {
    var currentImage = jQuery('#image-' + currentID + ' img').data('full');
    jQuery('#galleryModal').modal('show');
    jQuery('#modalGallery').html('<img src="' + currentImage + '" class="img-fluid" data-current="' + currentID + '" />');
}

jQuery('#modalGalleryClose').on('click', function(e) {
    e.preventDefault();
    jQuery('#galleryModal').modal('hide');
});

jQuery('#modalGalleryPrev').on('click', function(e) {
    e.preventDefault();

    var currentID = jQuery('#modalGallery img').data('current');
    var newIDFull = jQuery('#image-' + currentID).prev().attr('id');
    if (newIDFull === undefined || newIDFull === null) {
        var newIDFull = jQuery('div.gallery-thumbs div:last-child').attr('id');
    }
    newID = newIDFull.split('-');
    var currentImage = jQuery('#image-' + newID[1] + ' img').data('full');

    jQuery('#modalGallery').html('');
    jQuery('#modalGallery').html('<img src="' + currentImage + '" class="img-fluid" data-current="' + newID[1] + '" />');
});

jQuery('#modalGalleryNext').on('click', function(e) {
    e.preventDefault();

    var currentID = jQuery('#modalGallery img').data('current');
    var newIDFull = jQuery('#image-' + currentID).next().attr('id');
    if (newIDFull === undefined || newIDFull === null) {
        var newIDFull = jQuery('div.gallery-thumbs div:first-child').attr('id');
    }
    newID = newIDFull.split('-');
    var currentImage = jQuery('#image-' + newID[1] + ' img').data('full');

    jQuery('#modalGallery').html('');
    jQuery('#modalGallery').html('<img src="' + currentImage + '" class="img-fluid" data-current="' + newID[1] + '" />');
});


var locationSwiper = new Swiper('.swiper-location-gallery-mobile', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});