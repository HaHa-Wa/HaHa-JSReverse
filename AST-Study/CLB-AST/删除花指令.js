//babel库及文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;
//读取文件
let encode_file = "./encode.js",decode_file = "./decode_result.js";
if (process.argv.length > 2)
{
    encode_file = process.argv[2];
}
if (process.argv.length > 3)
{
    decode_file = process.argv[3];
}

let jscode = fs.readFileSync(encode_file, {encoding: "utf-8"});
//转换为ast树
let ast    = parser.parse(jscode);


const removeDeadCode = {
    "VariableDeclarator|FunctionDeclaration"(path)
    {//在setTimeout函数或者eval函数里无法检测是否被引用，所以慎用。
        let {node,scope,parentPath} = path;
        let binding =  scope.getBinding(node.id.name);
        if (binding && !binding.referenced && binding.constant)
        {//没有被引用，也没有被改变
            if (parentPath.parentPath.isForInStatement())
            {
                return;
            }
            path.remove();
        }
    },
}


//some function code

//调用插件，处理源代码
traverse(ast,removeDeadCode);

//生成新的js code，并保存到文件中输出
let {code} = generator(ast);
fs.writeFile('decode.js', code, (err)=>{});