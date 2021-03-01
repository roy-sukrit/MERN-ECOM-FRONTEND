import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import {useSelector}  from 'react-redux'
import { Avatar ,Badge} from "antd";

const FileUpload = ({values,setValues,setLoading}) => {

    const {user} = useSelector((state) => ({...state}))

    const fileUploadAndResize = (e) =>{
    //   console.log("files--->",e.target.files)
      let files = e.target.files;
      let allUploadedFiles = values.images;

      if(files){
        setLoading(true)
      
        for(let i=0;i< files.length ;i++){
        Resizer.imageFileResizer(
            files[i],
            720,
            720,
            'JPEG',
            100,
            0,
            (uri) => {
                // console.log(uri);
                axios
                  .post(
                    `${process.env.REACT_APP_API}/uploadimages`,
                    { image: uri },
                    {
                      headers: {
                        authtoken: user ? user.token : "",
                      },
                    }
                  )
            .then(res=>{

        console.log("IMAGE UPLOAD RES",res);
        setLoading(false);
        allUploadedFiles.push(res.data);
        setValues({...values,images:allUploadedFiles});
    })
        .catch(err => {
            setLoading(false);
            console.log("Cloudinary Upload error",err)
        })


            },
            'base64'
          );
        }
        
      }

      //resize
      //send back to server cloudinary 
      //res has url of images  from cloudinary
      //set url to images array in parent component - Product Create
    }

    const handleImageRemove = (public_id) =>{
        setLoading(true)
        // console.log("REMOVE IMG ====>", id);
        axios.post(`${process.env.REACT_APP_API}/removeimage`, {public_id} , 
        {headers:{
            authtoken:user?user.token:''
        }})
        .then((res)=>{
          setLoading(false)
          const {images} = values;
          let filteredImages = images.filter((item)=>{
           return item.public_id !== public_id;
          })

          setValues({...values , images :filteredImages})


        })
        .catch((err)=>{
        console.log(err);
        setLoading(false);
        })
    }

    return (
        <>
        
        <div className="row">
        {values.images && 
          values.images.map((image) => (
            <Badge
             count="X" 
             key={image.public_id}
             onClick={() => handleImageRemove(image.public_id)}
             style={{cursor:"pointer"}}
             >
            	<Avatar
                key={image.public_id}
            	 src={image.url}
            	 size={150}
            	 className="ml-3"
            	 shape="square"
            	
            	 />
            </Badge>
          )) 
         }
        
        </div>

        

        <div className="row">
        <label className="btn btn-primary btn-raised mt-5" >Choose file
        <input
        type="file"
        multiple
        hidden
        accept="images/*"
        onChange={fileUploadAndResize}
        />
        </label>
        </div>

        
        </>
    )
}

export default FileUpload
