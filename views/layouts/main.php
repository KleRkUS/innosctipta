<?php

/* @var $this \yii\web\View */
/* @var $content string */

use app\widgets\Alert;
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700|Merriweather:300,400,700&display=swap&subset=cyrillic,latin-ext" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="../../web/webassets/layout.css">

    <?= Html::csrfMetaTags() ?>
    <?php $this->registerCsrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>

<div class="wrap">
    <div class="layout__header">
        <div class="layout__logo">  
          <h1>My lovely <b>Pizza</b> delivery</h1>
        </div>
        <div class="layout__nav">
            <?php if ($_SESSION['auth_token'] != null): ?>
                <a class="button__default button__important" href="/site/history">History</a>
                <a class="button__default" href="/login/logout">Log out</a>
            <?php else: ?>  
                <a class="button__default button__important" href="/login">Log in</a> 
            <?php endif; ?>
        </div>
      </div>

    <?= $content ?>
</div>
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
