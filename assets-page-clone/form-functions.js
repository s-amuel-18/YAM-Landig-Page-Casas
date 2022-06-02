let passd = true;
let formFooter = document.getElementById('subscribeForm');
let buttonFooter = document.getElementById('subscribeFormBtn');
let formConcierges = document.getElementById('quoteForm');
let buttonConcierges = document.getElementById('quoteFormBtn');
let landingForm = document.getElementById('landingForm');
let landingFormBtn = document.getElementById('landingFormBtn');
let landingModalForm = document.getElementById('landingModalForm');
let landingModalFormBtn = document.getElementById('landingModalFormBtn');
let grecaptchaContact = '';
let grecaptchaModal = '';

function isValidEmailAddress(emailAddress) {
    'use strict';
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

function telephoneCheck(str) {
    var patt = new RegExp(/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm);
    return patt.test(str);
}

function recaptchaContactCallback() {
    var currentError = document.getElementById('recaptchaContact').nextElementSibling;
    currentError.classList.add('d-none');
}

function recaptchaModalCallback() {
    var currentError = document.getElementById('recaptchaModal').nextElementSibling;
    currentError.classList.add('d-none');
}

var CaptchaCallback = function() {
    var recaptchaContact = document.getElementById('recaptchaContact');
    var recaptchaModal = document.getElementById('recaptchaModal');

    if (recaptchaContact) {
        grecaptchaContact = grecaptcha.render('recaptchaContact', {
            'sitekey': custom_admin_url.recaptcha_site_key
        });
    }

    if (recaptchaModal) {
        grecaptchaModal = grecaptcha.render('recaptchaModal', {
            'sitekey': custom_admin_url.recaptcha_site_key
        });
    }
};

function validateElement(id, type, form) {

    if (form != 'modal') {
        str = id.replace('form', '');
    } else {
        str = id.replace('formModal', '');
    }

    switch (str) {
        case 'Name':
            var errorUrlString = custom_admin_url.error_name;
            var invalidUrlString = custom_admin_url.invalid_name;
            break;
        case 'Last':
            var errorUrlString = custom_admin_url.error_lastname;
            var invalidUrlString = custom_admin_url.invalid_lastname;
            break;
        case 'Email':
            var errorUrlString = custom_admin_url.error_email;
            var invalidUrlString = custom_admin_url.invalid_email;
            break;
        case 'Phone':
            var errorUrlString = custom_admin_url.error_phone;
            var invalidUrlString = custom_admin_url.invalid_phone;
            break;
        case 'Rental':
            var errorUrlString = custom_admin_url.error_rental;
            var invalidUrlString = custom_admin_url.error_rental;
            break;
        case 'Hours':
            var errorUrlString = custom_admin_url.error_hours;
            var invalidUrlString = custom_admin_url.error_hours;
            break;
        case 'People':
            var errorUrlString = custom_admin_url.error_people;
            var invalidUrlString = custom_admin_url.error_people;
            break;
        default:
            type = 'textarea'
            var errorUrlString = '';
            var invalidUrlString = '';
    }

    if (form != 'modal') {
        var element = document.getElementById('form' + str);
    } else {
        var element = document.getElementById('formModal' + str);
    }

    if (form != 'modal') {
        var errorString = 'error' + str;
    } else {
        var errorString = 'errorModal' + str;
    }
    var elementError = document.getElementById(errorString);
    console.log(elementError.getAttribute('id'));

    if (type != 'textarea') {
        if (element.value == '') {
            elementError.classList.remove('d-none');
            elementError.innerHTML = errorUrlString;
            passd = false;
        } else {
            switch (type) {
                case 'text':
                    if (element.value.length < 3) {
                        elementError.classList.remove('d-none');
                        document.getElementById(errorString).innerHTML = invalidUrlString;
                        passd = false;
                    } else {
                        elementError.classList.add('d-none');
                    }
                    break;
                case 'email':
                    if (isValidEmailAddress(element.value) == false) {
                        elementError.classList.remove('d-none');
                        elementError.innerHTML = invalidUrlString;
                        passd = false;
                    } else {
                        elementError.classList.add('d-none');
                    }
                    break;
                case 'tel':
                    if (telephoneCheck(element.value) == false) {
                        elementError.classList.remove('d-none');
                        elementError.innerHTML = invalidUrlString;
                        passd = false;
                    } else {
                        elementError.classList.add('d-none');
                    }
                    break;
                case 'select':
                    if (element.value.length < 3) {
                        elementError.classList.remove('d-none');
                        document.getElementById(errorString).innerHTML = invalidUrlString;
                        passd = false;
                    } else {
                        elementError.classList.add('d-none');
                    }
                    break;
                case 'date':
                    if (element.value.length < 3) {
                        elementError.classList.remove('d-none');
                        document.getElementById(errorString).innerHTML = invalidUrlString;
                        passd = false;
                    } else {
                        elementError.classList.add('d-none');
                    }
                    break;
                default:
                    elementError.classList.add('d-none');
            }
        }
    }
}

function customFormLoader() {
    if (formFooter) {
        formFooter.addEventListener('submit', function(e) {
            e.preventDefault();
            passd = true;

            var elementsForm = document.getElementsByClassName('input-form-control');

            for (var i = 0; i < elementsForm.length; i++) {
                validateElement(elementsForm[i].id, elementsForm[i].getAttribute('type'), '');
            }

            if (passd == true) {
                submitFooterForm();
            }
        });
    }

    if (formConcierges) {
        formConcierges.addEventListener('submit', function(e) {
            e.preventDefault();
            passd = true;

            var elementsForm = document.getElementsByClassName('concierges-input');

            for (var i = 0; i < elementsForm.length; i++) {
                validateElement(elementsForm[i].id, elementsForm[i].getAttribute('type'), '');
            }

            if (passd == true) {
                submitConciergesForm();
            }
        });
    }

    if (landingForm) {
        landingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            passd = true;

            var elementsForm = document.getElementsByClassName('landing-footer-input');

            for (var i = 0; i < elementsForm.length; i++) {
                validateElement(elementsForm[i].id, elementsForm[i].getAttribute('type'), '');
            }

            if (passd == true) {
                submitLandingForm();
            }
        });
    }

    if (landingModalForm) {
        landingModalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            passd = true;

            var elementsForm = document.getElementsByClassName('landing-modal-input');

            for (var i = 0; i < elementsForm.length; i++) {
                validateElement(elementsForm[i].id, elementsForm[i].getAttribute('type'), 'modal');
            }

            if (passd == true) {
                console.log('aqui');
                submitLandingModalForm();
            }
        });
    }


}

document.addEventListener("DOMContentLoaded", customFormLoader, false);

function submitFooterForm() {
    var dataString = '';
    var elementsForm = document.getElementsByClassName('input-form-control');

    dataString = 'action=custom_footer_send_message';
    for (var i = 0; i < elementsForm.length; i++) {
        var key = elementsForm[i].id;
        dataString += '&' + key + '=' + elementsForm[i].value;
    }

    dataString += '&listID=' + document.getElementById('listID').value;

    var recaptchaValue = grecaptcha.getResponse(grecaptchaContact);
    var recaptchaError = document.getElementById('errorRecaptcha');

    if (recaptchaValue.length == 0) {
        recaptchaError.classList.remove('d-none');
    } else {
        dataString += '&g-recaptcha-response=' + recaptchaValue;
        recaptchaError.classList.add('d-none');
        var elements = document.getElementsByClassName('footer-loader-css');
        elements[0].classList.toggle("d-none");
        elements[0].innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        /* SEND AJAX */
        newRequest = new XMLHttpRequest();
        newRequest.open('POST', custom_admin_url.ajax_url, true);
        newRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        newRequest.onload = function() {

            var elements = document.getElementsByClassName('footer-loader-css');
            elements[0].classList.toggle("d-none");

            var result = JSON.parse(newRequest.responseText);
            if (result.success == true) {
                var response = document.getElementsByClassName('footer-form-response');
                response[0].innerHTML = result.data;
                setTimeout(function() {
                    window.location.href = custom_admin_url.thanks_contact_url;
                }, 600);
            } else {
                alert(result.data);
            }
        };
        newRequest.send(dataString);
    }
}

function submitConciergesForm() {
    var dataString = '';
    var elementsForm = document.getElementsByClassName('concierges-input');

    dataString = 'action=custom_concierges_send_message';
    for (var i = 0; i < elementsForm.length; i++) {
        var key = elementsForm[i].id;
        dataString += '&' + key + '=' + elementsForm[i].value;
    }

    dataString += '&listID=' + document.getElementById('listID').value;

    var elements = document.getElementsByClassName('concierges-loader-css');
    elements[0].classList.toggle("d-none");
    elements[0].innerHTML = '<div class="lds-ripple"><div></div><div></div></div>';
    /* SEND AJAX */
    newRequest = new XMLHttpRequest();
    newRequest.open('POST', custom_admin_url.ajax_url, true);
    newRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    newRequest.onload = function() {

        var elements = document.getElementsByClassName('concierges-loader-css');
        elements[0].classList.toggle("d-none");

        var result = JSON.parse(newRequest.responseText);
        if (result.success == true) {
            var response = document.getElementsByClassName('concierges-form-response');
            response[0].innerHTML = result.data;
            setTimeout(function() {
                window.location.href = custom_admin_url.thanks_contact_url;
            }, 600);
        } else {
            alert(result.data);
        }
    };
    newRequest.send(dataString);

}

function submitLandingForm() {
    var dataString = '';
    var elementsForm = document.getElementsByClassName('landing-footer-input');

    dataString = 'action=custom_landing_send_message';
    for (var i = 0; i < elementsForm.length; i++) {
        var key = elementsForm[i].id;
        dataString += '&' + key + '=' + elementsForm[i].value;
    }
    var recaptchaValue = grecaptcha.getResponse(grecaptchaContact);
    var recaptchaError = document.getElementById('errorRecaptcha');

    if (recaptchaValue.length == 0) {
        recaptchaError.classList.remove('d-none');
    } else {
        recaptchaError.classList.add('d-none');
        dataString += '&g-recaptcha-response=' + recaptchaValue;
        dataString += '&listID=' + document.getElementById('listID').value;

        var elements = document.getElementsByClassName('landing-loader-css');
        elements[0].classList.toggle("d-none");
        elements[0].innerHTML = '<div class="lds-ripple"><div></div><div></div></div>';
        /* SEND AJAX */
        newRequest = new XMLHttpRequest();
        newRequest.open('POST', custom_admin_url.ajax_url, true);
        newRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        newRequest.onload = function() {

            var elements = document.getElementsByClassName('landing-loader-css');
            elements[0].classList.toggle("d-none");

            var result = JSON.parse(newRequest.responseText);
            if (result.success == true) {
                var response = document.getElementsByClassName('landing-footer-form-response');
                response[0].innerHTML = result.data;
                setTimeout(function() {
                    window.location.href = custom_admin_url.thanks_landing_url;
                }, 600);
            } else {
                alert(result.data);
            }
        };
        newRequest.send(dataString);
    }
}

function submitLandingModalForm() {
    var dataString = '';
    var elementsForm = document.getElementsByClassName('landing-modal-input');

    dataString = 'action=custom_landing_modal_send_message';
    for (var i = 0; i < elementsForm.length; i++) {
        var key = elementsForm[i].id;
        dataString += '&' + key + '=' + elementsForm[i].value;
    }
    var recaptchaValue = grecaptcha.getResponse(grecaptchaModal);
    var recaptchaError = document.getElementById('errorRecaptcha');

    if (recaptchaValue.length == 0) {
        recaptchaError.classList.remove('d-none');
    } else {
        recaptchaError.classList.add('d-none');
        dataString += '&g-recaptcha-response=' + recaptchaValue;
        dataString += '&listID=' + document.getElementById('listID').value;

        var elements = document.getElementsByClassName('landing-loader-css');
        elements[0].classList.toggle("d-none");
        elements[0].innerHTML = '<div class="lds-ripple"><div></div><div></div></div>';
        /* SEND AJAX */
        newRequest = new XMLHttpRequest();
        newRequest.open('POST', custom_admin_url.ajax_url, true);
        newRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        newRequest.onload = function() {

            var elements = document.getElementsByClassName('landing-loader-css');
            elements[0].classList.toggle("d-none");

            var result = JSON.parse(newRequest.responseText);
            if (result.success == true) {
                var response = document.getElementsByClassName('landing-modal-form-response');
                response[0].innerHTML = result.data;
                setTimeout(function() {
                    window.location.href = custom_admin_url.thanks_landing_url;
                }, 600);
            } else {
                alert(result.data);
            }
        };
        newRequest.send(dataString);
    }
}