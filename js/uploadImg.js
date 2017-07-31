(function(w,d){
    var id = 1; // 此id无实在意义，仅为操作id
    /*
    * imgid:当前图片绑定的id
    * modelid:裁剪图片容器的id
    * imgFile:选择当前的图片
    * ele:图片容器的节点选择器
    * width:生成图片的宽度
    * height:生成图片的高度
    * */

    w.Base64 = function(imgid,modelid,imgFile, ele, width, height){
        this.imgid = imgid;
        this.modelid = modelid;
        this.imgFile = imgFile;
        this.id = id;
        this.width = width || 200;
        this.height = height || 200;
        // 定义方法
        var pattern = /(\.*.jpg$)|(\.*.png$)|(\.*.jpeg$)|(\.*.gif$)|(\.*.bmp$)/;
        if(!pattern.test(this.imgFile.value)) {
            alert("请上传jpg/jpeg/png/gif/bmp格式的照片！");
            this.imgFile.focus();
        }else{
            //添加显示图片的HTML元素
            $("."+ele).append("<img id='"+this.imgid+"' width='"+this.width+"' height='"+this.height+"'/>");
            //判断浏览器类型
            if(document.all){
                //兼容IE
                this.ieBase64(this.imgid,this.imgFile.value, ele, this.width, this.height);
            }else{
                //兼容主流浏览器
                this.mainBase64(this.imgid,this.imgFile.files[0], ele, this.width, this.height);
            }
        };
        //上传图片
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
        //将bloa数据转换成base64
        function blobToDataURL(blob, callback) {
            var a = new FileReader();
            a.onload = function (e) { callback(e.target.result); }
            a.readAsDataURL(blob);
        }
        //裁剪图片
        var originImgNode = $("."+ele + '>' + 'img');

        $('#myModal').on('hide.bs.modal',
            function() {
            if($("."+ele + '>' + 'img').length < 1){
                $("."+ele).append(originImgNode);
                $("."+ele).removeClass("cropper-hidden");
            }
            })

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
        //获取裁剪结果
        this.getCoprDataUrl = function (callback) {
            var imgID = this.imgid
            $('#'+this.modelid + " " +">" + ' ' + 'img').cropper('getCroppedCanvas').toBlob(function (blob) {
                blobToDataURL(blob,function (data) {
                    callback(imgID,data)
                })
            })
        }
    };
    Base64.prototype = {
        ieBase64: function(imgid,file, ele, width, height){
            var realPath, xmlHttp, xml_dom, tmpNode, imgBase64Data;
            realPath = file;//获取文件的真实本地路径.
            xmlHttp = new ActiveXObject("MSXML2.XMLHTTP");
            xmlHttp.open("POST",realPath, false);
            xmlHttp.send("");
            xml_dom = new ActiveXObject("MSXML2.DOMDocument");
            tmpNode = xml_dom.createElement("tmpNode");
            tmpNode.dataType = "bin.base64";
            tmpNode.nodeTypedValue = xmlHttp.responseBody;
            imgBase64Data = "data:image/bmp;base64," + tmpNode.text.replace(/\n/g,"");

            console.log()
            $("."+ ele + ' '+ '>' + ' ' + 'img').attr('src',imgBase64Data);
        },
        mainBase64: function(imgid,file, ele, width, height){
            var fileReader, imgData;
            fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function () {
                imgData = this.result; //base64数据
                $("."+ ele + ' '+ '>' + ' ' + 'img').attr('src',imgData);
            }
        },
    }
})(window,document);
