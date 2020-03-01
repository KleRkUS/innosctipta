<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\User;
use yii\web\Session;


class LoginController extends Controller {

  /**
   * render login page
  **/

  public function actionIndex() {
    if (!User::isGuest()) {
      return $this->redirect(['site/index']);
    }

    return $this->render('login');

  }

  /**
   * Auth
   * 
   * Authorization
  **/

  public function actionAuth() {
    $request = Yii::$app->request;
    $username = $request->post('username');
    $password = $request->post('password');

    $user = new User();

    if ($username != null && $password != null) {
      User::auth($username, $password);
      return $this->goHome(); 
    } else {
      return $this->actionIndex();
    }
  }


  /**
   * Logout
   * 
   * Unauth
   * 
  **/

  public function actionLogout() {

    $session = Yii::$app->session;

    if (!User::isGuest()) {
      User::unAuth();
    } 

    $this->redirect(['site/index']);
  }

} 