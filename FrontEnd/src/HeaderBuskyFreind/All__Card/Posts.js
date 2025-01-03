import React from 'react'
import "./posts.css"
import { Avatar, AvatarBadge, AvatarGroup, WrapItem } from '@chakra-ui/react'

const Posts = () => {
  return (
    <div className='busky--app-card-post'>

        <div className='busky-app-avatar'>
        <WrapItem>
    <Avatar
      size='md'
      name='Prosper Otemuyiwa'
      src='https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:bkio7p7uihbtlunjnlbdffru/bafkreick3nj6kkxwk4nu5xw5rw6l7lb4w4mpdljg33y6xxikbwbag3sp24@jpeg'
    />{' '}
  </WrapItem>

        </div>

        <div className='busky-app-content'>
              <div className='busky-app-info-user'><h2 className='busky-username'>Avi Henriques</h2>  {/*  <h3>nahdigyht@gmail.com</h3>*/}</div>  
             <div className='busky-app-descibe-user'><p>Bear 402, one of the great matriarchs of Brooks River, has a pretty good fall bod coming on! 402 is   </p></div>
             <div className='busky-app-info-img'>
     <img src='https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:av365djkws3xht7w4jhgsti4/bafkreid4eegwkng3piwptalh3szmfnb6xtdmgrzmbmgu2ol3t7oxaignma@jpeg' alt=''/></div>
         
          
             <div className='busky-app-info-icons'>

             <div className='busky--app-info-icons-1'>
                <img src='../commenter.png'  alt=''/>
                <span>1</span>
             </div>
             
             <div className='busky--app-info-icons-1'>
                <img src='../arrow.png'  alt=''/>
                <span>9</span>
             </div>

             <div className='busky--app-info-icons-1'>
                <img src='../amour.png'  alt=''/>
                <span>49</span>
             </div>

             <div className='busky--app-info-icons-1'>
                <img src='../plus.png'  alt=''/>
                 
             </div>

             </div>
        </div>
        
    </div>
  )
}

export default Posts