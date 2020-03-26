import React, { Component } from 'react'
import {Card,Button,Form,Input,Select} from 'antd'
import {connect} from 'react-redux'
import {ArrowLeftOutlined} from '@ant-design/icons';
import {createSaveCategoryAsyncAction} from '../../redux/actions/category'
import PictureWall from './picture_wall'

const {Item} = Form
const {Option} = Select

class AddUpdate extends Component {

  onFinish = (values) => {
    console.log(values);
  }

  // 拿到redux中的categoryList分类数据进行遍历,然后生成下拉框中的Option
  createOption = () => {
    return this.props.categoryList.map((categoryObj) => {
      return <Option key={categoryObj._id} value={categoryObj._id}>{categoryObj.name}</Option>
    })
  }

  componentDidMount(){
    if(!this.props.categoryList.length){
      this.props.saveCategoryList()
    }
  }

  render() {
    return (
      <Card title={
        <div>
          <Button onClick={() => {this.props.history.goBack()}} type="link">
          <ArrowLeftOutlined/>返回
          </Button>
          <span>添加商品</span>
        </div>
      }>
        <Form onFinish={this.onFinish}>
          <Item
            name="name"
            rules={[{required:true,message: '商品名称不能为空'}]} //input的输入实时校验信息;
            label="商品名称"
            wrapperCol={{span:10}}
          >
            <Input placeholder="输入商品名称"/>
          </Item>
          <Item
            name="desc"
            rules={[{required:true,message: '描述不能为空'}]} //input的输入实时校验信息;
            label="商品描述"
            wrapperCol={{span:10}}
          >
            <Input placeholder="输入商品描述"/>
          </Item>
          <Item
            name="price"
            rules={[{required:true,message: '商品价格不能为空'}]} //input的输入实时校验信息;
            label="商品价格"
            wrapperCol={{span:10}}
          >
            <Input 
              placeholder="输入商品价格"
              addonAfter='元'
              addonBefore='￥'
              type="number"
            />
          </Item>
          <Item
            name="categoryId"
            rules={[{required:true,message: '必须选择一个分类'}]} //input的输入实时校验信息;
            label="所属分类"
            wrapperCol={{span:10}}
          >
            <Select defaultValue="">
							<Option value="">请选择分类</Option>
							{this.createOption()}
						</Select>
          </Item>
          <Item
            style={{marginLeft:'10px'}}
            label="商品图片"
            wrapperCol={{span:10}}
          >
            <PictureWall/>
          </Item>
          <Item
            style={{marginLeft:'10px'}}
            label="商品详情"
            wrapperCol={{span:10}}
          >
            此处放置富文本组件
          </Item>
          <Item>
						<Button htmlType="submit" type="primary">提交</Button>
					</Item>
        </Form>
      </Card>
    )
  }
}

export default connect(
  (state) => ({categoryList:state.categoryList}),
  {
    saveCategoryList: createSaveCategoryAsyncAction
  }
)(AddUpdate)
