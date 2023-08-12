import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary } from 'cloudinary';

import Post from '../mongoose/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name:"dcvoncrkv",
    api_key:"357865393187632",
    api_secret:"z7ruz1JtuqmO6ZV6fC_QXtHPPtA",
});

router.route("/").get(async(req ,res) => {
    try {
        const posts = await Post.find({});
        console.log(posts)

        res.status(200).json({success:true , data:posts});
    } catch (error) {
        res.status(200).json({success:false , message:error});
    }

});

router.route("/").post(async(req , res)=>{
    try{
        const {name , prompt , photo} = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
        
        try {
            //const photoUrl = await cloudinary.uploader.upload(photo,{timeout:120000}, function(error,result){});
            console.log('Photo uploaded:', photoUrl);
          } catch (error) {
            console.error('Error uploading photo:', error);
          }
        console.log(photoUrl)
        const newPost = await Post.create({
            name,
            prompt,
            photo:photoUrl.url,
        });

        //console.log(newPost);

        res.status(201).json({success:true , data:newPost});

    }catch(err){
        res.status(500).json({
            success:false, message:err
        })
    }
})

export default router;