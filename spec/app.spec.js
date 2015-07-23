describe("get Ptexts function", function() {
  it("exists", function() {
    expect(getPtexts).toExist();
  });
});

describe("learn more div reveal function", function() {

  it("exists", function() {
    expect($('#go-button').click).toBeTruthy();
  });

  it("is called on an existing DOM element", function() {
    sandbox({
  id: 'my-id',
  class: 'my-class',
  myattr: 'my-attr'
})
    expect($("#my-id")).toBeInDOM();

  });

});

describe("new Ptext reveal function", function() {

  $('.createPtext').click(function() {
    $('.createtext').toggleClass('hidden');
  });

  // it("triggers click event", function() {
  //   var spyEvent = spyOnEvent('.createPtext', 'click')
  //     $('.createPtext').click()
  //     expect('click').toHaveBeenTriggeredOn('.createPtext')
  //     expect(spyEvent).toHaveBeenTriggered()
  // });
});

describe("new Ptext reveal function", function() {

  it("exists", function() {
    expect($('.createPtext').click).toBeTruthy();
  });
});
