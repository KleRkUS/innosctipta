<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use app\models\Goods;

class GoodsController extends ActiveController {

  public $modelClass = 'app\models\Goods';

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
   * Get
   * 
   * Get all goods by type in page
   * 
   * @param type integer type of goods
   * @param page 
   * 
   * @return JSON responce from model
  **/

  public function actionGet() {
  
    $request = Yii::$app->request;
    $type = $request->get('type');
    $page = $request->get('page');

    $session = Yii::$app->session;

    $catalog = Goods::getGoods($type, ($page-1)*12);
    $amount = Goods::getAmountOfGoods($type);

    $data = [
      "amount" => $amount,
      "catalog" => $catalog
    ];

    return Goods::jsonEncodeObjs($data);

  }

}