// Set up Stripe.js and Elements to use in checkout form
var style = {
  base: {
    color: '#32325d'
  }
};

var card = elements.create('card', { style: style });
card.mount('#card-element');

card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

var submitButton = document.getElementById('submit');

submitButton.addEventListener('click', function(ev) {
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: { card: card }
    })
    .then(function(result) {
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }
    });
});
