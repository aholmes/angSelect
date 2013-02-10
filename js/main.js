var angSelect = angular.module('angSelect', []);

angSelect.setOptions = function(options)
{
    angSelect.factory('Options', function()
    {
        return Options = {
            options: options
        };
    });
}

angSelect.factory('Data', function()
{
    return {
        selectedValue:'',
        selectedText:'',
        hideDropdown:true
    };
});

function AngSelectCtrl($scope, $element, Options, Data)
{
    $scope.options = Options.options;
    $scope.data = Data;

    $scope.setSelection = function(value, text)
    {
        $scope.data.selectedValue = value;
        $scope.data.selectedText  = text;
    };

    $scope.showHideDropdown = function(show)
    {
        $scope.data.hideDropdown = !show;
    };
}

angSelect.directive('asFocusout', function($parse)
{
    return function(scope, element, attrs)
    {
        var fn = $parse(attrs['efFocusout']);

        document.addEventListener('click', function(e)
        {
            // we know that the html is max 2 elements from the div that will trigger this
            var hardDepth = 2;
            var i = 0;
            var clickedElementIsChild = false;
            var scanElement = e.srcElement;

            do
            {
                if (i > hardDepth)
                    break;

                if (scanElement === element[0])
                {
                    clickedElementIsChild = true;
                    break;
                }

                i++;
            } while (scanElement = scanElement.parentElement);

            if (clickedElementIsChild === false)
            {
                scope.showHideDropdown(false, true);
            }

            scope.$apply(function()
            {
                fn(scope, {$event:e});
            });
        });
    }
});

angSelect.directive('ngFocus', function($parse)
{
    return function(scope, element, attrs)
    {
        var fn = $parse(attrs['ngFocus']);

        element.bind('focus', function(event)
        {
            scope.$apply(function()
            {
                fn(scope, {$event:event});
            });
        });
    }
});
