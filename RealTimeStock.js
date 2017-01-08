(function() {
	var username = "0678c8e25152e0d0274b9d63c7b8eb23";
	var password = "265f1d71952832034406481041f3e6c1";
	var auth_url = "https://realtime.intrinio.com/auth";

	$.ajax({
		type: "GET",
		url: auth_url,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
		},
		success: function(token) {
			connect(token);
		},
		error: function(xhr, status, error) {
			console.error("Error connecting: ", error);
		}
	});

	var socket_url = "wss://realtime.intrinio.com/socket";

	var connect = function(token) {
		var socket = new Phoenix.Socket(socket_url, { params: { token: token } });
		socket.connect();
		socket.onClose(function (e){
			return console.log("CLOSE", e);
		});

		startListening(socket);
	};

	var ticker = "TSLA"; //this is the ticker symbol you want

	var startListening = function(socket) {
		var channel = socket.channel("iex:securities:" + ticker, {});

		channel.join()
			.recieve("ok", function () {
				return console.log("joined ok");
			})
			.recieve("ignore", function () {
				return console.warn("auth error");
			})
			.recieve("timeout", function () {
				return console.error("connection interruption");
			});

		channel.onError(function (e){
			return console.error("channel error", e);
		});

		channel.onClose(function (e) {
			return console.log("channel closed", e);
		});

		channel.on("quote", function (msg) {
			var ticker = msg.ticker;
			var type = msg.type;
			var timestamp = moment.unix(parseFloat(msg.timestamp)).format('h:mm:ss.SSS');
			var price = numeral(parseFloat(msg.price)).format('$0,0.00');
			var size = msg.size;

			console.log(ticker, type, timestamp, price, size);
		});
	};
})();