// window.onload作用：需要将所有的DOM元素对象以及相关的资源加载完毕后再实现的时间函数
window.onload = function(){


    // 声明一个记录点击的缩略图的下标
    let bigimgIndex = 0

    //路径导航的数据渲染
    navPathDataBind();
    function navPathDataBind(){
        let navPath = document.querySelector('#wrapper #content .contentMain #navPath')
        let path = goodData.path
        for(let i=0;i<path.length;i++){
            if(i==path.length - 1){
            let aNode = document.createElement('a')
            aNode.innerText = path[i].title
            navPath.appendChild(aNode)    
            }else{
            let aNode = document.createElement('a')
            aNode.href = path[i].url
            aNode.innerText = path[i].title
    
            let iNode = document.createElement('i')
            iNode.innerText = '/'
    
            navPath.appendChild(aNode)
            navPath.appendChild(iNode)            
            }    
        }
    }


    //放大镜的移入、移出效果
    bigClassBind()
    function bigClassBind(){
        let smallPic = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic')
        let leftTop = document.querySelector('#wrapper #content .contentMain #center #left #leftTop')
        // 鼠标移入
        smallPic.onmouseenter = function(){
            // 添加蒙版元素和大图框
            let imagessrc = goodData.imagessrc
            let maskDiv = document.createElement('div')
            maskDiv.className = "mask"
            let BigPic = document.createElement('div')
            BigPic.id = "bigPic"
            let BigImg = document.createElement('img')
            BigImg.src = imagessrc[bigimgIndex].b
            BigPic.appendChild(BigImg)
            smallPic.appendChild(maskDiv)
            leftTop.appendChild(BigPic)

            // 设置鼠标移动事件
            smallPic.onmousemove = function(ev){
                let left = ev.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth/2
                let top = ev.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight/2

                if(left < 0){
                    left = 0
                }else if(left > smallPic.clientWidth - maskDiv.offsetWidth){
                    left = smallPic.clientWidth - maskDiv.offsetWidth
                }

                if(top < 0){
                    top = 0
                }else if(top > smallPic.clientHeight - maskDiv.offsetHeight){
                    top = smallPic.clientHeight - maskDiv.offsetHeight
                }

                maskDiv.style.left = left+'px'
                maskDiv.style.top = top+'px'

                let scale = (smallPic.clientWidth - maskDiv.offsetWidth) / (BigImg.offsetWidth - BigPic.clientWidth)
                BigImg.style.left = -left / scale + 'px'
                BigImg.style.top = -top / scale + 'px'
            }


            // 鼠标移出事件
            smallPic.onmouseleave = function(){
                smallPic.removeChild(maskDiv)
                leftTop.removeChild(BigPic)
            }
        }   
    }


    // 动态渲染放大镜缩略图的数据
    thumbnailData()
    function thumbnailData(){
        let ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul')
        let imagessrc = goodData.imagessrc

        for(let i=0;i<imagessrc.length;i++){
            let newLi = document.createElement('li')
            let newImg = document.createElement('img')
            newImg.src = imagessrc[i].s
            newLi.appendChild(newImg)
            ul.appendChild(newLi)
        }
    
    }


    // 点击缩略图的效果
    thumbnailClick()
    function thumbnailClick(){
        let liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li')
        let smallPic_img = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic img')
        let imagessrc = goodData.imagessrc
        smallPic_img.src = imagessrc[0].s
        //循环点击这些li元素
        for(let i = 0;i<liNodes.length;i++){
            liNodes[i].onclick = function(){
                bigimgIndex = i
                // 变化小图路径
                smallPic_img.src = imagessrc[i].s
            }
        }
    }


    // 点击缩略图左右箭头的效果
    thumbnailLeftRightClick()
    function thumbnailLeftRightClick(){

        let prev = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.prev')
        let next = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.next')
        let ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul')
        let liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li') 

        // 发生起点
        let start = 0

        // 步长
        let step = (liNodes[0].offsetWidth + 20)*2
        
        // 总体运动的距离值 = ul的宽度 - div框的宽度
        let endPosition = (liNodes.length - 5) * (liNodes[0].offsetWidth + 20)
        
        prev.onclick = function(){
            start -= step
            if(start<0){
                start = 0
            }
            ul.style.left = -start+'px'
        }

        next.onclick = function(){
            start += step
            if(start>endPosition){
                start = endPosition
            }
            ul.style.left = -start+'px'
        }
    
    }


    // 商品详情数据的动态渲染
    rightTopData()
    function rightTopData(){
        let rightTop = document.querySelector('#wrapper #content .contentMain #center .right .rightTop')
        let goodsDetail = goodData.goodsDetail

        let s = `<h3>${goodsDetail.title}</h3>
                    <p>${goodsDetail.recommend}</p>
                    <div class="priceWrap">
                        <div class="priceTop">
                            <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                            <div class="price">
                                <span>￥</span>
                                <p>${goodsDetail.price}</p>
                                <i>降价通知</i>
                            </div>
                            <p>
                                <span>累计评价</span>
                                <span>670000</span>
                            </p>
                        </div>
                        <div class="priceBottom">
                            <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                            <p>
                                <span>${goodsDetail.promoteSales.type}</span>
                                <span>${goodsDetail.promoteSales.content}</span>
                            </p>
                        </div>
                    </div>
                    <div class="support">
                        <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                        <p>${goodsDetail.support}</p>
                    </div>
                    <div class="address">
                        <span>配&nbsp;送&nbsp;至</span>
                        <p>${goodsDetail.address}</p>
                    </div>`

        rightTop.innerHTML = s

    }


    // 商品参数数据的动态渲染
    rightBottomData()
    function rightBottomData(){
        let chooseWrap = document.querySelector('#wrapper #content .contentMain #center .right .rightBottom .chooseWrap')
        let crumbData = goodData.goodsDetail.crumbData

        for(let i=0;i<crumbData.length;i++){
           let dlNode = document.createElement('dl')
           let dtNode = document.createElement('dt')
           dtNode.innerText = crumbData[i].title

           dlNode.appendChild(dtNode)

           for(let j=0;j<crumbData[i].data.length;j++){
            let ddNode = document.createElement('dd')
            ddNode.innerText = crumbData[i].data[j].type
            ddNode.setAttribute('price',crumbData[i].data[j].changePrice)
            dlNode.appendChild(ddNode)
           }
           chooseWrap.appendChild(dlNode)
        }
    }


    // 点击商品参数后的颜色排他效果
    clickddBind()
    function clickddBind(){
        let dlNodes = document.querySelectorAll('#wrapper #content .contentMain #center .right .rightBottom .chooseWrap dl')
        
        let arr = new Array(dlNodes.length).fill(0)

        let choose = document.querySelector('#wrapper #content .contentMain #center .right .rightBottom .choose')

        for(let k=0;k<dlNodes.length;k++){
        let ddNodes = dlNodes[k].querySelectorAll('dd')
            for(let i=0;i<ddNodes.length;i++){
                ddNodes[i].onclick = function(){

                    choose.innerHTML = ''

                    for(let j=0;j<ddNodes.length;j++){
                        ddNodes[j].style.color = "#666"
                    }
                    this.style.color = "red"

                    //  点击dd元素动态的产生心得mark元素
                    arr[k] = this
                    changePriceBind(arr)

                    arr.forEach(function(value,index){
                        if(value){
                            let markDiv = document.createElement('div')
                            markDiv.className = 'mark'
                            markDiv.innerText = value.innerText
                            let aNode = document.createElement('a')
                            aNode.innerText = 'X'
                            aNode.setAttribute('index',index)
                            markDiv.appendChild(aNode)
                            choose.appendChild(markDiv)
                        }
                    })


                    // 获取所有的a标签元素，并且循环发生点击事件
                    let aNodes = document.querySelectorAll('#wrapper #content .contentMain #center .right .rightBottom .choose .mark a')

                    for(let n = 0;n<aNodes.length;n++){
                        aNodes[n].onclick = function(){
                            let idx1 = this.getAttribute('index')
                            arr[idx1] = 0
                            let ddlist = dlNodes[idx1].querySelectorAll('dd')
                            for(let m = 0;m<ddlist.length;m++){
                                ddlist[m].style.color = "#666"
                            }
                            ddlist[0].style.color = 'red'

                            choose.removeChild(this.parentNode)

                            changePriceBind(arr)

                        }
                    }
                }
            }            
        }

    }

    
    //价格变动的函数声明
    function changePriceBind(arr){
        let oldPrice = document.querySelector('#wrapper #content .contentMain #center .right .rightTop .priceWrap .priceTop .price p')
        let price = goodData.goodsDetail.price

        for(let i=0;i<arr.length;i++){
            if(arr[i]){ 
                let changePrice = Number(arr[i].getAttribute('price'))
                price+=changePrice
            }
        }
        oldPrice.innerHTML = price 
    
    }


    //选择搭配中间区域复选框选中套餐价变动效果
    chooseprice();
    function chooseprice(){
        let ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input');
        let leftprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p');
        let newprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i');
        //2、遍历这些复选框
        for(let i = 0 ; i < ipts.length;i++){
            ipts[i].onclick = function(){
                let oldprice = Number(leftprice.innerText.slice(1));
                for(let j = 0 ; j < ipts.length;j++){
                    if(ipts[j].checked){
                            //新的价格 = 左侧价格 + 选中复选框附加价格
                            oldprice = oldprice + Number(ipts[j].value);
                    }
                }
                newprice.innerText = '¥' + oldprice;
            }
        }
    }


    //封装一个公共的选项卡函数
    function Tab(tabBtns,tabConts){
        for(let i = 0;i<tabBtns.length;i++){
            tabBtns[i].index = i;
            tabBtns[i].onclick = function(){
                for(let j = 0;j<tabBtns.length;j++){
                    tabBtns[j].className = '';
                    tabConts[j].className = ''
                }
                this.className = 'active';
                tabConts[this.index].className = 'active';
            }
        }
    }

    //点击左侧选项卡
    leftTab();
    function leftTab(){
        let h4s = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideTop h4');
        let divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .aslideContent>div');
        Tab(h4s,divs);
    }

    //点击右侧选项卡
    rightTab();
    function rightTab(){
        //被点击的元素
        let lis =document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabBtns li');
        //被切换显示的元素
        let divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabContents div');
        //调用函数
        Tab(lis,divs);
    }

    //右边侧边栏的点击效果
    rightAsideBind();
    function rightAsideBind(){
        let btns = document.querySelector('#wrapper .rightAside .btns');
        let flag = true; 
        let rightAside = document.querySelector('#wrapper .rightAside');
        btns.onclick = function(){
                if(flag){
                btns.className = "btns btnsOpen";
                rightAside.className = "rightAside asideOpen";
                }else{
                btns.className = "btns btnsClose"
                rightAside.className = "rightAside asideClose";
                }
                flag = !flag;
        }
    }
}