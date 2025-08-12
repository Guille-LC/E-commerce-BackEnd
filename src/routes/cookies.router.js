import { Router } from "express";
import cookieParser from "cookie-parser";

const router = Router();

router.use(cookieParser('s3cr3tc00k13p4ss'))

let cookieUno = "codercookie"
let cookieDos = "cookieNumberTwo"

router.get("/setCookie", (req,res) => {
    res.cookie(cookieUno, "Cookie 1 (signed)", {signed: true});
    res.cookie(cookieDos, "Segunda cookie con firma", {signed: true}).send(`La cookie ${cookieUno} y ${cookieDos} fueron asignadas.`)
})

router.get("/getCookie", (req,res) => {
    res.send(req.signedCookies)
})

export default router;