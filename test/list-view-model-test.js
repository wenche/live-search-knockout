buster.testCase("List view model", {
	setUp : function () {
		this.viewModel = new ListView();
		this.server = this.useFakeServer();
		this.clock = this.useFakeTimers();
		this.server.respondWith(
			"GET", /\/search\?q=.*/, 
			[200, {"Content-Type" : "application/json"},
			'["Robocop", "Robocop II", "Robocop III"]']
		);
	},
	"Should hold a query" : function () {
		this.viewModel.query("Roboc");
		assert.equals(this.viewModel.query(), "Roboc");	
	},
	"Should start out with an empty suggestions array" : function () {
		assert.equals(this.viewModel.items().length, 0);
	},
	"Should populate suggestions array with movies" : function () {
		this.viewModel.populateSuggestionsArray(["Robocop", "Robocop II", "Robocop III"]);
		assert.equals(this.viewModel.items().length, 3);
	},
	"Should empty the suggestions array" : function () {
		this.viewModel.items([
			new ListItem("Robocop"),
			new ListItem("Robocop II")
		]);
		emptyObservableArray(this.viewModel.items);
		assert.equals(this.viewModel.items().length, 0);
	},
	"Does not call results immediately" : function () {
		this.server.respond();
		assert.equals(this.viewModel.items().length, 0);
	},
	"Calls results after 150ms" : function () {
		this.viewModel.query("Roboc");
		this.clock.tick(150);
		this.server.respond();
		assert.equals(this.viewModel.items().length, 3);
	},
	"Should not ask for suggestions if no query" : function () {
		this.viewModel.query("");
		this.clock.tick(150);
		this.server.respond();
		assert.equals(this.viewModel.items().length, 0);
	}

});