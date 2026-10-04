import React from 'react'
import { IoCloseCircle } from 'react-icons/io5'

function ImagePreview({images, existingImages, setFormData}) {

  const removeExistingImage = (indexToRemove)=>{

      setFormData((prev)=>({
         ...prev, 
         existingImages: prev.existingImages.filter((_,index) => index !== indexToRemove)
      }))
  }

  const removeNewImage = (indexToRemove)=>{
     setFormData((prev)=>({
        ...prev,
        images: prev.images.filter((_, index)=> index !== indexToRemove)
     }))
  }

  return (
    <div className='w-full '>
       <h2 className='font-medium'>Preview Images</h2>
       {images.length === 0 && existingImages.length === 0 && (
           <div className='flex justify-center items-center rounded bg-gray-100 border h-40'>
               <h1>No Images Selected</h1>
           </div>
       )}
         <div className='w-full gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
          {images.map((image, index)=>(
            <div key={index} className='relative overflow-hidden shadow-sm group border'>
              <img className='w-full w-40 object-cover' src={URL.createObjectURL(image)} alt={`preview ${index + 1}` } />
              <button type="button" onClick={()=> removeNewImage(index)}
                       className="absolute top-2 right-2 text-red-600"
                  >
                  <IoCloseCircle size={22} />

              </button>
            </div>
         ))}

          {existingImages.map((image, index)=>(
            <div key={index} className='relative overflow-hidden shadow-sm group border'>
              <img className='w-full w-40 object-cover' src={image?.url} alt={`preview ${index + 1}` } />

              <button type="button" onClick={()=> removeExistingImage(index)}
                       className="absolute top-2 right-2 text-red-600"
                  >
                  <IoCloseCircle size={22} />

              </button>
            </div>
         ))}

         </div>
    </div>
  )
}

export default ImagePreview