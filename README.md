IrcParser.js - Parse and replace irc color and style codes
============

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

```javascript
  ircParser.styles.bold.replacement = "<span style='text-decoration:bold'>$1</span>";
  var result = ircParser.parse('This is \x02bold\x02');
  console.log(result);
  // => 'This is <span style='text-decoration:bold'>bold</span>'
```

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
