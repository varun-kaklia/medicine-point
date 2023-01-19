import React,{useState} from 'react'

const Pagination = ({ pages, setCurrentPage }) => {
    const [oldPageValue, setOldPageValue] = useState(0)
    const [changePageNumber, setChangePageNumber] = useState(5)
    
    const pageNumbers = []
    // console.log("Pages",pages)
    for (let i=1; i <= pages; i++){
        pageNumbers.push(i)
    }
    
    const handlePlus = (e) => {
        e.preventDefault()
        setOldPageValue(changePageNumber)
        setChangePageNumber(changePageNumber + 5)
    }
    const handleMinus = (e) => {
        e.preventDefault()
        if (changePageNumber !== 5) {
            setOldPageValue(oldPageValue - 5)
            setChangePageNumber(changePageNumber - 5)
        } else {
            setOldPageValue(0)
            setChangePageNumber(5)
        }
    }

  return (
      <div className='block p-2 w-fit rounded border-primary'>
          {changePageNumber !== 5 ?
              <button className="px-4 py-2 rounded border hover:border-primary bg-primary text-slate-100 hover:cursor-pointer hover:bg-transparent hover:text-primary"
onClick={(e)=>handleMinus(e)}
              >{"<<"}</button> : <button className='hidden'>{ "<<"}</button>}
        {pageNumbers && pageNumbers.slice(oldPageValue,changePageNumber).map((number,index)=>(
            <button key={index} onClick={()=>setCurrentPage(number)} className="px-4 py-2 rounded border hover:border-primary bg-primary text-slate-100 hover:cursor-pointer hover:bg-transparent hover:text-primary">
            <div>
                {number}
            </div>
            </button>
        ))}
          <button className="px-4 py-2 rounded border hover:border-primary bg-primary text-slate-100 hover:cursor-pointer hover:bg-transparent hover:text-primary"
          onClick={(e)=>handlePlus(e)}
          >{">>"}</button>
    </div>
  )
}

export default Pagination