$(document).ready(function(){

    const isMobile = {
        Android: function(){
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function(){
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function(){
            return navigator.userAgent.match(/Opera mini/i)
        },
        Windows: function(){
            return navigator.userAgent.match(/IEMobile/i)
        },
        any: function(){
            return(
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            )
        }
    }

    if(isMobile.any()){
        $('body').addClass('_touch')

    }else{
        $('body').addClass('_pc')
    }

    //date counter year
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 2021 ? 2021 : count;
        $input.val(count);
        $input.change();
        return false;
    });

    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) + 1;
        count = count > 2025 ? 2025 : count;
        $input.val(count);
        return false;
    });

    //date-list appear
    $('.date-list').fadeOut(300)
    if(isMobile.any()) {
        $('.date__title').click(function(e){
            $(this).parent().children('.date-list').fadeToggle(300)
        })
        // $('body').not($('.date__title')).click(function(e){
        //     console.log(1);
        //     // $('.date-list').each(function(index, element){
        //     //     $(element).fadeOut(300)
        //     // })
        // })
    } else {
        $('.date').hover(function(e){
            $(this).children('.date-list').fadeToggle(300)
        })
    }

    //horizontal scroll
    let offset = 0
    const section = document.querySelector(`.reports .horizontal-list__wrapper`)

    section.addEventListener('scroll', (e) => {
        offset = $(section).children().offset().left
        //console.log($(section).children().offset().left)
    })

    //scroll to date
    function makeHorizontalScroll(section) {
        $(`${section} .date-list__months__item`).click(function(e){
            e.preventDefault()
            if (isMobile.any()) {
                $(`${section} .date-list`).fadeOut(300)
            }
            //select year and month for sorting
            const year = $(this).parent().parent().parent().children('.date-list__year').children('.year').val()
            const month = $(this).attr('data-month')

            //get all elements of timeline list
            const yearsArr = Array.from(document.querySelectorAll(`${section} .horizontal-list-content .horizontal-list-content__item`))

            //get elements with current year
            let sortYears = []
            yearsArr.forEach(item => {
                if( +$(item).attr('data-year') == +year ){
                    sortYears.push(item)
                }
            })

            if(sortYears.length === 0) {
                return false
            }

            //select element with current month
            let choosenItem = null

            choosenItem = sortYears.find(item => +$(item).attr('data-month') === +month)

            if (!choosenItem && sortYears.some(item => +$(item).attr('data-month') > +month)) {
                choosenItem = sortYears[sortYears.length - 1]
            }

            if (!choosenItem && sortYears.some(item => +$(item).attr('data-month') < +month)) {
                choosenItem = sortYears[0]
            }

            // if($(choosenItem).hasClass('_current')) {
            //     return false
            // }

            // $(`${section} .horizontal-list-content__item`).each(function(index, element){
            //     $(element).removeClass('_current')
            // })
            // $(choosenItem).addClass('_current')
            
            $(`${section} .horizontal-list__wrapper`).animate({
                scrollLeft: $(choosenItem).offset().left - offset - +$(`${section} .horizontal-list`).css('marginLeft').slice(0, -2)
            }, 300, "linear")

            choosenItem = null
        })
    }

    makeHorizontalScroll('.reports')

    //swipers
    let swiperDonats = null

    $('.donat-slider.swiper').each(function(index) {
        swiperDonats = new Swiper(`._donat-${index}.donat-slider.swiper`, {
            pagination: {
                el: `._donat-${index}.donat-slider .donat-slider__pagination__container`,
                clickable: true,
            },
            slidesPerView: 1,
            spaceBetween: 24,

        })
    })
})