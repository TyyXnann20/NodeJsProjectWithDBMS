import {useEffect, useState} from 'react'
import { request } from '../../util/api'
import { Button, Image, Space, Table, message } from 'antd'
import { DeleteFilled, EditFilled, UserOutlined } from '@ant-design/icons'
import { Config, formatDateForClient, isEmptyOrNull } from '../../util/service'
import PageContainer from '../container/PageContainer'
import ModalForm from './ModalForm'
const PicPage = () => {
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
        request("get","pic/get-list",{}).then(res=>{
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
        form.append("model",item.name)
        if(imgObj != null){
            form.append("image",imgObj,imgObj.name)
        }
        var method = "post"
        var url = "pic/create"
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
                        title : "id",
                        render : (item,items,index) => index + 1,
                        key : "id"
                    },
                    {
                        title : "Name",
                        key : "model",
                        dataIndex:'model'
                    },
                    {
                        title: "Image",
                        dataIndex: "image",
                        key: "image",
                        render: (item) => {
                          return (
                            <div style={{ textAlign: "center" }}>
                              {item != null ? (
                                <img
                                  src={Config.imagePath + item}
                                  alt={item}
                                  width={50}
                                  height={60}
                                />
                              ) : (
                                <UserOutlined style={{ fontSize: 50 }} />
                              )}
                            </div>
                          );
                        },
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

export default PicPage;