<?php
        $hookSecret = getenv('GH_WEBHOOK_SECRET');
        if (!isset($_SERVER['HTTP_X_HUB_SIGNATURE'])) {
                echo "HTTP header 'X-Hub-Signature' is missing.";
        } elseif (!extension_loaded('hash')) {
                echo "Missing 'hash' extension to check the secret code validity.";
        }

        list($algo, $hash) = explode('=', $_SERVER['HTTP_X_HUB_SIGNATURE'], 2) + array('', '');
        if (!in_array($algo, hash_algos(), TRUE)) {
                echo "Hash algorithm '$algo' is not supported.";
        }

        $rawPost = file_get_contents('php://input');
        if ($hash == hash_hmac($algo, $rawPost, $hookSecret)) {
                echo 'Hook secret does not match.';
	}
	else {

		echo 'Secret match';
        	$commands = array(
                	'git pull'
        	);

        	foreach($commands AS $command){
                	shell_exec($command);
        	}
	}
?>
