$(function() {
    function dropdown() {
        $('.dropdown_trigger').click(function(){
            $(this).closest('.dropdown').toggleClass('active');
            console.log('clicked');
        });
    }
    dropdown();
});
