<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

class User extends ActiveRecord
{
    
    public static function tableName() {
        return '{{users}}';
    }

    /**
     * Auth
     * 
     * Set session variable that confirms user is logged in
     * 
     * @param username string 
     * @param password string
     * 
     * @return boolean result of logging in
    **/

    public static function auth($username, $password)
    {
        
        $query = parent::find()
                         ->select(['id'])
                         ->where(['name' => $username, 'password' => $password])
                         ->one();

        if ($query != null) {
            $session = Yii::$app->session;

            $session['auth_token'] = $query['id'];
            return true;
        } else {
            return false;
        }

    }

    /**
     * Is guest
     * 
     * Checks if session variable exists and
     * return if user is logged in or not
     * 
     * @param null
     * 
     * @return boolean where true is "User is guest and they're not logged in" 
    **/

    public static function isGuest() {
        $session = Yii::$app->session;

        if (isset($session['auth_token']) && $session['auth_token'] != null) {
            return false; 
        } else {
            return true;
        }
    }

    /**
     * Unauthorizate 
     * 
     * Erase session variable that confirms user is logged in
     * 
     * @param null 
     * 
     * @return boolean
    **/

    public static function unAuth() {

        $session = Yii::$app->session;

        $session['auth_token'] = null;
        return true;

    }

}
