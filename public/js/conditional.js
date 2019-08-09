// $(function() {
//   $('input[name="type"]').on('click', function() {
//       if ($(this).val() == 'Experienced') {
//           $('#textboxes').show();
//       }
//       else {
//           $('#textboxes').hide();
//       }
//   });
// });

// $(function() {
//   $('input[name="type"]').on('click', function() {
//       if ($(this).val() == 'more') {
//           $('#hidden').show();
//       }
//       else {
//           $('#hidden').hide();
//       }
//   });
// });



// $(function(){
//     $('input[name="type"]').on('click', function() {
//         if(document.getElementById(more).checked){
//             $('#textboxes').show();
//         }
//         else{
//             $('#textboxes').hide();
//         }
//     });
// });

// $(function(){
//     if($('more'.on('click', function(){}))){
//         $('#textboxes').show();
//     }
//     else{
//         $('#textboxes').hide();
//     }
// });

// $(function() {
//     $('#more').on('click', function() {
//         $('#textboxes').toggle();//
//     });
//   });

$(function(){
    $('#textboxes').hide();

    $('input[name=hours]').on('click', function(){
        var selectedValue = $('input[name=hours]:checked').val();
        console.log(selectedValue);
        if(selectedValue == 'more'){
            $('#textboxes').show(1000);
        }
        else if(selectedValue != 'more'){
            $('#textboxes').hide(500);
        }
    });
});

$(function(){
    $('#keySafePin').hide();
    $('#keyHiddenPin').hide();
    $('input[name=access_type]').on('click', function(){
        var selectedValue = $('input[name=access_type]:checked').val();
        console.log(selectedValue);
        if(selectedValue == 'key_safe'){
            $('#keySafePin').show(1000);
        }
        else if(selectedValue != 'key_safe'){
            $('#keySafePin').hide(1000);
        }
        if(selectedValue == 'key_hidden'){
            $('#keyHiddenPin').show(1000);
        }
        else if(selectedValue != 'key_hidden'){
            $('#keyHiddenPin').hide(1000);
        }
    });
});