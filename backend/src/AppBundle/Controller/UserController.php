<?php

namespace AppBundle\Controller;
use AppBundle\Service\JsonToArrayGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Serializer;
use AppBundle\Entity\User;
use AppBundle\Entity\Profile;
use PDO;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\User\UserInterface;


class UserController extends Controller
{


    /**
     * @Route("/api/user/login")
     * parameters: email, password
     * mandatory: both
     * url: http://localhost:8000/api/user/login
     */
    public function apiLoginAction(Request $request,UserPasswordEncoderInterface $passwordEncoder) {


        //Api 


//
//        $em = $this->getDoctrine()->getManager();
//
//        $user = new User();
//       $password = password_hash("rajesh", PASSWORD_DEFAULT);
//        $user->setUsername('rajesh');
//        $user->setPassword($password);
//        $user->setRoleId(1);
//        $user->setIsActive(1);
//
//        // tells Doctrine you want to (eventually) save the Product (no queries yet)
//        $em->persist($user);
//
//        // actually executes the queries (i.e. the INSERT query)
//        $em->flush();
//        $response = new JsonResponse("success");
//        return $response;




        $arrApi = array();
        $statusCode = 200;
        $jsontoarraygenerator = new JsonToArrayGenerator();

        if ($request->getMethod() == 'POST') {
            $getJson = $jsontoarraygenerator->getJson($request);
            $username = $getJson->get('username');
            $password = $getJson->get('password');



            if (empty($username) || empty($password)) {
                $arrApi['status'] = 0;
                $arrApi['message'] = 'Parameters missing.';
                $statusCode = 422;
            } else {



                $em = $this->getDoctrine()->getManager();

                $user = $this->getDoctrine()->getRepository('AppBundle:User')->findOneBy(['username'=>$username]);


                $hashedPassword = $user->getPassword();

                if (password_verify($password, $hashedPassword)) {

                  if($user->getIsActive()=== 0){
                      $arrApi['status'] = 0;
                      $arrApi['message'] = 'Deactive User';
                      $statusCode = 422;
                  }else{
                      $token = $this->get('lexik_jwt_authentication.encoder')
                          ->encode([
                              'username' => $user->getUsername(),
                              'exp' => time() + 3600 // 1 hour expiration
                          ]);
                      $arrApi['status'] = 1;
                      $arrApi['message'] = 'Successfully logged in.';

                      $arrApi['data']['user']['username'] = $user->getUsername();
                      $arrApi['data']['user']['isActive'] = $user->getIsActive();
                      $arrApi['data']['user']['token'] = $token;
                  }

                } else {
                    $arrApi['status'] = 0;
                    $arrApi['message'] = 'Invalid password';
                    $statusCode = 401;
                }
                

            }

            $response = new JsonResponse($arrApi,$statusCode);
            return $response;
        }

        $arrApi['status'] = 0;
        $arrApi['message'] = 'Method not Allowed';
        $statusCode = 405;
        $response = new JsonResponse($arrApi    );
        return $response;

    }

     /**
     * @Route("api/user/addUser")
     * @Method("POST")
     * parameters: email, password
     * mandatory: All
     * url: http://localhost/Talbert/backend/web/app_dev.php/api/user/addUser
     */

    public function addUserAction(Request $request) {
        if ($request->getMethod() == 'POST') {
            $_DATA = file_get_contents('php://input');
            $_DATA = json_decode($_DATA,true);
            $arrApi = array();
            if ( empty($_DATA['company']) || empty($_DATA['fname']) || empty($_DATA['lname']) ||
                 empty($_DATA['email'])   || empty($_DATA['phone']) || empty($_DATA['username']) || $_DATA['is_active'] > 1 ||
                 empty($_DATA['password']) || empty($_DATA['address']) || empty($_DATA['country_id']) ||
                 empty($_DATA['state_id']) || empty($_DATA['city']) || empty($_DATA['role_id']) ) {

                $arrApi['status'] = 0;
                $arrApi['message'] = 'Parameter missing.';
            } else {
                $company = $_DATA['company'];
                $fname   = $_DATA['fname'];
                $lname   = $_DATA['lname'];
                $email   = $_DATA['email'];
                $phone   = $_DATA['phone'];
                $usrname = $_DATA['username'];
                $roleId  = $_DATA['role_id'];
                $isAct   = $_DATA['is_active'];
                $passwd  = password_hash($_DATA['password'], PASSWORD_DEFAULT);
                $addrs   = $_DATA['address'];
                $cntId   = $_DATA['country_id'];
                $stId    = $_DATA['state_id'];
                $city    = $_DATA['city'];
                $datime    = new \DateTime('now');
                $emailCount = $this->checkIfEmailExists($email);
                if ($emailCount) {
                    $arrApi['status'] = 0;
                    $arrApi['message'] = 'This email already exists.';
                } else {
                    $phoneCount = $this->checkIfPhoneExists($phone);
                    if ($phoneCount) {
                        $arrApi['status'] = 0;
                        $arrApi['message'] = 'This phone already exists.';
                    } else {
                        $userNameData = $this->checkIfUserNameExists($usrname);
                        if ($userNameData) {
                            $arrApi['status'] = 0;
                            $arrApi['message'] = 'This username already exists.';
                        } else {
                            $em = $this->getDoctrine()->getManager();
                            $user = new User();
                            $user->setUsername($usrname);
                            $user->setPassword($passwd);
                            $user->setRoleId($roleId);
                            $user->setIsActive($isAct);
                            $user->setCreatedAt($datime);
                            $user->setUpdatedAt($datime);
                            $em->persist($user);
                            $em->flush();
                            $lastInsertId = $user->getId();
                            if (empty($lastInsertId)) {
                                $arrApi['status'] = 0;
                                $arrApi['message'] = 'Error occured while inserting user data into database.';
                            } else {
                                $profile = new Profile();
                                $profile->setUserId($lastInsertId);
                                $profile->setCompany($company);
                                $profile->setFname($fname);
                                $profile->setLname($lname);
                                $profile->setEmail($email);
                                $profile->setPhone($phone);
                                $profile->setAddress($addrs);
                                $profile->setCountryId($cntId);
                                $profile->setStateId($stId);
                                $profile->setCity($city);
                                $em->persist($profile);
                                $em->flush();
                                if (empty($profile->getId())) {
                                    $arrApi['status'] = 0;
                                    $arrApi['message'] = 'Error occured while inserting user profile data into database.';
                                } else {
                                    $arrApi['status'] = 1;
                                    $arrApi['message'] = 'User data inserted into database successfully.';
                                }
                            }
                        }
                    }
                }
            }

            return new JsonResponse($arrApi);
        }
    }

    /**
     * @Route("api/user/getUsersList")
     * @Method("GET")
     * parameters: None
     * url: http://localhost/Talbert/backend/web/app_dev.php/api/user/getUsersList
     */

    public function getUsersListAction(Request $request) {
        if ($request->getMethod() == 'GET') {
            $arrApi = array();
            $users = $this->getDoctrine()->getRepository('AppBundle:User')->findAll();
            if ( empty($users) ) {
                $arrApi['status'] = 0;
                $arrApi['message'] = 'There is no user.';
            } else {
                $arrApi['status'] = 1;
                $arrApi['message'] = 'Successfully retreived the users list.';
                for ($i=0; $i<count($users); $i++) {
                    $userId = $users[$i]->getId();
                    $arrApi['data']['users'][$i]['id'] = $users[$i]->getId();
                    $arrApi['data']['users'][$i]['fname'] = $this->getFnameById($userId);
                    $arrApi['data']['users'][$i]['lname'] = $this->getLnameById($userId);
                    $arrApi['data']['users'][$i]['email'] = $this->getEmailById($userId);
                }
            }
            return new JsonResponse($arrApi);
        }
    }

    private function checkIfEmailExists($email) {
        $emailData = $this->getDoctrine()
            ->getRepository('AppBundle:Profile')
            ->findOneBy(array('email' => $email));
        if (count($emailData) > 0 ) {
           return true;
        } else {
            return false;
        }
    }

    private function checkIfPhoneExists($phone) {
        $phoneData = $this->getDoctrine()
            ->getRepository('AppBundle:Profile')
            ->findOneBy(array('phone' => $phone));
        if (count($phoneData) > 0 ) {
            return true;
        } else {
            return false;
        }
    }

    private function checkIfUserNameExists($usrname) {
        $usrNameData = $this->getDoctrine()
            ->getRepository('AppBundle:User')
            ->findOneBy(array('username' => $usrname));
        if (count($usrNameData) > 0 ) {
            return true;
        } else {
            return false;
        }
    }

    private function getFnameById($userid) {
        $profileObj = $this->getDoctrine()
            ->getRepository('AppBundle:Profile')
            ->findOneBy(array('userId' => $userid));
        return $profileObj->getFname();
    }

    private function getLnameById($userid) {
        $profileObj = $this->getDoctrine()
            ->getRepository('AppBundle:Profile')
            ->findOneBy(array('userId' => $userid));
        return $profileObj->getLname();
    }

    private function getEmailById($userid) {
        $profileObj = $this->getDoctrine()
            ->getRepository('AppBundle:Profile')
            ->findOneBy(array('userId' => $userid));
        return $profileObj->getEmail();
    }

}