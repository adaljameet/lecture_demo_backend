var express = require('express');
var router = express.Router();
var usercontroller = require('../controllers/usercontroller');
const auth = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "uploads/")
    },
    filename: (req, file, cd) => {
        cd(null, Date.now() + "_" + file.originalname);
    }
})
const upload = multer({ storage: storage, limits: { fileSize: 2 * 1024 * 1024 } });

router.get('/userlist', auth, usercontroller.AllUser)
router.post('/addusers', upload.single('ProfileImage'), usercontroller.Createuser);
router.post('/userlogin', usercontroller.Loginuser)


module.exports = router;
