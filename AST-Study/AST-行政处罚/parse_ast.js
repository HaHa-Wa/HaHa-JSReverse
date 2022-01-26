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
    },

    CallExpression: {
        enter: [callToStr]
    },
    // 将 类似 console['log']() 替换为 console.log()
    // MemberExpression(path) {
    //     let property_path = path.get('property');
    //     if (types.isStringLiteral(property_path)) {
    //         path.node.computed = false;
    //         // delete path.node.extra
    //         property_path.replaceWith(types.identifier(property_path.node.value));
    //     }
    // },

    // 替换 类似 !![]  换成 true
    UnaryExpression(path) {
        path.replaceWith(types.booleanLiteral(path.node.prefix))
    }
}

const visitor1 = {
    VariableDeclarator(path) {
        const {id, init} = path.node;
        if (!types.isObjectExpression(init)) return;
        let name = id.name;
        let properties = init.properties;
        let all_next_siblings = path.parentPath.getAllNextSiblings();

        for (let next_sibling of all_next_siblings) {
            if (!next_sibling.isExpressionStatement()) break;
            let expression = next_sibling.get('expression');
            if (!expression.isAssignmentExpression()) break;

            let {operator, left, right} = expression.node;

            if (operator != '=' || !types.isMemberExpression(left) ||
                !types.isIdentifier(left.object, {name: name}) || !types.isStringLiteral(left.property)) {
                break;
            }
            properties.push(types.ObjectProperty(left.property, right));
            next_sibling.remove();
        }

        if (properties.length == 0) {
            return;
        }

        let scope = path.scope;
        let next_sibling = path.parentPath.getNextSibling();
        if (next_sibling.isVariableDeclaration()) {
            let declarations = next_sibling.node.declarations;
            if (declarations.length > 0 && types.isIdentifier(declarations[0].init, {name: name})) {
                scope.rename(declarations[0].id.name, name);
                next_sibling.remove();
            }
        }

        for (const property of properties) {//预判是否为 obfuscator 混淆的object
            let key = property.key.value;
            let value = property.value;
            if (!types.isStringLiteral(value) && !types.isFunctionExpression(value)) {
                return;
            }
        }

        for (const property of properties) {
            let key = property.key.value;
            let value = property.value;
            if (types.isLiteral(value)) {
                scope.traverse(scope.block, {
                    MemberExpression(_path) {
                        let _node = _path.node;
                        if (!types.isIdentifier(_node.object, {name: name})) return;
                        if (!types.isLiteral(_node.property, {value: key})) return;
                        _path.replaceWith(value);
                    },
                })
            } else if (types.isFunctionExpression(value)) {
                let ret_state = value.body.body[0];
                if (!types.isReturnStatement(ret_state)) continue;
                scope.traverse(scope.block, {
                    CallExpression: function (_path) {
                        let {callee, arguments} = _path.node;
                        if (!types.isMemberExpression(callee)) return;

                        if (!types.isIdentifier(callee.object, {name: name})) return;
                        if (!types.isLiteral(callee.property, {value: key})) return;

                        let replace_node = null;

                        if (types.isCallExpression(ret_state.argument) && arguments.length > 0) {
                            replace_node = types.CallExpression(arguments[0], arguments.slice(1));
                        } else if (types.isBinaryExpression(ret_state.argument) && arguments.length === 2) {
                            replace_node = types.BinaryExpression(ret_state.argument.operator, arguments[0], arguments[1]);
                        } else if (types.isLogicalExpression(ret_state.argument) && arguments.length === 2) {
                            replace_node = types.LogicalExpression(ret_state.argument.operator, arguments[0], arguments[1]);
                        }
                        replace_node && _path.replaceWith(replace_node);
                    }
                })
            }
        }
        path.remove();
    },
}

const decode_while = {
	WhileStatement(path)
	{
		const {test,body} = path.node;
		if (!types.isLiteral(test,{value:true}) || body.body.length === 0  || !types.isSwitchStatement(body.body[0])) return;
		let switch_state = body.body[0];
		let {discriminant,cases} = switch_state;
		if (!types.isMemberExpression(discriminant) || !types.isUpdateExpression(discriminant.property)) return;

		let arr_name = discriminant.object.name;
		let arr = [];
		let all_pre_siblings = path.getAllPrevSiblings();
		all_pre_siblings.forEach(pre_path =>
		{
			const {declarations} = pre_path.node;
			let {id,init} = declarations[0];
			if (arr_name == id.name)
			{
				arr = init.callee.object.value.split("|");
			}
			pre_path.remove();
		})

		let ret_body = [];
		arr.forEach(index =>
		{
			let case_body = cases[index].consequent;
			if (types.isContinueStatement(case_body[case_body.length-1]))
			{
				case_body.pop();
			}

			ret_body = ret_body.concat(case_body);
		})

		path.replaceInline(ret_body);
	},
}


function callToStr(path) {
    let node = path.node
    if (types.isIdentifier(node.callee) && node.callee.name === decryptStrFnName) {
        const result = decryptStr(node.arguments[0].value, node.arguments[1].value)
        path.replaceWith(types.stringLiteral(result))
        return
    }
}

//some function code

//调用插件，处理源代码
traverse(ast, visitor);
traverse(ast, visitor1);
traverse(ast, decode_while);

//生成新的js code，并保存到文件中输出
let {code} = generator(ast);
fs.writeFile('decode.js', code, (err) => {
});