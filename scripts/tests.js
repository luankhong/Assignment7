QUnit.test('hello test', function(assert) {
    assert.ok(1 == '1', 'Passed!');
});

QUnit.test('DataStore.prototype.get', function(assert) {
    var App = window.App;
    var ds = new App.DataStore();
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');

    assert.ok(ds.get('m@bond.com') == 'tea', 'key of m@bond.com returned tea');
    assert.ok(ds.get('james@bond.com') == 'eshpressho', 'key of dr@no.com returned eshpressho');
});

QUnit.test('DataStore.prototype.getAll', function(assert) {
    var App = window.App;
    var ds = new App.DataStore();
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');

    var orders = ds.getAll(); //<--------------Testing getAll()
    assert.ok(orders['m@bond.com'] == 'tea', 'key of m@bond.com returned tea');
    assert.ok(orders['james@bond.com'] == 'eshpressho', 'key of james@bond.com returned eshpressho');
});

//The problem I ran into is displaying diliverOrder() into Qunit assert..
QUnit.test('Truck', function(assert) {
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var truck = new Truck('ncc-1701', new DataStore());
    truck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    });
    truck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });
    truck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });

    var order1 = truck.db.get('me@goldfinger.com');
    var order2 = truck.db.get('dr@no.com');
    var order3 = truck.db.get('m@bond.com');
    assert.ok(order1.emailAddress == 'me@goldfinger.com' && order1.coffee == 'double mocha', order1.emailAddress + ' ordered ' + order1.coffee);
    assert.ok(order2.emailAddress == 'dr@no.com' && order2.coffee == 'decaf', order2.emailAddress + ' ordered ' + order2.coffee);
    assert.ok(order3.emailAddress == 'm@bond.com' && order3.coffee == 'earl grey', order3.emailAddress + ' ordered ' + order3.coffee);

    assert.equal(truck.summaryOrders(), 'Truck #ncc-1701 has pending orders: me@goldfinger.com double mocha | dr@no.com decaf | m@bond.com earl grey | ', truck.summaryOrders());

    truck.deliverOrder('dr@no.com');
    assert.ok(!('dr@no.com' in truck), 'Delivering order for dr@no.com');

    truck.deliverOrder('m@bond.com');
    assert.ok(!('m@bond.com' in truck), 'Delivering order for m@bond.com');

    assert.equal(truck.summaryOrders(), 'Truck #ncc-1701 has pending orders: me@goldfinger.com double mocha | ', truck.summaryOrders());

});
