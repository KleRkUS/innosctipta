<?php

/* @var $this yii\web\View */

$this->title = 'Log in || My Lovely Pizza Delivery || Saint-Petersburg';
?>
<div class="site-index login__root" id="root">
  
  <form method="post" action="/login/auth" class="login__form">
    <input type="hidden" name="_csrf" value="<?=Yii::$app->request->getCsrfToken()?>" />
    <label for="username">Username:</label>
    <input type="text" name="username" id="username" placeholder="Login">
    <label for="Password">Password:</label>
    <input type="password" name="password" id="password" placeholder="********">
    <input type="submit" name="submit" value="Log in" class="button__default button__important">
  </form>

</div>