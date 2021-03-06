require('../ircparser.js');

describe("IrcParser", function() {
  it("is defined", function() {
    expect(IrcParser).toBeDefined();
  });

  describe(".parse", function() {
    beforeEach(function() {
      ircParser = new IrcParser();
    });

    it("is idempotent when there are no codes", function() {
      expect(ircParser.parse("test")).toEqual('test');
    });

    describe('style codes', function() {
      it("replaces normal code", function() {
        parsed = ircParser.parse("\x00test\x00");
        expect(parsed).toEqual('test');
      });

      it("replaces bold code", function() {
        parsed = ircParser.parse("\x02test\x02");
        expect(parsed).toEqual('<strong>test</strong>');
      });

      it("replaces italic code", function() {
        parsed = ircParser.parse("\x16test\x16");
        expect(parsed).toEqual('<em>test</em>');
      });

      it("replaces underline code", function() {
        parsed = ircParser.parse("\x1Ftest\x1F");
        expect(parsed).toEqual('<u>test</u>');
      });

      it("replaces multiple bold codes", function() {
        parsed = ircParser.parse("\x02test\x02 \x02me\x02");
        expect(parsed).toEqual('<strong>test</strong> <strong>me</strong>');
      });
    });

    describe('color codes', function() {
      it("replaces white code", function() {
        parsed = ircParser.parse("\x0300test\x03");
        expect(parsed).toEqual('<span class="irc-00">test</span>');
      });

      it("replaces 1-digit white code", function() {
        parsed = ircParser.parse("\x030test\x03");
        expect(parsed).toEqual('<span class="irc-00">test</span>');
      });

      it("replaces black code", function() {
        parsed = ircParser.parse("\x0301test\x03");
        expect(parsed).toEqual('<span class="irc-01">test</span>');
      });

      it("replaces navy code", function() {
        parsed = ircParser.parse("\x0302test\x03");
        expect(parsed).toEqual('<span class="irc-02">test</span>');
      });

      it("replaces green code", function() {
        parsed = ircParser.parse("\x0303test\x03");
        expect(parsed).toEqual('<span class="irc-03">test</span>');
      });

      it("replaces red code", function() {
        parsed = ircParser.parse("\x0304test\x03");
        expect(parsed).toEqual('<span class="irc-04">test</span>');
      });

      it("replaces brown code", function() {
        parsed = ircParser.parse("\x0305test\x03");
        expect(parsed).toEqual('<span class="irc-05">test</span>');
      });

      it("replaces purple code", function() {
        parsed = ircParser.parse("\x0306test\x03");
        expect(parsed).toEqual('<span class="irc-06">test</span>');
      });

      it("replaces olive code", function() {
        parsed = ircParser.parse("\x0307test\x03");
        expect(parsed).toEqual('<span class="irc-07">test</span>');
      });

      it("replaces yellow code", function() {
        parsed = ircParser.parse("\x0308test\x03");
        expect(parsed).toEqual('<span class="irc-08">test</span>');
      });

      it("replaces lightgreen code", function() {
        parsed = ircParser.parse("\x0309test\x03");
        expect(parsed).toEqual('<span class="irc-09">test</span>');
      });

      it("replaces teal code", function() {
        parsed = ircParser.parse("\x0310test\x03");
        expect(parsed).toEqual('<span class="irc-10">test</span>');
      });

      it("replaces cyan code", function() {
        parsed = ircParser.parse("\x0311test\x03");
        expect(parsed).toEqual('<span class="irc-11">test</span>');
      });

      it("replaces blue code", function() {
        parsed = ircParser.parse("\x0312test\x03");
        expect(parsed).toEqual('<span class="irc-12">test</span>');
      });

      it("replaces pink code", function() {
        parsed = ircParser.parse("\x0313test\x03");
        expect(parsed).toEqual('<span class="irc-13">test</span>');
      });

      it("replaces gray code", function() {
        parsed = ircParser.parse("\x0314test\x03");
        expect(parsed).toEqual('<span class="irc-14">test</span>');
      });

      it("replaces lightgray code", function() {
        parsed = ircParser.parse("\x0315test\x03");
        expect(parsed).toEqual('<span class="irc-15">test</span>');
      });

      it("replaces black, followed by white code", function() {
        parsed = ircParser.parse("\x0301te\x03\x0300st\x03");
        expect(parsed).toEqual('<span class="irc-01">te</span>' +
                               '<span class="irc-00">st</span>');
      });

      it("replaces concatenated colors", function() {
        parsed = ircParser.parse("\x0301te\x0300st\x03");
        expect(parsed).toEqual('<span class="irc-01">te</span>' +
                               '<span class="irc-00">st</span>');
      });

      it("replaces color codes from empty messages", function() {
        parsed = ircParser.parse("\x0303\x03");
        expect(parsed).toEqual('<span class="irc-03"></span>');
      });

      it("replaces when content is a number", function() {
        parsed = ircParser.parse("\x03062\x03");
        expect(parsed).toEqual('<span class="irc-06">2</span>');
      });

      it("handles when there is no stop code", function() {
        parsed = ircParser.parse("\x0306test");
        expect(parsed).toEqual('<span class="irc-06">test</span>');
      });
    });

    describe('background color codes', function() {
      it("erases color codes from empty messages", function() {
        parsed = ircParser.parse("\x0303,04\x03");
        expect(parsed).toEqual('<span class="irc-03">' +
                               '<span class="irc-bg04"></span></span>');
      });

      it("replaces green,bgred code", function() {
        parsed = ircParser.parse("\x0303,04test\x03");
        expect(parsed).toEqual('<span class="irc-03">' +
                               '<span class="irc-bg04">test</span></span>');
      });

      it("replaces 1-digit green with bgred code", function() {
        parsed = ircParser.parse("\x033,4test\x03");
        expect(parsed).toEqual('<span class="irc-03">' +
                               '<span class="irc-bg04">test</span></span>');
      });

      it("inherits backgrounds", function() {
        parsed = ircParser.parse("\x0301,03Hello \x0302to you\x03");
        expect(parsed).
          toEqual('<span class="irc-01"><span class="irc-bg03">Hello </span></span>' +
                  '<span class="irc-02"><span class="irc-bg03">to you</span></span>');
      });

      it("replaces concatenated backgrounds", function() {
        parsed = ircParser.parse("\x0301,03Hello \x0302,04to you\x03");
        expect(parsed).
          toEqual('<span class="irc-01"><span class="irc-bg03">Hello </span>' +
                  '</span><span class="irc-02"><span class="irc-bg04">to you' +
                  '</span></span>');
      });

      it("replaces concatenated 1-digit backgrounds", function() {
        parsed = ircParser.parse("\x031,3Hello \x032,4to you\x03");
        expect(parsed).
          toEqual('<span class="irc-01"><span class="irc-bg03">Hello </span>' +
                  '</span><span class="irc-02"><span class="irc-bg04">to you' +
                  '</span></span>');
      });
    });

    describe('customization', function() {
      it("customizes color replacement", function() {
        ircParser.colors.blue.replacement = '|b|$4|b|'
        parsed = ircParser.parse("\x0312test\x03");
        expect(parsed).toEqual('|b|test|b|');
      });

      it("customizes bgcolor replacement", function() {
        ircParser.bgcolors.green.replacement = '|g$1-$3|$4|g|'
        parsed = ircParser.parse("\x0312,03test\x03");
        expect(parsed).toEqual('<span class="irc-12">|g12-03|test|g|</span>');
      });

      it("customizes normal replacement", function() {
        ircParser.styles.normal.replacement = '|n$1|$2|n|'
        parsed = ircParser.parse("\x00test\x00");
        expect(parsed).toEqual('|n\x00|test|n|');
      });

      it("customizes bold replacement", function() {
        ircParser.styles.bold.replacement = '|b$1|$2|b|'
        parsed = ircParser.parse("\x02test\x02");
        expect(parsed).toEqual('|b\x02|test|b|');
      });

      it("customizes underline replacement", function() {
        ircParser.styles.underline.replacement = '|u$1|$2|u|'
        parsed = ircParser.parse("\x1ftest\x1f");
        expect(parsed).toEqual('|u\x1f|test|u|');
      });

      it("customizes italic replacement", function() {
        ircParser.styles.italic.replacement = '|i$1|$2|i|'
        parsed = ircParser.parse("\x16test\x16");
        expect(parsed).toEqual('|i\x16|test|i|');
      });
    });

    describe('reset code', function() {
      it("resets the color", function() {
        parsed = ircParser.parse("\x0301te\x0fst");
        expect(parsed).
          toEqual('<span class="irc-01">te</span>st');
      });

      it("resets the color before another", function() {
        parsed = ircParser.parse("\x0301te\x0fs\x0301t\x03");
        expect(parsed).
          toEqual('<span class="irc-01">te</span>s<span class="irc-01">t</span>');
      });

      it("resets the bgcolor", function() {
        parsed = ircParser.parse("\x0301,03te\x0fst");
        expect(parsed).
          toEqual('<span class="irc-01"><span class="irc-bg03">te</span>' +
                  '</span>st');
      });
    });
  });
});
