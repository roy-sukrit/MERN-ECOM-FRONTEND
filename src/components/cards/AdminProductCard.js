import React from 'react'
import bydefault from '../../images/default.png'
import {EditOutlined , DeleteOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import { Card } from 'antd';
const {Meta} = Card;


const AdminProductCard = ({product,key,handleRemove}) => {

    const {title,description,images,slug} = product;
    return (
        <Card
        hoverable
                
      
        cover={
            <img
            
            src={images &&  images.length ? images[0].url :bydefault}
            style={{height: "150px", objectFit:"cover"}}        
            className=" img-fluid "      
        />

        }
        actions={[

            <Link to={`/admin/product/${slug}`}>
                <EditOutlined className="text-success"/>
            </Link>,
            <DeleteOutlined
            onClick={()=> handleRemove(slug)}
             className="text-danger"/>
        ]}
        >
        <Meta 
        title={title}
        description={`${description && description.substring(0,40)}...`}
        />

        
        </Card>
    )
}

export default AdminProductCard;
