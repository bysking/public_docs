
/**
 * 根据坐标轴获取对应的旋转矩阵
 * @param {String} axios  旋转轴
 * @param {Number} angle 旋转角度
 * @param {Array} target 旋转矩阵数组
 */
function getRotateMatrixByAxios(axios = 'X', angle, target) {
	let sin = Math.sin(angle);
	let cos = Math.cos(angle);

	let rotateMatrixMap = {
		'X': [ // 绕x轴旋转矩阵
			1, 0,   0,    0,
			0, cos, -sin, 0,
			0, sin, cos,  0,
			0, 0,   0,    1
		],
		'Y': [ // 绕y轴旋转矩阵
			cos, 0, sin, 0,
			0,   1, 0,   0,
			sin, 0, cos, 0,
			0,   0, 0,   1
		],
		'Z': [ // 绕z轴旋转矩阵
			cos, -sin, 0, 0,
			sin, cos,  0, 0,
			0,   0,    1, 0,
			0,   0,    0, 1
		],
	}

	target = target || new Float32Array(16);

	rotateMatrixMap[axios].forEach((item, index) => {
		target[index] = item
	})

	return target;
}

/**
 * 绕任意轴的旋转矩阵
 * @param {String} axios  旋转轴向量: { x: 0, y: 1, z: 3 }
 * @param {Number} angle 旋转角度
 * @param {Array} target 旋转矩阵数组
 */
function getRotateMatrixByRandom(axios, angle, target) {
	let {x, y, z} = axios || {};

	// 模长
	let len = Math.sqrt(x*x + y*y + z*z)

	// 齐次
	x = x/len;
	y = y/len;
	z = z/len;

	let sin = Math.sin(angle);
	let cos = Math.cos(angle);

	let xx = x*x;
	let yy = y*y;
	let zz = z*z;
	let oneMcos = 1-cos

	target = target || new Float32Array(16);

	let rotateMatrix = [ // 绕任意轴旋转矩阵公式
		(xx + (1-xx)*cos), 
		x*y*oneMcos + z*sin,   
		x*z*oneMcos-y*sin,    
		0,

		x*y*oneMcos-z*sin, 
		yy+(1-yy)*cos, 
		y*z*oneMcos + x*sin, 
		0,

		x*z*oneMcos + y*sin, 
		y*z*oneMcos - x*sin, 
		zz + (1-zz)*cos,  
		0,

		0, 0, 0, 1
	]

	rotateMatrix.forEach((item, index) => {
		target[index] = item
	})

	return target;
}

/**
 * 获取旋转信息函数
 * @param {Object} options { source: {x: 0, y: 0, z: 0}, source: {x: 0, y: 0, z: 0}, rotate: {x: 0, y: 0, z: 0}  }
 */
function getConversionInfo(options) {
	if(!options.rotate) {
		// 求旋转信息
		console.log('求旋转信息')
		return getRotateInfo(options.source, options.target)
	}
	if(!options.source) {
		// 求原坐标
		console.log('求原坐标')
		return getNewPointInfo(options.target, options.rotate, true)
	}
	if(!options.target) {
		// 求旋转变换后坐标
		console.log('求旋转变换后坐标')
		return getNewPointInfo(options.target, options.rotate, false)
	}

	/**
	 * 获取旋转信息
	 * @param {Object} source 原坐标
	 * @param {Object} target 变换后的坐标
	 * @returns {Object} x,y,z轴上的旋转信息
	 */
	function getRotateInfo(source, target) {
		let {x, y,z} = source;
		let {x: X, y: Y,z: Z} = target;
		let rotateInfo = {
			x: 0,
			y: 0,
			z: 0
		};

		// 初始化旋转角度
		let zAngle = 0;
		let xAngle = 0;
		let yAngle = 0;

		// z轴旋转
		let zExpression = ((Y/y) - (X/x)) / ((x/y) + (y/x));
		let R_Z;
		if(x===0 && Y === 0 && X === -y) {
			R_Z = 90 * Math.PI / 180;
		} else if(x === 0 && Y === 0 && X === y) {
			R_Z = 270 * Math.PI / 180;
		} else if(y === 0 && X === 0 && Y === x) {
			R_Z = 90 * Math.PI / 180;
		} else if(y === 0 && X === 0 && Y === -x) {
			R_Z = 270 * Math.PI / 180;
		} else {
			R_Z = Math.asin(zExpression * Math.PI / 180); // 计算绕z轴旋转角
		}

		// x

		//y
		


		return rotateInfo;
	}

	/**
	 * 根据旋转角度信息获取点的旋转变换后的坐标
	 * @param {Object} basePoint 变换前的坐标
	 * @param {Object} rotateInfo 旋转信息
	 * @param {Object} isOrigin 是否是求原坐标
	 * @returns {Object}
	 */
	function getNewPointInfo(basePoint, rotateInfo, isOrigin) {
		let newPoint = {
			x: 0,
			y: 0,
			z: 0
		} 

		if (isOrigin) {
			// 求原坐标, 需要使用逆矩阵

		} else {
			// 求新坐标
		}

		// todo 求出新的坐标

		return newPoint;
	}

	// 矩阵相乘
	function multiMatrix() {
		return {}
	}

	// 判断矩阵是否相等
	function isEqualMatrix() {
		return false
	}
}


// 测试
// getRotateMatrixByAxios('X', 30);
// getRotateMatrixByRandom({x: 0, y: 2, z: 5}, 30)

let options = {
	source: {
		x: 3,
		y: 4,
		z: 0
	},
	target: {
		x: 4,
		y: 3,
		z: 0
	},
	rotate: undefined
}
let options2 = {
	target: {
		x: 4,
		y: 3,
		z: 0
	},
	rotate: {}
}
let options3 = {
	source: {
		x: 3,
		y: 4,
		z: 0
	},
	rotate: {
		x:30,
		y:30,
		z:0,
	}
}
let a = getConversionInfo(options);
let b = getConversionInfo(options2);
let c = getConversionInfo(options3);

console.log(a, b, c)
console.log(Math)