let delta, oldTime = 0;

function timer(currentTime) {
	delta = currentTime - oldTime;
	oldTime = currentTime;
	return delta;
}

var calcDistanceToMove = function (delta, speed) {
    //console.log("#delta = " + delta + " speed = " + speed);
    return (speed * delta) / 1000;
 };

export {timer,calcDistanceToMove,delta}