perfBar.init({
    budget: { 
    	'loadTime': {
        	max: 1500
      	},
      	'latency': {
      		max: 50
      	},
      	'FirstPaint': {
			max: 100
      	},
      	'redirectCount': {
	        max: 1
      	},
      	'numReqs': {
	      	max: 3
      	},
      	'globalJS': {
	        min: 2,
        	max: 5
      	},
      	'cssCount': {
	      	max: 2
      	},
      	'jsCount': {
      		max: 2
      	},
      	'imgCount': {
	      	max: 11
      	},
      	'inlineCSSCount': {
	      	max: 2
      	},
      	'inlineJSCount': {
	      	max: 2
      	}
    }
});