// 筛选
window.onload=function(){           
   onload3();    
} 

function onload3()
{
    var oTable=document.getElementById('fil_first');
    // var oBtnDefault=oTable.getElementsByTagName('a')[0];
    var oBtnPrice=oTable.getElementsByTagName('a')[1];
    var oBtnArea=oTable.getElementsByTagName('a')[2];
    var i=0;
    oBtnPrice.href="javascript:void(0);";
    oBtnPrice.order='none';
    oBtnPrice.onclick=sortByPrice;
    
    oBtnArea.href="javascript:void(0);";
    oBtnArea.order='none';
    oBtnArea.onclick=sortByArea;
    // oBtnDefault.onclick=function(){
        
    // };
};





function sortByPrice()
{
    var oTable=document.getElementById('fil_first');
    var oBtnPrice=oTable.getElementsByTagName('a')[1];
    var oBtnArea=oTable.getElementsByTagName('a')[2];
    var result=1;
    
    switch(oBtnPrice.order)
    {
        case 'none':
        case 'asc':
            oBtnPrice.className='up_active';
            oBtnPrice.order='desc';
            result=1;
            break;
        case 'desc':
            oBtnPrice.className='down_active';
            oBtnPrice.order='asc';
            result=-1;
            break;
    }
    
    oBtnArea.order='none';
    oBtnArea.className='up_down';
    
    
}

function sortByArea()
{
    var oTable=document.getElementById('fil_first');
    var oBtnPrice=oTable.getElementsByTagName('a')[1];
    var oBtnArea=oTable.getElementsByTagName('a')[2];
    var result=1;
    
    switch(oBtnArea.order)
    {
        case 'none':
        case 'asc':
            oBtnArea.className='up_active';
            oBtnArea.order='desc';
            result=1;
            break;
        case 'desc':
            oBtnArea.className='down_active';
            oBtnArea.order='asc';
            result=-1;
            break;
    }
    
    oBtnPrice.order='none';
    oBtnPrice.className='up_down';
    
}

