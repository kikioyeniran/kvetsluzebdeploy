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
            $('#textboxes').hide();
        }
    });
});

$(function(){
    $('#key_safe_pin').hide();
    $('#key_hidden_pin').hide();
    $('input[name=access_type]').on('click', function(){
        var selectedValue = $('input[name=access_type]:checked').val();
        console.log(selectedValue);
        if(selectedValue == 'key_safe'){
            $('#key_safe_pin').show(1000);
        }
        else if(selectedValue != 'key_safe'){
            $('#key_safe_pin').hide(1000);
        }
        if(selectedValue == 'key_hidden'){
            $('#key_hidden_pin').show(1000);
        }
        else if(selectedValue != 'key_hidden'){
            $('#key_hidden_pin').hide(1000);
        }
    });
});