

const hideHomePage = function(){
    $('.welcome-page').addClass('hide');
    $('.band-page').removeClass('hide');
}
$('.login-button').on('click', hideHomePage);
$('.search-artists').on('click', hideHomePage);

