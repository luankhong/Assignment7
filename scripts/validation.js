(function (window) {
    'use strict';
    var App = window.App || {};
    var Validation = {
        isCompanyEmail: function (email) {
            return /.+@bignerdranch\.com$/.test(email);
        },

        //Chapter 12 Silver Challenge
        isDecaf: function (orderText, strength) {
            var hasDecafText = /decaf/.test(orderText);
            var strengthTooHigh = strength > 20;

            //False if does not contain decaf but strength too low
            if(!hasDecafText && !strengthTooHigh) {
                return false;
            }

            //True if hasDecafText and strength is low. False otherwise
            return !(hasDecafText && strengthTooHigh);
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);
