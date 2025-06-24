$(document).ready(function() {
    $('.lnb').css('display', 'none');

    $('header > nav').mouseenter(function() {
        $('.lnb').stop(true, true).slideDown(500);
    });

    $('header > nav').mouseleave(function() {
        $('.lnb').slideUp(500);
    });

    let image = document.getElementById("scrollImage");

    $(window).scroll(function () {
        const scroll = $(window).scrollTop();
        if (scroll > 10) {
            $('header').addClass('act');
            $('.gnb > .m_menu > a').addClass('act-nav');
            $('header > div > ul > li .fa-solid').addClass('act-nav');
            $('body').addClass('act-padding');
            image.src = "./images/logo_w.png";
        } else {
            $('header').removeClass('act');
            $('.gnb > .m_menu > a').removeClass('act-nav');
            $('header > div > ul > li .fa-solid').removeClass('act-nav');
            $('body').removeClass('act-padding');
            image.src = "./images/logo.png"; 
        }

        con5FirstScroll = true;
        checkCon5Animation();
    });

    function checkCon5Animation() {
        if($('.con5').length === 0) return;
        const scroll = $(window).scrollTop();
        const windowHeight = $(window).height();
        const con5Top = $('.con5').offset().top;
        const con5Height = $('.con5').outerHeight();

        if (scroll + windowHeight > con5Top + 100 && scroll < con5Top + con5Height) {
            if (!$('.con5 .i_title p').hasClass('rotate-x')) {
                $('.con5 .i_title p, .con5 .price, .con5 .status p').removeClass('rotate-x');
                $('.con5 .i_title p').addClass('rotate-x');
                setTimeout(function () {
                    $('.con5 .price').addClass('rotate-x');
                }, 400);
                setTimeout(function () {
                    $('.con5 .status p').addClass('rotate-x');
                }, 800);

            }
        } else {
            // 영역을 벗어나면 클래스 제거 (다시 진입 시 애니메이션 재실행)
            $('.con5 .i_title p, .con5 .price, .con5 .status p').removeClass('rotate-x');
        }
    }

    const total = $('.slide_wrap > .slide_box').length;
    let currentIndex = 0;

    // 페이지네이션 생성
    for (let i = 0; i < total; i++) {
        $('.pagination').append(`<div class="dot${i === 0 ? ' active' : ''}" data-index="${i}"></div>`);
    }

    function updatePagination(index) {
        $('.pagination .dot').removeClass('active').eq(index).addClass('active');
    }

    $('.slide_wrap > .slide_box:last-child').insertBefore('.slide_wrap > .slide_box:first-child');
    $('.slide_wrap').css('margin-left', '-100%');

    function slide(direction) {
        if (direction === 'next') {
            $('.slide_wrap').animate({ 'margin-left': '-200%' }, 500, function () {
                $('.slide_wrap > .slide_box:first-child').appendTo('.slide_wrap');
                $('.slide_wrap').css('margin-left', '-100%');

                currentIndex = (currentIndex + 1) % total;
                updatePagination(currentIndex);
            });
        } else if (direction === 'prev') {
            $('.slide_wrap > .slide_box:last-child').prependTo('.slide_wrap');
            $('.slide_wrap').css('margin-left', '-200%');
            $('.slide_wrap').animate({ 'margin-left': '-100%' }, 500, function () {
                currentIndex = (currentIndex - 1 + total) % total;
                updatePagination(currentIndex);
            });
        }
    }

    function nextSlide() {slide('next');}
    function prevSlide() {slide('prev');}

    let timer = setInterval(nextSlide, 3000);

    // 페이지네이션 클릭
    $('.pagination').on('click', '.dot', function () {
        clearInterval(timer);

        const clickedIndex = $(this).data('index');
        if (clickedIndex === currentIndex) return;

        const diff = clickedIndex - currentIndex;

        if (diff === 1 || diff === -total + 1) {
            nextSlide();
        } else if (diff === -1 || diff === total - 1) {
            prevSlide();
        } else {
            $('.slide_wrap').css('margin-left', '-100%');
            const $slides = $('.slide_wrap > .slide_box');
            for (let i = 0; i < total; i++) {
                let index = (clickedIndex + i) % total;
                $slides.eq(index).appendTo('.slide_wrap');
            }
            currentIndex = clickedIndex;
            updatePagination(currentIndex);
        }

        timer = setInterval(nextSlide, 3000);
    });

    //recruit
    function activeTab(index) {
        $('.tab > a').removeClass('on');
        $('.tab > a').eq(index).addClass('on');
        $('.content').removeClass('selected');
        $('.content').eq(index).addClass('selected');
    }

    $('.tab > a').click(function(e) {
        e.preventDefault();
        const index = $(this).parent().index();
        activeTab(index);
    });

    $('.fa-angle-right').click(function() {
        const tabs = $('.tab > a');
        let current = tabs.index($('.tab > a.on'));
        let next = (current + 1) % tabs.length;
        activeTab(next);
    });

    $('.fa-angle-left').click(function() {
        const tabs = $('.tab > a');
        let current = tabs.index($('.tab > a.on'));
        let prev = (current - 1) % tabs.length;
        activeTab(prev);
    });
})