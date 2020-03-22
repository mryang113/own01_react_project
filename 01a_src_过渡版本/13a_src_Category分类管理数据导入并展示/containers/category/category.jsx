import React, { Component } from 'react'
import {Card,Button,Table } from 'antd';
import {connect} from 'react-redux'
import {createSaveCategoryAsyncAction} from '../../redux/actions/category'
import {PlusCircleOutlined} from '@ant-design/icons';

class Category extends Component {

  componentDidMount(){
    //将商品分类信息存入redux
		this.props.saveCategory()
  }

  

  render() {
    
    /* // 这是初始模拟静态值;
    const dataSource = [
      {
        key: '1',
        name: '测试分类一',
      },
      {
        key: '2',
        name: '胡彦祖',
      },
    ] */
    
    //columns是配置Table列的，是一个相当重要的配置项 
    const columns = [
      {
        title: '分类名', //列名
        dataIndex: 'name', //该列要展示什么信息
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: 'name',
        key: 'qiaozhi',
        align: 'center',
        width: "20%",
        render: () => <Button type='link' href="">修改分类</Button>
      }
    ]
    return (
      <Card extra={<Button type="primary" ><PlusCircleOutlined />添加</Button>}>
        <Table 
          bordered 
          dataSource={this.props.categoryList} //数据列表
          columns={columns} // 列数
          rowKey="_id" //react规范 唯一的key
          pagination={{
            pageSize:4,
            showQuickJumper: true
          }}
        />
      </Card>
    )
  }
}

export default connect(
  (state) => ({
    categoryList: state.category
  }), // 状态
  {
    saveCategory:createSaveCategoryAsyncAction
  } //传方法
)(Category)
