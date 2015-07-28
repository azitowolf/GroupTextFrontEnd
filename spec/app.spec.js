describe("FRONT END JAVASCRIPT TESTS", function(){

  describe("get Ptexts function", function() {

    beforeEach(function() {
      setUpHTMLFixture();
    });

    it("exists", function() {
      expect(getPtexts).toExist();
    });
  });

  describe("Learn More Button", function(){

    beforeEach(function() {
      setUpHTMLFixture();
    });

    it("Exists", function(){
      expect($('#learnmore-btn')).toExist();
    });

    it("Invokes the Clickhandler", function(){
      var spyEvent = spyOnEvent('#learnmore-btn', 'click')
        $('#learnmore-btn').click()
        expect('click').toHaveBeenTriggeredOn('#learnmore-btn')
        expect(spyEvent).toHaveBeenTriggered()
    })

    it("Reveals the Div", function(){
        expect($('.learnmore')).toHaveClass('hidden');
        $('#learnmore-btn').click()
        expect($('.learnmore')).toHaveText($('.learnmore p').html());
    })

  });

  describe("new Ptext Button", function() {

    beforeEach(function() {
      setUpHTMLFixture();
    });

    it('Exists in the DOM', function(){
      expect($('.createPtext')).toBeInDOM()
    })

  });

})
