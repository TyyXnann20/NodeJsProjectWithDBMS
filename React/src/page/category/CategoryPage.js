import {useEffect, useState} from 'react'
import { request } from '../../util/api'
import { Button, Image, Space, Table, message } from 'antd'
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { Config, formatDateForClient, isEmptyOrNull } from '../../util/service'
import PageContainer from '../container/PageContainer'
import ModalForm from './ModalForm'
const CategoryPage = () => {
    const [list,setList] = useState([])
    const [loading,setLoading] = useState(false)
    const [visibleModal,setVisibleModal] = useState(false)
    const [items,setItems] = useState(null)

    const [imgObj,setImgObj] = useState(null)
    const [imgFile,setImgFile] = useState(null)


    useEffect(()=>{
        getList()
    },[])

    const getList = () => {
        setLoading(true)
        request("get","category/get-list",{}).then(res=>{
            setLoading(false)
            if(res.status == 200){
                var data = res.data 
                setList(data.list)
            }
        })
    }

    const onClickBtnRight = () => {
        setVisibleModal(true)
    }
    const onCloseModalForm = () => {
        setVisibleModal(false)
        setImgFile(null)
        setImgObj(null)
        setItems(null)
    }
    const onClickEditBtn = (param) => {
        setItems(param)
        setVisibleModal(true)
    }
    const onClickDeleteBtn  = (id) => {
        setLoading(true)
        request("delete","category/remove/"+id,{}).then(res=>{
            setLoading(false)
            if(res.status == 200){
                message.success(res.data.message)
                getList()
            }
        })
    }
    const onFinish = (item) => {
        setVisibleModal(false)
        setLoading(true)
        var form = new FormData()
        form.append("name",item.name)
        if(imgObj != null){
            form.append("image",imgObj,imgObj.name)
        }
        var method = "post"
        var url = "category/create"
        if(items != null){
            method = "put"
            url = "category/update"
            form.append("category_id",items.category_id)
        }
        
        request(method,url,form).then(res=>{
            if(res.status == 200){
                message.success(res.data.message)
                setItems(null)
                getList()
                setImgFile(null)
                setImgObj(null)
            }
        })
        
    }

    const onSearch = (text) => {
        setLoading(true)
        var param = ""
        if(!isEmptyOrNull(text)){
            param = "?text_search="+text // query parameter
            // param += "&from_date=2023-05-02&to_date=2023-05-02" // YYYY-MM-DD
        }
        
        request("get","category/get-list"+param,{}).then(res=>{
            setLoading(false)
            if(res.status == 200){
                var data = res.data 
                setList(data.list)
            }
        })
    }

    const  onChnageFile = (e) => {
        setImgObj(e.target.files[0])
        setImgFile(URL.createObjectURL(e.target.files[0]))

        // setImage(e.target.files) //e.target.files[0]
        // var imageTpm = []
        // for (let i = 0; i < e.target.files.length; i++) {
        //     imageTpm.push(URL.createObjectURL(e.target.files[i]))
        // }
        
    }

    return (
        <PageContainer
            pageTitle='Category'
            loading={loading}
            btnRight = "New Category"
            onClickBtnRight = {onClickBtnRight}
            search={{
                title : "Category name",
                allowClear:true
            }}
            onSearch={onSearch}
        >
            <Table
            bordered={true}
                columns={[
                    {
                        title : "category_id",
                        render : (item,items,index) => index + 1,
                        key : "category_id"
                    },
                    {
                        title : "Name",
                        key : "Name",
                        dataIndex:'name'
                    },
                   
                   
                   
                    {
                        title : "Action",
                        key : "Action",
                        render : (item,items,index) => {
                            return (
                                <Space>
                                    <Button onClick={()=>onClickDeleteBtn(items.category_id)} size='small' danger><DeleteFilled/></Button>
                                    <Button onClick={()=>onClickEditBtn(items)} size='small' type="primary" ><EditFilled/></Button>
                                </Space>
                            )
                        }
                    },
                ]}
                dataSource={list}
            />
            <ModalForm 
                items={items}
                imgFile={imgFile}
                open={visibleModal}
                title={items != null ? "Update Category" : "New Category"}
                onCancel={onCloseModalForm}
                onFinish={onFinish}
                onChnageFile={onChnageFile}
            />
        </PageContainer>
    )
}

export default CategoryPage;