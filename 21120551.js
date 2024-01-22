var index=[];
const available1=document.querySelector('.available1');
const available2=document.querySelector('.available2');
const available3=document.querySelector('.available3');
const available4=document.querySelector('.available4');
const available5=document.querySelector('.available5');
const available6=document.querySelector('.available6');
const available7=document.querySelector('.available7');
const available8=document.querySelector('.available8');
const available9=document.querySelector('.available9');
const available10=document.querySelector('.available10');
const available11=document.querySelector('.available11');
const available12=document.querySelector('.available12');
const available13=document.querySelector('.available13');
const available14=document.querySelector('.available14');
const available15=document.querySelector('.available15');
const available16=document.querySelector('.available16');
const available17=document.querySelector('.available17');
const available18=document.querySelector('.available18');
const available19=document.querySelector('.available19');
const available20=document.querySelector('.available20');
const available21=document.querySelector('.available21');
const available22=document.querySelector('.available22');
const available23=document.querySelector('.available23');
const available24=document.querySelector('.available24');
const available25=document.querySelector('.available25');
const available26=document.querySelector('.available26');
const available27=document.querySelector('.available27');

var box_array=[available1,available2,available3,available4,available5,available6,available7,available8,
                available9,available10,available11,available12,available13,available14,available15,available16,
                available17,available18,available19,available20,available21,available22,available23,available24,
                available25,available26,available27];

var offTop=[];
var offLeft=[];
var Won="";


function Save_Offset_Available(){
    offTop=[];
    offLeft=[];
    for(const ele of box_array){
        if (ele.style.display=="initial"){
            offTop.push(ele.offsetTop);
            offLeft.push(ele.offsetLeft);
        }
    }
}

function Check_Right_Position(ele){
    let ele_top=ele.offsetTop;
    let ele_left=ele.offsetLeft;

    for(i=0;i<offTop.length;i++){

        if(offTop[i]==ele_top && offLeft[i]==ele_left)
            return true;
    }
    return false;
}

function Check_Empty_Tot(top, left, ele ,isCross){
    let i=top/70;
    let j=left/70;

    let i_ele=ele.offsetTop/70;
    let j_ele=ele.offsetLeft/70;

    if(isCross == false && index[i][j]==0)
        return true;
    if(isCross && ((index[i][j] == 1 && index[i_ele][j_ele]==2) || (index[i][j] == 2 && index[i_ele][j_ele]==1)))
        return true;
    return false;
}

function Check_Empty(top, left, ele){
    let i=top/70;
    let j=left/70;

    let i_ele=ele.offsetTop/70;
    let j_ele=ele.offsetLeft/70;

    if(index[i][j]==0)
        return [true,true]; //tham so thu 2: true: hoan toan trong, false: co the an quan dich
    if((index[i][j] == 1 && index[i_ele][j_ele]==2) || (index[i][j] == 2 && index[i_ele][j_ele]==1))
        return [true,false];
    return [false,false];
}

function Align_Index(ele){
    // left
    if((ele.offsetLeft)%70<35){
        for(i=0;i>-70;i--){
    
            if((ele.offsetLeft+i)%70==0){
    
                ele.style.left=ele.offsetLeft+i+'px';
                break;
            }
        }        
    }
    else if((ele.offsetLeft)%70>=35){
        
        for(i=0;i<70;i++){
    
            if((ele.offsetLeft+i)%70==0){
    
                ele.style.left=ele.offsetLeft+i+'px';
                break;
            }
        }
    }
    if(ele.offsetLeft<0)
        ele.style.left=0+'px';
    if(ele.offsetLeft>490)
        ele.style.left=490+'px';

    // top
    if((ele.offsetTop)%70<35){
        for(i=0;i>-70;i--){
    
            if((ele.offsetTop+i)%70==0){
    
                ele.style.top=ele.offsetTop+i+'px';
                break;
            }
        }        
    }
    else if((ele.offsetTop)%70>=35){
        
        for(i=0;i<70;i++){
    
            if((ele.offsetTop+i)%70==0){
    
                ele.style.top=ele.offsetTop+i+'px';
                break;
            }
        }
    }

    if(ele.offsetTop<0)
        ele.style.top=0+'px';
    if(ele.offsetTop>490)
        ele.style.top=490+'px';

    //thêm case=35 thì quay về vị trí cũ? --> skip
}

function Init_Index(){
    for (i=0;i<8;i++){
        var temp=[];
        for (j=0;j<8;j++){
            temp.push(0);
        }
        index.push(temp);
    }

    for (i = 0; i < 8; i++) {
        index[0][i]=1; //1 la den
        index[1][i]=1;

        index[6][i]=2; //2 la trang
        index[7][i]=2;        
    }
}

function Hide_Box(){    
    
    for(i=0;i<box_array.length;i++){
        box_array[i].style.display="none";
    }
}

function Show_Box(chess, available, indexTop, indexLeft){

    available.style.left=(chess.offsetLeft+indexLeft)+'px';
    available.style.top=(chess.offsetTop+indexTop)+'px';
    available.style.zIndex="4";
    available.style.position="absolute";
    available.style.display="initial";
}

// --------------------------------SET TURN----------------------------------

const chessAll=document.getElementsByClassName('chess');
const TurnBox=document.querySelector('.turn')
var targetObj = {key:-1};

var turn = new Proxy(targetObj, {
  set: function (target, key, value) {
        //console.log(`${key} set to ${value}`);  
        if(value%2==0){            

            for(const ele of chessAll){
                
                if(ele.className.includes("white")){
                    
                    ele.addEventListener('mousedown',handleMouseDown); 
                }    
                if(ele.className.includes("black")){
                    ele.removeEventListener('mousedown',handleMouseDown); 
                }             
                
            }
            TurnBox.style.color="white";
            TurnBox.textContent ="White's turn";

        }
        else{            

            for(const ele of chessAll){
                
                if(ele.className.includes("black")){
                    ele.addEventListener('mousedown',handleMouseDown); 
                }    
                if(ele.className.includes("white")){
                    ele.removeEventListener('mousedown',handleMouseDown); 
                }             
                
            }
            TurnBox.style.color="black";
            TurnBox.textContent ="Black's turn";
            
        }

      target[key] = value;
      return true;
  }
});
turn.key++;

//----------------------------------------------------------------------

//function Handle_Event() {

    // const chess=document.getElementsByClassName('chess');

    // for(const ele of chess){
        
    //     ele.addEventListener('mousedown',handleMouseDown);                 
        
    // }
//}
function handleMouseDown(e){


    let startIndex_availBox = {key: 0};

    if(this.className.includes("tot"))
        Move_Tot(this);
    if(this.className.includes("ngua"))
        Move_Ngua(this);
    if(this.className.includes("vua"))
        Move_Vua(this);
    if(this.className.includes("xe")){
        startIndex_availBox.key=0;
        Move_Xe(this,startIndex_availBox);
    }
    if(this.className.includes("tuong")){
        startIndex_availBox.key=0;
        Move_Tuong(this,startIndex_availBox);
    }
    if(this.className.includes("hau")){
        startIndex_availBox.key=0;
        Move_Hau(this,startIndex_availBox);
    }
    //////////////////////////

    this.oldX=e.clientX;
    this.oldY=e.clientY;


    //this.isDown=true;

    const thumb=this.cloneNode(true);
    thumb.classList.toggle('thumb');

    //thumb.oldX = e.clientX;
    //thumb.oldY = e.clientY;

    thumb.isDown=true;
    thumb.original=this;//   

    this.parentNode.appendChild(thumb);

    thumb.addEventListener('mousemove',handleMouseMove);
    thumb.addEventListener('mouseup',handleMouseUp);
    
}

function handleMouseMove(e){
    if(this.isDown){

        const dX=e.clientX-this.oldX;
        const dY=e.clientY-this.oldY;

        this.style.left=(this.offsetLeft+dX)+'px';
        this.style.top=(this.offsetTop+dY)+'px';

        this.oldX=e.clientX;
        this.oldY=e.clientY;

        //this.addEventListener('mouseup',handleMouseUp);
    }
}

function handleMouseUp(e){
    this.isDown=false;
    const org=this.original;

    let temp_offTop=org.offsetTop;
    let temp_offLeft=org.offsetLeft;

    index[org.offsetTop/70][org.offsetLeft/70]=0;//vi tri cu=0
    console.log(index)

    org.style.left=this.style.left; //dua original ra vi tri moi
    org.style.top=this.style.top;

    // set chính xác vị trí mới của original
    Align_Index(org);   

    let assign_index=-1;
    if(org.className.includes("black"))
        assign_index=1;//
    else
        assign_index=2;//


    //ktra trường hợp cờ ăn nhau
    
    if(index[org.offsetTop/70][org.offsetLeft/70] != 0 && index[org.offsetTop/70][org.offsetLeft/70] != assign_index && Check_Right_Position(org)){

        const chess=document.getElementsByClassName('chess');

        for(const ele of chess){
            
            if(ele.offsetTop==org.offsetTop && ele.offsetLeft==org.offsetLeft && ele!=org){

                if(ele.className.includes("vua")){
                    if(ele.className.includes("black")){
                        Won="White";
                    }
                    else
                        Won="Black";
                                          
                }

                ele.className="remove";     
            }  
            
        }
    }

    let previous_moveto_index=index[org.offsetTop/70][org.offsetLeft/70];
    index[org.offsetTop/70][org.offsetLeft/70]=assign_index;//
    

    // -----------

    this.parentNode.removeChild(this);
    Hide_Box();

    turn.key++;///////////

    if(Check_Right_Position(org)==false){
        index[org.offsetTop/70][org.offsetLeft/70]=previous_moveto_index;//
        org.style.top=temp_offTop+'px';
        org.style.left=temp_offLeft+'px';      
        index[org.offsetTop/70][org.offsetLeft/70]=assign_index;//  

        turn.key--;///////////
    }

    // truong hop an vua => gameover
    if(Won==="White"){
        setTimeout(() => {  if(!alert('Game over! White won!')){document.location.reload(false);}   }, 100);
        
    }
    if(Won==="Black"){
        setTimeout(() => {  if(!alert('Game over! Black won!')){document.location.reload(false);}   }, 100);
          
    }  
    
}


// ----------------------------------

function Move_Tot(ele){

    // check ngang, doc
    let step=0;
    
    if(ele.className.includes("white"))
        step=-70;
    else
        step=70;


    let check_first_step=Check_Empty_Tot(ele.offsetTop+step,ele.offsetLeft+0,ele,false);
    if(check_first_step==true){
            Show_Box(ele,available1,step,0);
    }

    //thêm check_first_step==true để tránh trg hợp nhảy qua 2 ô khi có cờ ở trc nó
    if(ele.offsetTop == 420 && ele.className.includes("white") && check_first_step==true){

        if(Check_Empty_Tot(ele.offsetTop+step*2,ele.offsetLeft+0,ele,false))
            Show_Box(ele,available2,step*2,0);
        
    }
    else if(ele.offsetTop == 70 && ele.className.includes("black") && check_first_step==true){
        
        if(Check_Empty_Tot(ele.offsetTop+step*2,ele.offsetLeft+0,ele,false))
            Show_Box(ele,available2,step*2,0);
    }


    // check cross
    if(ele.className.includes("white")){
        // check cross: right
        if((ele.offsetTop-70>=0) && (ele.offsetLeft+70<=490) && Check_Empty_Tot(ele.offsetTop-70,ele.offsetLeft+70,ele,true))
            Show_Box(ele,available3,-70,70);
        // check cross: left
        if((ele.offsetTop-70>=0) && (ele.offsetLeft-70>=0) && Check_Empty_Tot(ele.offsetTop-70,ele.offsetLeft-70,ele,true))
            Show_Box(ele,available4,-70,-70);
    }
    if(ele.className.includes("black")){
        // check cross: right
        if((ele.offsetTop+70<=490) && (ele.offsetLeft-70>=0) && Check_Empty_Tot(ele.offsetTop+70,ele.offsetLeft-70,ele,true))
            Show_Box(ele,available3,70,-70);
        // check cross: left
        if((ele.offsetTop+70<=490) && (ele.offsetLeft+70<=490) && Check_Empty_Tot(ele.offsetTop+70,ele.offsetLeft+70,ele,true))
            Show_Box(ele,available4,70,70);
    }

    Save_Offset_Available();//
    
}

function Move_Xe(ele, startIndex_availBox) {

    let k=startIndex_availBox.key;
    let check=[false,false];
    
    // left and right

    for (i=70;;i+=70) {

        if(ele.offsetLeft+i >490)
            break;        
        
        check=Check_Empty(ele.offsetTop,ele.offsetLeft+i,ele);
        if(check[0]){
            Show_Box(ele,box_array[k++],0,i);
        }
        if(check[0]==false || check[1]==false)
            break;
    }
    for (i=-70;;i-=70) {

        if(ele.offsetLeft+i <0)
            break;

        check=Check_Empty(ele.offsetTop,ele.offsetLeft+i,ele);
        if(check[0]){
            Show_Box(ele,box_array[k++],0,i);
        }
        if(check[0]==false || check[1]==false)
            break;
            
    }
    // top and bottom

    for (i=70;;i+=70) {

        if(ele.offsetTop+i >490)
            break;        
        
        check=Check_Empty(ele.offsetTop+i,ele.offsetLeft,ele)
        if(check[0]){
            Show_Box(ele,box_array[k++],i,0);
        }
        if(check[0]==false || check[1]==false)
            break;
    }
    for (i=-70;;i-=70) {

        if(ele.offsetTop+i <0)
            break;

        check=Check_Empty(ele.offsetTop+i,ele.offsetLeft,ele)
        if(check[0]){
            Show_Box(ele,box_array[k++],i,0);
        }
        if(check[0]==false || check[1]==false)
            break;
            
    }

    startIndex_availBox.key=k;
    Save_Offset_Available();//

}   

function Move_Tuong(ele,startIndex_availBox) {
    let k=startIndex_availBox.key;
    let check=[false,false];

    // bottom right
    for (i=70;;i+=70) {

        if(ele.offsetLeft+i >490 || ele.offsetTop+i>490)
            break;        
        
        check=Check_Empty(ele.offsetTop+i,ele.offsetLeft+i,ele);
        if(check[0]){
            Show_Box(ele,box_array[k++],i,i);
        }
        if(check[0]==false || check[1]==false)
            break;
    }
    // top left
    for (i=-70;;i-=70) {

        if(ele.offsetLeft+i <0 || ele.offsetTop+i<0)
            break;        
        
        check=Check_Empty(ele.offsetTop+i,ele.offsetLeft+i,ele)
        if(check[0]){
            Show_Box(ele,box_array[k++],i,i);
        }
        if(check[0]==false || check[1]==false)
            break;
            
    }
    // top right: -top +left

    for (i=70;;i+=70) {

        if(ele.offsetTop-i<0 || ele.offsetLeft+i>490)
            break;        
        
        check=Check_Empty(ele.offsetTop-i,ele.offsetLeft+i,ele)
        if(check[0]){
            Show_Box(ele,box_array[k++],-i,i);
        }
        if(check[0]==false || check[1]==false)
            break;
    }
    // bottom left: -left +top
    for (i=70;;i+=70) {

        if(ele.offsetTop+i>490 || ele.offsetLeft-i<0)
            break;        
        
        check=Check_Empty(ele.offsetTop+i,ele.offsetLeft-i,ele)
        if(check[0]){
            Show_Box(ele,box_array[k++],i,-i);
        }
        if(check[0]==false || check[1]==false)
            break;
    }

    startIndex_availBox.key=k;
    Save_Offset_Available();//
}

function Move_Hau(ele,startIndex_availBox){
    Move_Xe(ele,startIndex_availBox);
    Move_Tuong(ele,startIndex_availBox);
    Save_Offset_Available();//
}

function Move_Ngua(ele){

    let k=0;

    // bottom right
    if((ele.offsetTop+70*2 <= 490) && (ele.offsetLeft+70 <= 490) && Check_Empty(ele.offsetTop+70*2,ele.offsetLeft+70,ele)[0]){
        Show_Box(ele,box_array[k++],70*2,70);
    }  
    if((ele.offsetTop+70 <= 490) && (ele.offsetLeft+70*2 <= 490) && Check_Empty(ele.offsetTop+70,ele.offsetLeft+70*2,ele)[0]){
        Show_Box(ele,box_array[k++],70,70*2);
    }  
    // top left
    if((ele.offsetTop-70*2 >= 0) && (ele.offsetLeft-70 >= 0) && Check_Empty(ele.offsetTop-70*2,ele.offsetLeft-70,ele)[0]){
        Show_Box(ele,box_array[k++],-70*2,-70);
    }  
    if((ele.offsetTop-70 >= 0) && (ele.offsetLeft-70*2 >= 0) && Check_Empty(ele.offsetTop-70,ele.offsetLeft-70*2,ele)[0]){
        Show_Box(ele,box_array[k++],-70,-70*2);
    } 
    // top right: -top +left

    if((ele.offsetTop-70*2 >= 0) && (ele.offsetLeft+70 <= 490) && Check_Empty(ele.offsetTop-70*2,ele.offsetLeft+70,ele)[0]){
        Show_Box(ele,box_array[k++],-70*2,70);
    }  
    if((ele.offsetTop-70 >= 0) && (ele.offsetLeft+70*2 <= 490) && Check_Empty(ele.offsetTop-70,ele.offsetLeft+70*2,ele)[0]){
        Show_Box(ele,box_array[k++],-70,70*2);
    } 

    // bottom left: -left +top
    if((ele.offsetTop+70*2 <= 490) && (ele.offsetLeft-70 >= 0) && Check_Empty(ele.offsetTop+70*2,ele.offsetLeft-70,ele)[0]){
        Show_Box(ele,box_array[k++],70*2,-70);
    }  
    if((ele.offsetTop+70 <= 490) && (ele.offsetLeft-70*2 >= 0) && Check_Empty(ele.offsetTop+70,ele.offsetLeft-70*2,ele)[0]){
        Show_Box(ele,box_array[k++],70,-70*2);
    } 
    Save_Offset_Available();//
}

function Move_Vua(ele){
    let k=0;
    // bottom right
    if((ele.offsetTop+70 <= 490) && (ele.offsetLeft+70 <= 490) && Check_Empty(ele.offsetTop+70,ele.offsetLeft+70,ele)[0]){
        Show_Box(ele,box_array[k++],70,70);
    }  
    // top left
    if((ele.offsetTop-70 >=0) && (ele.offsetLeft-70>=0) && Check_Empty(ele.offsetTop-70,ele.offsetLeft-70,ele)[0]){
        Show_Box(ele,box_array[k++],-70,-70);
    } 
    // bottom left
    if((ele.offsetTop+70 <= 490) && (ele.offsetLeft-70 >= 0) && Check_Empty(ele.offsetTop+70,ele.offsetLeft-70,ele)[0]){
        Show_Box(ele,box_array[k++],70,-70);
    } 
    // top right
    if((ele.offsetTop-70 >= 0) && (ele.offsetLeft+70 <= 490) && Check_Empty(ele.offsetTop-70,ele.offsetLeft+70,ele)[0]){
        Show_Box(ele,box_array[k++],-70,70);
    } 
    // top
    if((ele.offsetTop+70 <=490) && Check_Empty(ele.offsetTop+70,ele.offsetLeft,ele)[0]){
        Show_Box(ele,box_array[k++],70,0);
    } 
    // bot
    if((ele.offsetTop-70 >=0) && Check_Empty(ele.offsetTop-70,ele.offsetLeft,ele)[0]){
        Show_Box(ele,box_array[k++],-70,0);
    } 
    // left
    if((ele.offsetLeft-70 >=0) && Check_Empty(ele.offsetTop,ele.offsetLeft-70,ele)[0]){
        Show_Box(ele,box_array[k++],0,-70);
    } 
    // right
    if((ele.offsetLeft+70 <=490) && Check_Empty(ele.offsetTop,ele.offsetLeft+70,ele)[0]){
        Show_Box(ele,box_array[k++],0,70);
    } 
    Save_Offset_Available();//
}

// ------------------------------

//window.onload=Handle_Event();
window.onload=Init_Index();