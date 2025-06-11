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
    console.log(element);
    element.src = src_url
}
