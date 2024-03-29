// Exif orientation value to css transform mapping
// Does not include flipped orientations
var rotation = {
  1: 'rotate(0deg)',
  3: 'rotate(180deg)',
  6: 'rotate(90deg)',
  8: 'rotate(270deg)'
};

function _arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
var orientation = function(file, callback) {
  var fileReader = new FileReader();
  fileReader.onloadend = function() {
    var base64img =
      'data:' +
      file.type +
      ';base64,' +
      _arrayBufferToBase64(fileReader.result);
    var scanner = new DataView(fileReader.result);
    var idx = 0;
    var value = 1; // Non-rotated is the default
    if (fileReader.result.length < 2 || scanner.getUint16(idx) != 0xffd8) {
      // Not a JPEG
      if (callback) {
        callback(base64img, value);
      }
      return;
    }
    idx += 2;
    var maxBytes = scanner.byteLength;
    while (idx < maxBytes - 2) {
      var uint16 = scanner.getUint16(idx);
      idx += 2;
      switch (uint16) {
        case 0xffe1: // Start of EXIF
          var exifLength = scanner.getUint16(idx);
          maxBytes = exifLength - idx;
          idx += 2;
          break;
        case 0x0112: // Orientation tag
          // Read the value, its 6 bytes further out
          // See page 102 at the following URL
          // http://www.kodak.com/global/plugins/acrobat/en/service/digCam/exifStandard2.pdf
          value = scanner.getUint16(idx + 6, false);
          maxBytes = 0; // Stop scanning
          break;
      }
    }
    if (callback) {
      callback(base64img, value);
    }
  };
  fileReader.readAsArrayBuffer(file);
};
$(function() {
  $(document).ready(function() {
    // alert('Inside jQuery ready method');
    var file = $('#myPic')
      .imageBlob()
      .blob();
    // var file = $(this);
    // var file = $(this)[0].files[0];
    console.log(file);
    // var file = $this;
    if (file) {
      orientation(file, function(base64img, value) {
        $('#placeholder1').attr('src', base64img);
        // if ($('#myPic').addClass('myImage')) {
        //   console.log('hidden');
        // }

        console.log(rotation[value]);
        // var rotated = $('#myPic2').attr('src', base64img); rotate(0deg)
        var prof = $('#myPic');
        // var prof2 = $('#myPic');
        var mini = $('#mini');
        var mini2 = $('#mini2');
        if (rotation[value] === 'rotate(0deg)') {
          console.log('none');
          prof.css('transform', none);
          mini.css('transform', none);
          mini2.css('transform', none);
        } else {
          console.log('more than 0');
          prof.css('transform', rotation[value]);
          mini.css('transform', rotation[value]);
          mini.css('transform', rotation[value]);
        }
      });
    }
  });
  //   $('#file').change(function() {
  //     var file = $(this)[0].files[0];
  //     // var file = $this;
  //     if (file) {
  //       orientation(file, function(base64img, value) {
  //         $('#placeholder1').attr('src', base64img);
  //         console.log(rotation[value]);
  //         var rotated = $('#placeholder2').attr('src', base64img);
  //         if (value) {
  //           rotated.css('transform', rotation[value]);
  //         }
  //       });
  //     }
  //   });
});
