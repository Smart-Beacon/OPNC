const Sequelize = require('sequelize');

// 클래스를 불러온다.
const facility     = require('./facility');
const statement    = require('./statement');
const door         = require('./door');
const user         = require('./user');
const accessRecord = require('./accessRecord');
const superAdmin   = require('./superAdmin');
const superControl = require('./superControl');
const admin        = require('./admin');
const adminControl = require('./adminControl');
const userAllow    = require('./userAllow');

const env = process.env.NODE_ENV || 'development';

// config/config.json 파일에 있는 설정값들을 불러온다.
// config객체의 env변수(development)키 의 객체값들을 불러온다.
// 즉, 데이터베이스 설정을 불러온다고 말할 수 있다.
const config = require("../config/config.json")[env]

const db = {};

// new Sequelize를 통해 MySQL 연결 객체를 생성한다.
const sequelize = new Sequelize(config.database, config.username, config.password, config)

// 연결객체를 나중에 재사용하기 위해 db.sequelize에 넣어둔다.
db.sequelize = sequelize; 

// 모델 클래스를 넣음.
db.facility     = facility;
db.statement    = statement;
db.door         = door;
db.user         = user;
db.accessRecord = accessRecord;
db.superAdmin   = superAdmin;
db.superControl = superControl;
db.admin        = admin;
db.adminControl = adminControl;
db.userAllow    = userAllow;

// 모델과 테이블 종합적인 연결이 설정된다.
facility.init(sequelize);
statement.init(sequelize);
door.init(sequelize);
user.init(sequelize);
accessRecord.init(sequelize);
superAdmin.init(sequelize);
superControl.init(sequelize);
admin.init(sequelize);
adminControl.init(sequelize);
userAllow.init(sequelize);

// db객체 안에 있는 모델들 간의 관계가 설정된다.
facility.associate(db);
statement.associate(db);
door.associate(db);
user.associate(db);
accessRecord.associate(db);
superAdmin.associate(db);
superControl.associate(db);
admin.associate(db);
adminControl.associate(db);
userAllow.associate(db);

// 모듈로 꺼낸다.
module.exports = db;