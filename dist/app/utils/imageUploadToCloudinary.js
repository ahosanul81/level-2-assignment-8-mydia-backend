"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.imageUploadToCloudinary = void 0;
const path_1 = __importDefault(require("path"));
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs_1 = __importDefault(require("fs"));
// Return "https" URLs by setting secure: true
cloudinary.config({
    cloud_name: "dgs2ywdd6",
    api_key: "926875478541658",
    api_secret: "GLepioc8wousbFfiMhnvm4H2lyM",
    secure: true,
});
const imageUploadToCloudinary = (files) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        asset_folder: "idea_hub",
    };
    try {
        // Upload the image
        if (files && files.length > 0) {
            let uploadedImages = [];
            for (const file of files) {
                const result = yield cloudinary.uploader.upload(file.path, options);
                uploadedImages.push(result.secure_url);
                fs_1.default.unlink(file.path, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
            }
            return uploadedImages && uploadedImages.length > 0 && uploadedImages;
        }
    }
    catch (error) {
        if (files && files.length > 0) {
            for (const file of files) {
                fs_1.default.unlink(file.path, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
            }
        }
    }
});
exports.imageUploadToCloudinary = imageUploadToCloudinary;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(process.cwd(), "/uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
exports.upload = multer({ storage: storage });
