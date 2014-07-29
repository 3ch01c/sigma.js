/** This plugin highlights a node's neighborhood when it is hovered. */
;(function() {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  sigma.utils.pkg('sigma.plugins');
  
  sigma.prototype.highlightNeighbors = function() {
	var s = this;
	// highlight node neighbors when a node is hovered
	s.bind('overNode', function(e) {
		var defaultColor = '#eee';
		var id = e.data.node.id,
			toKeep = s.graph.neighbors(id);
		toKeep[id] = e.data.node;
		
		// dim nodes that aren't part of neighborhood
		s.graph.nodes().forEach(function(n) {
			// save original color
			if (toKeep[n.id]) { n.color = n.originalColor; }
			else { n.color = defaultColor; }
		});
		
		// dim edges that aren't part of neighborhood
		s.graph.edges().forEach(function(e) {
			// save original color
			if (toKeep[e.source] && toKeep[e.target]) { e.color = e.originalColor; }
			else { e.color = defaultColor; }
		});
		
		// refresh graph
		s.refresh();
	});
	
	// color graph elements back to original colors when node is no longer hovered
	s.bind('outNode', function() {
		s.graph.nodes().forEach(function(n) { n.color = n.originalColor; });
		s.graph.edges().forEach(function(e) { e.color = e.originalColor; });
		
		//refresh graph
		s.refresh();
	});
  }
}).call(window);