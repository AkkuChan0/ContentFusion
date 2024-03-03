function AppViewModel() {

}

var self = this;
self.categories = {
    new: 'new',
    popular: 'popular',
    other: []
}

self.project = {
    nowCategory: ko.observable('new')
}

// Activates knockout.js
$(document).ready(function() {
    ko.applyBindings(new AppViewModel());
})
