
import * as express from 'express'
import { authentification } from '../middleware/authentification';
import { authorization } from '../middleware/authorization';
import { MembershipUserController } from '../controlllers/membershipUser.controller';


const router= express.Router();



router.get('/user',
    authentification,
    authorization(['admin']),
    MembershipUserController.getMembershipUsers);
router.post('/user',
    authentification,
    authorization(['admin']),
    MembershipUserController.createMembershipUser
);

router.get('/user/:id',
    authentification,
    authorization(["admin"]),
    MembershipUserController.getMembershipUserById
);

router.put('/user/:id',
    authentification,
    authorization(['admin']),
    MembershipUserController.updateMembershipUser
);

router.delete('/user/:id',
    authentification,
    authorization(["admin"]),
    MembershipUserController.deleteMenbershipUser
)

export { router as MembershipUserRouter};