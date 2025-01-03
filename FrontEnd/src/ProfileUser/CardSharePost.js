import React, { useState } from 'react'

const CardSharePost = ({item}) => {
    const [Likes,setLikes] = useState(0)
    const [test,settest] = useState(false)
    console.log(item)
  return (
    <div className='postShare'>

    <div className='dataSharePost'>
       

      <div className='imgDataPost'><img src='https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:sussmqg7qh7ja7ma46f3x2aj/bafkreido5og6sxgkdr3cf2uzfuuujjgqaw3ghhwiugai43hltq4jvlee6m@jpeg' alt=''/></div>
    
      <div className='contentDataPost'> 
        <div className='item1ContentDataPost'><h2 style={{color:"white",fontWeight:"bold"}}>{item?.ownerUserName}.flex.app</h2> <h1 style={{color:"grey"}}>@{item?.ownerUserName}.bsky.social  in {new Date(item.post.createdAt).getFullYear()}</h1></div>
        <div className='item2ContentDataPost' style={{color:"grey"}}>#000012</div>
        <div className='textDtaSharePost'>
        <p> {item.post.text}</p>
      </div>
      </div> 



    </div>

    <div className='dataImgPost'>


    {item.post.imgItem.includes('/video/upload') ? (
    <video controls  style={{width:"80%",height:"300px",objectFit:"cover",marginLeft:"15px"}} >
      <source src={item.post.imgItem} type="video/mp4" />
       
    </video>
  ) : (
    <img src={item.post.imgItem?item.post.imgItem:""} alt='' />
  )}

    </div>
    

  <div className='reactDataImgPost'>
  <div className='busky--app-info-icons-1'  style={{cursor:"pointer"}}>
          <img src='./commenter.png' alt='' />
          <span>{0}</span>
        </div>

        <div className='busky--app-info-icons-1'  style={{cursor:"pointer"}}>
          <img src='./arrow.png' alt='' />
          <span>{0}</span>
        </div>

        <div className='busky--app-info-icons-1'  style={{cursor:"pointer"}}>
         
          {test ? <svg fill="none" width="18" viewBox="0 0 24 24" height="18" className="r-84gixx" style={{ color: "red" }} onClick={()=>{ settest((prev)=>!prev)
            setLikes((prev)=>prev-1 )
          }}>  
                <path fill="#ec4899" fillRule="evenodd" clipRule="evenodd" d="M12.489 21.372c8.528-4.78 10.626-10.47 9.022-14.47-.779-1.941-2.414-3.333-4.342-3.763-1.697-.378-3.552.003-5.169 1.287-1.617-1.284-3.472-1.665-5.17-1.287-1.927.43-3.562 1.822-4.34 3.764-1.605 4 .493 9.69 9.021 14.47a1 1 0 0 0 .978 0Z"></path>
              </svg>  :  <img src='./amour.png' alt=''  onClick={()=>{setLikes((prev)=>prev+1) 
                settest((prev)=>!prev)
              }}/>  }
          <span>{Likes}</span>
        </div>

        <div className='busky--app-info-icons-1'  style={{cursor:"pointer"}}>
          <img src='./plus.png' alt='' />
       
        </div>


  </div>
  
  
   </div>
  )
}

export default CardSharePost