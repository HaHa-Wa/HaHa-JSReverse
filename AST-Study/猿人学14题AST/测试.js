// https://astexplorer.net/
// monitor(Array.prototype.push)
/* 使用 MemoryInfra 进行启动跟踪
https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/memory-infra/memory_infra_startup_tracing.md
$ chrome --no-sandbox \
         --trace-startup=-*,disabled-by-default-memory-infra \
         --trace-startup-file=/tmp/trace.json \
         --trace-startup-duration=7
 */
// unmonitor(Array.prototype.push)

const fs = require('fs');
const t = require("@babel/types");
const TNT = require("@babel/types");
const babel = require("@babel/core");
const types = require("@babel/types");
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;





function compile(jsCode) {
    // 1.parse 将代码解析为抽象语法树（AST）
    const ast = babel.parse(jsCode);
    /**
     * &&作用示例： a && b 两为真才是真
     * 如果a是false，那么b不管是true还是false，都返回false
     * 如果a是true，那么就要在判断b，都返回b。
     */
    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    console.log("处理十六进制、中英文Unicode字符串或数值、删除空语句、删除Debugger......")
    traverse(ast, {
        DebuggerStatement(path) { // 删除Debugger调试代码 【https://blog.51cto.com/u_15072904/2579596?xiangguantuijian&02】
            path.remove();
        },
        EmptyStatement(path) { // 删除空语句 【https://blog.51cto.com/u_15072904/2579596?xiangguantuijian&02】
            path.remove();
        },
        'StringLiteral|NumericLiteral'(path) { // https://blog.csdn.net/qq_42748190/article/details/106260181
            delete path.node.extra // 之所以会以十六进制显示，完全是 raw这个节点造成的,那就删除
        },


        // * [NumericLiteral 处理十六进制、中英文Unicode字符串或数值]
        // * 示例： 0x25=37 0b10001001=137 0o123456=42798
        // * https://mp.weixin.qq.com/s?__biz=MzAwNTY1OTg0MQ==&mid=2647562291&idx=1&sn=bb94aafa13c95af8ff89771cb78f27d7&chksm=8323759db454fc8bfc3dd5c309bc1a274cc82913b26470e863b896c3605adb8df466ad86bd08&scene=21#wechat_redirect
        NumericLiteral({ node }) {
            if (node.extra && /^0[obx]/i.test(node.extra.raw)) {
                node.extra = undefined;
            }
        },


        // * [StringLiteral 处理十六进制、中英文Unicode字符串或数值]
        // * 示例：\\u0068\\u0065   \\u7ED3\\u679C
        // * 【同上链接】
        StringLiteral({ node }) {
            if (node.extra && /\\[ux]/gi.test(node.extra.raw)) {
                node.extra = undefined;
            }
        },
    })




    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    console.log("字符串或数字格式化中......")
    traverse(ast, {
        'UnaryExpression|BinaryExpression'(path) {
            const NODE = path.node;
            const { value } = path.evaluate();
            // https://blog.csdn.net/qq_42748190/article/details/106206518
            switch (typeof value) {
                case 'boolean':
                    path.replaceWith(t.BooleanLiteral(value))
                    break;
                    // 注释原因：会印象到 -》 类似console['log']() 变 console.log()
                    // case 'string':
                    //     path.replaceWith(t.StringLiteral(value))
                    //     break;
                case 'number':
                    path.replaceWith(t.NumericLiteral(value))
                    break;
                default:
                    break;
            }

            if (TNT.isLiteral(NODE.left) && TNT.isLiteral(NODE.right)) {
                if (TNT.isStringLiteral(NODE.left) || TNT.isStringLiteral(NODE.right)) {
                    let replace = eval(path.toString());
                    path.replaceWith(TNT.stringLiteral(replace));
                    path.parentPath.visit(); // 触发父节点的树重新遍历【字符串自动拼接】
                } else if (TNT.isNumericLiteral(NODE.left) && TNT.isNumericLiteral(NODE.right)) {
                    // http://t.zoukankan.com/zhaobao1830-p-8479459.html
                    let result;
                    // 根据不同的操作符作运算
                    switch (NODE.operator) {
                        case "+":
                            result = NODE.left.value + NODE.right.value;
                            break
                        case "-":
                            result = NODE.left.value - NODE.right.value;
                            break;
                        case "*":
                            result = NODE.left.value * NODE.right.value;
                            break;
                        case "/":
                            result = NODE.left.value / NODE.right.value;
                            break;
                        case "**":
                            let i = right;
                            while (--i) {
                                result = result || NODE.left.value;
                                result = result - NODE.left.value;
                            }
                            break;
                        default:
                    }
                    // 如果上面的运算有结果的话
                    if (result !== undefined) {
                        // 把表达式节点替换成number字面量
                        path.replaceWith(TNT.numericLiteral(result));
                        path.parentPath.visit(); // 触发父节点的树重新遍历
                    }
                }
            }
        },
    });




    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    console.log("删除重复定义且未被改变初始值的变量......")
    traverse(ast, {
        VariableDeclaration(path) {
            const NODE = path.node;
            const ArrNode = NODE.declarations[0];
            if (
                !path.inList || // 判断路径是否有同级节点
                !TNT.isVariableDeclaration(NODE) ||
                !TNT.isVariableDeclarator(ArrNode) ||
                !TNT.isIdentifier(ArrNode.id) ||
                !TNT.isObjectExpression(ArrNode.init)
            ) return;
            let func_name = ArrNode.id.name
            let scope = path.scope; // 同一个作用域

            scope.traverse(scope.block, {
                VariableDeclarator(_path) {
                    // https://www.jianshu.com/p/a3857fa5c899
                    // https://blog.csdn.net/qq_41392887/article/details/108218164
                    // https://blog.csdn.net/qq523176585/article/details/110944650
                    let { id, init } = _path.node;
                    if (!TNT.isIdentifier(init, { name: func_name })) return;
                    _path.scope.rename(id.name, func_name);
                    _path.remove();
                },

            });
        },
        "VariableDeclarator|FunctionDeclaration"(path) {
            let { node, scope } = path;
            if (path.isFunctionDeclaration()) {
                scope = path.parentPath.scope;
            }
            let name = node.id.name;
            const binding = scope.getBinding(name);
            if (!binding || !binding.constant) return;

            scope.traverse(scope.block, {
                VariableDeclarator(path) {
                    let { node, scope } = path;
                    let { id, init } = node;
                    if (!types.isIdentifier(init, { name: name })) return;
                    if (!path.get('id').isConstantExpression()) return;
                    scope.rename(id.name, name);
                    path.remove();
                },
            })
        },
    });




    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    console.log("将拆分的对象重新合并......")
    traverse(ast, {
        VariableDeclarator(path) {
            const { id, init } = path.node;
            if (!t.isObjectExpression(init) || init.properties.length != 0) return;
            let name = id.name;
            let properties = init.properties;
            let scope = path.scope;
            // ---------------------------------------------------------------------------------
            let all_next_siblings = path.parentPath.getAllNextSiblings();
            for (let next_sibling of all_next_siblings) {
                if (!next_sibling.isExpressionStatement()) break;
                let expression = next_sibling.get('expression');
                if (expression.isAssignmentExpression()) { // AssignmentExpression赋值表达式分号链接
                    if (!next_sibling.isExpressionStatement()) break;
                    if (!expression.isAssignmentExpression({ operator: "=" })) break;

                    let { operator, left } = expression.node;
                    if (!(operator == '=' ||
                            t.isMemberExpression(left) ||
                            t.isStringLiteral(left.property) ||
                            t.isIdentifier(left.object, { name: name }))) {
                        break;
                    }
                    const right = expression.get("right");
                    let Key = left.property.name ? left.property.name : left.property.value;
                    properties.push(t.ObjectProperty(t.valueToNode(Key), right.node));
                    next_sibling.remove()
                    break;
                } else if (expression.isSequenceExpression()) { // SequenceExpression序列表达式【逗号链接着】
                    expression.traverse({
                        AssignmentExpression: function(_path) {
                            if (!_path.isAssignmentExpression()) return;
                            const left = _path.get("left");
                            if (!left.isMemberExpression()) return;
                            const right = _path.get("right");
                            const operator = _path.get("operator");
                            if (_path.node.left.object.name != name) return;

                            const property = left.get("property");
                            let Key = property.node.name ? property.node.name : property.node.value;
                            properties.push(t.ObjectProperty(t.valueToNode(Key), right.node));
                            _path._remove();
                            return;
                        }
                    });
                    break;
                }
            }
        },
    });




    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    console.log("对象替换并自动拼接......")
    traverse(ast, {
        VariableDeclarator(path) {
            // 将对象进行替换
            const NODE_ = path.node;
            if (!t.isObjectExpression(NODE_.init)) return;

            // 获取对象内所有属性
            var objPropertiesList = NODE_.init.properties;
            if (objPropertiesList.length == 0) return;

            var del_flag = false; // 是否可删除该对象：发生替换时可删除，否则不删除
            var objName = NODE_.id.name; // 对象名
            objPropertiesList.forEach(prop => {
                if (!TNT.isObjectProperty(prop)) return;
                var key = prop.key.value;
                var fnPath = path.getFunctionParent(); // 该path的最近父节点
                // 右边为字符串------------------------------------------------------------------------------------------------------
                if (t.isStringLiteral(prop.value)) {
                    fnPath.traverse({
                        MemberExpression: function(_path) {
                            let { object, property } = _path.node;
                            if (!(property.value == key || property.name == key)) return;
                            if (!t.isIdentifier(object) || object.name !== objName) return;
                            if (!(t.isStringLiteral(property) || t.isIdentifier(property))) return;
                            _path.replaceWith(t.stringLiteral(prop.value.value))
                            del_flag = true;
                        }
                    });
                }

                // 右边为函数【有返回节点】------------------------------------------------------------------------------------------------------
                if (t.isFunctionExpression(prop.value)) {
                    if (!t.isBlockStatement(prop.value.body)) return;
                    try {
                        var retStmt = prop.value.body.body[0];
                        if (!t.isReturnStatement(retStmt)) return; // 注意这里
                    } catch (err) {
                        console.log(path.toString());
                        console.log(path.parentPath.toString());
                        // console.log(path.parentPath.parentPath.toString());
                    }

                    fnPath.traverse({
                        CallExpression: function(_path) {
                            if (!t.isMemberExpression(_path.node.callee)) return;

                            let { object, property } = _path.node.callee;

                            if (!TNT.isIdentifier(object, { name: objName })) return;
                            if (!TNT.isStringLiteral(property, { value: key })) return;
                            if (!(property.value == key || property.name == key || object.name == objName)) return;

                            var args = _path.node.arguments;
                            // console.log(key)
                            // 二元运算
                            if (t.isBinaryExpression(retStmt.argument) && args.length == 2) {
                                _path.replaceWith(t.binaryExpression(retStmt.argument.operator, args[0], args[1]));
                            }
                            // 逻辑运算
                            else if (t.isLogicalExpression(retStmt.argument) && args.length == 2) {
                                _path.replaceWith(t.logicalExpression(retStmt.argument.operator, args[0], args[1]));
                            }
                            // 函数调用
                            else if (t.isCallExpression(retStmt.argument) && t.isIdentifier(retStmt.argument.callee)) {
                                _path.replaceWith(t.callExpression(args[0], args.slice(1)))
                            }
                            del_flag = true;
                        }
                    })
                }

            });
            if (del_flag) {
                // 如果发生替换，则删除该对象
                path.remove();
            }
        },
        // 'UnaryExpression|BinaryExpression'(path) {
        //     const NODE = path.node;
        //     const { value } = path.evaluate();
        //     // https://blog.csdn.net/qq_42748190/article/details/106206518
        //     switch (typeof value) {
        //         case 'boolean':
        //             path.replaceWith(t.BooleanLiteral(value))
        //             break;
        //             // 注释原因：会印象到 -》 类似console['log']() 变 console.log()
        //             // case 'string':
        //             //     path.replaceWith(t.StringLiteral(value))
        //             //     break;
        //         case 'number':
        //             path.replaceWith(t.NumericLiteral(value))
        //             break;
        //         default:
        //             break;
        //     }

        //     if (TNT.isLiteral(NODE.left) && TNT.isLiteral(NODE.right)) {
        //         if (TNT.isStringLiteral(NODE.left) || TNT.isStringLiteral(NODE.right)) {
        //             let replace = eval(path.toString());
        //             path.replaceWith(TNT.stringLiteral(replace));
        //             path.parentPath.visit(); // 触发父节点的树重新遍历【字符串自动拼接】
        //         } else if (TNT.isNumericLiteral(NODE.left) && TNT.isNumericLiteral(NODE.right)) {
        //             // http://t.zoukankan.com/zhaobao1830-p-8479459.html
        //             let result;
        //             // 根据不同的操作符作运算
        //             switch (NODE.operator) {
        //                 case "+":
        //                     result = NODE.left.value + NODE.right.value;
        //                     break
        //                 case "-":
        //                     result = NODE.left.value - NODE.right.value;
        //                     break;
        //                 case "*":
        //                     result = NODE.left.value * NODE.right.value;
        //                     break;
        //                 case "/":
        //                     result = NODE.left.value / NODE.right.value;
        //                     break;
        //                 case "**":
        //                     let i = right;
        //                     while (--i) {
        //                         result = result || NODE.left.value;
        //                         result = result - NODE.left.value;
        //                     }
        //                     break;
        //                 default:
        //             }
        //             // 如果上面的运算有结果的话
        //             if (result !== undefined) {
        //                 // 把表达式节点替换成number字面量
        //                 path.replaceWith(TNT.numericLiteral(result));
        //                 path.parentPath.visit(); // 触发父节点的树重新遍历
        //             }
        //         }
        //     }
        // },
    });



    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    console.log("开始去控制流（while-switch），请耐心等待......");
    traverse(ast, {
        WhileStatement(path) {
            const { test, body } = path.node;
            if (!(TNT.isBooleanLiteral(test) || TNT.isUnaryExpression(test) || test.value == true)) return;
            if (body.body.length === 0 || !TNT.isSwitchStatement(body.body[0])) return;
            const { discriminant, cases } = body.body[0];
            if (!(TNT.isMemberExpression(discriminant) || TNT.isUpdateExpression(discriminant.property))) return;
            // --------------------------------------------------------------------------------------------------------
            let flag = false;
            let arr = [];
            const arr_name = discriminant.object.name; // 获取switch里面的数组名称
            const all_pre_siblings = path.getAllPrevSiblings(); //  获取所有的前兄弟节点
            all_pre_siblings.forEach(pre_pth => {
                let { id, init } = pre_pth.node.declarations[0];
                if (arr_name == id.name && init.callee.object.value !== undefined) {
                    arr = init.callee.object.value.split('|');
                    flag = true
                }
                if (flag) pre_pth.remove();
            });
            // --------------------------------------------------------------------------------------------------------
            if (flag) {
                var resultBody = [];
                arr.map(index => {
                    let case_body = cases[index].consequent;
                    if (TNT.isContinueStatement(case_body[case_body.length - 1])) case_body.pop() // pop删除数组的最后一个元素
                    resultBody = resultBody.concat(case_body) // 重置并连接continue节点
                })
                path.replaceWithMultiple(resultBody); // 多个节点替换一个节点的话使用replaceWithMultiple方法
                path.visit(); // 触发父节点的树重新遍历【字符串自动拼接】
            }
        },
    });



    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    console.log("转换类似console['log']() 变 console.log() ......");
    traverse(ast, {
        // 类似console['log']() 变 console.log() 【https://blog.csdn.net/lacoucou/article/details/113665767】
        MemberExpression(path) {
            //path.node.property 获取到的是属性值  这是一个node类型
            //path.get('property') 获取到的是一个path(NodePath类型) 只有NodePath才有替换方法 
            let property = path.node.property;
            let property_path = path.get('property');
            if (t.isStringLiteral(property_path)) {
                path.node.computed = false;
                property_path.replaceWith(t.identifier(property_path.node.value));
            }
        },
    });


    return generator(ast, opts = {
        // "concise": true, // 简洁的,tab会删除 【https://zhuanlan.zhihu.com/p/91948992】
        // "compact": true, // 代码压缩，变量赋值等号空格消失【https://blog.51cto.com/u_15072904/2579604】
        // "retainLines": true, // 删除空行
        // "comments": false, // 删除所有注释【https://blog.51cto.com/u_15072904/2579604】
        jsescOption: {
            "minimal": true, // Unicode转中文或者其他非ASCII码字符。【https://blog.51cto.com/u_15072904/2579604】
        },
    }, jsCode).code;

}

const code = fs.readFileSync("m.js", "utf-8");
// const code = fs.readFileSync("out2.js", "utf-8");
const newCode = compile(code)
// console.log(newCode)
fs.writeFileSync("out1.js", newCode, "utf-8")