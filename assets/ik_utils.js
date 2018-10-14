var ik_utils = ik_utils || {};

ik_utils.keys =  {
	'tab': 9,
	'enter': 13,
	'esc': 27,
	'space': 32,
	'left': 37,
	'up': 38,
	'right': 39,
	'down': 40,
	'end': 35,
	'home': 36
}
ik_utils.getTransitionEventName = function(){
	var $elem, events, t, name;

	$elem = $('<div/>');
	events = {
		'transition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'MozTransition': 'transitionend',
		'WebkitTransition': 'webkitTransitionEnd'
	};

	for (t in events){
		if ($elem.css(t) !== undefined){
			name = events[t];
		}
	}

	return name;
}
