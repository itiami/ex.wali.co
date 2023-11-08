import express from "express";
const router = express.Router()

import * as network from '../process_network/os_network.js';
import * as childProcess from '../process_network/child_process.js';


router.get("/", network.sysDetail);
router.get("/net", network.netLookup);
router.get("/dns", network.dnsLookup);
router.post("/cmd", childProcess.shellCmd);
router.get("/exec", childProcess.processExe);
router.get("/spawn", childProcess.processSpawn);
router.get("/execFile", childProcess.processExecFile);

export {
    router as default
}