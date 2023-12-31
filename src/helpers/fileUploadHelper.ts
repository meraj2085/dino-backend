import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
// import * as fs from 'fs';
import multer from 'multer';
import config from '../config';
import { ICloudinaryResponse, IUploadFile } from '../interfaces/file';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const uploadToCloudinary = async (
  file: IUploadFile
): Promise<ICloudinaryResponse | null> => {
  return new Promise((resolve, reject) => {
    const cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: 'uploads',
        display_name: file.originalname,
        original_filename: file.originalname,
      },
      (error: any, result: any) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
  });
};

export const fileUploadHelper = {
  uploadToCloudinary,
  upload,
};
