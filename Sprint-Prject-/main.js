var seconds = 3000;

function placeholderText(field, text, i) {
  if (i < (text.length)) {
    $(field).attr("placeholder", text.substring(0, i+1));
    i++;
    setTimeout(function() {
      placeholderText(field, text, i)
    }, 50);
  }
}

function init(){
  $("input").each(function() {
    let placeholder = $(this).attr("placeholder");
    placeholderText($(this), placeholder, 0);

  });

  setInterval(function() {
    init()
  }, seconds);
}

init();


var x = document.getElementById('fname');

function blurFunction(){
  x.value = x.value.toUpperCase();
}


$('#subBtn').click(function(){
  alert('Our Team will be in touch shortly!').reset();
})



