

function AppViewModel() {

}

var self = this;

self.project = {
    nowCategory: ko.observable()
}

// Activates knockout.js
$(document).ready(function() {
    ko.applyBindings(new AppViewModel());
    self.project.nowCategory(self.categoriesTemp().categories[0]);
    self.articlesTitle(self.articlesTitle().sort((a, b) => a.date < b.date))
})
