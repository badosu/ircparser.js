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

1. For colors:   $1 is color code, $2 is content
2. For bgcolors: $1 is bgcolor code, $2 is (fg)color code, $3 is the content
3. For styles:   $1 is the content

Example:

```javascript
  ircParser.styles.bold.replacement = "<span style='text-decoration:bold'>$1</span>";
  var result = ircParser.parse('This is \x02bold\x02');
  console.log(result);
  // => 'This is <span style='text-decoration:bold'>bold</span>'
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
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

License
-------

See LICENSE

Authors
-------

See AUTHORS
