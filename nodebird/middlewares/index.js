exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).send('로그인 필요');
    }
  }; // 패스포트 통해서 로그인 했으면 넘어가고, 안되어있으면 에러 메세지 전송
  
  exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else {
      const message = encodeURIComponent('로그인한 상태입니다.');
      res.redirect(`/?error=${message}`);
    }
  }; // 패스포트 통해서 로그인 안했으면 넘어가고, 되어 있으면 에러 메세지 전송