<?php
    $subject = 'Заявка с сайта';
    $mess = '';
    $mess .= '<hr>';
    if(isset($_POST['info'])) {
        $subject = $_POST['info'];
    }
    if(isset($_POST['name'])) {
        $name = substr(htmlspecialchars(trim($_POST['name'])), 0, 100);
        $mess .= '<b>Имя:</b>' . $name . '<br>';
    }
    if(isset($_POST['tel'])) {
        $tel = substr(htmlspecialchars(trim($_POST['tel'])), 0, 100);
        $mess .= '<b>Телефон:</b>' . $tel . '<br>';
    }
    if(isset($_POST['email'])) {
        $mail = substr(htmlspecialchars(trim($_POST['email'])), 0, 100);
        $mess .= '<b>Почта:</b>' . $mail . '<br>';
    }
    if(isset($_POST['firm'])) {
        $firm = substr(htmlspecialchars(trim($_POST['firm'])), 0, 100);
        $mess .= '<b>Организация:</b>' . $firm . '<br>';
    }
    if(isset($_POST['text'])) {
        $text = substr(htmlspecialchars(trim($_POST['text'])), 0, 100);
        $mess .= '<b>Вопрос:</b>' . $text . '<br>';
    }
    $mess .= '<hr>';
    // подключаем файл класса для отправки почты
    require 'class.phpmailer.php';

    $mail = new PHPMailer();
    $mail->AddAddress('hello@gmail.com','');   // кому - адрес, Имя
    $mail->IsHTML(true);                        // выставляем формат письма HTML
    $mail->Subject = $subject; // тема письма
    $mail->CharSet = "UTF-8";                   // кодировка
    $mail->Body = $mess;
    if(isset($_FILES['file'])) {
            if($_FILES['file']['error'] == 0){
            $mail->AddAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']);
        }
    }
    // отправляем наше письмо
    if (!$mail->Send()){
        die ('Mailer Error: ' . $mail->ErrorInfo);
    }else{
        echo 'true';
    }?>