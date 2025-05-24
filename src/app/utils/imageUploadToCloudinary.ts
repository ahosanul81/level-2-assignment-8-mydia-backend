import path from "path";
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
import fs from "fs";
import { IFile } from "../interface/fileType";
// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: "dgs2ywdd6",
  api_key: "926875478541658",
  api_secret: "GLepioc8wousbFfiMhnvm4H2lyM",
  secure: true,
});

export const imageUploadToCloudinary = async (files: IFile[]) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    asset_folder: "idea_hub",
  };

  try {
    // Upload the image
    if (files && files.length > 0) {
      let uploadedImages: string[] = [];
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path, options);
        uploadedImages.push(result.secure_url);

        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }

      return uploadedImages && uploadedImages.length > 0 && uploadedImages;
    }
  } catch (error) {
    if (files && files.length > 0) {
      for (const file of files) {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }
    }
  }
};

const storage = multer.diskStorage({
  destination: function (req: any, file: IFile[], cb: any) {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
