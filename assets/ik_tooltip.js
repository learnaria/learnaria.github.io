;(function ( $, window, document, undefined ) {
 
	var pluginName = 'ik_tooltip',
		defaults = {
			'position': 'top'
		};
	 
	/**
	 * @constructs Plugin
	 * @param {Object} element - Current DOM element from selected collection.
	 * @param {Object} [options] - Configuration options.
	 * @param {number} [options.position='top'] - Tooltip location (currently supports only top).
	 */
	function Plugin( element, options ) {
		
		this._name = pluginName;
		this._defaults = defaults;
		this.element = $(element);
		this.options = $.extend( {}, defaults, options) ;
		
		this.init();
	}
	
	/** Initializes plugin. */
	Plugin.prototype.init = function () {
		
		var id, $elem, $tooltip, tip;
		
		id = 'tip' + $('.ik_tooltip').length; // generate unique id
		
		$elem = this.element;
		tip = $elem.attr('title'); // get text from element title attribute (required)
		
		if(tip.length > 0) {
			
			$tooltip = $('<span/>') // create tooltip
				.text(tip)
				.addClass('ik_tooltip')
				.attr({
					'id': id,
				});
			
			$elem
				.css('position', 'relative')
				.removeAttr('title') // remove title to prevent it from being read
				.after($tooltip)
				.on('mouseover', function(event) {
					
					var y, x;
					
					y = $elem.position().top - $tooltip.height() - 20;
					x = $elem.position().left;
					
					if(!$elem.is(':focus')) { // remove focus from a focused element
						$(':focus').blur();
					}
					
					$('.ik_tooltip').removeClass('mouseover'); // remove mouseover class from all tooltips
					
					if (event.type === 'mouseover') {
						$tooltip.addClass('mouseover'); // add mouseover class when mouse moves over the current element
					}
					
					$tooltip // position and show tooltip
						.css({
							'top': y, 
							'left': x
						})
						.addClass('visible');
				})
				.on('mouseout', function(event) {
					
					if (!$(event.currentTarget).is(':focus') ) { // hide tooltip if current element is not focused
						
						$tooltip
							.removeClass('visible mouseover');					
					}
										
				})
		}
	};
	
	$.fn[pluginName] = function ( options ) {
		
		return this.each(function () {
			
			if ( !$.data(this, pluginName )) {
				$.data( this, pluginName,
				new Plugin( this, options ));
			}
			
		});
		
	}
 
})( jQuery, window, document );