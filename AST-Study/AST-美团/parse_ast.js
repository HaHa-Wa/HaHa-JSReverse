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
const visitor = {
    'StringLiteral|NumericLiteral'(path) { // https://blog.csdn.net/qq_42748190/article/details/106260181
        delete path.node.extra // 之所以会以十六进制显示，完全是 raw这个节点造成的,那就删除
        return
    }
}

const visitor1 = {
    VariableDeclarator(path){
        var {id, init} = path.node;
        if (!types.isArrayExpression(init)|| init.elements.length ===0) return
        let elements = init.elements;
        const binding = path.scope.getBinding(id.name)
        console.log(id.name)
        for (const refer_path of binding.referencePaths){
            let member_path = refer_path.findParent(p=>p.isMemberExpression());
            if (!member_path) return;
            let property = member_path.get('property');

            if(!property.isNumericLiteral()){ continue};

            let index = property.node.value;
            let arr_ele = elements[index];
            member_path.replaceWith(arr_ele)
        }
    },

    EmptyStatement(path) {
        path.remove()
    }
}

//some function code

//调用插件，处理源代码
traverse(ast, visitor);
traverse(ast, visitor1);
// traverse(ast, decode_while);

//生成新的js code，并保存到文件中输出
let {code} = generator(ast);
fs.writeFile('decode.js', code, (err) => {
});