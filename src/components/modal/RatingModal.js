import React,{useState} from 'react'
import {Modal, Button } from 'antd'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {StarOutlined} from '@ant-design/icons'
import {useHistory,useParams } from 'react-router-dom'

const RatingModal = ({children}) => {
    let history = useHistory();
    let {slug}  = useParams();

    const{ user} = useSelector((state)=> ({...state}));
    const [modalVisibile,setModalVisible] =useState(false)
    
    const handleModal = () => {
        if(user && user.token){
            setModalVisible(true)
        }else{
            history.push({
                pathname:"/login",
                state:{ from:`/product/${slug}`}

            })
        }
    }
    return (
       <>
       <div onClick={handleModal}>
       <StarOutlined className="text-danger"/> <br/>
       {user? "Leave Rating" : "Login to Leave Rating"}
       </div>

       <Modal
        title="Leave Rating"
        centered 
        visible={modalVisibile}
        onOk={
        ()=> {
        setModalVisible(false)
        toast.success("Thanks for your Review. It will appear soon!")
        }}

        onCancel={()=>setModalVisible(false)}
        >
       {children}
       </Modal>
       </>
    )
}

export default RatingModal;
