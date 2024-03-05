

function AppViewModel() {

}

self.categoriesTemp = ko.observable();
self.articlesTitle = ko.observable();
self.articlesFull = ko.observable();

$.ajax({
    url: 'data/categories.json',
    dataType: 'json',
    success: function(data) {
        self.categoriesTemp = ko.mapping.fromJS(data.categories)
        self.project.nowCategory(self.categoriesTemp()[0]);
    }
});

$.ajax({
    url: 'data/articlesTitle.json',
    dataType: 'json',
    success: function(data) {
        self.articlesTitle = ko.mapping.fromJS(data.articlesTitle)
        self.articlesTitle(self.articlesTitle().sort((a, b) => a.date() < b.date()));
        self.popular = self.articlesTitle().sort((a, b) => a.rating() > b.rating());
    }
});

var self = this;

self.project = {
    nowCategory: ko.observable()
}

// Activates knockout.js
$(document).ready(function() {
    ko.applyBindings(new AppViewModel());
})
