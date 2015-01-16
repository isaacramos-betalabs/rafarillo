$(function(){

	$("#modal").height($(document).height());

	$("#18anos").click(function(){
		$("#modal").hide();
	});

	$("#share_list").click(function(){
		$("#modal").show();
	});

	$("#modal > .close").click(function(){
		$("#modal").hide();
	});

	$('input[placeholder]').each(function() {
		var ph = $(this).attr('placeholder');
		$(this).val(ph).focus(function() {
			if($(this).val() == ph) $(this).val('');
		}).blur(function(){
				if(!$(this).val()) $(this).val(ph) 
			});
	});

    $("#viewport").jcarousel({
        scroll: 1,
        initCallback: rotativo_initCallback,
        buttonNextHTML: null,
        buttonPrevHTML: null,
        wrap: 'circular'
    });

	$('select').each(function(){
		box = $('<div class="select"><span class="value">'+$('option:selected',this).text()+'</span></div>');
		if( $(this).attr('class') ){
			box.addClass( $(this).attr('class') );
			$(this).attr('class','');
		}
		$(this).before(box);
		box.append(this);
				
		$('select').focus(function(){
			$(this).parent().addClass('focus');
		}).blur(function(){
			$(this).parent().removeClass('focus');
		}).change(function(){
			box = $(this).parent();
			box.removeClass('focus');
			$('.value',box).text( $('option:selected',this).text() );
			this.blur();
		}).keyup(function(){
			box = $(this).parent();
			$('.value',box).text( $('option:selected',this).text() );
		});
	});	

	$(".pedidos_list").click(function(){
		//$(this).parent().find('.info').hide();
		//$(this).find('.info').slideToggle();
		//return false;
	});
	
});

function rotativo_initCallback(carousel) {
    $('#c_next').bind('click', function() {
        carousel.next();
        return false;
    });

    $('#c_previous').bind('click', function() {
        carousel.prev();
        return false;
    });
};

$(document).ready(function(e) {
    $(".duvidas .duvida").click(function(e) {
		$(".duvidas .duvida").not(this).removeClass("aberta");
        $(this).toggleClass("aberta");
    });
});