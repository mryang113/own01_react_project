import React, { Component } from 'react'
import {Card,Button,Select,Input,Table, message} from 'antd'
import { SearchOutlined,PlusCircleOutlined } from '@ant-design/icons';
import {reqProductList,reqChangeProdStatus,reqSearchProduct} from '../../ajax'
import {PAGE_SIZE} from '../../config'

const { Option } = Select;

export default class Product extends Component {
  state = {
    productList:[], //商品列表
    total: 0, //商品总数
    isLoading: false, //是否处于加载中
    searchType: 'productName', //搜索类型
    keyWord: '', //搜索关键词
    current: 1
  }

  // 这是上架与下架的操作的逻辑
  changeStatus = async({_id,status}) => {
    // console.log(_id,status);
    if(status === 1) status = 2
    else status = 1
    let result = await reqChangeProdStatus(_id,status)
    const {msg} = result
    const _status = result.status
    // console.log(_status,data,meg);
    if(_status === 0){
      let arr = [...this.state.productList]
      arr.forEach((item) => {
        if(item._id === _id){
          item.status = status
        }
      })
      this.setState({productList: arr})
    }else{
      message.error(msg)
    }
    
  }  

  // 搜索 与初始化请求列表的逻辑
  getProductList = async(number) => {
    this.setState({isLoading:true, current:number}) //1.改为加载中 2.维护当前点击的页码
    let result //这一步为后来复用改装的 定义好result接收服务器返回数据
    if(this.isSearch){
      //2 如果是搜索
      const {keyWord,searchType} = this.state
      result = await reqSearchProduct(searchType,keyWord,number,PAGE_SIZE)
    }else{ //1 如果是初始化
      result = await reqProductList(number,PAGE_SIZE)
    }
    // console.log(result);
    //从result中获取数据
    const {status,data,msg} = result
    if(status === 0){
      const {total,list} = data
      // console.log(data);
      this.setState({productList: list,total,isLoading:false})
    }else{
      message.error(msg)
      this.setState({isLoading:false})
    }
  }

  componentDidMount(){
    this.getProductList(1)
  }
  
  render() {

    const dataSource = this.state.productList
    
    // 列 详情和修改
    const columns = [
      {
        title: '商品',
        dataIndex: 'name',
        key: 'name',
        width: '18%'
      },
      {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
        width: '60%'
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render: (price) => "￥" +price
      },
      {
        title: '状态',
        // dataIndex: 'status',
        key: 'status',
        align: 'center',
        render:(item) => (
          <div>
            <Button 
            onClick={() => {this.changeStatus(item)}}
            type={item.status === 1 ? "danger" : "primary"}
            >
              {item.status === 1 ? "下架" : "上架"}>
            </Button>
            <br/>
            <span>{item.status === 1 ? "在售" : "售罄"}</span>
          </div>
        )
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: 'operation',
        align: 'center',
        render:(id) => (
          <div>
            <Button onClick={() => {this.props.history.push(`/admin/prod_about/product/detail/${id}`)}} type="link">详情</Button>
            <br/>
            <Button onClick={() => {this.props.history.push(`/admin/prod_about/product/update/${id}`)}} type="link">修改</Button>
          </div>
        )
      },
    ];
    
    return (
      <Card 
        title={
          <div> 
            <Select onChange={(value) => {this.setState({searchType:value})}} defaultValue="productName" >
              <Option value="productName">按名称搜索</Option>
              <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input 
              onChange={(event) => {this.setState({keyWord:event.target.value})}} 
              style={{width:"30%",marginLeft:'10px',marginRight:'10px'}}
            />
            <Button onClick={() => {this.isSearch = true; this.getProductList(1)}} type="primary" ><SearchOutlined />搜索</Button>
          </div>
        }
        extra={
        <Button // 这里用 push 不用replace这个属性,就是网页有返回功能; console.log('$$',this.props),
          onClick={() => {this.props.history.push('/admin/prod_about/product/add')}} // 三级路由 ,他的二级路由一定要开启严格匹配;
          type="primary"><PlusCircleOutlined 
          />添加商品
        </Button>}
      >
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          bordered
          rowKey= '_id'
          loading={this.state.isLoading}
          pagination={{ //分页器
            pageSize: PAGE_SIZE, //每页展示几条数据
            total:this.state.total,//antd设计的总数 total给 他他自己计算的;
            onChange: (number) => {this.getProductList(number)},//页码改变的回调
            current: this.state.current //当前在哪一页
          }}
        />;
      </Card>
    )
  }
}
