<?
// если есть post запрос с почтой то исполняем код

$file = fopen("test.txt","w");
if($_POST["email"]) {
		fwrite($file,$_POST["email"]);
		header('Location: http://goto.msk.ru/hackathon/');
	}
?>
