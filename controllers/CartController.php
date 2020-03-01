<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\Orders;
use app\models\Goods;

class CartController extends Controller {


  /**
   * Render shopping cart page
  **/
  public function actionIndex()
  {
    $session = Yii::$app->session;

    if (($order = $session['order']) == null) {
      $this->redirect('/');
    }

    $data = Goods::getOrderData($order);
    setcookie('Order', Goods::jsonEncodeObjs($data), time() + 86400, "/");

    return $this->render('cart');
  }

}