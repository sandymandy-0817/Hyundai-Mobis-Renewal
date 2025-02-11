//윈도우객체&스크롤이벤트를 활용하여 세로 스크롤이 동작하면 act서식을 header에 적용하거나 다시 세로 스크롤 값이 0이 되면 header에 들어간 act서식을 제거하기

//윈도우객체
let scrollTop;
const header = document.getElementById('header');
let image = document.getElementById("scrollImage");

// 윈도우 객체를 사용하여 scroll값에 따른 act 서식 적용
window.addEventListener('scroll', function () {

    // 스크롤값을 변수에 저장
    scrollTop = window.scrollY;

    // 만약에 세로 스크롤값이 2px 이상이면 헤더에 서식을 적용
    if (scrollTop >= 2) {
        header.classList.add('act');
        image.src = "./Landing_Page/헤더/logo_w.png"; 
    } else {
        header.classList.remove('act');
        image.src = "./Landing_Page/헤더/logo.png"; 
    }
});

//메인슬라이드
const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
    on: {
        slideChange: function () {
            // 모든 슬라이드에서 zoom 클래스 제거
            document.querySelectorAll('.swiper-slide').forEach(slide => {
                slide.classList.remove('zoom');
            });

            // 현재 슬라이드에만 zoom 클래스 추가
            const activeSlide = this.slides[this.activeIndex];
            activeSlide.classList.add('zoom');
        },
    },
});

//유튜브
const slider = document.querySelector('.v_list');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', e => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', e => {
    if (!isDown) return; 
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
    });

//채용
$(document).ready(function(){
    $('ul.cate li').click(function(){
        var tab_id = $(this).attr('data-tab');
    
        $('ul.cate li').removeClass('current');
        $('.text_sub .text').removeClass('current');
    
        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    });    

    $("#left").click(function(){
        var current = $("ul.cate li.current"); // 현재 선택된 탭
        var prevItem = current.prev("li"); // 이전 탭 찾기
        
        if (prevItem.length === 0) { // 첫 번째 탭이면 마지막 탭으로 이동
            prevItem = $("ul.cate li").last();
        }

        prevItem.click(); // 해당 탭 클릭 이벤트 실행
    });

    $("#right").click(function(){
        var current = $("ul.cate li.current"); // 현재 선택된 탭
        var nextItem = current.next("li"); // 다음 탭 찾기
        
        if (nextItem.length === 0) { // 마지막 탭이면 첫 번째 탭으로 이동
            nextItem = $("ul.cate li").first();
        }

        nextItem.click(); // 해당 탭 클릭 이벤트 실행
    });
});
