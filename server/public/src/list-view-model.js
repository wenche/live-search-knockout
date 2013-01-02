'use strict';
function emptyObservableArray(array) {
	array.removeAll();
}

function ListView() {
	var self = this;
	self.query = ko.observable();
	self.items = ko.observableArray();

	self.getResults = ko.computed(function () {
		var query = self.query() || "";
		console.log("Query: " + query);
		emptyObservableArray(self.items);
		if (query !== "") {
			$.getJSON('/search?q=' + query, function (data) {
				self.populateSuggestionsArray(data);
			});
		}
	}).extend({ throttle: 150});

	self.populateSuggestionsArray = function (movies) {
		ko.utils.arrayMap( movies, function (movie) {
			self.items.push(new ListItem(movie));
		});
	};
}

ko.applyBindings(new ListView());
