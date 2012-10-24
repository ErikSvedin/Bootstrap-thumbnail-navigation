(function( $ ){


    $.thumbnailNavigation = function(element) {

        var element = element;

        $(element).children('.navigation.right').click(function(){
            carousel = $(element).children('.navigation-outer-wrap').children('.thumbnail-navigation-list');
            firstItem = carousel.find('li:first-of-type');
            totalItems = carousel.find('li').length;
            itemWidth = firstItem.outerWidth();
            wrap = $(element).children('.navigation-outer-wrap');
            visibleItems = parseInt(wrap.width() / itemWidth);


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

        $(element).children('.navigation.left').click(function() {
            carousel = $(element).children('.navigation-outer-wrap').children('.thumbnail-navigation-list');
            firstItem = carousel.find('li:first-of-type');
            totalItems = carousel.find('li').length;
            itemWidth = firstItem.outerWidth();
            wrap = $(element).children('.navigation-outer-wrap');
            visibleItems = parseInt(wrap.width() / itemWidth);

            $current = carousel.find('li.active');
            $current.removeClass('active');

            if($current.prev().length == 0 || $current.prev()[0].nodeName != 'LI') {
                $prev = carousel.children('li').eq( carousel.children('li').length - 1)
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
        $.fn.thumbnailNavigation = function() {
            return this.each(function() {
                if (undefined == $(this).data('thumbnailNavigation')) {
                    var plugin = new $.thumbnailNavigation(this);
                    $(this).data('thumbnailNavigation', plugin);
                }
            });

        }


})( jQuery );