<?php
/**
 * Created by PhpStorm.
 * User: Joseph
 * Date: 5/15/2016
 * Time: 12:34 PM
 */

?>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
<h2>Password Reset</h2>

<div>
    An account has been created for you on the project manager application. To begin using it you need to first set your password.<br/>

    Please click <a href="{{ url('/#/auth/setpassword/'.$token) }}">HERE</a> or copy the address below into your browser's address bar:<br/>
    {{ url('/#/auth/setpassword/'.$token) }}
</div>
</body>
</html>
