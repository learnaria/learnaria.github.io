;(function ( $, window, document, undefined ) {
 
var pluginName = "ik_sortable",
	defaults = {};
	 
	function Plugin( element, options ) {
		
		this.element = $(element);
		this.options = $.extend( {}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		
		this.init();
	}
	 
	Plugin.prototype.init = function () {
		
		var $elem, plugin, id, total;
		
		plugin = this;
		id = 'sortable_' + $('.ik_sortable').length;
		$elem = this.element.attr({
			'id': id
		})
		.wrap('<div class="ik_sortable"></div>').before(plugin.temp);
			
		total = $elem.children('li').length;
			
		plugin.items = $elem.children('li').each( function(i, el) {
			
			$(el).attr({
				'draggable': true,
				'id': id + '_' + i
			});
		})
		.on('dragstart', {'plugin': plugin}, plugin.onDragStart)
		.on('drop', {'plugin': plugin}, plugin.onDrop)
		.on('dragend', {'plugin': plugin}, plugin.onDragEnd)
		.on('dragenter', {'plugin': plugin}, plugin.onDragEnter)
		.on('dragover', {'plugin': plugin}, plugin.onDragOver)
		.on('dragleave', {'plugin': plugin}, plugin.onDragLeave);
		
		
	};
	
	// dragged item
	
	Plugin.prototype.onDragStart = function (event) {
		
		var plugin, $me;
				
		plugin = event.data.plugin;
		event = event.originalEvent || event;
		$me = $(event.currentTarget);
		
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData('text', $me.attr('id'));
		
	};
	
	Plugin.prototype.onDrop = function (event) {
		
		var source_id, $me;
		
		event = event.originalEvent || event;
		event.preventDefault();
		event.stopPropagation();
		$me = $(event.currentTarget);
		
		source_id = event.dataTransfer.getData('text');
		
		if(source_id != $me.attr('id')) {
			
			if ($me.hasClass('dropafter')) {
				$me.after($('#' + source_id));
			} else {
				$me.before($('#' + source_id));
			}
			
		}
		
	};
	
	Plugin.prototype.onDragEnd = function (event) {
		
		var plugin;
				
		plugin = event.data.plugin;
		plugin.element.find('.dragover').removeClass('dragover');
		
	};
	
	// drop target
	
	Plugin.prototype.onDragEnter = function (event) {
		
		$(event.currentTarget).addClass('dragover');
		
	};
	
	Plugin.prototype.onDragOver = function (event) {
		
		var $me, y, h;
		
		event = event.originalEvent || event;
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
		
		$me = $(event.currentTarget);
		
		y = event.pageY - $me.offset().top;
		h = $me.outerHeight();
		
		$me.toggleClass('dropafter', y > h / 2);
		
	};
	
	Plugin.prototype.onDragLeave = function (event) {
		
		$(event.currentTarget).removeClass('dragover');
		
	};
	
	Plugin.prototype.resetNumbering = function (plugin) {
		
		plugin.items = plugin.element.children('li');
		
		plugin.items.each( function(i, el) {
			var $me = $(el);
		});
		
	}

	$.fn[pluginName] = function ( options ) {
		
		return this.each(function () {
			
			if ( !$.data(this, pluginName )) {
				$.data( this, pluginName,
				new Plugin( this, options ));
			}
			
		});
		
	}
 
})( jQuery, window, document );