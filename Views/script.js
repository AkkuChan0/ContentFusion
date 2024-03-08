

function AppViewModel() {

}

var self = this;
 
self.project = {
    nowCategory: ko.observable()
}

self.categoriesTemp = ko.observable();
self.articlesTitle = ko.observable();
self.articlesFull = ko.observable();

$.ajax({
    url: 'data/articlesTitle.json',
    dataType: 'json',
    async: false,
    success: function(data) {
        self.articlesTitle = ko.mapping.fromJS(data.articlesTitle)
        self.articlesTitle(self.articlesTitle().sort((a, b) => a.date() < b.date()));
        self.popular = self.articlesTitle().sort((a, b) => a.rating() > b.rating());
    }
});

$.ajax({
    url: 'data/categories.json',
    dataType: 'json',
    async: false,
    success: function(data) {
        self.categoriesTemp = ko.mapping.fromJS(data.categories);
        self.project.nowCategory(self.categoriesTemp()[0].name());
    }
});

// Activates knockout.js
$(document).ready(function() {
    ko.applyBindings(new AppViewModel());
})
