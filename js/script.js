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