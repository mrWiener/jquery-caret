js:
	mkdir -p test/html/js
	cat jquery.caret.js > test/html/js/jquery.caret.js

phantom: js
	grunt mochaWebdriver:phantom

sauce: js
	grunt mochaWebdriver:sauce

full: js
	grunt test

clean:
	rm -r test/html/js

.PHONY: test phantom full js