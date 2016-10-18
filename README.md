# angular-objectsort

Simple Sorting of Objects in Angular

Install: 

* Clone repo in your JS file or use a JavaScript dependency manager such as bower. 
* Include script below angular js and above your app initialization file.
	
	```<script src="js/angular-objectsort/objectsort.js"></script>```

* Add ObjectSort to your app's dependencies.
	```var app = angular.module('MySearch', ['ngSanitize','ObjectSort']);```

Use sort helpers within an Array.sort() function. For example:

```
$scope.records = $scope.records.sort(ObjectSort.compare('string','n', $scope.reverse));

```

Arg 1: 'string' or 'numeric' if the property you are sorting by is of that type. 
Arg 2: name or property you want to sort by OR function, which has an argument which is the object
		to sort. The function will transform the attributes prior to comparing. For numeric functions,
		return NaN if attribute is blank or empty. (NaN will always sort on bottom)
Arg 3: Boolean if sort should be reversed.  

As an example with a function: 

```
$scope.records = $scope.records.sort(ObjectSort.compare('numeric',
                    function(record) {
                        if (record.d == 0 && record.c ) { 
                            return record.c;
                        } else { 
                            return NaN 
                        }
                    }, 
                $scope.reverse));
```