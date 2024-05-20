import * as express from "express";
import { authentification } from "../middleware/authentification";
import { MembershipFeaturesController } from "../controlllers/membershipFeatures.controller";
import { authorization } from "../middleware/authorization";

const router =  express.Router();


router.get('/features',authentification,MembershipFeaturesController.getMembershipFeatures);
router.post('/features',
    authentification,
    authorization(['admin']),
    MembershipFeaturesController.createMembershipFeatures
);

router.get('/features/:id',
    authentification,
    MembershipFeaturesController.getMembershipFeatureById
);

router.put('/features/:id',
    authentification,
    authorization(['admin']),
    MembershipFeaturesController.updateMemebershipFeature
);

router.delete('/features/:id',
    authentification,
    authorization(["admin"]),
    MembershipFeaturesController.deleteMembershipFeature
)

export { router as MembershipFeatureRouter};