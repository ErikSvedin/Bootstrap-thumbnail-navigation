(function( $ ){

    $.fn.thumbnailNavigation = function() {

    element = $(this.selector)

    // Gets the list element and the total number of items in the list
    carousel = $(element + '.navigation-outer-wrap .thumbnail-navigation-list');
    firstItem = carousel.find('li:first-of-type');
    totalItems = carousel.find('li').length;

    // Calculates the itemwidth (assumes that all items are of euqal width)
    // and calculates the total items visible in the outer-wrap.
    itemWidth = firstItem.outerWidth() + 3;
    wrap = element.find('.navigation-outer-wrap');
    visibleItems = parseInt(wrap.width() / itemWidth);


    $(element + '.navigation.right').click(function(){

        $current = carousel.find('li.active');
        $current.removeClass('active');

        if(totalItems > visibleItems) {
            if (($current.index()+1) >= (visibleItems - 1) && $current.index() !== totalItems){
                offset = (($current.index()+2) - visibleItems)
                carousel.css({'margin-left': '-'+ itemWidth * offset + 'px'});
            }
        }

        if (($current.index() + 1) === totalItems){
            carousel.css({'margin-left': '0'});
        }

        $next = $current.next().length == 0 ? carousel.find('li').eq(0) : $current.next();
        $next
        .find('a[data-toggle="tab"]')
        .click()
    });


    $(element + '.navigation.left').click(function() {
        $current = carousel.find('li.active');
        $current.removeClass('active');

        if($current.prev().length == 0 || $current.prev()[0].nodeName != 'LI') {
            $prev = carousel.find('li').eq( carousel.find('li').length - 1)
            offset = (($prev.index()+1) - visibleItems);
            carousel.css({'margin-left': '-'+ itemWidth *offset+'px'});
        }
        else {
            $prev =  $current.prev();
            $offset = totalItems - ($prev.index()+1);
            var margin = parseInt($(carousel).css("margin-left"));
                if($offset >= visibleItems && margin < 0){carousel.css({'margin-left': '+=' + itemWidth});}
                if(margin > (-itemWidth) && margin < 0){carousel.css({'margin-left': '0px'});}
        }

        $prev
        .find('a[data-toggle="tab"]')
        .click()
    });

    }
})( jQuery );