$(".element").each(function () {
  const $this = $(this);
  $this.typed({
    strings: $this.attr("data-elements").split(","),
    typeSpeed: 100,
    backDelay: 3000,
  });
});
