// function setActive() {
//   aObj = document.getElementById('sidenav').getElementsByTagName('a');
//   for(i=0;i<aObj.length;i++) {
//     console.log(aObj.length);
//     //console.log(aObj[i]);
//     if(document.location.href.indexOf(aObj[i].href)>=0) {
//       aObj[i].className='active';
//       console.log(document.location.href.indexOf(aObj[i].href))
//     }
//   }
// }

// window.onload = setActive;

$(function(){
  var current = location.pathname;
  console.log(current);
  $('#sidenav li a').each(function(){
      var $this = $(this);
      //console.log(this);
      // if the current path is like this link, make it active
      // if($this.attr('href').indexOf(current) !== -1){
      //   console.log($this.attr('href'))
      //     $this.addClass('active');
      // }
      if($this.attr('href') == current){
        //console.log($this.parent());
        var parentElem = $this.parent();
        if(parentElem.addClass('active')){
          console.log(true);
        }
      }
  })
})

$(function(){
  var current = location.pathname;
  console.log(current);
  $('#specnav li a').each(function(){
      var $this = $(this);
      if($this.attr('href') == current){
        //console.log($this.parent());
        var parentElem = $this.parent();
        if(parentElem.addClass('active-nav')){
          console.log(true);
        }
      }
  })
})