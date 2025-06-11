// slide_showを管理するため
let global_controll=0;

// sleep関数
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time*1000));

// 特定の要素の配下imgタグのsrc要素を配列で取得する
function get_img_src(element) {
    const img_elements = element.getElementsByTagName('img');
    
    let img_hrefs = new Array(img_elements.length);
    for (let i=0; i<img_elements.length; i++) {
        img_hrefs[i] = img_elements[i].src;
    }
    
    return img_hrefs;
}

// 特定の要素のsrc要素を変更する
function set_img_src(element, src_url) {
    element.src = src_url;
}

// スライドショー
async function slide_show_img(slide_element, src_url_list, start_idx, slide_time, first_slide_time) {
    const local_controll = global_controll;
    let src_url;
    let slide_idx = start_idx;
    is_first = true;
    while(true) {
        if (global_controll!==local_controll) {
            return;
        }
        src_url = src_url_list[slide_idx];
        set_img_src(slide_element, src_url);
        
        slide_idx++;
        if (slide_idx >= src_url_list.length) {
            slide_idx -= src_url_list.length;
        }

        if (is_first) {
            await sleep(first_slide_time);
            is_first = false;
        } else {
            await sleep(slide_time);
        }
    }
}

const slide_element = document.getElementById('slide_show_img');
const near_images = document.getElementsByClassName('near_image');
const src_url_list = get_img_src(document.getElementById('near_images'));

window.addEventListener("load", (event) => {
    global_controll++;
    slide_show_img(slide_element, src_url_list, 0, 3, 3);
});

for (let i=0; i<near_images.length; i++) {
    near_images[i].addEventListener("click", (click) => {
        global_controll++;
        slide_show_img(slide_element, src_url_list, i, 3, 5);
    })
}
