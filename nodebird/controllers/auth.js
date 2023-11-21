const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

// 회원 가입 // 패스포트와 관련 없음
exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12); // 비밀번호 암호화
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

// 로그인
exports.login = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) { // 서버실패
      console.error(authError);
      return next(authError);
    }
    if (!user) { // 로직실패
      return res.redirect(`/?error=${info.message}`);
    }
    return req.login(user, (loginError) => { // 로그인 성공
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

// 로그아웃
exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
};