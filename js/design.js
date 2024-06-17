$( function() {
    // gnb
    jQuery( ".gnbL" ).mouseenter( function( e ) {
        jQuery( ".gnbL" ).stop().animate( {
            height : 232
        }, 300 );
        jQuery( ".gnbBg" ).stop().animate( {
            height : 190
        }, 300 );
    } ).focusin( function() {
        jQuery( ".gnbL" ).mouseenter();
    } )

    jQuery( ".gnbL" ).mouseleave( function( e ) {
        jQuery( ".gnbL" ).stop().animate( {
            height : 40
        }, 300 );
        jQuery( ".gnbBg" ).stop().animate( {
            height : 0
        }, 300 );
        jQuery( ".gnbBg" ).css( "border-bottom", "none" );
    } ).focusout( function() {
        jQuery( ".gnbL" ).mouseleave();
    } )

    jQuery( ".gnbBg" ).mouseenter( function( e ) {
        jQuery( ".gnbL" ).stop().animate( {
            height : 232
        }, 300 );
        jQuery( ".gnbBg" ).stop().animate( {
            height : 190
        }, 300 );
    } ).focusin( function() {
        jQuery( ".gnbL" ).mouseenter();
    } )

    jQuery( ".gnbBg" ).mouseleave( function( e ) {
        jQuery( ".gnbL" ).stop().animate( {
            height : 40
        }, 300 );
        jQuery( ".gnbBg" ).stop().animate( {
            height : 0
        }, 300 );
    } ).focusout( function() {
        jQuery( ".gnbL" ).mouseleave();
    } );
    // training gnb
    jQuery( ".gnbT" ).mouseenter( function( e ) {
        jQuery( ".gnbT" ).stop().animate( {
            height : 340
        }, 300 );
        jQuery( ".training_gnbBg" ).stop().animate( {
            height : 310
        }, 300 );
    } ).focusin( function() {
        jQuery( ".gnbT" ).mouseenter();
    } )

    jQuery( ".gnbT" ).mouseleave( function( e ) {
        jQuery( ".gnbT" ).stop().animate( {
            height : 40
        }, 300 );
        jQuery( ".training_gnbBg" ).stop().animate( {
            height : 0
        }, 300 );
        jQuery( ".training_gnbBg" ).css( "border-bottom", "none" );
    } ).focusout( function() {
        jQuery( ".gnbT" ).mouseleave();
    } )

    jQuery( ".training_gnbBg" ).mouseenter( function( e ) {
        jQuery( ".gnbT" ).stop().animate( {
            height : 280
        }, 300 );
        jQuery( ".training_gnbBg" ).stop().animate( {
            height : 250
        }, 300 );
    } ).focusin( function() {
        jQuery( ".gnbT" ).mouseenter();
    } )

    jQuery( ".training_gnbBg" ).mouseleave( function( e ) {
        jQuery( ".gnbT" ).stop().animate( {
            height : 40
        }, 300 );
        jQuery( ".training_gnbBg" ).stop().animate( {
            height : 0
        }, 300 );
    } ).focusout( function() {
        jQuery( ".gnbT" ).mouseleave();
    } );
    // Click mark
    $( ".more_mark1" ).click( function( e ) {
        e.preventDefault;
        $( ".popup_mark1" ).toggle();
    } );
    $( ".more_mark2" ).click( function( e ) {
        e.preventDefault;
        $( ".popup_mark2" ).toggle();
    } );
    // calendar
    $( ".calend_more" ).click( function( e ) {
        e.preventDefault;
        $( this ).next( ".modal" ).show();
    } );
    $( ".popup_close" ).click( function( e ) {
        e.preventDefault;
        $( ".modal" ).hide();
    } );
    // TAB Default Action
    $( ".tab_content1" ).hide();
    $( "ul.tabs1 li:first" ).addClass( "active" ).show();
    $( ".tab_content1:first" ).show();

    // On Click Event
    $( "ul.tabs1 li" ).click( function() {
        $( "ul.tabs1 li" ).removeClass( "active" );
        $( this ).addClass( "active" );
        $( ".tab_content1" ).hide();
        var activeTab = $( this ).find( "a" ).attr( "href" );
        $( activeTab ).fadeIn();
        return false;
    } );
    $( ".tab_content2" ).hide();
    $( "ul.tabs2 li:first" ).addClass( "active" ).show();
    $( ".tab_content2:first" ).show();

    // On Click Event
    $( "ul.tabs2 li" ).click( function() {
        $( "ul.tabs2 li" ).removeClass( "active" );
        $( this ).addClass( "active" );
        $( ".tab_content2" ).hide();
        var activeTab = $( this ).find( "a" ).attr( "href" );
        $( activeTab ).fadeIn();
        return false;
    } );
    $( ".tab_content3" ).hide();
    $( "ul.tabs3 li:first" ).addClass( "active" ).show();
    $( ".tab_content3:first" ).show();

    // On Click Event
    $( "ul.tabs3 li" ).click( function() {
        $( "ul.tabs3 li" ).removeClass( "active" );
        $( this ).addClass( "active" );
        $( ".tab_content3" ).hide();
        var activeTab = $( this ).find( "a" ).attr( "href" );
        $( activeTab ).fadeIn();
        return false;
    } );

    // On Click Event
    $( ".login_type" ).find( "a" ).click( function() {
        //debugger;

        var temp_g_tab = $( ".login_type" ).find( "a" );
        //alert( "design.js . temp_g_tab.size():=" + temp_g_tab.size() + ":" );

        for ( i = 0; i < temp_g_tab.size(); i++ ) {
            $( temp_g_tab[ i ] ).removeClass( "selected" );
        }

        $( this ).addClass( "selected" );
        return false;
    } );
} );
