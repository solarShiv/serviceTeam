const {check} = require('express-validator');
exports.register = [

    check('empId', 'Employee Id is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('mobile','Mobile No. should be contains only 10 digits').isLength({
        min:10,
        max:10
    }),
    check('department', 'Select any one Department').not().isEmpty(),
    check('password','Password must be greater then 8 Characters, and Contains one capital letter, one spacial symbol, one small letter and numbers')
    .isStrongPassword({
        minLength:8,
        minLowercase:1,
        minUppercase:1,
        minSymbols:1,
        minNumbers:1
    }),
],
exports.login =[
    check('password','Password is incorrect')
    .isStrongPassword({
        minLength:8,
    }),
    check('empIdOrMobile', 'Employee Id Or mobile number are required for login.').not().isEmpty(),
]