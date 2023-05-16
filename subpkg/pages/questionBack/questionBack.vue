<template>
  <view class="uni-container"> 
    <uni-forms ref="form" :value="formData"> 
      <uni-forms-item label-width="80px" name="content" label="留言内容" required>
        <textarea @input="binddata('content', $event.detail.value)" class="uni-textarea-border" v-model="formData.content" trim="right"></textarea>
      </uni-forms-item>
      <uni-forms-item label-width="80px" name="imgs" label="图片列表">
        <uni-file-picker file-mediatype="image" :limit="6" v-model="formData.imgs"></uni-file-picker>
      </uni-forms-item>
      <uni-forms-item label-width="80px" name="contact" label="联系人">
        <uni-easyinput v-model="formData.contact"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item label-width="80px" name="mobile" label="联系电话">
        <uni-easyinput v-model="formData.mobile"></uni-easyinput>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>

  export default {
    data() {
      let formData = {
        "content": "",
        "imgs": [],
        "contact": "",
        "mobile": ""
      }
      return {
        formData,
        formOptions: {}
      }
    },
	methods:{
		submit(){
			console.log("submit");
		}
	}
	}
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
  }

  .uni-button-group {
    margin-top: 50px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
  }

  .uni-button {
    width: 184px;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    line-height: 1;
    margin: 0;
  }
</style>
