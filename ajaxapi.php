<?php
	$fields	= [];

	foreach(["id", "name", "height"] as $f) {
		if(isset($_POST[$f])) {
			$fields[$f]	= $_POST[$f];
		}
	}

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://kom-andras.github.io/web_eloadas/ajaxapi.php");
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36");
	curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);

	curl_exec($ch);
?>