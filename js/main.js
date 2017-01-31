jQuery(function ($) {

    $(function () {
        $('#main-slider.carousel').carousel({
            interval: 3000,
            pause: false
        });
    });

    //Ajax contact
    var form = $('.contact-form');
    form.submit(function () {
        $this = $(this);
        $.post($(this).attr('action'), function (data) {
            $this.prev().text(data.message).fadeIn().delay(3000).fadeOut();
        }, 'json');
        return false;
    });

    //smooth scroll
    $('.navbar-nav > li').click(function (event) {
        event.preventDefault();
        var target = $(this).find('>a').prop('hash');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 500);
    });

    //scrollspy
    $('[data-spy="scroll"]').each(function () {
        var $spy = $(this).scrollspy('refresh')
    })

    //PrettyPhoto
    $("a.preview").prettyPhoto({
        social_tools: false
    });

    //Isotope
    $(window).load(function () {
        $portfolio = $('.portfolio-items');
        $portfolio.isotope({ filter: ".noodles" });
        $portfolio.isotope({
            itemSelector: 'li',
            layoutMode: 'fitRows'
        });
        $portfolio_selectors = $('.portfolio-filter >li>a');
        $portfolio_selectors.on('click', function () {
            $portfolio_selectors.removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $portfolio.isotope({ filter: selector });
            return false;
        });
    });


    $(document).ready(function () {
        $('#myCarousel').carousel({
            interval: 10000
        })

        $('#myCarousel').on('slid.bs.carousel', function () {
            //alert("slid");
        });
    });

    var map;
    function initialize() {
        var latlng = new google.maps.LatLng(51.1695966, 0.3637801);
        var latlng1 = new google.maps.LatLng(51.536928, 0.7110191);
        var latlng2 = new google.maps.LatLng(50.8232096, -0.1465389);

        var mapOptions = {
		scrollwheel: false,
   		zoom: 8,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
        };
	map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var image = new google.maps.MarkerImage("images/place.png",      
      				new google.maps.Size(32, 32),      
      				new google.maps.Point(0,0),      
      				new google.maps.Point(15, 32));
 
        var marker = new google.maps.Marker({
            // The below line is equivalent to writing:
            // position: new google.maps.LatLng(-34.397, 150.644)
            position: latlng1,
            map: map,
			icon: image,
            title: 'Southend-on-Sea'
        });
        var marker = new google.maps.Marker({
            // The below line is equivalent to writing:
            // position: new google.maps.LatLng(-34.397, 150.644)
            position: latlng2,
            map: map,
			icon: image,
            title: 'Brighton'
        });

        // You can use a LatLng literal in place of a google.maps.LatLng object when
        // creating the Marker object. Once the Marker object is instantiated, its
        // position will be available as a google.maps.LatLng object. In this case,
        // we retrieve the marker's position using the
        // google.maps.LatLng.getPosition() method.
        var infowindow = new google.maps.InfoWindow({
            content: '<p>Marker Location:' + marker.getPosition() + '</p>'
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);

});