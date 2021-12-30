//babel库及文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;
const {decryptStrFnName, decryptStr} = require("./decrypt");

//读取文件
let encode_file = "./obfuscator.js", decode_file = "./decode_result.js";
if (process.argv.length > 2) {
    encode_file = process.argv[2];
}
if (process.argv.length > 3) {
    decode_file = process.argv[3];
}

let jscode = fs.readFileSync(encode_file, {encoding: "utf-8"});
//转换为ast树
let ast = parser.parse(jscode);

// 转换16进制字符串
const visitor =
    {
        'StringLiteral|NumericLiteral'(path) { // https://blog.csdn.net/qq_42748190/article/details/106260181
            delete path.node.extra // 之所以会以十六进制显示，完全是 raw这个节点造成的,那就删除
        },

        CallExpression: {
            enter: [callToStr]
        },
        // 将 类似 console['log']() 替换为 console.log()
        MemberExpression(path) {
            let property_path = path.get('property');
            if (types.isStringLiteral(property_path)) {
                path.node.computed = false;
                // delete path.node.extra
                property_path.replaceWith(types.identifier(property_path.node.value));
            }
        },

        // 替换 类似 !![]  换成 true
        UnaryExpression(path) {
            path.replaceWith(types.booleanLiteral(path.node.prefix))
        }
    }

function callToStr(path) {
    let node = path.node
    if (types.isIdentifier(node.callee) && node.callee.name === '_0x1f5cb8') {
        const result = decryptStr(node.arguments[0].value)
        path.replaceWith(types.stringLiteral(result))
        return
    }
}

//some function code

//调用插件，处理源代码
traverse(ast, visitor);

//生成新的js code，并保存到文件中输出
let {code} = generator(ast);
fs.writeFile('decode.js', code, (err) => {
});