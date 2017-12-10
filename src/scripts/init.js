$(document).ready(function () {
    $('body').on('click', '.dropdown-button + .dropdown-content', function(event) {
        event.stopPropagation();
    });
});