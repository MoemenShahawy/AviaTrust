let flightDataRecorder = null;
let contractData = null;
let walletIsInitialized = false;

function includeSidebar(page) {
    // AJAX
    $('#sidebar').load('includes/sidebar.html', function() {
        $(`#${page}Li > a`).addClass('active');

        if (!walletIsInitialized) {
            $('#inspectLi > a').addClass('disabled');
            $('#insertLi > a').addClass('disabled');
        }
    });
}

function includeMain(page) {

    $('#mainContainer').load(`partials/${page}.html`, function() {
        if (page == 'connect' && walletIsInitialized) {
            onConnectUIUpdate();
        }
    });
}

function loadPartial(page) {

    if (!walletIsInitialized && (page == 'inspect' || page == 'insert')) {
        alert('You must connect the wallet first!')
        return;
    }

    includeSidebar(page);
    includeMain(page);
}

$(document).ready(()=> {

    loadPartial('about');
});