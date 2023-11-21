const Sequelize = require('sequelize');
const fs = require('fs'); // 파일 읽기
const path = require('path'); // 파일 경로 
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};
// 데이터베이스 연결 만들기
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

const basename = path.basename(__filename); // 파일 이름에서 마지막을 가리킴. 즉, index.js를 가리킨다.
fs
  .readdirSync(__dirname) // 현재 폴더의 모든 파일을 조회
  .filter(file => { // 숨김 파일, index.js, js 확장자가 아닌 파일 필터링
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => { // 해당 파일의 모델 불러와서 init
    const model = require(path.join(__dirname, file));
    console.log(file, model.name);
    db[model.name] = model;
    model.initiate(sequelize);
  });

Object.keys(db).forEach(modelName => { // associate 호출
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;