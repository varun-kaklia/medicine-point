import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { getSliderImage, updateSliderImage } from '../../actions/sliderAction'

const SlideImageEdit = () => {
  const [image,setImage] = useState('')
  const [showImage, setShowImage] = useState(null)
  const [name,setName] = useState("")
  const dispatch = useDispatch()
  const getImageSlider = useSelector((state)=>state.getSliderImageReducer)
  const {sliderImage} = getImageSlider
  
  useEffect(()=>{
    if(sliderImage){
      setImage(sliderImage.image)
    }
  },[sliderImage])
  
  useLayoutEffect(()=>{
    dispatch(getSliderImage())
  },[dispatch])

  const handleClick = (e)=>{
    e.preventDefault()
    dispatch(updateSliderImage(name,image))
  }

  const chooseImage = (file) => {
    window.URL.revokeObjectURL(showImage);
    setShowImage(window.URL.createObjectURL(file));
    setImage(file)
  };

  return (
    <div>
        <div className='grid mt-4 md:mt-0 border rounded shadow grid-cols-2'>
            <div className='col-span-2'>
            <div className='w-full rounded'>
            <img src={showImage ? showImage:`/images/${image}`} alt="Medicine Point- Best Medicine Wholeseller in Noida..!" className="p-2 rounded-sm" />
            </div>
            <form encType="multipart/form-data">
            <div>
                  <label htmlFor="name" className="text-gray-600 mb-2 block">
                    Name of Image
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:border-primary placeholder-gray-400"
                    placeholder="Enter New Name of Image"
                  />
                </div>
            <div className='w-full'>
              <label htmlFor="image" className="text-gray-600 p-2">
                Upload Slider Image <span className="px-2 text-red-600">(Compulsory**)</span>
              </label>
              <input
                type="file"
                name="image"
                accept=".jpg, .png, .jpeg"
                onChange={(e) => chooseImage(e.target.files[0])}
                className="block w-full mt-2 border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded  hover:cursor-pointer   file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-slate-100 file:text-primary
                hover:file:bg-slate-100"
              />
            </div>
            </form>
            <div className='flex justify-center my-2'>
            <button onClick={(e)=>handleClick(e)} className='p-2 bg-primary text-slate-100 hover:bg-transparent hover:border-secondary border hover:text-primary transition rounded border-primary'>Submit Image</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default SlideImageEdit