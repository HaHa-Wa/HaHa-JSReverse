//babel库及文件模块导入
const fs = require('fs');

//babel库相关，解析，转换，构建，生产
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const generator = require("@babel/generator").default;

// 自定义库
const {decryptStr, decryptStrFnName, decryptStrFnName_2, decryptStr_2} = require('./decrypt')

//读取文件
let encode_file = "./05.js", decode_file = "./decode_result.js";
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

        if (types.isNumericLiteral(property_path) && path.node.object.name === decryptStrFnName_2) {
            const result = decryptStr_2(path.node.property.value)
            path.replaceWith(types.stringLiteral(result))
        }
    },
}

// 替换while switch
const visitor2 = {
    WhileStatement(path) {
        let node = path.node;
        if (!types.isBooleanLiteral(node.test) || node.test.value !== true) return;
        if (!types.isBlockStatement(node.body)) return;
        let body = node.body.body;
        if (!types.isSwitchStatement(body[0]) || !types.isMemberExpression(body[0].discriminant) || !types.isBreakStatement(body[1])) return
        const switchStm = body[0]
        const arrName = switchStm.discriminant.object.name

        const varPath = path.getSibling(path.key - 1)

        let varNode = varPath.node.declarations.filter(declarator => declarator.id.name === arrName)[0]
        // 把值取出来分割成数组 ["0", "1", "3", "6", "2" ...]
        let idxArr = varNode.init.callee.object.value.split('|')

        const allCase = switchStm.cases;
        let retBody = []
        idxArr.map(idx => {
            let caseBody = allCase[idx].consequent
            if (types.isContinueStatement(caseBody[caseBody.length - 1])) {
                caseBody.pop()
            }
            retBody = retBody.concat(caseBody)
        })
        path.replaceWithMultiple(retBody)

        varPath.remove()
    }
}

// replaceFns
const visitor3 = {
    VariableDeclarator(path) {
        let node = path.node
        if (!types.isObjectExpression(node.init)) return
        let properties = node.init.properties
        try {
            if (!types.isFunctionExpression(properties[0].value)) return
            if (properties[0].value.body.body.length !== 1) return
            let retStmt = properties[0].value.body.body[0]
            if (!types.isReturnStatement(retStmt)) return

        } catch (error) {
            console.log('ignore: wrong fn arr', properties)
        }

        let objName = node.id.name
        properties.forEach(prop => {
            let key = prop.key.value
            let params = prop.value.params
            let retStmt = prop.value.body.body[0] // 替换体

            const fnPath = path.getFunctionParent()
            fnPath.traverse({
                CallExpression: function (_path) {
                    if (!types.isMemberExpression(_path.node.callee)) return
                    let node = _path.node.callee
                    if (!types.isIdentifier(node.object) || node.object.name !== objName) return

                    if (!types.isStringLiteral(node.property) || node.property.value !== key) return
                    let args = _path.node.arguments // 调用传入的参数

                    if (types.isBinaryExpression(retStmt.argument) && args.length === 2) {
                        _path.replaceWith(types.binaryExpression(retStmt.argument.operator, args[0], args[1]))
                    }
                    if (types.isLogicalExpression(retStmt.argument) && args.length === 2) {
                        _path.replaceWith(types.logicalExpression(retStmt.argument.operator, args[0], args[1]))
                    }
                    if (types.isCallExpression(retStmt.argument) && types.isIdentifier(retStmt.argument.callee)) {
                        _path.replaceWith(types.callExpression(args[0], args.slice(1)))
                    }
                }
            })
        })
        path.remove()
    }
}


//调用插件，处理源代码
traverse(ast, visitor);
// traverse(ast, visitor2);
// traverse(ast, visitor3);

//生成新的js code，并保存到文件中输出
let {code} = generator(ast);
fs.writeFile('decode.js', code, (err) => {
});