import React, { Component } from 'react'
import {Card,Button,Select,Input,Table, message} from 'antd'
import { SearchOutlined,PlusCircleOutlined } from '@ant-design/icons';
import {reqProductList} from '../../ajax'
import {PAGE_SIZE} from '../../config'

const { Option } = Select;

export default class Product extends Component {
  state = {
    productList:[],
    total: 0,
    isLoading: false
  }

  getProductList = async(number) => {
    this.setState({isLoading:true})
    let result = await reqProductList(number,PAGE_SIZE)
    // console.log(result);
    const {status,data,msg} = result
    if(status === 0){
      const {total,pages,list} = data
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
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render:(status) => (
          <div>
            <Button type={status === 1 ? "danger" : "primary"}>{status === 1 ? "下架" : "上架"}></Button>
            <br/>
            <span>{status === 1 ? "在售" : "售罄"}</span>
          </div>
        )
      },
      {
        title: '操作',
        // dataIndex: 'status',
        key: 'operation',
        align: 'center',
        render:() => (
          <div>
            <Button type="link">详情</Button>
            <br/>
            <Button type="link">修改</Button>
          </div>
        )
      },
    ];
    
    return (
      <Card 
        title={
          <div>
            <Select defaultValue="productName" >
              <Option value="productName">按名称搜索</Option>
              <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input style={{width:"30%",marginLeft:'10px',marginRight:'10px'}}/>
            <Button type="primary" ><SearchOutlined />搜索</Button>
          </div>
        }
        extra={<Button type="primary"><PlusCircleOutlined />添加商品</Button>}
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
            onChange: (number) => {this.getProductList(number)}
          }}
        />;
      </Card>
    )
  }
}
