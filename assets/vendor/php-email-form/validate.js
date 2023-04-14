/**
 * PHP Email Form Validation - v3.5
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let name = $("#name").val();
      let email = $("#email").val();
      let subject = $("#subject").val();
      let message = $("#message").val();
      const checkBox = $(".checkHuman");

      let thisForm = this;

      let action = thisForm.getAttribute('action');

      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!')
        return;
      }

      if (!checkBox[0].checked) {
        displayError(thisForm, 'Please verify you are a human!');
        return;
      }

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      try {
        let ajax = $.ajax({
          url: action.toString(),
          method: "POST",
          data: {
            name: name,
            email : email,
            message: message,
            subject : subject
          },
          dataType: "json"
        });

        ajax.done(function () {
          thisForm.querySelector('.loading').classList.remove('d-block');
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();
        });

        ajax.fail(function (message) {
          displayError(thisForm, message);
        });

      } catch (error) {
        displayError(thisForm, error);
      }
    });
  });

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
