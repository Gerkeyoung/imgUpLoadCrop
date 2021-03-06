# 图片裁剪上传插件
@[jquery, , cropper]

## 插件说明
- **图片选择**：支持IE和chrome一般游览器,通过file组件选择好图片后以base64编码格式去渲染图片
 
- **图片裁剪** ：图片裁剪通过[cropper.js](https://github.com/fengyuanchen/cropper)
- **图片上传** ：图片上传是拿到图片的base64编码再通过ajax上传到后端
 


----------
## 使用说明
- **引入静态库**
 ``` vbscript-html
 
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/cropper.min.css">
    <script src="js/jquery.min.js"></script>
    <script src="js/cropper.min.js"></script>
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>   
    
  ```
- **模态框片段** 
    ``` vbscript-html
  <!-- 模态框（Modal） -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">
                        图片裁剪
                    </h4>
                </div>
                <div class="modal-body" id="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                    </button>
                    <button type="button" class="btn btn-primary" onclick="getCopeData()">
                        确定
                    </button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>
  ``` 
- **提供的API** 
1.	实例化对象
  ``` vbscript-html
	 /*
    * imgid:当前图片绑定的id
    * modelid:裁剪图片容器的id
    * imgFile:选择当前的图片
    * ele:图片容器的节点选择器
    * width:生成图片的宽度
    * height:生成图片的高度
    * */
    w.Base64 = function(imgid,modelid,imgFile, ele, width, height){}
   ```
 2.	实例化对象=实例化图片选择器（返回图片的base64）
  ``` vbscript-html
  base64 = new Base64('id','modal-body',imgFile,'img-list', 400, 400);
  ```
  3.	图片裁剪（base64 .corpImg()）
  ``` vbscript-html
    this.corpImg = function () {
            if (!$('#'+this.imgid).length) {
                alert("请先上传图片!");
                return;
            };
            $("#"+this.modelid).empty();
            $("#"+this.modelid).append(originImgNode);
            var modeId= this.modelid;
            $('#'+modeId + " " +">" + ' ' + 'img').cropper({
                aspectRatio: 1 / 1,
                crop: function(data) {
                }
            });
        }
    use:
    base64.corpImg();
  ```
  3. 获取图片裁剪的base64（base64 .getCopeData（callback）
  ``` vbscript-html
   //获取裁剪结果
        this.getCoprDataUrl = function (callback) {
            var imgID = this.imgid
            $('#'+this.modelid + " " +">" + ' ' + 'img').cropper('getCroppedCanvas').toBlob(function (blob) {
                blobToDataURL(blob,function (data) {
                    callback(imgID,data)
                })
            })
        }
    use:
    base64.getCoprDataUrl(function (id,data) {
        回调函数
	    id:修改哪张图片的scr值
	    data:裁剪返回的base64
	    .....自己其他的逻辑
    })
  ```
  4. 上传图片（base64 .getCopeData（callback）
  ``` vbscript-html
  //上传图片
        /**
		    * url:上传到后台的接口地址
		    * beforCallback:正在上传时的回调
		    * succCallback:上传成功的回调
		    * errorCallback:上传失败的回调
      * */
        this.uploaImgFile = function (url,beforCallback,succCallback,errorCallback) {       
            if (!$('#'+this.imgid).length) {
                alert("请先上传图片!");
                return;
            };
            $.ajax({
                url : url,
                type : 'POST',
                data : $('#'+this.imgid).attr("src"),
                processData : false,
                contentType : false,
                beforeSend:function(){
                    loadingback();
                },
                success : function(responseStr) {
                    if(responseStr.status===0){
                        callback(responseStr)
                    }else{
                        errorback();
                    }
                },
                error : function(responseStr) {
                    errorback();
                }
            });
        };
   
       use:
         base64.uploaImgFile(function () {
                
            },function () {
                alert("loading")
            },function () {
                alert("success")
            },function () {
                alert("error");
        })
  ```
  - **截图预览** 
  ![@选择图片|center|](./QQ截图20170731204931.png)
  ![@图片裁剪|center|](./1501505606971.png)
  - **Dome代码** 
  https://github.com/Gerkeyoung/imgUpLoadCrop

	  
