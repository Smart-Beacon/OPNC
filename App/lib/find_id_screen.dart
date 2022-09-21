import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:smart_beacon_customer_app/snackbar.dart';

class FindIdScreen extends StatefulWidget {
  const FindIdScreen({Key? key}) : super(key: key);

  @override
  State<FindIdScreen> createState() => _FindIdScreenState();
}

dynamic userLoginId = 'user1';
dynamic userRealName = '김민성';


class _FindIdScreenState extends State<FindIdScreen> {
  TextEditingController userName = TextEditingController();
  TextEditingController userPhone = TextEditingController();
  TextEditingController token = TextEditingController();

  isUserExist(BuildContext context) async {
    try {
      var dio = Dio();
      String url = "http://10.0.2.2:5000/auth/user/check";
      var res = await dio
          .post(url, data: {'userName': userName.text, 'phoneNum': userPhone.text});
      switch (res.statusCode) {
        case 200:
          // 이름과 전화번호가 일치하는 사용자가 존재!
          // userId 받음 (*로그인 ID 아님 인덱싱 ID임)
          var userId = res.data['userId'];
          return userId;
        default:
          return null;
      }

    } catch (err) {
      showSnackBar(context, err.toString());
    }
  }

  verifyUser(BuildContext context, userId) async {
    try {
      var dio = Dio();
      String url = "http://10.0.2.2:5000/auth/user/token";
      var res = await dio
          .post(url, data: {'userId': userId, 'token': userPhone.text});
      switch (res.statusCode) {
        case 200:
          var userId = res.data['userId'];
          return userId;
        default:
          return null;
      }

    } catch (err) {
      showSnackBar(context, err.toString());
    }
  }

  dynamic userId = null;

  dynamic isEnterInfo() {
    if (userName.text.isEmpty) {
      showSnackBar(context, '이름을 입력하세요');
      return false;
    }
    if (userPhone.text.isEmpty) {
      showSnackBar(context, '전화번호를 입력하세요');
      return false;
    }
    return true;
  }

  @override
  void dispose() {
    userName.dispose();
    userPhone.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
          image: DecorationImage(
        fit: BoxFit.cover,
        image: AssetImage('assets/background.png'),
      )),
      child: Scaffold(
        appBar: AppBar(
          iconTheme: const IconThemeData(
            color: Color(0xff81a4ff), //색변경
          ),
          backgroundColor: Colors.white,
          elevation: 0.0,
        ),
        extendBodyBehindAppBar: true,
        backgroundColor: Colors.transparent,
        body: SingleChildScrollView(
          child: Center(
            child: Column(
              children: <Widget>[
                Container(
                  alignment: Alignment.center,
                  margin: const EdgeInsets.only(top: 100),
                  width: 250,
                  height: 60,
                  child: const Text(
                    '아이디 찾기',
                    style: TextStyle(
                      fontSize: 24.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Form(
                    child: Theme(
                        data: ThemeData(
                            primaryColor: const Color(0xff81a4ff),
                            inputDecorationTheme: const InputDecorationTheme(
                                labelStyle: TextStyle(
                              color: Color(0xff81a4ff),
                              fontSize: 15.0,
                            ))),
                        child: Column(
                          children: <Widget>[
                            Container(
                              margin: const EdgeInsets.only(top: 10),
                              width: 250,
                              height: 50,
                              child: TextField(
                                controller: userName,
                                decoration: const InputDecoration(
                                    border: OutlineInputBorder(),
                                    labelText: '이름',
                                    hintText: '이름을 입력하세요'),
                              ),
                            ),
                            Container(
                              margin: const EdgeInsets.only(top: 10),
                              width: 250,
                              height: 50,
                              child: TextField(
                                controller: userPhone,
                                decoration: const InputDecoration(
                                    border: OutlineInputBorder(),
                                    labelText: '전화번호',
                                    hintText: '전화번호를 입력하세요'),
                              ),
                            ),
                            Container(
                              margin: const EdgeInsets.only(top: 10),
                              width: 250,
                              height: 50,
                              child: ElevatedButton(
                                onPressed: () {
                                  if (isEnterInfo()) {
                                    // 사용자 존재 유무 체크(없으면 사용자 없습니다 스낵바)
                                    // 존재하면 인증번호 전송후 화면 넘어가기
                                    userId = isUserExist(context);
                                    if(userId) {
                                      // 인증번호 타이머 설정
                                    } else{
                                      showSnackBar(context, '해당 사용자가 존재하지 않습니다.');
                                    }
                                  }
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: const Color(0xff81a4ff),
                                  shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(10.0)),
                                ),
                                child: const Text(
                                  '인증번호 전송',
                                  style: TextStyle(fontSize: 20.0),
                                ),
                              ),
                            ),




                            Container(
                              margin: const EdgeInsets.only(top: 30),
                              width: 250,
                              height: 50,
                              child: TextField(
                                controller: token,
                                decoration: const InputDecoration(
                                    border: OutlineInputBorder(),
                                    labelText: '인증번호',
                                    hintText: '6자리 코드 입력'),
                              ),
                            ),
                            Container(
                              margin: const EdgeInsets.only(top: 10),
                              width: 250,
                              height: 50,
                              child: ElevatedButton(
                                onPressed: () {
                                  if (token.text.isEmpty) {
                                    showSnackBar(context, '인증번호를 입력하세요');
                                  }
                                  // verifyUser(context, userId);

                                  // // 임시로 인증번호 확인을 누르면 결과 화면으로 이동
                                  // Navigator.pushNamed(context, '/findIdResult');
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: const Color(0xff81a4ff),
                                  shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(10.0)),
                                ),
                                child: const Text(
                                  '인증번호 확인',
                                  style: TextStyle(fontSize: 20.0),
                                ),
                              ),
                            ),
                          ],
                        )))
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class FindIdResultScreen extends StatelessWidget {
  const FindIdResultScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
          image: DecorationImage(
        fit: BoxFit.cover,
        image: AssetImage('assets/background.png'),
      )),
      child: Scaffold(
        extendBodyBehindAppBar: true,
        backgroundColor: Colors.transparent,
        body: Center(
          child: Column(
            children: <Widget>[
              const SizedBox(height: 200),
              Text(userRealName+' 님의 아이디는', style: TextStyle(fontSize: 24),),
              const SizedBox(height: 50),
              Text(userLoginId+' 입니다.', style: TextStyle(fontSize: 24),),
              const SizedBox(height: 200),
              SizedBox(width: 100, height: 50, child: ElevatedButton(
                onPressed: (){
                  Navigator.pop(context);
                  Navigator.pop(context);
                  Navigator.pop(context);
                }, 
                child: const Text('확인', style: TextStyle(fontSize: 20)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xff81a4ff),
                  shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0)),
                  )
              ))
            ]
          ),
        ),
      ),
    );
  }
}