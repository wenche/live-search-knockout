buster.testCase("List item model", {
	"Should display movie title" : function () {
		var movieItem = new ListItem("Robocop");
		assert.equals(movieItem.item, "Robocop");
	}
});