const popupInfoWrapper = document.querySelector(CLASS_POPUP_INFO_WRAPPER);
$(document).ready(function () {
    $("#menu").on("click", "a", function (event) {
        event.preventDefault();//при нажатии на ссылку, мы переходим по адресу этой ссылки. Вызов preventDefault() отменит это поведение
        var id = $(this).attr('href'),
            top = $(id).offset().top - popupInfoWrapper.clientHeight - 20;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });
});
