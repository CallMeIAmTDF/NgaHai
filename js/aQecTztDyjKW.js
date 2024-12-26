window.$=jQuery;var $loadAdvise
var slideAdvises
function getRecruitIndex($i){if($i<10){return`00${$i}`;}else if($i<100){return`0${$i}`;}else{return $i;}}
function getRecruitByHTML(recruit,index){return`
             <tr>
                 <td class="text-center">
                    ${getRecruitIndex(index + 1)}
                 </td>
                 <td><a href="${recruit.url}">${recruit.title}</a></td>
                 <td>${recruit.room}</td>
                 <td>${recruit.location}</td>
                 <td class="text-center">${recruit.expires ?? ''}</td>
                 <td>
                     <a href="${recruit.url}"
                        class="custom-btn outlined">${window.translates.recruit_register}</a>
                 </td>
             </tr>
        `;}
function getRecruitsByHTML(recruits){let html='';for(let i=0;i<recruits.length;i++){html+=getRecruitByHTML(recruits[i],i);}
return html;}
function renderRecruits(recruits){const $tbody=$(".recruits tbody");$tbody.html(recruits);}
function fetchRecruit(body){body.action="get_recruits"
body.language=window.language;return new Promise((resolve,reject)=>{$.ajax({type:"post",dataType:"json",url:admin_ajax,data:body,context:this,success:function(response){if(response.success){return resolve(response.data)}else{return reject('Connection failed');}},})});}
function fetchAdvises(body){body.action="get_advises"
return new Promise((resolve,reject)=>{$.ajax({type:"post",dataType:"json",url:admin_ajax,data:body,context:this,success:function(response){if(response.success){return resolve(response.data)}else{return reject('Connection failed');}},})});}
function table_recruits(recruits){renderRecruits(getRecruitsByHTML(recruits))
const $form=$(".form-filter-recruit form");$form.find("select, input").change(async function(e){const data=$form.serializeArray();const body={};data.map(({name,value})=>body[name]=value);try{const result=await fetchRecruit(body);renderRecruits(getRecruitsByHTML(result))}catch(error){alert("Lỗi khi tải danh sách");}})}
function form_filter_projects(){const $form=$("form#form-filter-projects");let delay=null;$form.find("select, input").change(async function(e){if(delay){clearTimeout(delay);}
const data=$form.serialize();delay=setTimeout(()=>{window.location.href=`${window.location.origin}${window.location.pathname}?${data}`;},1000)})}
function showCustomPopup(visible=true){if(visible){$("body").css("overflow","hidden");}
$("<div class='overlay'></div>").appendTo($(".main-content"));}
function hidePopupCustom(){$(".custom-popup").removeClass("active");$("body").css("overflow","unset");$(".overlay").remove();}
function setAdvise({name,email}){$('input[name="your-advise"]').val(name);$('input[name="your-advise-mail"]').val(email);}
function getAdviseSocial(advise){return`
         <div class="socials">
             <a href="tel:${advise.phone}">
                 <img src="/html/samples/social/chat.png" alt="Chat">
             </a>
             <a target="_blank" href="https://zalo.me/${advise.zalo}">
                 <img src="/html/samples/social/zalo.png" alt="Zalo">
             </a>
             <a target="_blank" href="viber://chat?number=+${advise.viber}">
                 <img src="/html/samples/social/viber.png" alt="Viber">
             </a>
             <a target="_blank" href="${advise.messenger}">
                 <img src="/html/samples/social/fb.png" alt="Messenger">
             </a>
         </div>
    `;}
function getAdviseHTML(advise){return`
    <div class=" col-6 col-md-4 col-lg-3 mb-4">
        <div class="advise">
            <div class="advise-summary" data-id="${advise.id}" data-advise="${advise.title}" data-email="${advise.email}">
                <div class="thumbnail"
                     style="background-image: url(${advise.thumbnail})">
                </div>
                <p class="name mt-2 mb-2"><strong
                        class="text-uppercase secondary">${advise.title}</strong></p>
                    ${advise.phone ? `<a href="tel:${advise.phone}"class="phone"><i
class="far fa-mobile me-2"></i>${advise.phone}</a>` : ''}
                ${getAdviseSocial(advise)}
                <p class="desc">${advise.excerpt}</p>
                <button class="detail">
                    <strong>${window.translates.recruit_register}</strong>
                    <span class="long-arrow"></span>
                </button>
            </div>
        </div>
    </div>
`;}
function getAdviseSwiper(advise){return`
          <div class="swiper-slide" data-id="${advise.id}" data-advise="${advise.title}" data-email="${advise.email}">
              <div class="advise-container">
                  <div class="advise-header">
                      ${advise.title}
                      <button class="close">X</button>
                  </div>
                  <div class="advise">
                  <div class="advise-slide">
                    <div class="thumbnail"
                         style="background-image: url(${advise.thumbnail})">
                    </div>
                    <div class="advise-body">
                        <p class="desc">${advise.excerpt}</p>
                        <div class="content">${advise.content}</div>
                    </div>
                    ${advise.phone ? `<a href="tel:${advise.phone}"class="phone"><i
class="far fa-mobile me-2"></i>${advise.phone}</a>` : ''}
                    ${advise.email ? `<a href="mailto:${advise.email}"class="email"><i
class="far fa-envelope me-2"></i>${advise.email}</a>` : ''}
                    ${getAdviseSocial(advise)}
                </div>
                  </div>
              </div>
          </div>
    `;}
function shuffle(array){let currentIndex=array.length,randomIndex;while(currentIndex!=0){randomIndex=Math.floor(Math.random()*currentIndex);currentIndex--;[array[currentIndex],array[randomIndex]]=[array[randomIndex],array[currentIndex]];}
return array;}
function to_advices(advises){let html='';advises=shuffle(advises);for(const advise of advises){html+=getAdviseHTML(advise);slideAdvises.appendSlide(getAdviseSwiper(advise))}
$(html).appendTo('.advises');}
jQuery(document).ready(function(){const bodyWidth=$("body").width();$('button.search').click(function(){showCustomPopup();$(".header-search").addClass("active");})
$(".nav-content .nav-list .menu-item-has-children>a").click(function(){const $parent=$(this).parent();const isActive=$parent.hasClass('active');$(".nav-content .nav-list .menu-item-has-children").removeClass("active");if(isActive){$parent.removeClass('active');}else{$parent.addClass('active');}});[].slice.call($(".event-slide-inline")).map(function(e){new Swiper($(e).find('.swiper')[0],{loop:true,speed:1000,slidesPerView:2,spaceBetween:15,autoHeight:true,pagination:false,navigation:{nextEl:$(e).find(".swiper-button-next")[0],prevEl:$(e).find(".swiper-button-prev")[0]},breakpoints:{575:{slidesPerView:1,spaceBetween:15,},768:{slidesPerView:2,},980:{slidesPerView:3,spaceBetween:45,},}});});[].slice.call($(".news-slide-inline")).map(function(e){new Swiper($(e).find('.swiper')[0],{loop:true,speed:2000,slidesPerView:2,autoHeight:true,spaceBetween:15,pagination:false,autoplay:{delay:5000,pauseOnMouseEnter:true},navigation:{nextEl:$(e).find(".swiper-button-next")[0],prevEl:$(e).find(".swiper-button-prev")[0]},breakpoints:{575:{slidesPerView:1,spaceBetween:15,},768:{slidesPerView:2,},980:{slidesPerView:3,spaceBetween:45,},}});});$(document).mouseup(function(e){var container=$(".custom-popup-body");if(!container.is(e.target)&&container.has(e.target).length===0){hidePopupCustom();}});$(document).keydown(function(e){if(e.code==="Escape"){hidePopupCustom();}})
$(".custom-popup .close").click(function(){$(".custom-popup").removeClass("active");$("body").css("overflow","unset");$(".overlay").remove();});[].slice.call($("select")).map(function(e){const $e=$(e);const $parent=$e.parent();const $container=$("<div class='select-wrapper'></div>");$e.appendTo($container);$container.appendTo($parent);})
$(document).on('change',"input[type='file']",function(e){const $e=$(this);if(!e.target.files.length){$e.css("--text","");}else{$e.css("--text",`"${e.target.files[0].name}"`);}})
if($('.footer-nav .menu').length){try{if(bodyWidth>=768){$('.footer-nav .menu').slick('unslick');}else{$(".footer-nav .menu").slick({slidesToShow:2.5,infinite:false,responsive:[{breakpoint:480,settings:{slidesToShow:3.5,}}]});}}catch(error){}}
function resizeThumbnail(){const isMobile=$("body,html").width()<=768;$("div.post-thumbnail").each(function(){const $this=$(this);$this.height($this.width()*0.6);});$(".video_header video").each(function(){const source=$(this).find("source");if(!source)return;const pc=source.attr("data-pc");const mobile=source.attr("data-mobile");if(isMobile){source.attr('src',mobile)}else{source.attr('src',pc)}})}
resizeThumbnail();$(window).resize(resizeThumbnail)
if(typeof recruits!=="undefined"){table_recruits(recruits);}
form_filter_projects();let page=1;$loadAdvise=$('#load-advises');slideAdvises=new Swiper(".advise-popup .swiper",{loop:false,speed:1000,slidesPerView:1,autoHeight:true,spaceBetween:30,observer:true,observeParents:true,navigation:{nextEl:$(".advise-popup .swiper-button-next")[0],prevEl:$(".advise-popup .swiper-button-prev")[0]},on:{slideChange:(swiper)=>{const slide=swiper.slides[swiper.realIndex];setAdvise({name:$(slide).find('.advise-slide').attr('data-advise'),email:$(slide).find('.advise-slide').attr('data-email'),});}}});$(document).on('click',".advise-summary .detail, .advise-summary .thumbnail",function(){const id=$(this).parent().attr("data-id");const slides=$('.advise-popup .swiper-slide');const index=[].slice.call(slides).findIndex(e=>$(e).attr("data-id")===id);if(index!==-1){slideAdvises.slideTo(index);setAdvise({name:$(this).parent().attr('data-advise'),email:$(this).parent().attr('data-email'),});setTimeout(()=>{showCustomPopup();$(".advise-popup").addClass("active");},200)}})
$(document).on('click','#load-advises',async function(){$loadAdvise.text(window.translates.loading)
const advises=await fetchAdvises({page:++page});$loadAdvise.text(window.translates.view_more)
to_advices(advises)
if(advises.length<8){$loadAdvise.remove();}});new Swiper(".nav-footer-mobile .swiper",{spaceBetween:10,slidesPerView:4.5,breakpoints:{768:{slidesPerView:5.5,},}});function onScrollDirection(direction){const $sidebar=$(".sidebar-menu, .mobile-menu-logo, .nav-footer-mobile");if(!$sidebar.hasClass(`direction-${direction}`)){$sidebar.removeClass('direction-down');$sidebar.removeClass('direction-up');$sidebar.addClass(`direction-${direction}`);}}
let lastScrollTop=0;$(window).scroll(function(event){let st=$(this).scrollTop();const direction=st>lastScrollTop?'down':'up';lastScrollTop=st;onScrollDirection(direction);});$("body.single .post-content img").each(function(e){var $this=$(this);const $parent=$(this).parent();if($parent?.[0].tagName.toLowerCase()==='a'){return;}
var src=$this.attr('src');$this.addClass('image');var a=$('<a/>');a.attr('href',src);a.attr("data-fancybox","post-content-gallery");a.attr("data-caption",$this.attr("alt"));$this.wrap(a);});})