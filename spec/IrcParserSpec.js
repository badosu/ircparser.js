require('../ircparser.js');

describe("IrcParser", function() {
  it("is defined", function() {
    expect(IrcParser).toBeDefined();
  });

  describe(".parse", function() {
    beforeEach(function() {
      ircParser = new IrcParser();
    });

    it("replaces bold code", function() {
      parsed = ircParser.parse("\x02test\x02");
      expect(parsed).toEqual('<strong>test</strong>');
    });

    it("replaces italic code", function() {
      parsed = ircParser.parse("\x16test\x16");
      expect(parsed).toEqual('<em>test</em>');
    });

    it("replaces normal code", function() {
      parsed = ircParser.parse("\x00test\x00");
      expect(parsed).toEqual('test');
    });

    it("replaces underline code", function() {
      parsed = ircParser.parse("\x1Ftest\x1F");
      expect(parsed).toEqual('<u>test</u>');
    });

    it("replaces white code", function() {
      parsed = ircParser.parse("\x0300test\x03");
      expect(parsed).toEqual('<span class="irc-white">test</span>');
    });

    it("replaces black code", function() {
      parsed = ircParser.parse("\x0301test\x03");
      expect(parsed).toEqual('<span class="irc-black">test</span>');
    });

    it("replaces navy code", function() {
      parsed = ircParser.parse("\x0302test\x03");
      expect(parsed).toEqual('<span class="irc-navy">test</span>');
    });

    it("replaces green code", function() {
      parsed = ircParser.parse("\x0303test\x03");
      expect(parsed).toEqual('<span class="irc-green">test</span>');
    });

    it("replaces red code", function() {
      parsed = ircParser.parse("\x0304test\x03");
      expect(parsed).toEqual('<span class="irc-red">test</span>');
    });

    it("replaces brown code", function() {
      parsed = ircParser.parse("\x0305test\x03");
      expect(parsed).toEqual('<span class="irc-brown">test</span>');
    });

    it("replaces purple code", function() {
      parsed = ircParser.parse("\x0306test\x03");
      expect(parsed).toEqual('<span class="irc-purple">test</span>');
    });

    it("replaces olive code", function() {
      parsed = ircParser.parse("\x0307test\x03");
      expect(parsed).toEqual('<span class="irc-olive">test</span>');
    });

    it("replaces yellow code", function() {
      parsed = ircParser.parse("\x0308test\x03");
      expect(parsed).toEqual('<span class="irc-yellow">test</span>');
    });

    it("replaces lightgreen code", function() {
      parsed = ircParser.parse("\x0309test\x03");
      expect(parsed).toEqual('<span class="irc-lightgreen">test</span>');
    });

    it("replaces teal code", function() {
      parsed = ircParser.parse("\x0310test\x03");
      expect(parsed).toEqual('<span class="irc-teal">test</span>');
    });

    it("replaces cyan code", function() {
      parsed = ircParser.parse("\x0311test\x03");
      expect(parsed).toEqual('<span class="irc-cyan">test</span>');
    });

    it("replaces blue code", function() {
      parsed = ircParser.parse("\x0312test\x03");
      expect(parsed).toEqual('<span class="irc-blue">test</span>');
    });

    it("replaces pink code", function() {
      parsed = ircParser.parse("\x0313test\x03");
      expect(parsed).toEqual('<span class="irc-pink">test</span>');
    });

    it("replaces gray code", function() {
      parsed = ircParser.parse("\x0314test\x03");
      expect(parsed).toEqual('<span class="irc-gray">test</span>');
    });

    it("replaces lightgray code", function() {
      parsed = ircParser.parse("\x0315test\x03");
      expect(parsed).toEqual('<span class="irc-lightgray">test</span>');
    });
  });
});
