import React, { Component } from 'react'
import {Card,Button,Table,Modal,Form,Input, message} from 'antd';
import {connect} from 'react-redux'
import {PlusCircleOutlined} from '@ant-design/icons';
import {createSaveCategoryAsyncAction} from '../../redux/actions/category'
import {reqAddCategory,reqUpdateCategory} from '../../ajax'
import {PAGE_SIZE} from '../../config'

const {Item} = Form

class Category extends Component {

  state = { visible: false };//控制弹窗显示与隐藏

  //展示弹窗>>>再点击修改分类的时候,开始写逻辑复用
  showModal = (categoryObj) => {
    const {_id,name} = categoryObj //尝试着获取_id和name，若_id和name均存在，那么是修改分类
    console.log(_id,name);
    if(_id && name){
      //能进入此判断，就以为是修改操作
      this.name = name
      this._id = _id
      this.isUpdate = true
      if(this.refs.categoryForm){
        console.log('@@@'); //不是第一次点才输出
        this.refs.categoryForm.setFieldsValue({categoryName:name}) //重置表单,antd/Modal属性
      }
    }
    this.setState({visible: true,});//更改状态，展示弹窗
  };

  //弹框确认按钮的回调
  handleOk = async() => {
    // console.log(this.refs.categoryForm.getFieldsValue());// antd里的表单属性FormInstance 里的方法getFieldsValue()
    const {categoryName} = this.refs.categoryForm.getFieldsValue() //获取用户输入 
    if(categoryName === undefined || !categoryName.trim()) {message.warning('分类名不能为空');return} //校验 ,这里加了去空啊trim()一点击的话报错,待解决;
    let result //提前定义好一个接受服务器返回数据的变量
    if(this.isUpdate) result = await reqUpdateCategory(this._id,categoryName)//请求修改分类
    else result = await reqAddCategory(categoryName)//请求添加分类
    const {status,msg} = result //获取服务器返回的数据
    if(status === 0){ //如果添加的业务逻辑是成功的
      message.success(this.isUpdate ? '修改分类成功' : '新增分类成功')
      this.props.saveCategory() //从服务器重新获取最新的分类数据
      this.handleCancel() // 解决代码复用 ,逻辑一样;
    }else{
      message.warning(msg)
    }

    
  } 
  
  //弹框取消按钮的回调
  handleCancel = () => {
    // console.log('你点击了取消');
    this.refs.categoryForm.setFieldsValue({categoryName:''}) //重置表单,antd/Modal属性
    this.isUpdate = false //重置为新增
    this.name = ''
		this._id = ''
    this.setState({visible: false}); //关闭弹窗
  }

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
        // dataIndex: 'name', //这个有高级方法 render就会覆盖它,优先选render展示;render就收参数是靠这个 指定的,如果不写,就拿到整个的
        key: 'qiaozhi',
        align: 'center',
        width: "20%", // 下面如果加上这个 href="" 这个自带的 控制台就会自动刷新下 ,所以去掉
        render: (item) => <Button  onClick={() => {this.showModal(item)}} type='link'>修改分类</Button>
      }
    ]
    return (
      <div>
        <Card extra={<Button type="primary" onClick={this.showModal}><PlusCircleOutlined />添加</Button>}>
          <Table 
            bordered 
            dataSource={this.props.categoryList} //数据列表
            columns={columns} // 列数
            rowKey="_id" //react规范 唯一的key
            pagination={{
              pageSize:PAGE_SIZE,
              showQuickJumper: true
            }}
          />
        </Card>
        {/* 以后要展示的弹窗写在下面 */}
        <Modal
          title={this.isUpdate ? '修改分类' : '新增分类'} //点击弹窗时所展示的弹窗;
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='确认'
					cancelText='取消'
        >
          <Form //坑, 在antd上如果在Input上那这个属性 defaultValue={this.name}每次慢一步
            ref = "categoryForm" //注意,antd封装的input拿不到ref标识的值,Form可以拿到
            initialValues={{
							categoryName:this.name
						}}
          >
            <Item
              name="categoryName"
              rules={[{ required: true, message: '分类名必须输入!' }]}
            >
              <Input placeholder="请输入分类名" />
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    categoryList: state.categoryList
  }), // 状态
  {
    saveCategory:createSaveCategoryAsyncAction
  } //传方法
)(Category)
