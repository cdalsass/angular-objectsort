var objectSort = angular.module('ObjectSort', []);

/* Simple Object Sorting Routine 

	Install: 

	- Clone repo in your JS file or use a JavaScript dependency manager such as bower. 
	- Include script below angular js and above your app initialization file.
	- Add ObjectSort to your app's dependencies.

	Use sort helpers within an Array.sort() function.

	Arg 1: 'string' or 'numeric' if the property you are sorting by is of that type. 
	Arg 2: name or property you want to sort by OR function, which has an argument which is the object
			to sort. The function will transform the attributes prior to comparing. For numeric functions,
			return NaN if attribute is blank or empty. (NaN will always sort on bottom)
	Arg 3: Boolean if sort should be reversed.  

	$scope.records = $scope.records.sort(ObjectSort.compare('string','n', $scope.reverse));

	As an example with a function: 

	$scope.records = $scope.records.sort(ObjectSort.compare('numeric',
                        function(record) {
                            if (record.d == 0 && record.c ) { 
                                return record.c;
                            } else { 
                                return NaN 
                            }
                        }, 
                    $scope.reverse));

*/

 
objectSort.service('ObjectSort', [ function() {
     
    var Funcs = {

        compare: function(type, prop, reverse) {
            if (type == 'string') {
                return function (a,b) {
                    if (reverse) {
                        return a[prop].localeCompare(bval);   
                    } else {
                        return b[prop].localeCompare(a[prop]);
                    }
                }
            } else if (type == 'numeric') {

                return function (a,b) {

                    var aval = a[prop];
                    var bval = b[prop];

                    if (typeof(prop) === 'function') {
                        // debugger; 
                        aval = prop(a);
                        bval = prop(b);
                    }

                    /* handle NAN, moving them to bottom of the list regardless of order of sorting. */
                    if (isNaN(aval) === true && isNaN(bval) === false) {
                        return 1; 
                    } else if (isNaN(aval) === false && isNaN(bval) === true) {
                        return -1;  
                    }  

                    if (aval < bval) {
                        if (reverse) {
                            return -1;                    
                        } 
                        return 1; 
                    }
                    if (aval > bval) {
                        if (reverse) {
                        return 1;                    
                    } 
                        return -1; 
                    }
                
                    return 0;
                }
            }
        }
    };

    return Funcs;
}]);