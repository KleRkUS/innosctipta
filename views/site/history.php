<?php

/* @var $this yii\web\View */

$this->title = 'Orders history || My Lovely Pizza Delivery || Saint-Petersburg';
?>
<div class="site-index history__wrapper" id="root">

  <?php foreach ($orders as $order): ?>

    <div class="history__block">
      <ul>
  
        <?php foreach (json_decode($order['goods']) as $good): ?>

          <li><p><?= $good ?></p></li>
  
        <? endforeach; ?>

      </ul>
      <h2>Price: <?= $order['price'] ?></h2>
    </div>

  <?php endforeach; ?>

</div>