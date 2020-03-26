import React,{Component} from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// 一个antd上传图片的组件upload 代码复制粘贴

//getBase64用于将图片转为base64编码
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false, // 是否展示预览窗,默认false
    previewImage: '', //要预览图片的url或base64
    fileList: [ //fileList保存着所有已经上传完的图片
      // {
      //   uid: '-1', //图片的序号
      //   name: 'image.png', //图片的名字
      //   status: 'done', //图片上传的状态
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', //访问图片的地址
      // },
    ],
  };

  // 预览框关闭按钮的回调;
  handleCancel = () => this.setState({ previewVisible: false });

  // 点击预览(小眼睛图片)按钮的回调
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    //图片上传的状态
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  /* 就是 onChange事件
    1,上传中,完成,失败都会调用这个函数
    * 自己加了一哥形参 file
  
  */
  handleChange = ({file,fileList }) => {
    if(file.status === 'done'){
      // console.log(file);
      // console.log(fileList);
      const {status,data,msg} = file.response
      const {name,url} = data
      if(status === 0){
        message.success('图片上传成功')
        fileList[fileList.length-1].name = name
        fileList[fileList.length-1].url = url
      }else{
        message.error(msg)
      }
      console.log(fileList);
    }
    this.setState({ fileList });
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload" //图片上传的地址
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
