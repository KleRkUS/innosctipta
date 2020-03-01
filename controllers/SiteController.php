<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\Orders;

class SiteController extends Controller
{

  /**
   * {@inheritdoc}
   */
  public function actions()
  {
    return [
      'error' => [
          'class' => 'yii\web\ErrorAction',
      ]
    ];
  }

  /**
   * Gets order from session, sets it to cookies and
   * displays homepage.
   */
  
  public function actionIndex()
  {

    $session = Yii::$app->session;

    if ($session['order'] != null) {
      $amount = count($session['order']);
    } else {
      $amount = 0;
    }
    setcookie('CartAmount', $amount, time() + 86400, "/");

    return $this->render('index');
  }

  /**
   * Render history page
  **/

  public function actionHistory()
  {

    $session = Yii::$app->session;

    if ($id = $session['auth_token']) {
      $orders = Orders::getAllByUserId($id);

      return $this->render('history', ['orders' => $orders]);
    } else {
      return $this->redirect(['site/index']);
    }

  }

}
