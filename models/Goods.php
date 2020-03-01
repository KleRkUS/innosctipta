<?php

namespace app\models;

use yii\db\ActiveRecord;

class Goods extends ActiveRecord {

  // One page can only contains 12 Cards so we create limit here

  const GOODS_LIMIT = 12;

  /**
   * @return string the name of the table associated with this ActiveRecord class.
   */

  public static function tableName() {
    return '{{goods}}';
  }

  /**
   * Get Goods
   * 
   * Get all goods by type and offset
   * 
   * @param type integer Type of goods
   * @param offset Offset for pagination
   * 
   * @return array Result of query
  **/

  public static function getGoods($type, $offset) {

    $query = parent::find()
                    ->select(['id', 'name', 'description', 'price', 'image'])
                    ->where(['type' => $type])
                    ->offset($offset)
                    ->limit(self::GOODS_LIMIT)
                    ->all();

    return $query;

  }

  /**
   * Get Amount of Goods
   * 
   * Get amount of goods by type from datastore
   * 
   * @param type integer Type of goods
   * 
   * @return array Result of query 
  **/ 

  public static function getAmountOfGoods($type) {

    $query = parent::find()
                    ->where(['type' => $type])
                    ->count();

    return $query;

  }

  public static function getOrderData($order) {
    $query = parent::find()
                     ->select(['id', 'name', 'price'])
                     ->where(['id' => $order])
                     ->all();
    return $query;
  }

  /**
   * JSON Encode Objects
   * 
   * Encode all of object or array entries to json
   * 
   * @param item [Array, Object] Array or object to encode
   * 
   * @return JSON encoded object or array
  **/

   public static function jsonEncodeObjs($item) {

    if(!is_array($item) && !is_object($item)) { 

      return json_encode($item, JSON_UNESCAPED_UNICODE);

    } else {

      $pieces = array(); 
      foreach($item as $k=>$v) { 
        $pieces[] = "\"$k\":".self::jsonEncodeObjs($v); 
      } 

      return '{'.implode(',',$pieces).'}'; 
    } 
  }

}