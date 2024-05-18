import * as express from "express";
import { authentification } from "../middleware/authentification";
import { MembershipPackageController } from "../controlllers/membershipPackage.controller";
import { authorization } from "../middleware/authorization";

const router  = express.Router();

router.get("/package",authentification,MembershipPackageController.getMembershipPackages);
router.post("/package",
    authentification,
    authorization(["admin"]),
    MembershipPackageController.createMembershipPackage
);

router.get("/package/:id",
    authentification,
    MembershipPackageController.getMembershipPackageById
);

router.put("/package/:id",
    authentification,
    authorization(["admin"]),
    MembershipPackageController.updateMemebershipPackage
);

router.delete(
    "/package/:id",
    authentification,
    authorization(["admin"]),
    MembershipPackageController.deleteMembershipPackage
);

export { router as membershipPackageRouter};