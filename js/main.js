
var boxopened = "";
var imgopened = "";
var count = 0;
var found = 0;

function randomFromTo(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
}

function shuffle() {
	$('#boxcard').shuffleChildren();
}

function resetGame() {
	shuffle();
	$('#boxcard img').hide();
	$('#boxcard img').removeClass('opacity');
	count = 0;
	$("#msg").remove();
	$("#count").html("" + count);
	boxopened = "";
	imgopened = "";
	found = 0;
	return false;
}

$(document).ready(function() {
		$.fn.shuffleChildren = function() {
			var theElement = $(this);
			var theChildren = theElement.children();
			theChildren.sort(function() { return 0.5 - Math.random() });
			theElement.empty();
			for (i = 0; i < theChildren.length; i++)
				theElement.append(theChildren[i]);
		}

		$("#boxcard img").hide();
		$("#boxcard div").live('click', openCard);

		shuffle();

		function openCard() {
			id = $(this).attr("id");
			if ($("#" + id + " img").is(":hidden")) {
				$("#boxcard div").unbind("click", openCard);
				$("#" + id + " img").slideDown('fast');
				if (imgopened == "") {
					boxopened = id;
					imgopened = $("#" + id + " img").attr("rel");
					setTimeout(function() {
						$("#boxcard div").bind("click", openCard)
					},
				300);
				}
				else {
					currentopened = $("#" + id + " img").attr("rel");
					if (imgopened != currentopened) {
					// close again
						setTimeout(function() {
							$("#" + id + " img").slideUp('fast');
							$("#" + boxopened + " img").slideUp('fast');
							boxopened = "";
							imgopened = "";
						},
					800);
					}
					else {
					// found
					setTimeout(function() {
						$('embed').remove();
						$("#" + id + " img").addClass("opacity");
						$("#" + boxopened + " img").addClass("opacity");
						found++;
						boxopened = "";
						imgopened = "";
					},
					900);
					}
					setTimeout(function() {
						$("#boxcard div").bind("click", openCard)
					},
					400);
				}
				count++;
				$("#count").html("" + count);
				if (found == 5) {
					msg = '<span id="msg">Congratulations! It took you </span>';

					$('embed').remove();
					
					$("span.link").prepend(msg);
				}
			}
		}
});
        