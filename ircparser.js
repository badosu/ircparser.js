IrcParser = function() {
  var ircParser = {};
  var regex = /\x03(\d?\d)(,(\d?\d))?([^\x03]*)((\x03((\d\d?)(,\d\d?)?)?)|(\x0f))/;

  ircParser.colors = {
    white:      { code: '00' },
    black:      { code: '01' },
    navy:       { code: '02' },
    green:      { code: '03' },
    red:        { code: '04' },
    brown:      { code: '05' },
    purple:     { code: '06' },
    olive:      { code: '07' },
    yellow:     { code: '08' },
    lightgreen: { code: '09' },
    teal:       { code: '10' },
    cyan:       { code: '11' },
    blue:       { code: '12' },
    pink:       { code: '13' },
    gray:       { code: '14' },
    lightgray:  { code: '15' }
  };

  ircParser.styles = {
    normal: {
      code: '\x00',
      replacement: '$2',
      regexp: /(\x00)([^\x00]*)\x00/
    },
    bold: {
      code: '\x02',
      replacement: '<strong>$2</strong>',
      regexp: /(\x02)([^\x02]*)\x02/
    },
    italic: {
      code: '\x16',
      replacement: '<em>$2</em>',
      regexp: /(\x16)([^\x16]*)\x16/
    },
    underline: {
      code: '\x1f',
      replacement: '<u>$2</u>',
      regexp: /(\x1f)([^\x1f]*)\x1f/
    }
  };

  ircParser.bgcolors = {};
  ircParser.colorNames = {};

  ircParser.parse = function(irc) {
    irc = this.replaceStyles(irc);
    irc = this.replaceColors(irc);
    return irc;
  };

  ircParser.replaceStyles = function(irc) {
    for (var tokenName in this.styles) {
      var token = this.styles[tokenName];
      irc = irc.replace(token.regexp, token.replacement);
    }

    return irc;
  };

  ircParser.replaceColors = function(irc) {
    var matches = irc.match(regex);
    while(matches) {
      var fgCode = ("0" + matches[1]).slice(-2);
      var isbg = matches[2];
      var isnstop = matches[7];
      var nextfg = matches[8];
      var nextbg = matches[9];

      var color = this.colors[this.colorNames[fgCode]];
      var replacement = color.replacement;

      if (isbg) {
        var bgCode = ("0" + matches[3]).slice(-2);
        var bgColor = this.bgcolors[this.colorNames[bgCode]];

        replacement = '\x03' + fgCode + bgColor.replacement + '\x03';

        if (matches[3].length == 1) {
          replacement = replacement.replace("$3", "0$3");
        }

        if (isnstop) {
          replacement += nextfg;
          replacement += nextbg ? nextbg : ',' + bgCode;
        }
      }
      else if (isnstop) {
        replacement = color.replacement + '\x03' + nextfg;

        if (nextbg) replacement += nextbg;
      }

      if (matches[1].length == 1) {
        replacement = replacement.replace("$1", "0$1");
      }

      irc = irc.replace(regex, replacement);

      matches = irc.match(regex);
    }

    if (irc.match(/\x03\d/g)) {
      irc = this.parse(irc + "\x03");
    }

    return irc;
  };

  ircParser.init = function() {
    for (var colorName in this.colors) {
      var color = this.colors[colorName];

      color.replacement = '<span class="irc-$1">$4</span>';

      this.colorNames[color.code] = colorName;
      this.bgcolors[colorName] = {
        replacement: '<span class="irc-bg$3">$4</span>'
      };
    }
  };

  ircParser.init();

  return ircParser;
};
