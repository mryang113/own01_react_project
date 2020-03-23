import React, { Component } from 'react'
import {Card,Button,List, message} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import {createSaveCategoryAsyncAction} from '../../redux/actions/category'
import {reqProductInfoById} from '../../ajax'
import './css/detail.less'


const {Item} = List 

class Detail extends Component {

  state = {
    productInfo:{
      imgs: [],
      categoryId: "",
      name: "",
      desc: "",
      price: 0,
      detail:'',
    }
  }

  //通过所属分类的id来遍历redux中的商品分类,找到就把id对应的分类名称给他返回
  getCategoryName = (id) => {
    const {categoryList} = this.props
    let result = categoryList.find((categoryObj) => {
      return categoryObj._id === id
    })
    if(result) return result.name
  }

  //通过id来请求改商品的详细信息
  getProductInfoById = async() => {
    //1.获取传递过来的商品id
    const {id} = this.props.match.params
    let result = await reqProductInfoById(id)
    // console.log(result);
    const {status,data,msg} = result
    if(status === 0){
      this.setState({productInfo:data})
    }else{
      message.error(msg)
    }
  }

  componentDidMount(){
    // console.log(this.props); // match/params/id 就是
    if(!this.props.categoryList.length){
      //这样做个判断,如果用户上来没点分类管理,redux状态中就没有数据,此时,我在发请求,可以减少有的情况下多发一次请求
      this.props.saveCategory()
    }
    this.getProductInfoById()
  }
  render() {
    const {imgs,detail,name,desc,price,categoryId} = this.state.productInfo
    return (
      <Card title={
        <div>
          <Button onClick={() => {this.props.history.goBack()}} type="link">
          <ArrowLeftOutlined/>返回
          </Button>
          <span>商品详情</span>
        </div>
      }>
      <List>
        <Item className="detail-item">
          <span className="detail-title">商品名称：</span>
          <span>{name}</span>
        </Item>
        <Item className="detail-item">
          <span className="detail-title">商品描述:</span>
          <span>{desc}</span>
        </Item>
        <Item className="detail-item">
          <span className="detail-title">商品价格：</span>
          <span>{'￥'+price}</span>
        </Item>
        <Item className="detail-item">
          <span className="detail-title">所属分类：</span>
          <span>{this.getCategoryName(categoryId)}</span>
        </Item>
        <Item className="detail-item">
          <span className="detail-title">商品图片：</span>
          {
            imgs.map((imgName) => {
              return <img key={imgName} src={`/upload/${imgName}`} alt=""/>
            })
          }
        </Item>
        <Item className="detail-item">
          <span className="detail-title">商品详情：</span>
          <span  dangerouslySetInnerHTML={{__html:detail}}></span>
        </Item>
      </List>
    </Card>
    )
  }
}

export default connect(
  (state) => ({categoryList:state.categoryList}), //redux总状态里拿的
  {
    saveCategory: createSaveCategoryAsyncAction
  }
)(Detail) 
