// led attached to 17(BCM)
var GPIO = require('onoff').Gpio,
    button1 = new GPIO(4,'in');
    led1 = new GPIO(17, 'out');
    button2 = new GPIO(18, 'in');
    led2 = new GPIO(27, 'out');



//////////////////define the flash callback function///////////////////
function turnonoff() {

  if(state == 1) {
    // turn LED on
    led1.writeSync(1);
    state=0;
  } else {
    // turn LED off
    led1.writeSync(0);
    state=1;
  }
}

function flash() {

  if(state == 1) {
    // turn LED on
    led2.writeSync(1);
    state=0;
  } else {
    // turn LED off
    led2.writeSync(0);
    state=1;
    setInterval(function(){
    flash();
  }, 3000);
  }
}


// call flash in interval
button1.watch(turnonoff);
button2.watch(flash);



