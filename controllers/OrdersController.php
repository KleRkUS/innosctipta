<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use app\models\Orders;
use app\models\Goods;

class OrdersController extends ActiveController {

  public $modelClass = 'app\models\Orders';

  public function actions() {
    $actions = parent::actions();

    unset(
      $actions['index'],
      $actions['view'],
      $actions['create'],
      $actions['update'],
      $actions['delete'],
      $actions['options'],
    );

    return $actions;
  }

  /**
   * @Api Action
   * 
   * Add 
   * 
   * Receive request and add card to shopping
   * cart 
   * 
   * @param id integer ID of card POST
   * 
   * @return JSON Responce from model
  **/

  public function actionAdd() {

    $request = Yii::$app->request;
    $id = $request->post('id');

    $res = Orders::addId($id);

    return Goods::jsonEncodeObjs($res);

  }

  /**
   * @Api Action
   * 
   * Remove
   * 
   * Receive ID and remove Card from cart
   * 
   * @param id integer ID of card POST
   * 
   * @return JSON responce from model
  **/

  public function actionRemove() {

    $request = Yii::$app->request;
    $id = $request->post('id');

    $res = Orders::removeId($id);

    return $res;
  }

  /**
   * @Api Action
   * 
   * Get
   * 
   * Get order goods from model and pass it to view
   * 
   * @param null
   * 
   * @return JSON responce from model
  **/

  public function actionGet() {

    return Orders::getOrder();

    if ($id = Orders::getOrder()) {

      $catalog = Goods::find()
             ->select(['id', 'name', 'price'])
             ->where(['id' => $id])
             ->all();

      return Goods::jsonEncodeObjs($catalog);
    } else {
      return "Cart is empty";
    }

  }

  /**
   * @Api Action
   * 
   * Check
   * 
   * Check if received Card's id is in
   * the card
   * 
   * @param id integer ID of Card GET
   * 
   * @return JSON responce from model
  **/

  public function actionCheck() {

    $request = Yii::$app->request;
    $id = $request->get('id');

    $res = Orders::checkId($id);

    return Goods::jsonEncodeObjs($res);
  }

  /**
   * @Api Action
   * 
   * Collect
   * 
   * Collect order to history if user is logged in
   * 
   * @param order array All of id of goods in order POST
   * @param price integer Summary price of order POST
   * 
   * @return string
  **/

  public function actionCollect() {

    $session = Yii::$app->session;

    if (isset($session['auth_token']) && $session['auth_token'] != null && $token = $session['auth_token']) {
      $request = Yii::$app->request;
      $goods = $request->post('order');
      $price = $request->post('price');

      $model = new Orders();
      $model->goods = Goods::jsonEncodeObjs($goods);
      $model->price = $price;
      $model->user_id = $token;
      $model->save();

      return "Thanks! Now you can see this order in your history!";
    } else {
      return "Thanks! You're not logged in so we can't store your order";
    }
  }
}