class StringReplacePlugin {
    constructor(options) {
        this.source = options.source
        this.content = options.content
    }
    apply(compiler) {
        const {source , content} = this
        compiler.hooks.emit.tapAsync('StringReplacePlugin', (compilation, callback) => {
            // 在生成文件中，创建一个头部字符串：
            var filelist = 'In this build:\n\n';

            // 遍历所有编译过的资源文件，
            // 对于每个文件名称，都添加一行内容。
            for (var filename in compilation.assets) {
                filelist += ('- '+ filename +'\n');
            }

            // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
            compilation.assets['filelist.md'] = {
                source: function() {
                    return filelist;
                },
                size: function() {
                    return filelist.length;
                }
            };
            compilation.chunks.forEach(function(chunk){
                console.log('=====================================');
                console.log('chunk', chunk);

                // chunk._modules.forEach(function(module){
                //     try {
                //         console.log('module', module._source._value);
                //     } catch (e) {
                //
                //     }
                // });
            });
            callback();
        })
    }
}

module.exports = StringReplacePlugin