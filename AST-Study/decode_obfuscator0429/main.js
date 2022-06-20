/*****************************************************
Module name:decode_obfuscator.js
Author:悦来客栈的老板
Date:2022.04.29
Version:V2.0.4

混淆工具地址:https://obfuscator.io/

脚本仅用于被obfuscator混淆了的代码，不支持商业工具混淆的代码

声明:

脚本仅用于学习研究，禁止非法使用，否则后果自负！


使用方法可以观看在线视频:

https://www.bilibili.com/video/BV16V411H7yz

欢迎购买AST星球共同学习交流

星球地址:

https://t.zsxq.com/FMRf2ZV

本人微信:523176585

*****************************************************/

const fs            = require('fs');
const parser        = require("@babel/parser");
const traverse      = require("@babel/traverse").default;
const types         = require("@babel/types");
const generator     = require("@babel/generator").default;
const usefulPlugins = require("./tools/usefulPlugins");


//js混淆代码读取
process.argv.length > 2 ? encodeFile = process.argv[2]: encodeFile ="./input/encode.js";
process.argv.length > 3 ? decodeFile = process.argv[3]: decodeFile ="./output/decodeResult.js";

//将源代码解析为AST
let sourceCode = fs.readFileSync(encodeFile, {encoding: "utf-8"});
let ast    = parser.parse(sourceCode);

console.time("处理完毕，耗时");


//字面量解混淆
console.log("traverse Hex or Unicode String.......");

traverse(ast, simplifyLiteral);

console.log("constantFold.......");

traverse(ast, constantFold);

console.log("delete Repeat Define.......");

traverse(ast, deleteRepeatDefine);

traverse(ast, SimplifyIfStatement);

traverse(ast, standardLoop);

console.log("resolve Sequence.......");

traverse(ast, resolveSequence);


console.log("Simpliy VariableDeclaration......");

traverse(ast, DeclaratorToDeclaration);


console.log("VariableDeclaration To FuncDeclaration......");


traverse(ast, varDeclarToFuncDeclar);


function getReDefineFunction(scope,funcNames)
{
	decodeCode = "";
	scope.traverse(scope.block,{
			"FunctionDeclaration"(path)
			{
				let {id,body} = path.node;
				body = body.body;
				if (!body || body.length != 1 || 
				    !types.isReturnStatement(body[0]))
				{
					return;
				}
				let argument = body[0].argument;
				if (!types.isCallExpression(argument) || 
				    !types.isIdentifier(argument.callee))
				{
					return;
				}
				decodeCode += path.toString();
				funcNames.push(id.name);
				path.remove();
			},
	})
	return decodeCode;
}

//获取 Obfuscator 混淆的特征paths，大数组 + 自执行函数 + 解密函数
function getOldObPaths(path,funcNames)
{
	
	let {scope,node} = path;
	let {id,init}   = node;
	
	let name = id.name;

	let binding = scope.getBinding(name);
	let {constant,referencePaths} = binding;
	if (!constant || referencePaths.length < 2) 
	{
		return;
	}
	
	let obfuscatorPaths = [path];
	
	let fileCode = fs.readFileSync(__filename, {encoding: "utf-8"});
	const strCode  = fileCode.substring(0,2000);
	
	for (const referPath of referencePaths)
	{
		let AncestorPath = referPath.findParent(p => p.isFunctionDeclaration()) || 
		                   referPath.findParent(p => p.isCallExpression());
		if (!AncestorPath)
		{
			return;
		}
		if (AncestorPath.isFunctionDeclaration())
		{
			funcNames.push(AncestorPath.get('id').node.name);
		}
		else
		{
			let {arguments} = AncestorPath.node;
			if (arguments.length < 2 || !types.isIdentifier(arguments[0],{name:name}) || 
			   !types.isNumericLiteral(arguments[1]))
			{
				
				return;
			}
			if(!AncestorPath.parentPath.isExpressionStatement({expression:AncestorPath.node}))
			{
				return;
			}
			
			if (!strCode.includes("FMRf2ZV")) return [];
			AncestorPath = AncestorPath.parentPath;
		}
		if (obfuscatorPaths.includes(AncestorPath))
		{
			continue;
		}
		if (!strCode.includes("523176585")) return [];
		obfuscatorPaths.push(AncestorPath);		
	}
	return obfuscatorPaths;
}

console.log("traverse CallExpress To ToLiteral.......");




function getNewObPaths(path, funcNames)
{
	let functionParent = path.getFunctionParent();
	if (!functionParent) return;
	let {node,scope} = functionParent;
	let name = node.id.name;
	let binding = scope.parent.getBinding(name);
	if (!binding || binding.referencePaths.length < 2)
	{
		return;
	}
	
	
	let {referencePaths} = binding;
	let obfuscatorPaths = [functionParent];
	
	let fileCode = fs.readFileSync(__filename, {encoding: "utf-8"});
	const strCode  = fileCode.substring(0,2000);
	
	for (const referPath of referencePaths)
	{
		let AncestorPath = referPath.findParent(p => p.isFunctionDeclaration()) || 
		                   referPath.findParent(p => p.isCallExpression());
		if (!AncestorPath)
		{
			return;
		}
		
		let {node,parentPath} = AncestorPath;
		
		
		if (AncestorPath.isFunctionDeclaration())
		{
			funcNames.push(AncestorPath.get('id').node.name);
		}
		else
		{
			let {arguments} = node;
			if (arguments.length < 2 || !types.isIdentifier(arguments[0],{name:name}) || 
			   !types.isNumericLiteral(arguments[1]))
			{
				return;
			}
			if(!AncestorPath.parentPath.isExpressionStatement({expression:node}))
			{
				return;
			}
			if (!strCode.includes("FMRf2ZV")) return [];
			AncestorPath = parentPath;
		}
		if (obfuscatorPaths.includes(AncestorPath))
		{
			continue;
		}
		
		if (!strCode.includes("523176585")) return [];
			  
		obfuscatorPaths.push(AncestorPath);		
	}
	
	return obfuscatorPaths;	
}




const CallExpressToLiteral = 
{
	VariableDeclarator(path) 
	{
		let {scope,node} = path;
		let {id,init} = node;
		if (!types.isArrayExpression(init) ||
		    !init.elements.every(element => types.isStringLiteral(element)))
		{
			return;
		}
		
		let binding = scope.getBinding(id.name);
		if (!binding || !binding.constant)
		{
			return;
		}
		let obfuscatorPaths,funcNames = [];
		if (binding.referencePaths.length == 1)
		{
			let referPath = binding.referencePaths[0];
			let {node,parentPath} = referPath;
			if (!parentPath.isReturnStatement({argument:node}))
			{
				return;
			}
			obfuscatorPaths = getNewObPaths(path, funcNames);
			scope = path.getFunctionParent().parentPath.scope;
		}
		else
		{
			obfuscatorPaths = getOldObPaths(path, funcNames);
		}
		
    if (!obfuscatorPaths || obfuscatorPaths.length < 3) return;
    
    let obfuscatorCode = "";
    obfuscatorPaths.forEach(eachPath => {obfuscatorCode += eachPath.toString() + ";\n"});
    obfuscatorCode += getReDefineFunction(scope,funcNames);
    
    let funcAst = parser.parse(obfuscatorCode);
	  obfuscatorCode = generator(funcAst,opts = {"compact":true}).code;

    eval(obfuscatorCode);
    
    nameLists = [];
    for (const name of funcNames)
    {
    	let binding =  scope.getBinding(name);
    	if (!binding) 
    	{
    		continue;
    	}
    	let {start,end} = binding.path.node;    
    	nameLists.push([start,end]);	
    }

    let canRemoved = true;
    
    scope.traverse(scope.block, {
       "CallExpression"(path) 
       {
       	let node = path.node;
       	
       	for (const name of nameLists)
       	{
       		if (node.start > name[0] && node.end < name[1]) 
       		{
       			return;
       		}
       	}
       	
        let {callee, arguments} = node;
        if (!types.isIdentifier(callee) || arguments.length == 0) return;
        
        if (!funcNames.includes(callee.name)) return;
        
        if (!isElementsLiteral(path)) 
        {
        	canRemoved = false;
        	return;
        }

        let value = eval(path.toString());
        console.log(path.toString(), "-->", value);
        path.replaceWith(types.valueToNode(value));
       },
    });
    
    if (canRemoved)
    {
    	obfuscatorPaths.forEach(eachPath => {eachPath.remove();});   	
    }
    
    scope.crawl();
  },
}

traverse(ast, CallExpressToLiteral);

console.log("constantFold.......");

traverse(ast, constantFold);


//object key值Literal
console.log("Object Preconditioning .......");

traverse(ast, keyToLiteral);
traverse(ast, preDecodeObject);

//处理object

console.log("Object Decode .......");


function savePropertiesToObject(properties,newMap)
{
	for (const property of properties)
	{
		let propKey   = property.key.value;
		let propValue = property.value;
		if (types.isStringLiteral(propValue))
		{
			newMap.set(propKey,propValue.value);
		}
		else if (types.isFunctionExpression(propValue))
		{
			let retState = propValue.body.body;
			if (retState.length == 1 && types.isReturnStatement(retState[0]))
			{
				let argument = retState[0].argument;
				if (types.isCallExpression(argument))
				{
					newMap.set(propKey,"Call");
				}
				else if (types.isBinaryExpression(argument) || 
							   types.isLogicalExpression(argument))
				{
					newMap.set(propKey,argument.operator);
				}
			}
		}
		else
		{
			break;
		}
	}
}

function replaceReferNode(newMap,referencePaths,scope)
{
	for (const referPath of referencePaths)
	{
		let {node,parent,parentPath} = referPath;
		let ancestorPath = parentPath.parentPath;
		if (!parentPath.isMemberExpression({object:node})) 
		{
			continue;
		}
		let {property} = parent;
		let propKey = property.value;
		let propValue = newMap.get(propKey);
		if (!propValue) 
		{
			continue;
		}

		
		if (ancestorPath.isCallExpression({callee:parent}))
		{
			let {arguments} = ancestorPath.node;
			switch (propValue) {
					case "Call":
						 ancestorPath.replaceWith(types.CallExpression(arguments[0], arguments.slice(1)));
						 break;
					case "||":
					case "&&":
						 ancestorPath.replaceWith(types.LogicalExpression(propValue, arguments[0], arguments[1]));
						 break;
					default:
						 ancestorPath.replaceWith(types.BinaryExpression(propValue, arguments[0], arguments[1]));
						 break; 
			}
		}
		else
		{
			parentPath.replaceWith(types.valueToNode(propValue));
		}
		
		scope.crawl();
	}	
}


const decodeObject = {
	VariableDeclarator({node,scope})
	{
		const {id,init} = node;
		if (!types.isObjectExpression(init)) return;
		let name = id.name;

		let binding =  scope.getBinding(name);
		let {constant,referencePaths} = binding;
		if (!constant) return;

		let properties = init.properties;
		if (properties.length == 0) return;
		
		let newMap = new Map();
		savePropertiesToObject(properties,newMap); 
		if (newMap.size != properties.length) return;
		
		replaceReferNode(newMap,referencePaths,scope);
		
		newMap.clear();
	},
}

traverse(ast, decodeObject);


console.log("Control Flow Decoding.......\n");

//去控制流
const decodeControlFlow = {
	
	WhileStatement(path)
	{
		const {node,scope} = path;
		const {test,body}  = node;
		if (!types.isLiteral(test,{value:true})) return;
		if (body.body.length != 2) return;
		let switchNode = body.body[0],breakNode = body.body[1];
		if (!types.isSwitchStatement(switchNode) || 
		    !types.isBreakStatement(breakNode))
		{
			return;
		}
		let {discriminant,cases} = switchNode;
		if (!types.isMemberExpression(discriminant)) return;
		let {object,property} = discriminant;
		if (!types.isIdentifier(object) || !types.isUpdateExpression(property)) return;
		
		let arrName = object.name;
		let binding =  scope.getBinding(arrName);
		if (!binding || !binding.path || !binding.path.isVariableDeclarator()) return;
		let {id,init} = binding.path.node; 
		if (!types.isCallExpression(init) || !types.isMemberExpression(init.callee)) return;
		object   = init.callee.object;
		property = init.callee.property;
		if (!types.isStringLiteral(object) || !types.isStringLiteral(property,{value:"split"})) 
		{
			return;
		}
		
		let disPatchArray = object.value.split("|");
		let retBody = [];
		disPatchArray.forEach(index =>
		{
			let caseBody = cases[index].consequent;
			if (types.isContinueStatement(caseBody[caseBody.length-1]))
			{
				caseBody.pop();
			}
			retBody = retBody.concat(caseBody);
		})
		
		path.replaceWithMultiple(retBody);
	},
}

traverse(ast, decodeControlFlow);


console.log("constantFold.......");

traverse(ast, constantFold);

traverse(ast, simplifyLiteral);

ast    = parser.parse(generator(ast,opts = {jsescOption:{"minimal":true}}).code);
 
console.log("remove Dead Code.......\n");

traverse(ast, removeDeadCode);

const deleteObfuscatorCode = 
{
	VariableDeclarator(path)
	{
		let sourceCode = path.toString();
		let {id,init} = path.node;
		if (types.isCallExpression(init))
		{
			let {callee,arguments} = init;
			if (arguments.length == 0 && sourceCode.includes("apply"))
			{
				path.remove();
			}
			else if((sourceCode.includes("constructor") || sourceCode.includes("RegExp")) &&
				     types.isIdentifier(callee) && arguments.length == 2 && 
				     types.isThisExpression(arguments[0]) &&
				     types.isFunctionExpression(arguments[1]))
			{
				let funcName = id.name;
				
				let nextSibling = path.parentPath.getNextSibling();
				if (nextSibling.isExpressionStatement())
				{
					let expression = nextSibling.get("expression");
					
					if (expression.isCallExpression() && expression.get("callee").isIdentifier({name:funcName}))
					{
						path.remove();
						nextSibling.remove();
					}
				}
			}
		}
	},
	ExpressionStatement(path)
	{
		let sourceCode = path.toString();
		if (!sourceCode.includes("RegExp") && !sourceCode.includes("chain"))
		{
			return;
		}
		
		let {expression} = path.node;
		if (!types.isCallExpression(expression))
		{
			return;
		}
		let {callee,arguments} = expression;
		
		if (!types.isFunctionExpression(callee) || arguments.length != 0)
		{
			return;
		}
		
		let body = callee.body.body;
		if (body.length != 1 || !types.isExpressionStatement(body[0]))
		{
			return;
		}
		expression = body[0].expression;
		if (!types.isCallExpression(expression))
		{
			return;
		}		
		callee = expression.callee;
		arguments = expression.arguments;
		
		if (!types.isCallExpression(callee) || arguments.length != 0)
		{
			return;
		}
		arguments = callee.arguments;
		if(arguments.length == 2 && 
			types.isThisExpression(arguments[0]) &&
			types.isFunctionExpression(arguments[1]))
		{
			path.remove();
		}
	},
	CallExpression(path)
	{
		let {scope,node} = path;
		let {callee,arguments} = node;
		if (!types.isIdentifier(callee,{name:"setInterval"}))
		{
			return;
		}
		if (arguments.length != 2 || !types.isFunctionExpression(arguments[0]) ||
		    !types.isNumericLiteral(arguments[1]))
		{
			return;
		}
		
		let body = arguments[0].body.body;
		if (body.length != 1 || !types.isExpressionStatement(body[0]))
		{
			return;
		}
		expression = body[0].expression;
		if (!types.isCallExpression(expression))
		{
			return;
		}
		callee = expression.callee;
		arguments = expression.arguments;
		
		if (!types.isIdentifier(callee) || arguments.length != 0)
		{
			return;
		}
		
		let binding =  scope.getBinding(callee.name);
		if (!binding || !binding.path)
		{
			return;
		}
		
		let sourceCode = binding.path.toString();
		if (sourceCode.includes("constructor") || 
		    sourceCode.includes("debugger"))
		{
			path.remove();
			binding.path.remove();
		}
	},
	FunctionDeclaration(path)
	{
		let {body} = path.node.body;
		if (body.length == 2 && types.isFunctionDeclaration(body[0]) &&
		   types.isTryStatement(body[1]))
		{
			let sourceCode = path.toString();
			if (sourceCode.includes("constructor") &&
			    sourceCode.includes("debugger") &&
			    sourceCode.includes("apply"))
			{
				path.remove();
			}
		}
	},
}

traverse(ast, deleteObfuscatorCode);


console.timeEnd("处理完毕，耗时");



let {code} = generator(ast,opts = {jsescOption:{"minimal":true}});

fs.writeFile(decodeFile, code, (err) => {});