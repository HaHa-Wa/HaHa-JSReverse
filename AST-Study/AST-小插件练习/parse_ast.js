//babel库及文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

// 自定义库
const {decryptStr, decryptStrFnName} = require('./decrypt')

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

// 预处理
const visitor = {
    FunctionDeclaration(path)
    {
        let {id,body} = path.node;
        const binding = path.scope.parent.getBinding(id.name);
        if (!binding || !binding.constant) return;
        if (!binding.referenced)
        {
            path.remove();
            return;
        }

        let sourceCode = path.toString();
        if (sourceCode.includes("try") ||
            sourceCode.includes("random") ||
            sourceCode.includes("Date")
        )
        {//返回值不唯一不做处理
            return;
        }

        //直接eval，如果缺环境，让其主动报错，再补上即可。下同
        eval(sourceCode);

        let referPaths = binding.referencePaths;
        for (const referPath of referPaths)
        {
            let callExpress = referPath.parentPath;
            console.log('callExpress：', callExpress)
            if (!callExpress.isCallExpression({callee:referPath.node}))
            {
                continue;
            }
            // if (! types.isElementsLiteral(callExpress)) continue;

            let value = eval(callExpress.toString());
            if (typeof value == "function" || typeof value == "undefined") continue;

            console.log(callExpress.toString(),"-->",value);
            callExpress.replaceWith(types.valueToNode(value));
        }
    },
}

const visitor_util = {
    // 翻译十六进制
    'StringLiteral|NumericLiteral'(path) { // https://blog.csdn.net/qq_42748190/article/details/106260181
        delete path.node.extra // 之所以会以十六进制显示，完全是 raw这个节点造成的,那就删除
    },

    // 将 _0xd1a5(112) 替换为 'asd'
    CallExpression(path) {
        let node = path.node
        if (types.isIdentifier(node.callee) && node.callee.name === decryptStrFnName) {
            const result = decryptStr(node.arguments[0].value)
            path.replaceWith(types.stringLiteral(result))
        }
    },

    // 替换 类似 !![]  换成 true
    UnaryExpression(path) {
        path.replaceWith(types.booleanLiteral(path.node.prefix))
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

    // 删除没有被引用的代码  eval、setInterval 会失败 无法转换
    "VariableDeclarator|FunctionDeclaration"(path) {//在setTimeout函数或者eval函数里无法检测是否被引用，所以慎用。
        console.log(path)
        let {node, scope, parentPath} = path;
        let binding = scope.getBinding(node.id.name);
        if (binding && !binding.referenced && binding.constant) {//没有被引用，也没有被改变
            if (parentPath.parentPath.isForInStatement()) {
                return;
            }
            path.remove();
        }
    },

    // if else  绝对值时 删除else
    "IfStatement|ConditionalExpression"(path) {
        let {consequent, alternate} = path.node;
        let testPath = path.get('test');
        const evaluateTest = testPath.evaluateTruthy();
        if (evaluateTest === true) {
            path.replaceWithMultiple(consequent);
        } else if (evaluateTest === false) {
            if (alternate != null) {
                path.replaceWithMultiple(alternate);
            } else {
                path.remove();
            }
        }
    },
}

//调用插件，处理源代码
traverse(ast, visitor);


//生成新的js code，并保存到文件中输出
let {code} = generator(ast);
fs.writeFile('decode.js', code, (err) => {
});