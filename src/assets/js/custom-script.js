$(document).ready(function () {



//code for equal height maintain for main wrapper    
    var maxH = 0;
    $(".colHeight").each(function () {
        if ($(this).outerHeight() > maxH) {
            maxH = $(this).outerHeight();
        }
    });
    $(".colHeight").each(function () {
        if ($(".TopHead", this).length) {
            $('.FormHldrBox', this).outerHeight(maxH - $(".TopHead", this).outerHeight());
        } else {
            $(this).outerHeight(maxH);
        }
    });
    $('.makeItEqual').outerHeight(maxH);
    $(".makeItEqual-outer").each(function () {
        $(".makeItEqual-inner", this).outerHeight(maxH - ($(this).outerHeight() - $(".makeItEqual-inner", this).outerHeight()));
    });
//code for add more textbox after click on plus icon
    var artTdBoxIncValue = 2;
    $('.addMore i').click(function () {
        var addtxtbox = '<div class="col-1"><span class="sno">' + artTdBoxIncValue + '</span><div class="txtbox"><input type="text" class="form-control"></div></div>';
        $(".AddMoreWrapper").append(addtxtbox);
        artTdBoxIncValue++;
    });
//code for edit txtbox for calculator
$('.editItemChanged').on('click', function() {
    var $this = $(this);
    var prevValue =  $this.text();
    var $input = $('<input>', {
        value: prevValue,
        class:'short-box pricebx edtxtbox',
        type: 'text',
        blur: function() {
           $this.text(this.value);
           if(prevValue != this.value){
               //$.ajax($this.data("action"))
           }
        },
        keyup: function(e) {
           if (e.which === 13) $input.blur();
        }
    }).appendTo( $this.empty() ).focus();
});
//code for advance search   
$('.date-range').click(function(){
    $('.DateRangeBox').slideToggle('slow');
});   
//code for delete confirmation
$('.confirm-delete').click(function(){
   $('.confirmBoxWrapper').show(); 
});
$('.closebtn').click(function(){
    $('.confirmBoxWrapper').css('display','none'); 
});

//Code for click on sidebar list items
    $('.ListWrapper table tbody tr').click(function () {
        $('.ListWrapper table tbody tr').find('td').css({"font-weight": "normal", "background": "white"});
        $(this).find('td').css({"font-weight": "bold", "background": "#e5e5e5"});
    });
//Code for display a div of listItems
$('.ListingData table tfoot tr td a').hover(function(){
     $('.lineItems').css({"display":"block"});
     $('.lineItems').fadeIn(2000);
    });
//code for date range
if($('.input-daterange').length>0){
    $('.input-daterange').datepicker({
        todayBtn: "linked"
    }); 
}
//code for display tooltip on status page
if($('.top-section ul.dStatusDetails li a .inner .box1').length>0){
    $('.top-section ul.dStatusDetails li a .inner .box1').hover(function(){  
        $('.tooltipTxt').fadeTo(300, 1);
    });
}
if($('.top-section ul.dStatusDetails li a .inner').length>0){
    $('.top-section ul.dStatusDetails li a .inner').mouseleave(function () {
        $('.tooltipTxt').fadeTo(500, 0);    
    });
}
//code for pop up on status page   
$(".DepDetails").click(function(){
         if ($(window).width() < 1280) {
             $('.statusDetailsPopUp').modal('show');
         }
         else{
             $('.statusDetailsPopUp').modal('hide');
         }
     });   
     
$(window).resize(function() {
//    alert($(window).width());
     $(".DepDetails").click(function(){
         if ($(window).width() < 1280) {
             $('.statusDetailsPopUp').modal('show');
         }
         else{
             $('.statusDetailsPopUp').modal('hide');
         }
     });   
   });
//for dropdown navigation menu header
$('ul.navHldr li.dropdown').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
    }, function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});
 
});
//code for slim scroll
$('.makeItEqual-inner').slimscroll({    
    railVisible: true,
    alwaysVisible: true,
    color: '#94926a',
    railColor:'#94926a',
    railOpacity:0.3,
    opacity:1,
    height: '100%',
    size:'10px',
    allowPageScroll: false,
    scrollTo: '50px'  
});

$('.FormHldrBoxScoll').slimscroll({    
    railVisible: true,
    color: '#94926a',
    railColor:'#94926a',
    railOpacity:0.3,
    opacity:1,
    height: '100%',
    size:'10px',
    allowPageScroll: false,
    scrollTo: '50px'  
}); 

$('.SlimScroll').slimscroll({    
    railVisible: true,
    color: '#94926a',
    railColor:'#94926a',
    railOpacity:0.3,
    opacity:1,
    height: '555px',
    size:'10px',
    allowPageScroll: false,
    scrollTo: '50px'  
}); 

$('.JcommnetScroll').slimscroll({    
    railVisible: true,
    color: '#94926a',
    railColor:'#94926a',
    railOpacity:0.3,
    opacity:1,
    height: '165px',
    size:'10px',
    allowPageScroll: false,
    scrollTo: '50px'  
}); 
