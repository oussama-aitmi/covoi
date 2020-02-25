jQuery(document).ready(function($){
	"use strict";

	$(document).on( 'click', '.open-reponse-form', function(e){
		e.preventDefault();
		$($(this).data('target')).toggleClass('hidden');
	});

	$(document).on( 'click', '.send-response', function(e){
		e.preventDefault();
		var $this = $(this);
		var $parent = $this.parents('.send-response-wrap');
		$this.append('<i class="aficon-circle-notch aficon-spin"></i>');

		$.ajax({
			url: js_data.ajaxurl,
			method: 'POST',
			data: $parent.find('form').serialize(),
			dataType: "JSON",
			success: function(response){
				if( !response.error ){
					$parent.before( response.success );
					$parent.remove();
				}
				else{
					$parent.find('.response-result').html( response.error );
				}
			},
			complete: function(){
				$this.find('i').remove();
			}
		})
	});

	/* TOGGLE REVIEW deTAils */
	$(document).on('click', '.toggle-review-details', function(){
		var $this = $(this);
		$this.toggleClass('open')
		var $parent = $this.parents('.user-review');
		$parent.find('.review-details').slideToggle();
	});


  /* REVIEWS */
  $(document).on( 'click', '.launch-review', function(e){
    e.preventDefault();
    var $this = $(this);
    if( !$this.hasClass('disabled') ){
      $('#write-review input[name="review-to"]').val( $this.data('review-to') );
      $('#write-review').find(".modal-body .row, .submit-ajax-form, .modal-body .register-acc, .modal-body .or-divider,.modal-body .form-group").show();
      $('#write-review .rating-value').val("");

      $('#write-review .clicked').removeClass(".clicked, .aficon-star").addClass('aficon-star-o');
      $('#write-review').find('.ajax-form-result').empty();
      $('#write-review').modal('show');

    }
  });

  $(document).on( 'mouseenter', '.rate-user span', function(){
    var pos = $(this).index();
    var $parent = $(this).parents('.rate-user');
    var icon, is_clicked;
    for( var i=0; i<=pos; i++ ){
      icon = $parent.find('span:eq('+i+')');
      is_clicked = icon.hasClass('clicked') ? 'clicked' : '';
      icon.attr('class', 'aficon-star '+is_clicked );
    }
  });
  $(document).on( 'mouseleave', '.rate-user span', function(){
    $(this).parents('.rate-user').find('span').each(function(){
      if( !$(this).hasClass('clicked') ){
        $(this).attr('class', 'aficon-star-o');
      }
    });
  });

  $(document).on('click', '.rate-user span', function(){
    var value = $(this).index();
    var $parent = $(this).parents('.rate-user');
    $('.rating-value').val( value + 1 );
    $parent.find('span').removeClass('clicked');
    for( var i=0; i<=value; i++ ){
      $parent.find('span:eq('+i+')').attr('class', 'aficon-star').addClass('clicked');
    }
  });



  /*$(document).on( 'keyup', '#write-review #review', function(){
    var len = val.value.length;
    if (len >= 500) {
      val.value = val.value.substring(0, 500);
    } else {
      $('#charNum').text(500 - len);
    }
  });*/

});
