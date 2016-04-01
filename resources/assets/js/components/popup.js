$(function() {
    function popup() {
        $('.popup-trig').click(function(){
            var attrVal = $(this).attr('popup-trig');
            $('#'+attrVal).toggleClass('active');
        });
        $('.popup-close, .popup').click(function(){
            if($(event.target).is('.popup, .popup-close')) {
                $('.popup').removeClass('active');
            }
        });
    }
    popup();
});