(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);

        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};

            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data);

            this.reset();
            this.elements[0].focus();
        });
    };

    FormHandler.prototype.addInputHandler = function(fn, fn2) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });

        //Chapter 12 Silver Challenge
        this.$formElement.on('input', '[name="coffee"]', function(event) {
            var strengthSlider = document.getElementById('strengthLevel');

            var orderText = event.target.value;
            var strength = strengthSlider.value;

            var message = '';

            if (fn2(orderText, strength)) {
                console.log('true   Text: ' + orderText + ' | Strength: ' + strength);
                event.target.setCustomValidity('');
                strengthSlider.setCustomValidity('');
            } else {
                console.log('false   Text: ' + orderText + ' | Strength: ' + strength);
                if (strength > 20) {
                    message = 'Order contains decaf but caffeine strength > 20 ';
                } else {
                    message = 'Order does not contain decaf but caffeine strength is <= 20';
                }
                event.target.setCustomValidity(message);
            }
        });

        //Chapter 12 Silver Challenge
        this.$formElement.on('input', '[name="strength"]', function(event) {
            var orderTextField = document.getElementById('coffeeOrder');

            var orderText = orderTextField.value;
            var strength = event.target.value;

            var message = '';

            if (fn2(orderText, strength)) {
                console.log('true   Text: ' + orderText + ' | Strength: ' + strength);
                event.target.setCustomValidity('');
                orderTextField.setCustomValidity('');
            } else {
                console.log('false   Text: ' + orderText + ' | Strength: ' + strength);
                if (strength > 20) {
                    message = 'Caffeine Strength is > 20 but order contain decaf ';
                } else {
                    message = 'Caffeine Strength is <= 20 but order DOES NOT contain decaf';
                }
                event.target.setCustomValidity(message);
            }
        });


    };

    App.FormHandler = FormHandler;
    window.App = App;

})(window);
