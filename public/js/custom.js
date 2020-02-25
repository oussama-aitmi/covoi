jQuery(document).ready(function($){
	"use strict";

	var isRTL = $('body').hasClass('rtl') ? true : false;
	var isLoggedIn = $('body').hasClass('logged-in') ? true : false;

	$('.postform, .widget_archive select, .widget_text select').wrap('<div class="styled-select"></div>');

	/* TO TOP */
	$(window).on('scroll', function(){
		if( $(window).scrollTop() > 200 ){
			$('.to_top').fadeIn(100);
		}
		else{
			$('.to_top').fadeOut(100);
		}
	});

	$('.nav-paste').html( $('.nav-copy').html() );
	$(document).on('click', '.to_top', function(e){
		e.preventDefault();
		$("html, body").stop().animate(
			{
				scrollTop: 0
			},
			{
				duration: 1200
			}
		);
	});

	/*if( js_data.enable_sticky == 'yes' && !$('body').hasClass('author') ){
		var $elem = $('header.sticky-header');
		var $clone = $elem.clone();
		if( $clone.hasClass('header-2') && $('.dark-logo-wrap').html() !== '' ){
			$clone.find('.container > .flex-wrap').prepend( $('.dark-logo-wrap').html() );
		}
		$('body').append( $clone.addClass('sticky-nav') );
		$(window).scroll(function(){
			if( $(window).width() > 768 && $(window).scrollTop() > $elem.offset().top ){
				var top;
				$('#wpadminbar').length > 0 ? top = $('#wpadminbar').height() : top = 0;
				$clone.css('top', top+'px');
			}
			else{
				$clone.css('top', '-500px');
			}
		});
	}
	else{
		var wpadminbar = $('#wpadminbar');
		if( wpadminbar.length > 0 ){
			$('.author-sidebar').css( 'top', wpadminbar.height() );
		}
	}*/

	$(document).on('click', '.navigation a', function(e){
		if( $(window).width() < 1024 && e.target.nodeName == 'I' ){
			e.preventDefault();
		}
	});

	function handle_navigation(){
		if ($(window).width() > 1024) {
			$('.navigation li.dropdown, .navigation li.dropdown-submenu').hover(function () {
				$(this).addClass('open').find(' > .dropdown-menu').stop(true, true).hide().slideDown(50);
			}, function () {
				$(this).removeClass('open').find(' > .dropdown-menu').stop(true, true).show().slideUp(50);

			});
		}
		else{
			$('.dropdown-toggle').removeAttr('data-toggle');
			$(document).on( 'click', 'li.dropdown a', function(e){
				if( !$(this).parent().hasClass('open') ){
					$(this).parent().addClass('open').find(' > .dropdown-menu').show();
					$(this).parents('.dropdown').addClass('open').find(' > .dropdown-menu').show();
				}
				else{
					$(this).parent().removeClass('open').find(' > .dropdown-menu').hide();
					$(this).parent().find('.dropdown').removeClass('open').find(' > .dropdown-menu').hide();
				}
			});
		}
	}
	handle_navigation();

	$(window).resize(function(){
		setTimeout(function(){
			handle_navigation();
		}, 200);
	});

	/* SUBMIT FORMS */
	$(document).on('click', '.submit-ajax-form, .submit-form', function(e){
		e.preventDefault();
		$(this).parents('form').submit();
	});

	$('.change-submit').on('change', function(e){
		$(this).parents('form').submit();
	});

	$('.ajax-form, .key-submit-form').keypress(function(e){
    	if(e.which == 13 && e.target.nodeName !== 'TEXTAREA' ) {
    		$(this).submit();
    	}
    });

	$('.header-search input[name="keyword"]').keypress(function(e){
  	if(e.which == 13 ) {
  		$(this).parents('form').submit();
  	}
  });

  $(document).on('click', '.contact-conducteur', function(e){
      e.preventDefault();
      $('.modal-dialog').find('.ajax-form-result').empty();
      $('#contact-conducteur').modal('show');
  });

  $(document).on('click', '.list_users_request .sendMessage', function(e){
      e.preventDefault();
      var $this = $(this);
      var user =  $this.data('user');
      $('.modal-dialog').find('.ajax-form-result').empty();
      $('#contact-conducteur').find("input[name=data-user]").val(user);
      $('#contact-conducteur').modal('show');
  });


	$(document).on( 'submit', '.ajax-form', function(e){
		e.preventDefault();

			var $this = $(this);
      $('.modal-dialog').find('.ajax-form-result').empty();
			var $result = $this.find('.ajax-form-result');
			var $submitButton = $this.find( '.submit-ajax-form' );
			var formData;
			var spin = '<i class="aficon-spin aficon-circle-notch"></i>';
			var isIcon = false;
			var oldIcon = '';

			$submitButton.find('.icon-response').remove();

			/* we mus disable empty file inputs since iOS is messing it up */
			var $inputs = $('input[type="file"]:not([disabled])', $this);
			$inputs.each(function(_, input) {
				if (input.files.length > 0){
					return;
				}
				$(input).prop('disabled', true);
			});

			formData = new FormData($(this)[0]);
			$inputs.prop('disabled', false);

			if( $submitButton.find('i').length == 0 ){
				$submitButton.append( spin );
			}
			else{
				isIcon = true;
				oldIcon = $submitButton.html();
				$submitButton.html( spin );
			}

      $this.closest('form').find('input[type=text], input[type=password], textarea').prop("disabled", true).css('background-color', '#f7f7f7');

			$.ajax({
				url: js_data.ajaxurl,
				method: 'POST',
				processData: false,
				contentType: false,
				data: formData,
				dataType: "JSON",
				success: function(response){

					if( $this.data('append') ){
						$result.append( response.message );
					}
					else{
            console.log(response.message);
						$result.html( response.message );
					}

          /*if( response.remove_input ){
            $this.closest('form').find(".modal-body .row, .submit-ajax-form, .modal-body .register-acc, .modal-body .or-divider,.modal-body .form-group").remove();
          }*/

          if( response.remove_input ){
            $this.closest('form').find(".modal-body .row, .submit-ajax-form,.modal-body .forgot, .modal-body .register-acc-ajaxa, .modal-body .or-divider,.modal-body .form-group").hide();
          }

          if( response.load_captcha ){
            $this.closest('form').find(".rs_captcha").val("");
            $this.closest('form').find(".bloc-captcha").replaceWith(response.load_captcha_responce);
          }

          if( response.clear_password ){
            $this.closest('form').find("input[type=password]").val("");
          }

          //Image Profile
          if( response.file ){
            var aficon = $this.closest('form').find('.user-details .aficon-user-alt');
            if( aficon.length ){
                $(".user-details .aficon-user-alt").replaceWith('<img width="130" height="130" src="'+response.file+'">');
            }else{
                $(".user-details img").attr("src", response.file);
            }
          }

          if( response.clearform ){
            $this.closest('form').find("input[type=text], textarea, input[type=password]").val("");
					}

          if( response.subscribe ){
            $this.closest('form').find(".adifier-form").replaceWith('<div><b>Merci, Votre E-mail a bien été enregistré</b></div>');
					}

          if( response.url ){
						window.location = response.url;
					}
					if( response.reload ){
            setInterval(function(){
              window.location.reload();
            }, 800);
					}

					if( !isIcon ){
						$submitButton.find('i').remove();
					}
					else{
						$submitButton.html( oldIcon )
					}

					if( response.icon_response ){
						$submitButton.append( response.icon_response );
					}

          /*if(response.statut=='savedOffre'){
            $('.ajax-save-advert').find(".col-sm-7, .col-sm-5 .to-close, .block-submit .terms-wrap").hide();
            var $result = $this.find('.ajax-form-result');
            $result.html( response.message );

            setInterval(function(){
              //window.location.href = $('[name="author_url"]').val()+'?screen=ads';
              console.log("oooo");
            }, 2500);
          }*/

					/*if( $submitButton.data('callbacktrigger') ){
						$(document).trigger( $submitButton.data('callbacktrigger'), [response] );
					}*/
				},
        complete: function(){
          $this.closest('form').find('input[type=text], input[type=password], textarea').prop("disabled", false).css('background-color', '');
        },
			});
	});


	$(document).on('click', '.submit-redirect', function(){
		$('#login form').append('<input type="hidden" class="redirect" name="redirect" value="submit" />');
	});

	$('#login').on('hidden.bs.modal', function () {
	    $(this).find('.redirect').remove();
	});

	/* OPEN REOVER MODAL IF RECOVERING PASSWROD */
	if( window.location.hash == '#recover' ){
		$('#recover').modal('show');
	}

/* REVEAL PHONE */


/*url: $form.attr('action'),
method: 'POST',
data: data,
success: function(response){
  $('.ajax-search').html($(response).find('.ajax-search').html());
  $(document).trigger('adifier-new-search');
},*/



$('.reveal-phone').on('click', function(e){
	var $this = $(this);
	if( !$this.hasClass( 'revealed' ) ){
      e.preventDefault();
      var $form = $this.closest('form');
      var data = $form.serialize();
      var $em = $this.find('em');
      //$em.text( $em.text().replace('XXX', $this.data('last')) );
      //$this.attr('href', 'tel:'+$em.text().replace(/[`~!@#$%^&*()_| \-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))

      var spin = '<i class="aficon-spin aficon-circle-notch"></i>';
      $em.append( spin );

      $.ajax({
        url: js_data.ajaxurl,
        data : data,
        action: $this.attr("action"),
        dataType: "JSON",
        method: 'POST',
        success: function(response){
          if(response.result== true){
            $em.text( response.phone );
          }else{
            $em.text( response.message );
          }
        },
        complete: function(){
          $this.parent().find('i.aficon-spin').remove();
        },
      });
      $this.addClass('revealed')
  }
});

    /* TOGGLE AUTHOR SIDEBAR */
	try {
	    if( $(window).width() <= 1024 ){
	    	$('.navigation-wrap > ul').scrollbar();
	    }
	    $('.author-sidebar ul').scrollbar();
	}
	catch(error) {}
    $('.small-sidebar-open').on('click', function(e){
        e.preventDefault();
        var $this = $(this);
        if( !$this.hasClass('sso') ){
	        $this.addClass('sso');
	        var target = $this.data('target');
	        var $target = $(target);
	        $target.addClass('open');
	        setTimeout(function(){
	        	$('body').append('<a href="javascript:void(0);" class="small-sidebar-close" data-target="'+target+'" style="'+( isRTL ? 'right' : 'left' )+': '+($target.outerWidth() - 15)+'px; top:'+($(window).height() / 2)+'px;"><i class="aficon-times-circle"></i></a>');
	        }, 100);
	    }
    });

  $(document).on('click', '.small-sidebar-close', function(e){
      e.preventDefault();
      $($(this).data('target')).removeClass('open');
      $('.sso').removeClass('sso');
      $(this).remove();
  });
  /* MOVE COMMENTS TO THE BOTTOM OF THE SCREEN ON SMALLER SCREENS */
  if( $(window).width() <= 768 ){
    $('main .container').append( $('.small-screen-last').html() );
    $('.small-screen-last').html('');
	}

	/* GDPR subscribe show checkbox */
	$('.subscription-footer input[type="text"]').focus(function(){
		$('.subscription-footer .form-group').show();
	});
	$('.subscription-footer input[type="text"]').blur(function(){
		$('.subscription-footer .form-group').hide();
	});

	/* TOGGLE TAXONOMY CHILDREN */
	$(document).on('click', '.af-dropdown-toggle', function(){
		var $this = $(this);
		var $target = $($this.data('target'));
		$this.toggleClass('open');
		$target.slideToggle();
	});


/* Button Book Place inside Modal*/
$(document).on('click','.book-place:not(".disable-send-request")', function(e){
  e.preventDefault();
  var $this = $(this);
  if($this.data('id')==null){
    return false;
  }
  var modal = $('#cgu-modal');
  modal.find('.modal-message').empty();
  modal.find('.af-button').show();

  if(!$('#cgu-modal #input_cgu').is(':checked')){
    modal.find('.modal-message').append('<p class="alert-error response">veuillez accepter les conditions d\'utilisation .</p>');
    return false;
  }

  $this.html('<i class="aficon-circle-notch aficon-spin"></i>');

  setTimeout(function(){
    $.ajax({
        url: js_data.ajaxurl,
        method: 'POST',
        data:{
            action: 'user_request_booking',
            offerId: $this.data('id'),
            request_nonce : $('input[name="request_nonce"]').val(),
        },
        dataType: 'JSON',
        success: function(response){
            if(response.result == true){
              $("#book-place-button").html(response.message).addClass('disable-send-request');
            }

            if(response.message ){
              let classMessage = response.result == true ? 'alert-success' : 'alert-error';
              modal.find('.modal-message').append('<div class="response '+classMessage+'">'+response.message+'</div>');
            }
        },
        complete: function(){
          modal.find('.af-button').hide();
          modal.find('.styled-checkbox').hide();
          $this.find('i').remove();
        },
    })
  }, 50);
});


$(document).on('click', '#book-place-button:not(".deconnected")', function(e){
	e.preventDefault();
	var $this = $(this);
  var offerId =  $this.data('id');
  var seat_count =  $this.data('seat_count');
  var modal = $('#cgu-modal');
  modal.find('.modal-body').empty();
  modal.find('.response').remove();

  var result = modal.find('.ajax-form-result');
  modal.find('.overlay-bloc').addClass('overlay');
  modal.find('.aficon-times-circle').addClass('aficon-spin');
  modal.modal('show');
    $.ajax({
      url: js_data.ajaxurl,
      data: {
        action: 'showUserRequestModal',
        offerId: $this.data('id')
      },
      dataType: "JSON",
      method: 'POST',
      success: function(response){
        if(response.html){
          modal.find('.modal-body').html(response.html);
        }
      },
      complete: function(){
        modal.find('.overlay-bloc').removeClass('overlay');
        modal.find('.aficon-times-circle').removeClass('aficon-spin');
      },
    });
});

$('.social-login a').on('click', function(e){
    e.preventDefault();
    window.open(adifier_sc[$(this).attr('class')],'','scrollbars=no,menubar=no,height=500,width=900,resizable=yes,toolbar=no,status=no');
});

/*$( ".cf-datepicker").datetimepicker({
  dateFormat: 'dd/mm/yy',
  showTimepicker: false,
  //pickTime: false,
  //defaultDate: new Date(),
  minDate: new Date(),
  showButtonPanel: false,
  todayHighlight: true
});

/*$( ".cf-datepicker2").datetimepicker({
  dateFormat: 'dd/mm/yy',
  format: 'HH:mm',
  showTimepicker: true,
  pickTime: true,
  defaultDate: new Date(),
  minDate: new Date(),
  showButtonPanel: true,
  todayHighlight: true,
  currentText: 'Aujourd\'hui',
  closeText: 'OK',
  hourText: 'l\'heure',
  timeText: 'Temps de départ :',
  prevText: 'Précédent',
  nextText: 'Suivant',
  showSecond: false,
});*/


/* apply filter and fetch aresults */
$('.filter-adverts').on('click',function(e){
  e.preventDefault();
  var $this = $(this);
  submitForm(1,$this);
});

/* reset search form */
$('.reset-search').on('click', function(e){
  e.preventDefault();
  $('.search-form select,input[type="text"],input[type="hidden"]').val('');
  $('input[type="checkbox"],input[type="radio"]').prop('checked', false);
  var $this = $(this);
  submitForm(1,$this);
});

/* on orderby change
$(document).on('change', '.orderby', function(){
  submitForm();
}); */

/* pagination click */
$(document).on('click', '.pagination a', function(e){
  e.preventDefault();
  var $this = $(this);
  submitForm($(this).text(),$this);
});

/* layout click
$(document).on('click', '.layout-view a', function(e){
  e.preventDefault();
  $('.layout-view a').removeClass( 'active' );
  $(this).addClass('active');
  submitForm();
});*/

/* submit form & populate new results */
function submitForm(page, $this){
  //var $form = $('.search-form');
  var $form = $this.closest('form');


  var data = $form.serialize();
  var $holder = $('.ajax-search');
  //var $orderby = $('.orderby');
  var $pagination = $('.pagination span');
  $holder.addClass('loading');
  $('.white-block-content .overlay').show();

  if( $pagination.length > 0 ){
    page = page ? page : $pagination.text();
    data += '&page='+page.toString().replace(/,/g, "");
  }

  var $mobileForm = $this.closest('.modal').hasClass('search-form');
  if($mobileForm == true){
    $('#search-form-modal').click();
  }

  $.ajax({
    url: $form.attr('action'),
    method: 'POST',
    data: data,
    success: function(response){
      $('.ajax-search').html($(response).find('.ajax-search').html());
      $(document).trigger('adifier-new-search');
    },
    complete: function(){
      $holder.removeClass('loading');
      $('.white-block-content .overlay').hide();

      if ($holder.length) {
        var scroll_to = $holder.offset().top;
      }
      var $admin = $('#wpadminbar');
      var $sticky = $('.sticky-nav');
      if( $sticky.length > 0 ) {
        scroll_to -= $sticky.height();
      }
      if( $admin.length > 0 && $admin.css( 'position' ) == 'fixed' ){
        scroll_to -= $admin.height();
      }
      $('html, body').animate({
          scrollTop: scroll_to - 60
      }, 500);

      /*if( !searchWithMap ){
        $('html, body').animate({
            scrollTop: scroll_to - 60
        }, 500);
      }
      else{
        if( $(window).width() <= 736 ){
          $('html, body').animate({
              scrollTop: scroll_to
          }, 500);
        }
        else{
          $('.search-map-results-content').animate({
              scrollTop: 0
          }, 500);
        }
      }*/
    }
  });
}

/* LAUNCH SINGLE MODALS */
$('.report-advert').on('click', function(e){
    e.preventDefault();
    $('#report-advert').modal('show');
});
$('#lcf_register').on('change', function(){
    $('.lcf-toggle').toggleClass('hidden');
});


$(document).on('click', '#register .close-modal', function(e){
    e.preventDefault();
    $.magnificPopup.close();
});

$(document).on('click', '.register-acc-ajaxa', function(e){
    e.preventDefault();
    $.magnificPopup.open({
      tLoading:"Chargement...",
      type:'ajax',
      modal:false,
      closeBtnInside: false,
      //closeOnContentClick: true,
      mainClass: 'register',
      //removalDelay:'0',
      items:{src:js_data.ajaxurl},
      ajax: {
        settings: {
          type: 'POST',
          cache: true,
          dataType: 'html',
          //url: js_data.ajaxurl,
          data: {
              action: 'get_register',
          }
        }
      },
    });
});









});
