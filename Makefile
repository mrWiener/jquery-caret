#Will copy required js files to test directory.
js:
	mkdir -p test/html/js
	cat jquery.caret.js > test/html/js/jquery.caret.js

#Will only test on phantom.
phantom: js
	grunt mochaWebdriver:phantom

#Will only test on sauce.
sauce: js
	grunt mochaWebdriver:sauce

#Will test both on phantom and sauce.
full: js
	grunt test

#Alias for full.
test: full

#Will remove created files.
clean:
	rm -r test/html/js/jquery.caret.js

.PHONY: test phantom full js full