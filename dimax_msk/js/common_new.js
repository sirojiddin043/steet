$(function () {

    function scrollToDiv(div) {
        $('html, body').animate({
            scrollTop: $(div).offset().top
        }, 500);
    }

    $(document).ready(function () {

        $('.start-game').on('click', function() {
            var _t = $(this);
            $('#stumb').attr('src', _t.data('img'));
            $('#descr-gift').text(_t.attr('desc'));
            _t.find('img').attr('src', _t.data('img'));
        });

        $('.item__promo').on('click', function () {
            if ($(this).parents('section').hasClass('choice')) {
                $('.choice .item').removeClass('active');
                $(this).parents('.item').addClass('active');
            } else {
                $('.wish .tab-panel__content').removeClass('active');
                $(this).parents('.tab-panel__content').addClass('active');
            }
        });

        var calcData = {
            single: {
                base: 6577,
                thermal: 7060,
                round: 9481,
                softline: 5400,
                veka70: 5300,
                euro58: 4600,
                whs60: 3930,
                addon: {
                    windowsill: 204,
                    installation: 2022,
                    net: 449,
                    otliv: 189,
                    otkos: 1273,
                }
            },
            double: {
                base: 8498,
                thermal: 7770,
                round: 12172,
                softline: 5940,
                veka70: 5830,
                euro58: 5060,
                whs60: 4320,
                addon: {
                    windowsill: 297,
                    installation: 2631,
                    net: 397,
                    otliv: 189,
                    otkos: 1400,
                }
            },
            triple: {
                base: 11921,
                thermal: 8470,
                round: 17032,
                softline: 6480,
                veka70: 6360,
                euro58: 5520,
                whs60: 4720,
                addon: {
                    windowsill: 483,
                    installation: 4062,
                    net: 421,
                    otliv: 260,
                    otkos: 1652,
                }
            }
        };

        function calc() {
            var flapQuantity = $('input[name=quant]:checked').data('calc');
            var profile = $('input[name=profile]:checked').data('calc');
            var addonVal = $('input[name=addon]:checked');
            var price = 0;
            
            var addonSum = 0;
            addonVal.each(function(i, n) {
                addonSum += calcData[flapQuantity]['addon'][$(n).data('calc')];
            });
            
            price = calcData[flapQuantity][profile] + addonSum;
            price = Math.round(1*price);

            //$('.calc__price-new .accent').text(Math.round(price * 0.55));
            //$('.calc__price-old s').text(price);
            
            var oldPrice = Math.round( (price/55) * 100 );
            
            $('.calc__price-new .accent').text(price);
            $('.calc__price-old s').text(oldPrice);            

            $('.calc-img').attr('src', 'img/style/' + $('input[name=quant]:checked').siblings('img').data('img') + '-big.jpg');

        }

        calc();

        $('#calc .item').on('click', function () {
            calc();
        });

        $('.wish').on('click', '.item', function () {
            var bgPath = $(this).data('color');
            if ($(window).width() > 992) $('.wish').css('background-image', 'url(img/style/color/' + bgPath + '.png)');
            else $('.wish .item__img img').attr('src', 'img/style/color/' + bgPath + '-small.png');
            $('.wish__carousel .item').removeClass('active');
            $(this).addClass('active');
        });

        $('.tab-panel').on('click', '.tab-panel__item', function (e) {
            e.preventDefault();
            var _t = $(this).data('link');
            $(this).parents('section').find('.tab-panel__content').removeClass('active');
            $('#' + _t).addClass('active');
            $(this).parents('section').find('.tab-panel__item').removeClass('active');
            $(this).addClass('active');
            $('.wish .item').removeClass('active');
            $('.wish__carousel .owl-item:first-child .item').addClass('active');
            var colorActive = 'url(img/style/color/' + $(".wish .tab-panel__content:visible .item.active").data('color') + '.png)';

            $('.wish').css('background-image', colorActive);
        });

        $('.type-toggle').on('click', function () {
            $(this).siblings('.type-hide').toggle();
        });

        $(window).scroll(function () {
            $(window).scrollTop() > 860 ? $('.to-top').addClass('on') : $('.to-top').removeClass('on');
        });

        $('.to-top').on('click', function () {
            scrollToDiv('#header');
        });

        $('.to-map').on('click', function () {
            scrollToDiv($(this).attr("href"));
        });

        
        $('.navigation a').on('click', function (e) {
            e.preventDefault();
            scrollToDiv($(this).attr("href"));
        });

        $('.list a').on('click', function (e) {
            e.preventDefault();
            scrollToDiv($(this).attr("href"));
        });

    });

    var countOutput = '<div class="counter">';
    countOutput += '<b class="d"><span>%D</span><div class="date-word dd">дней</div></b> <span class="accent">:</span>';
    countOutput += '<b class="h"><span>%H</span><div class="date-word hh">часов</div></b> <span class="accent">:</span>';
    countOutput += '<b class="m"><span>%M</span><div class="date-word mm">минут</div></b> <span class="accent">:</span>';
    countOutput += '<b class="s"><span>%S</span><div class="date-word ss">секунд</div></b>';
    countOutput += '</div>';

    $('.counter-wrap').countdown(sale_date, function (event) {
        $(this).html(event.strftime(countOutput));
    });
    
    var countOutput2 = '<div class="counter">';
    countOutput2 += '<b class="d"><span>2</span><div class="date-word dd" >дней</div></b> <span class="accent">:</span>';
    countOutput2 += '<b class="h"><span>%H</span><div class="date-word hh" >часов</div></b> <span class="accent">:</span>';
    countOutput2 += '<b class="m"><span>%M</span><div class="date-word mm" >минут</div></b> <span class="accent">:</span>';
    countOutput2 += '<b class="s"><span>%S</span><div class="date-word ss" >секунд</div></b>';
    countOutput2 += '</div>';

    $('.counter-wrap2').countdown(sale_date, function (event) {
        $(this).html(event.strftime(countOutput2));
    });
    

    $('.js-popup').on('click', function (e) {
        e.preventDefault();
        if ($(this).text() === 'Вызвать мастера по ремонту окон' || $(this).text() === 'Заказать звонок') {
            $('#popup').find('.form__title').text($(this).text());
        } else {
            $('#popup').find('.form__title').text('Заказать замер бесплатно');
        }
        $.fancybox.open({
            src: '#popup'
        });
    });

    $('.validate-form').each(function () {
        $(this).validate({
            submitHandler: function (form) {
                var formData = {
                    'name': $(form).find('input[name=name]').val(),
                    'giftname': $(form).find('input[name=giftname]').val(),
                    'phone': $(form).find('input[name=phone]').val(),
                    'formname': $(form).find('input[name=formname]').val(),
                    'surname': $('#surname').val(),
                };console.log(formData)
                $.ajax({
                    type: 'POST',
                    url: 'sendmail.php',
                    data: formData,
                    beforeSend: function () {
                        $.fancybox.open({ src: '#popup-wait' });
                    }
                }).done(function (data) {
                    $.fancybox.close();
                    if (data == 'error') {
                        $.fancybox.open({ src: '#popup-error' });
                        return false;
                    }
                    $.fancybox.open({ src: '#popup-thanks' });
                    gtag('event', 'sendemail', {
                        'event_category': 'mail',
                        'event_action': 'send-okna-peter-hl-domain'
                    });
//                    yaCounter44700.reachGoal('mail-send-okna-peter-hl-domain');
//                    fbq('trackCustom', 'mail-send');
                    console.log('mail-send');
                    console.log(submitHandler)
                });
                return !1
            }
        });
    });

    $('input[type=tel]').inputmask({
        mask: '+7 (999) 999-9999',
        jitMasking: 3,
        showMaskOnHover: false
    });

    $('input[type=tel]').on('focusout', function () {
        if ($(this).val().length !== 17) {
            $(this).val('').addClass('error');
        }
    });

    $("input[type=email]").inputmask({
        mask: "*{1,30}[.*{1,30}][.*{1,30}][.*{1,30}]@*{1,30}[.*{2,6}][.*{1,2}]",
        greedy: false,
        onBeforePaste: function (pastedValue, opts) {
            pastedValue = pastedValue.toLowerCase();
            return pastedValue.replace("mailto:", "");
        },
        definitions: {
            '*': {
                validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
                casing: "lower"
            }
        }
    });

    // $('.sale__carousel').owlCarousel({
    //     items: 1,
    //     loop: true,
    //     nav: true,
    //     dots: false,
    //     lazyLoad: true,
    //     touchDrag: false
    // });

    $('.wish__carousel').owlCarousel({
        items: 5,
        loop: !1,
        nav: true,
        dots: false,
        margin: 20,
        lazyLoad: true,
        responsive: {
            0: {
                items: 3,
                margin: 15,
                nav: 1,
                dots: 1
            },
            1170: {
                items: 5,
                margin: 20,
                nav: 1,
                dots: !1
            }
        }
    });

    $('.design__carousel').owlCarousel({
        items: 4,
        loop: !true,
        nav: true,
        dots: true,
        margin: 30,
        lazyLoad: true,
        responsive: {
            0: {
                items: 1,
                margin: 0,
                dots: 1
            },
            992: {
                items: 4,
                margin: 30
            }
        }
    });

    $('.review__carousel').owlCarousel({
        items: 1,
        loop: !true,
        nav: true,
        dots: true,
        lazyLoad: true,
    });

    if ($(window).width() < 992) {

        $('.calc__carousel')
            .addClass('owl-theme owl-carousel')
            .owlCarousel({
                items: 1,
                loop: !true,
                nav: true,
                dots: true,
                lazyLoad: true,
                touchDrag: false
            });
    }

    $('.compare__carousel').owlCarousel({
        items: 1,
        loop: !true,
        nav: 1,
        dots: true,
        lazyLoad: true,
        touchDrag: false
    });

    $('.port__carousel').owlCarousel({
        items: 1,
        loop: !true,
        nav: true,
        dots: true,
        lazyLoad: true,
    });

    // $('.js-menu-toggle').on('click', function () {
    //     $('.navigation').toggleClass('on');
    //     $(this).toggleClass('on');
    // });

    // ymaps.ready(init);
    // var myMap;
    //
    // function init(){
    //     myMap = new ymaps.Map("map", {
    //         center: [60.039831338402465,30.318358758789046],
    //         zoom: 11,
    //         controls: ["zoomControl","typeSelector"]
    //     });
    //     myMap.behaviors.disable('scrollZoom');
    //
    //     function createMarker(content, lat, lng){
    //         myPlacemark = new ymaps.Placemark([lat, lng], {
    //             hintContent: 'Академия окон',
    //             balloonContent: 'Cанкт-Петербург, Комендантский пр-т д. 35 к.1'
    //             }, {
    //             iconLayout: 'default#image',
    //             iconImageHref: 'img/style/balloon.png',
    //             iconImageSize: [35, 51],
    //             iconImageOffset: [-35/2, -51/2]
    //         });
    //         myMap.geoObjects.add(myPlacemark);
    //     }
    //
    //     createMarker('', 60.04292256403548,30.380843499999983);
    // }
});

const qwizForm = document.querySelector('.js_qwiz_form');
if (qwizForm) {
    // рандомное кол-во получивших подарки
    const humanCount = qwizForm.querySelector('.js_human_count');
    const randomHumanCountValue = getRandomHumanCount(15, 61);
    humanCount.textContent = `${randomHumanCountValue} ${declOfNum(randomHumanCountValue, ['человек', 'человека', 'человек'])}`;

    function declOfNum(n, text_forms) {
        n = Math.abs(n) % 100;
        var n1 = n % 10;
        if (n > 10 && n < 20) { return text_forms[2]; }
        if (n1 > 1 && n1 < 5) { return text_forms[1]; }
        if (n1 == 1) { return text_forms[0]; }
        return text_forms[2];
    }

    function getRandomHumanCount(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // разблокировка кнопок "продолжить"
    const qwizSteps = qwizForm.querySelectorAll('.qwiz__content');
    qwizSteps.forEach((step) => {
        if (step.dataset.valid) {
            let radioInputs = step.querySelectorAll('input[type="radio"]');
            let qwizNextStep = step.querySelector('.qwiz__next_step');

            radioInputs.forEach((radio) => {
                radio.addEventListener('change', () => {
                    if (radio.value !== '' && qwizNextStep.classList.contains('disabled')) {
                        qwizNextStep.classList.remove('disabled');
                    }
                });
            });

        }
    });

    // смена шагов
    const changeStepBtns = qwizForm.querySelectorAll('.js_change_step');
    changeStepBtns.forEach((changeStep) => {
        changeStep.addEventListener('click', (e) => {
            e.preventDefault();
            qwizSteps.forEach((step) => {
                if (changeStep.dataset.step === step.dataset.step && !step.classList.contains('active')) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
        });
    });

    // отправка формы

    qwizForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var formData = {
            'where': this.elements["where"].value,
            'size': this.elements["size"].value,
            'when': this.elements["when"].value,
            'phone': this.elements["phone"].value,
            'formname': $('#formname').val(),
            'surname': $('#surname').val(),
        };
        $.ajax({
            type: 'POST',
            url: 'sendmail.php',
            data: formData,
            beforeSend: function () {
                $.fancybox.open({ src: '#popup-wait' });
            }
        }).done(function (data) {
            $('#qwiz').css("display", "none");
            $.fancybox.close();
            if (data == 'error') {
                $.fancybox.open({ src: '#popup-error' });
                return false;
            }
            $.fancybox.open({ src: '#popup-thanks' });
            gtag('event', 'sendemail', {
                'event_category': 'mail',
                'event_action': 'send-okna-peter-hl-domain'
            });
//            yaCounter44700.reachGoal('mail-send-okna-peter-hl-domain');
//            fbq('trackCustom', 'mail-send');
            console.log('mail-send');
        });
    });
}