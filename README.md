IrcParser.js - Parse and replace irc color and style codes
============

[![Build Status](https://travis-ci.org/badosu/ircparser.js.png)](https://travis-ci.org/badosu/ircparser.js)

IrcParser is a dead simple library for parsing and replacing irc color and
style codes.

The default parser transforms the irc message into html. However you can
customize it's replacement strings.

Usage
-----

```javascript
  var ircParser = new IrcParser();
  var result = ircParser.parse('This is \x02bold\x02');
  console.log(result);
  // => 'This is <strong>bold</strong>'
```

Customizing
-----------

Use replacement strings.

- styles - $1: style code, $2: content
- colors - $1: color code, $3: bg code, $4: content

Example:

```javascript
  ircParser.styles.bold.replacement = "<b>$2</b>";
  var result = ircParser.parse('This is \x02bold\x02');
  console.log(result);
  // => 'This is <b>bold</b>'
```

Use the file `sandbox.html` to tinker with customizations.

Testing
-------

You must have jasmine-node installed, it is available as a npm package.

Just run: `jasmine-node spec`.

Contributing
------------

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Verify that the test suite passes (`jasmine-node spec`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create new Pull Request

License
-------

See LICENSE

Authors
-------

See AUTHORS
