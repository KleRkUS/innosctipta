<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

class Orders extends ActiveRecord {

  private static $goods;
  private static $price;
  private static $user_id;

  public static function tableName() {
    return '{{orders}}';
  }

  public function attributeLabels() {
    return [
      'goods' => "Array of Goods' ID in order",
      'price' => "Order price",
      'user_id' => "Customer id"
    ];
  }


  /**
   * Add Id
   * 
   * Add card's id to session order variable
   * 
   * @param id integer Card id
   * 
   * @return array Updated order variable
   * @return string Notification about new cart created
  **/

  public static function addId($id) {

    $session = Yii::$app->session;

    if (isset($session['order']) && count($session['order']) != 0) {
      $order = $session['order'];
      $order[] = $id;
      $session['order'] = $order;
      return $session['order'];
    } else {
      $session['order'] = array($id);
      return "New cart created";
    }
  }


  /**
   * Remove Id
   * 
   * Remove card's id from session cart variable
   * 
   * @param id integer Card id
   * 
   * @return boolean result of operation
  **/

  public static function removeId($id) {
    
    $session = Yii::$app->session;

    if (isset($session['order']) && $session['order'] != null && ($key = array_search($id, $session['order'])) !== false) {
      $array = $session['order'];
      unset($array[$key]);
      $session['order'] = $array;
      return true;
    } else {
      return false;
    }
  }


  /**
   * Get Order
   * 
   * Get full order from session order variable
   * 
   * @param null
   * 
   * @return array
   * @return boolean
  **/

  public static function getOrder() {

    $session = Yii::$app->session;

    if (isset($session['order'])) {
      return $session['order'];
    } else {
      return false;
    }
  }


  /**
   * Check Id
   * 
   * Check if card's id is in order session variable
   * 
   * @param id integer Card id
   * 
   * @return string result of check 
  **/

  public static function checkId($id) {

    $session = Yii::$app->session;

    if (isset($session['order']) && array_search($id, $session['order']) !== false) {
      return 'true';
    } else {
      return 'false';
    }
  }

  /**
   * @Api Action
   * 
   * Get all by User ID
   * 
   * Get all the orders made by user by their id
   * 
   * @param id integer
   * 
   * @return array
  **/
  public static function getAllByUserId($id) {

    $query = parent::find()
             ->select(['goods', 'price'])
             ->where(['user_id' => $id])
             ->all();

    return $query;

  }
}