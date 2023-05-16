export default function base64(url, type) {
    return new Promise((resolve, reject) => {
        if (!!uni.getFileSystemManager()) {
            uni.getFileSystemManager().readFile({
                filePath: url, //选择图片返回的相对路径
                encoding: "base64", //编码格式
                success: (res) => {
                    resolve(
                        "data:image/" +
                            type.toLocaleLowerCase() +
                            ";base64," +
                            res.data
                    );
                },
                fail: (res) => reject(res.errMsg),
            });
        } else {
            uni.request({
                url: url,
                method: "GET",
                responseType: "arraybuffer",
                success: (ress) => {
                    let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64
                    base64 = "data:image/jpeg;base64," + base64; //不加上这串字符，在页面无法显示的哦
                    resolve(base64);
                },
                fail: (res) => reject(res.errMsg),
            });
        }
    });
}