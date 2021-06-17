<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<title>CreativDepot</title>
	<link rel="stylesheet" href="css/app.css">
</head>

<body>

	<?php
	// include images only once at the top of the page and use svg icons with svg:use
	include "images/svg/images.svg";
	include "templates/header.php";
	?>
	<svg>
		<use xlink:href="#hello">
		</use>
	</svg>

	<script type="text/javascript" src="js/main.js"></script>
</body>

</html>