import React, { Component } from 'react'
import {Card,Button,Select,Input,Table} from 'antd'
import { SearchOutlined,PlusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

export default class Product extends Component {
  
  render() {

    const dataSource = [
      {
        key: '1',
        name: '华为Mete30',
        desc: '一款国产出口的手机',
        price : 4288,
        status: 1,
      },
      {
        key: '2',
        name: '中兴A50',
        desc: '一款适合拍照的手机',
        price : 2988,
        status: 2,
      },
      {
        key: '2',
        name: '小米',
        desc: '一款适合打游戏的手机',
        price : 2988,
        status: 1,
      },
    ];
    
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
        key: 'address',
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
        />;
      </Card>
    )
  }
}
