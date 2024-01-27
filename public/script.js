let svg = "";
function copyToClipboard() {
	let text = svg;
	var $txt = $("<textarea />");
	$txt.val(text)
		.css({
			width: "1px",
			height: "1px",
		})
		.appendTo("body");
	$txt.select();
	if (document.execCommand("copy")) {
		$txt.remove();
	}
	window.alert("svg copied to clipboard");
}
function downloadSVG() {
	var svg = $("svg")[0];
	var blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
	var url = URL.createObjectURL(blob);
	var link = $("<a></a>");
	link.attr("href", url);
	link.attr("download", "qrcode.svg");
	$("body").append(link);
	link[0].click();
	link.remove();
}

$(document).ready(() => {
	$("form").on("submit", (e) => {
		e.preventDefault();
		$("#show-prompt").css({"display":"none"});
		$(".custom-loader").css({"display":"block"});
		$.ajax({
			url: "/makeqr",
			type: "POST",
			data: {
				txt: $("#txt").val(),
				fgcolor: $("#fg-color").val(),
				bgcolor: $("#bg-color").val(),
			},
			success: function (data, status, xhr) {
				$("#show").html(data["data"]);
				svg = data["data"];
				$(".custom-loader").css({"display":"none"});
				$("button").prop({ disabled: false });
			},
			error: function (xhr, status, err) {
				window.alert("Error occured while generating qrcode");
			},
		});
	});
});
