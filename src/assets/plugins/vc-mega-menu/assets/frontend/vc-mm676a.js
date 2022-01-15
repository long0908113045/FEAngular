/**
 * Created by truongsa on 12/8/15.
 */
/*
function my_debug( text ){
    jQuery( '#my-debug', jQuery( 'body' ) ).remove();

    jQuery( 'body') .append( '<div id="my-debug" style="position: fixed; z-index: 9999999999999; display: block; top: 0px; padding: 3px; border: 1px solid red; background: #ffffff;">'+text+'</div>' );

}
*/

var vc_last_touch = 0;

(function ( $ ) {

    $.fn.vc_mega = function( options ) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            max_width: 1170
        }, options );

        var mega =  function( $menu ){

            if ( $menu.hasClass( 'vc-nav-on-mobile' ) ){
                return $menu;
            }

            var that = this;
            that.$menu = $menu;
            that.menu_type = $menu.data('menu-type');
            that.tab_layout = $menu.data('tab-layout');

            that.get_width = function(){
                var w = that.$menu.parent().outerWidth();
                //console.log( w );
                if ( w > $( window).width() ){
                    w = $( window).width();
                }

                if ( w > settings.max_width ) {
                    w = settings.max_width;
                }

                return w;
            };

            that.set_item_width = function( $item, width_px ){

            };

            that.layout_full_width =  function( $item, settings ){
                // $( '.vc-mm-mega-cont', $item).width( that.get_width() );
            };

            that.layout_center =  function( $item, settings ){
                $( '.vc-mm-mega-cont', $item ).css( { left: ( - ( ( settings.width - $item.width() ) / 2 )   ) + 'px' } )
            };

            that.layout_left_edge_item = function( $item, settings ){
                var menu_offset =  that.$menu.offset();
                var item_offset =  $item.offset();
                var right_m_offset = menu_offset.left +  that.$menu.width();
                var left = 0 ;

                if ( item_offset.left + settings.width > right_m_offset ){
                    left = ( item_offset.left+settings.width ) - right_m_offset;

                }

                $( '.vc-mm-mega-cont', $item ).css( { left: ( - left  ) + 'px' } );
            };


            that.layout_right_edge_item = function( $item, settings ){
                var menu_offset     =  that.$menu.offset();
                var item_offset     =  $item.offset();
                var right_i_offset  =  settings.width - ( item_offset.left + $item.width() );

                if ( right_i_offset > menu_offset.left ){
                    right_i_offset += menu_offset.left;
                }

                var right = right_i_offset > 0 ? right_i_offset : 0;

                $( '.vc-mm-mega-cont', $item ).css( { right: ( - right  ) + 'px' } );

            };



            that.setup_layout = function( $item, settings ){

                switch (settings.layout) {
                    case 'left_edge_item' :
                        that.layout_left_edge_item($item, settings);
                        break;
                    case 'right_edge_item' :
                        that.layout_right_edge_item($item, settings);
                        break;
                    case 'center' :
                        that.layout_center($item, settings);
                        break;
                    default :
                        that.layout_full_width($item, settings);
                }

            };

            that.setup_vertical_layout = function(  $item, settings ){
                if ( that.tab_layout !== 'full' ) {
                    return;
                }
                var mh = that.$menu.height();
                if ( $( '> .vc-mm-mega-cont', $item).length > 0 ){
                    var h = $( '> .vc-mm-mega-cont', $item).height();
                    $item.addClass( 'vc-mm-layout-full' );
                    $( '> .vc-mm-mega-cont > .vc-mm-mega-cont-inner', $item ).css('min-height', mh+'px' );
                }

            };


            that.init = function(){

                $('li.vc-mm-mega', $menu).each(function () {
                    var item_settings = $(this).data('mm-settings');

                    item_settings = $.extend(true, {layout: 'full', width: 0}, item_settings);

                    item_settings.width = parseFloat(item_settings.width);

                    if ( isNaN( item_settings.width ) || item_settings.width <= 0) {
                        if ( that.menu_type == 'h' )  {
                            item_settings.width = that.get_width();
                        } else {
                            item_settings.width = 0;
                        }
                    }

                    if ( that.menu_type !== 'h' ) {
                        if (  item_settings.width > 0 ) {
                            console.log( 'this' );
                            $('.vc-mm-mega-cont', $(this) ).width( item_settings.width );
                        }

                    } else {
                        $('.vc-mm-mega-cont', $(this) ).width( item_settings.width );
                    }


                    if ( that.menu_type == 'h' ) {
                        that.setup_layout($(this), item_settings);
                    } else {
                        that.setup_vertical_layout( $(this), item_settings );
                    }

                });
                if ( that.menu_type == 'h' ) {
                    var t = $('.vc-menu-item.vc-d-0', that.$menu).eq(0).outerHeight();
                    $('.vc-menu-item.vc-d-0 > .sub-menu, .vc-menu-item.vc-d-0 > .vc-mm-mega-cont', that.$menu).css('top', t + 'px');
                }

            };

            that.init();


            $( '.vc-mm-mobile-toggle').on( 'click', function() {
                if ( that.$menu.hasClass( 'vc-mm-mobile-mod' ) ){
                    that.$menu.removeClass( 'vc-mm-mobile-mod' );
                    $( 'body').removeClass( 'vc-body-mobile' );
                    $( 'body').trigger( 'vc_mm_view_changed' );
                } else {
                    that.$menu.addClass( 'vc-mm-mobile-mod' );
                    $( 'body').addClass( 'vc-body-mobile' );
                    $( 'body').trigger( 'vc_mm_view_changed' );
                }
            } );

           // $( '.vc-mm-mobile-toggle').trigger('click' );

            $( window).resize( function(){
                that.init();
                $( '.vc-mobile-hover', that.$menu ).removeClass( 'vc-mobile-hover' );

                that.$menu.removeClass('vc-mm-mobile-mod');
                $( 'body').removeClass( 'vc-body-mobile' );
                $( 'body').trigger( 'vc_mm_view_changed' );

                $( '.vc-menu-item.vc-d-0', that.$menu).removeClass( 'vc-hover' );

            } );

            setTimeout( function(){
                $( window).trigger('resize');
            }, 300 );


            $( '.vc-menu-item.vc-d-0', that.$menu ).each(  function(){
                var _i =  $( this );
                var title = $( '> a.nav-link', _i ).html();
                title = '<h3 class="vc-mm-child-title by-js"><a class="vc-back" href="#"></a><span class="js-title">'+title+'</span><a class="vc-close" href="#"></a></h3>';
                var $title = $( title );
                var l ;

                if ( ( l = $( '>.vc-mm-mega-cont', _i).length ) > 0 ){
                    $( '>.vc-mm-mega-cont', _i).prepend( $title );
                    $( '> a.nav-link', _i).append( '<span class="vc-mobile-tap"></span>' );
                } else if ( ( l = $ ( '> .sub-menu', _i).length ) > 0 ){
                    $ ( '> .sub-menu', _i ).prepend( $title );

                    $( '> a.nav-link', _i).append( '<span class="vc-mobile-tap"></span>' );
                }

                _i.on( 'click', '.vc-mobile-tap', function( e ){
                    e.preventDefault();
                    $( '.vc-menu-item.vc-d-0', that.$menu).removeClass( 'vc-hover' );
                    _i.toggleClass( 'vc-hover' );
                } );


                // When click back btn
                $title.on( 'click', function(){
                    _i.removeClass( 'vc-hover' );
                    return false;
                } );

                $( '.vc-close', $title).on( 'click', function(){
                    that.$menu.removeClass( 'vc-mm-mobile-mod' );
                    $( 'body').removeClass( 'vc-body-mobile' );
                    $( 'body').trigger( 'vc_mm_view_changed' );
                    return false;
                } );

            } );


            $( 'body').on( 'vc_mm_view_changed', function(){

                if ( $( 'body').hasClass( 'vc-body-mobile' ) ) {
                    var sh = that.$menu.prop('scrollHeight');
                    that.$menu.css( { 'height' : $( window).height() + 'px', 'display': 'block' } );
                    $( '>.vc-menu-item > .vc-mm-mega-cont', that.$menu).css( 'min-height', sh+'px' );
                    //$( '>.vc-menu-item > .vc-mm-mega-cont > .vc-mm-mega-cont-inner', that.$menu).css( 'min-height', sh+'px' );
                    $( '>.vc-menu-item > .sub-menu', that.$menu).css( 'min-height', sh+'px' );
                    $( '>.vc-menu-item .vc-mm-tab-cont', that.$menu).css( 'min-height', sh+'px' );

                } else {
                    $( '>.vc-menu-item > .vc-mm-mega-cont', that.$menu).css( 'min-height', 'initial' );
                   // $( '>.vc-menu-item > .vc-mm-mega-cont > .vc-mm-mega-cont-inner', that.$menu).css( 'min-height', 'initial' );
                    $( '>.vc-menu-item > .sub-menu', that.$menu).css( 'min-height', 'initial' );
                    $( '>.vc-menu-item .vc-mm-tab-cont', that.$menu).css( 'min-height', 'initial' );
                    that.$menu.removeAttr( 'style' );

                }

            } );


           // that.mobileNav();

        };

        // Greenify the collection based on the settings variable.
        //return new mega( this );

        return this.each(function() {
            new mega( $( this ) );
        });

    };

}( jQuery ));



jQuery( document ).ready( function( $ ){

    $( '.vc-mm-menu').vc_mega();

    // Drop down mega
    $( '.vc-mm-drop-down').each( function(){
        var dr = $( this );
        $( '.vc-drop-down-btn', dr ).on( 'click', function(){
            if ( $( this).hasClass( 'vc-btn-active' ) ) {
                $( this ).removeClass( 'vc-btn-active' );
                $( '.vc-drop-down-wrapper', dr ).removeClass( 'vc-dr-active' );
            } else {
                $( this ).addClass( 'vc-btn-active' );
                $( '.vc-drop-down-wrapper', dr ).addClass( 'vc-dr-active' );
            }

            return false;
        } );
    } );

    $( 'body').on( 'vc_mm_view_changed', function(){
        if ( $( this).hasClass( 'vc-body-mobile' ) ) {
            $( '.vc-drop-down-wrapper' ).addClass( 'vc-dr-active' );
        } else {
            $( '.vc-drop-down-wrapper' ).removeClass( 'vc-dr-active' );
        }

    } );


    // Tabs
    var set_nav_tabs_height = function( tabs ){
        var nav =  $( '.vc-mm-tabs-nav', tabs );
        nav.removeAttr('style');
        var max_height = 0;
        $( '.vc-mm-tabs-c-wrap .vc-mm-tab-cont', tabs).each( function(){
            var _h = $( this).height();
            if ( max_height < _h ){
                max_height = _h;
            }
        } );

        nav.css( 'min-height', max_height+'px' );
    };

    $( '.vc-mm-tabs').each( function(){
        var tabs =  $( this );
        var nav =  $( '.vc-mm-tabs-nav', tabs );
        if ( tabs.hasClass( 'tabs-vertical' ) ){
            set_nav_tabs_height( tabs );
        }

        $( 'li', nav ).each( function( index ){
            if ( ! $( this).hasClass( 'vc-tab-divider' ) ){
                $( this ).on( 'hover click', function( event ){
                    if ( $( 'body').hasClass('vc-body-mobile') ){
                        if ( event.type === 'click' ){
                            $( 'li', nav).removeClass( 'vc-tab-mobile-active' );
                            $( '.vc-mm-tabs-c-wrap .vc-mm-tab-cont', tabs).removeClass('vc-tab-mobile-active');
                            $( '.vc-mm-tabs-c-wrap .vc-mm-tab-cont', tabs).eq( index).addClass('vc-tab-mobile-active');
                            return false;
                        } else {
                            return false;
                        }
                    }

                    $( 'li', nav).removeClass( 'vc-tab-active' );
                    $( this).addClass( 'vc-tab-active' );
                    $( '.vc-mm-tabs-c-wrap .vc-mm-tab-cont', tabs).removeClass('vc-tab-active');
                    $( '.vc-mm-tabs-c-wrap .vc-mm-tab-cont', tabs).eq( index).addClass('vc-tab-active');
                    return false;
                });
            }

        } );

        $( 'li', nav).eq(0).trigger( 'click' );

        // when click to tab title

        $( '.vc-mobile-tab-title', tabs).on( 'click', function(){
            $( '.vc-mm-tabs-c-wrap .vc-mm-tab-cont', tabs).removeClass('vc-tab-mobile-active');
            return false;
        } );


    } );

    $( window ).resize( function(){
        $( '.vc-mm-tabs').each( function() {
            if ( $(this).hasClass( 'tabs-vertical' ) ) {
                set_nav_tabs_height($(this));
            }
        });

    } );


} );



jQuery( document).ready(function( $ ){

    $(".vc-mm-menu-h.vc-sticky").sticky( {
        responsiveWidth: false,
        wrapperClassName: 'vc-mm-h-sticky-wrapper',
        getWidthFrom: 'body',
    });

    $(".vc-mm-menu-h.vc-sticky").on('sticky-update', function() {
        $( window).trigger( 'resize' );
    });

    $(".vc-mm-menu-h.vc-sticky").on('sticky-start', function() {
        $( window).trigger( 'resize' );
    });

    $(".vc-mm-menu-h.vc-sticky").on('sticky-end', function() {
        $( window).trigger( 'resize' );
    });

    $( '.main-navigation').addClass('remove-main-navigation-plz').removeClass( 'main-navigation' );


    /**
     * Update cart number item
     * @param $context
     */
    function vc_mm_update_cart_noti( $context ){
        if (  typeof  $context == "undefined" ) {
            var data =  JSON.parse(  sessionStorage.getItem( wc_cart_fragments_params.fragment_name )  );
            if (  typeof data !== "undefined" ){
                $context = data['div.widget_shopping_cart_content'];
            }
        }

        if (  typeof $context !== "undefined" ){
            var n = $( '.cart_list.product_list_widget li', $context ).length;
            if( $( '.cart_list.product_list_widget li.empty', $context).length  > 0 ) {
                n = 0;
            }
            //var a = $( '.total .amount', $context ).html();
            $( '.vc-mm-wc-cart > .nav-link .vc-icon .vc-noti').remove();
            $( '.vc-mm-wc-cart > .nav-link .vc-icon').append( '<span class="vc-noti">'+n+'</span>' );
        }

    }

    vc_mm_update_cart_noti( $( 'div.widget_shopping_cart_content' ) );

    $( document.body ).bind( 'added_to_cart', function( event, fragments, cart_hash ) {
        vc_mm_update_cart_noti();
    });

    $( document.body ).on( 'wc_fragments_loaded', function(){
        vc_mm_update_cart_noti();
    } );

    $( document.body ).on( 'wc_fragments_refreshed', function(){
        vc_mm_update_cart_noti();
    } );

});