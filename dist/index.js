"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const primsa_1 = __importDefault(require("./primsa"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/signup", async (req, res) => {
    await createuser(req.body);
    res.json({
        message: "successful"
    });
});
async function createuser(userdetails) {
    await primsa_1.default.user.create({
        data: {
            username: userdetails.username,
            password: userdetails.password,
            email: userdetails.email
        }
    });
    console.log("user created");
}
app.listen(3000);
//# sourceMappingURL=index.js.map