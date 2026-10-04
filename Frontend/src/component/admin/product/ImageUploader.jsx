import React, { useRef, useState } from 'react'
import { FiUploadCloud } from "react-icons/fi";
import { toast } from 'react-toastify';

function ImageUploader({images, setFormData}) {
   const fileInputRef = useRef(null); 
   const [isDragging, setIsDragging] = useState(false);

   const MAX_IMAGES = 6;
   const MAX_SIZE = 2 * 1024 * 1024;

   const handleChooseFile = ()=>{
      fileInputRef.current.click();
   }

   const validateImages = (files)=>{
      let validFiles = [];

      for(let file of files){
           if(!file.type.startsWith("image/")){
             toast.error(`${file.name} is not a image`);
             continue;
           }

           if(file.size >= MAX_SIZE){
              toast.error(`${file.name} is larger than 2 MB`);
              continue;
           }

           validFiles.push(file);
      }

      return validFiles;
      
   }

   const addImages = (selectedFiles)=>{
       const files = validateImages(Array.from(selectedFiles));

       if(files.length === 0) return;

       const totalImages = files.length + images.length;

       if(totalImages > MAX_IMAGES){
         toast.error(`You can upload maximum ${MAX_IMAGES} images`)
         return;
      }

       setFormData((prev)=>({
         ...prev, 
         images: [...prev.images, ...files]
   }))
   }

   const handleFileChange =  (e)=>{
       addImages(e.target.files);
       e.target.value = "";
   }

   const handleDragEnter = (e)=>{
      e.preventDefault();

      setIsDragging(true);
   }

   const handleDragLeave = (e)=>{
      e.preventDefault();

      setIsDragging(false);
   }

   const handleDragOver = (e)=>{
      e.preventDefault();
   }

   const handleDrop = (e)=>{
      e.preventDefault();

      setIsDragging(false);

      addImages(e.dataTransfer.files);

   }

  return (
    <div>
       <h1 className='font-medium'>Product Images<span className='text-red-600'>*</span></h1>
       <input onChange={handleFileChange} type='file' multiple ref={fileInputRef} accept='image/*' className='hidden'  />
       <div onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} 
            className={`w-full flex flex-col justify-center items-center border-2 gap-2  py-4 bg-gray-100
             ${isDragging ? "border-blue-600 bg-blue-600": "border-dashed border-gray-600"}
           `}
             >
          <span className='text-2xl text-blue-500'><FiUploadCloud/></span>
           <p>Drag & Drop images here</p>
           <p>or</p>
           <button type='button' onClick={handleChooseFile} className='bg-blue-500 rounded p-2 text-white font-medium cursor-pointer hover:bg-blue-600'>Upload Image</button>
       </div>
    </div>
  )
}

export default ImageUploader


