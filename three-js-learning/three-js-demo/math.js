// 3维向量构造器
function Vector3(x, y, z){
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
 }

 Vector3.prototype.setX = function(x) {
    this.x = x || 0;
    return this;
}
Vector3.prototype.setY = function(y) {
    this.y = y || 0;
    return this;
}
Vector3.prototype.setZ = function(z) {
    this.z = z || 0;
    return this;
}

// 归一化
Vector3.prototype.normalize = function() {
    var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    if(length > 0.00001){
        return new Vector3(this.x / length, this.y / length, this.z / length);
    }
    return new Vector3();
}

// 向量相加
Vector3.prototype.addVectors = function(vec1, vec2){
    this.x = vec1.x + vec2.x;
    this.y = vec1.y + vec2.y;
    this.z = vec1.z + vec2.z;
    return this;
}

Vector3.prototype.add = function(vec1, vec2){
    if(vec2){
       return this.addVector(vec1, vec2);
    }
    this.x += vec1.x;
    this.y += vec1.y;
    this.z += vec1.z;
    return this;
}

// 向量相减
Vector3.prototype.sub = function(vec1, vec2){
    if(vec2){
       return this.addVector(vec1, -vec2);
    }
    this.x -= vec1.x;
    this.y -= vec1.y;
    this.z -= vec1.z;
    return this;
}

// 向量和标量相乘
Vector3.prototype.multiplyScalar = function(scalar){
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
}

//向量与向量相乘
Vector3.prototype.multiplyVector = function(vec1, vec2){
    this.x = vec1.x * vec2.x;
    this.y = vec1.y * vec2.y;
    this.z = vec1.z * vec2.z;
    return this;
}
Vector3.prototype.multiply = function(vec1, vec2){
    if(vec2){
        return this.multiplyVector(vec1, vec2);
    }
    this.x *= vec1.x;
    this.y *= vec1.y;
    this.z *= vec1.z;
    return this;
}

// 点乘
function dot(vec1, vec2){
    return vec1.x * vec2.x + vec1.y *vec2.y + vec1.z * vec2.z;
}

// 叉乘
function cross(vec1, vec2){
    var x = vec1.y * vec2.z - vec2.y * vec1.z;
    var y = vec2.x * vec1.z - vec1.x * vec2.z;
    var z = vec1.x * vec2.y - vec1.y * vec2.x;
    return new Vector3(x, y, z);
}

//初始化 4 阶单位矩阵
function identity(target) {
    target = target || new Float32Array(4);
    // 第一列
    target[0] = 1;
    target[1] = 0;
    target[2] = 0;
    target[3] = 0;
    // 第二列
    target[4] = 0;
    target[5] = 1;
    target[6] = 0;
    target[7] = 0;
    // 第三列
    target[8] = 0;
    target[9] = 0;
    target[10] = 1;
    target[11] = 0;
    // 第四列
    target[12] = 0;
    target[13] = 0;
    target[14] = 0;
    target[15] = 1;
    
    return target;
}

// 初始化4阶方阵
//initialize([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
function initialize(source, target) {
    if(source){
        if(target){
            for(var i = 0;i < source.length; i++){
                target[i] = source[i];
            }
            return target;
        }
        return new Float32Array(source);
    }
    return identity(target);
}

// m1 + m2
function addMatrix(m1, m2, target){
    target = target || new Float32Array(16);
    for(var i = 0; i < m1.length; i++){
        target[i] = m1[i] + m2[i]
    }
    return target;
}

// m1 - m2
function subtractMatrix(m1, m2, target){
    target = target || new Float32Array(16);
    for(var i = 0; i < m1.length; i++){
        target[i] = m1[i] - m2[i]
    }
    return target;
}

// 矩阵相乘
// 此处的 prev 代表 M，next 代表 N
function multiply(next, prev, target){
    target = target || new Float32Array(16);
    // 第一列
    var p00 = prev[0];
    var p10 = prev[4];
    var p20 = prev[8];
    var p30 = prev[12];
    // 第二列
    var p01 = prev[1];
    var p11 = prev[5];
    var p21 = prev[9];
    var p31 = prev[13];
    // 第三列
    var p02 = prev[2];
    var p12 = prev[6];
    var p22 = prev[10];
    var p32 = prev[14];
 
    // 第四列
    var p03 = prev[3];
    var p13 = prev[7];
    var p23 = prev[11];
    var p33 = prev[15];
 
    // 第一行
    var n00 = next[0];
    var n01 = next[1];
    var n02 = next[2];
    var n03 = next[3];
    // 第二行
    var n10 = next[4];
    var n11 = next[5];
    var n12 = next[6];
    var n13 = next[7];
    // 第三行
    var n20 = next[8];
    var n21 = next[9];
    var n22 = next[10];
    var n23 = next[11];
 
    // 第四行
    var n30 = next[12];
    var n31 = next[13];
    var n32 = next[14];
    var n33 = next[15];
 
    target[0] = p00 * n00 + p10 * n01 + p20 * n02 + p30 * n03;
    target[1] = p00 * n10 + p10 * n11 + p20 * n12 + p30 * n13;
    target[2] = p00 * n20 + p10 * n21 + p20 * n22 + p30 * n23;
    target[3] = p00 * n30 + p10 * n31 + p20 * n32 + p30 * n33;
 
    target[4] = p01 * n00 + p11 * n01 + p21 * n02 + p31 * n03;
    target[5] = p01 * n10 + p11 * n11 + p21 * n12 + p31 * n13;
    target[6] = p01 * n20 + p11 * n21 + p21 * n22 + p31 * n23;
    target[7] = p01 * n30 + p11 * n31 + p21 * n32 + p31 * n33;
 
    target[8] = p02 * n00 + p12 * n01 + p22 * n02 + p32 * n03;
    target[9] = p02 * n10 + p12 * n11 + p22 * n12 + p32 * n13;
    target[10] = p02 * n20 + p12 * n21 + p22 * n22 + p32 * n23;
    target[11] = p02 * n30 + p12 * n31 + p22 * n32 + p32 * n33;
 
    target[12] = p03 * n00 + p13 * n01 + p23 * n02 + p33 * n03;
    target[13] = p03 * n10 + p13 * n11 + p23 * n12 + p33 * n13;
    target[14] = p03 * n20 + p13 * n21 + p23 * n22 + p33 * n23;
    target[15] = p03 * n30 + p13 * n31 + p23 * n32 + p33 * n33;
 
    return target;
 }
// 4介矩阵和一行4列向量相乘
function multiplyOne(next, prev, target){
    target = target || new Float32Array(4);
    // 第一行
    var p00 = prev[0];
    // 第二行
    var p01 = prev[1];
    // 第三行
    var p02 = prev[2];
    // 第四行
    var p03 = prev[3];

 
    // 第一行
    var n00 = next[0];
    var n01 = next[1];
    var n02 = next[2];
    var n03 = next[3];
    // 第二行
    var n10 = next[4];
    var n11 = next[5];
    var n12 = next[6];
    var n13 = next[7];
    // 第三行
    var n20 = next[8];
    var n21 = next[9];
    var n22 = next[10];
    var n23 = next[11];
 
    // 第四行
    var n30 = next[12];
    var n31 = next[13];
    var n32 = next[14];
    var n33 = next[15];
 
    target[0] = p00 * n00 + p01 * n01 + p02 * n02 + p03 * n03;
    target[1] = p00 * n10 + p01 * n11 + p02 * n12 + p03 * n13;
    target[2] = p00 * n20 + p01 * n21 + p02 * n22 + p03 * n23;
    target[3] = p00 * n30 + p01 * n31 + p02 * n32 + p03 * n33;
 
    return target;
 }

 // 逆矩阵
 function inverse(m, target){
    //第一列
    var m00 = m[0];
    var m10 = m[1];
    var m20 = m[2];
    var m30 = m[3];
    // 第二列
    var m01 = m[4];
    var m11 = m[5];
    var m21 = m[6];
    var m31 = m[7];
    // 第三列
    var m02 = m[8];
    var m12 = m[9];
    var m22 = m[10];
    var m32 = m[11];
    // 第四列
    var m03 = m[12];
    var m13 = m[13];
    var m23 = m[14];
    var m33 = m[15];

    var tmp_22_33 = m22 * m33;
    var tmp_32_23 = m32 * m23;
    var tmp_21_33 = m21 * m33;
    var tmp_31_23 = m31 * m23;
    var tmp_12_23 = m12 * m23;
    var tmp_22_13 = m22 * m13;
    var tmp_10_23 = m10 * m23;
    var tmp_20_13 = m20 * m13;
    var tmp_11_23 = m11 * m23;
    var tmp_21_13 = m21 * m13;
    var tmp_20_32 = m20 * m32;
    var tmp_10_22 = m10 * m22;
    var tmp_20_12 = m20 * m12;
    var tmp_10_21 = m10 * m21;
    var tmp_20_11 = m20 * m11;
    var tmp_31_22 = m31 * m22;
    var tmp_30_23 = m30 * m23;
    var tmp_30_22 = m30 * m22;
    var tmp_20_33 = m20 * m33;
    var tmp_20_31 = m20 * m31;
    var tmp_30_21 = m30 * m21;
    var tmp_21_32 = m21 * m32;
    var tmp_12_33 = m12 * m33;
    var tmp_32_13 = m32 * m13;
    var tmp_11_32 = m11 * m32;
    var tmp_31_12 = m31 * m12;
    var tmp_11_33 = m11 * m33;
    var tmp_31_13 = m31 * m13;
    var tmp_10_33 = m10 * m33;
    var tmp_30_13 = m30 * m13;
    var tmp_10_32 = m10 * m32;
    var tmp_30_12 = m30 * m12;
    var tmp_10_31 = m10 * m31;
    var tmp_30_11 = m30 * m11;
    var tmp_11_22 = m11 * m22;
    var tmp_21_12 = m21 * m12;
  
    var t00 =
      m11 * (tmp_22_33 - tmp_32_23) -
      m12 * (tmp_21_33 - tmp_31_23) +
      m13 * (tmp_21_32 - tmp_31_22);
    var t01 =
      m10 * (tmp_22_33 - tmp_32_23) -
      m12 * (tmp_20_33 - tmp_30_23) +
      m13 * (tmp_20_32 - tmp_30_22);
    var t02 =
      m10 * (tmp_21_33 - tmp_31_23) -
      m11 * (tmp_20_33 - tmp_30_23) +
      m13 * (tmp_20_31 - tmp_30_21);
    var t03 =
      m10 * (tmp_21_32 - tmp_31_22) -
      m11 * (tmp_20_32 - tmp_30_22) +
      m12 * (tmp_20_31 - tmp_30_21);
  
    // 矩阵的行列式
    var determinant = m00 * t00 - m01 * t01 + m02 * t02 - m03 * t03;

// 余子式矩阵
// 第一行
var n00 = t00;
var n01 = t01;
var n02 = t02;
var n03 = t03;

// 第二行
var n10 =
  m01 * (tmp_22_33 - tmp_32_23) -
  m02 * (tmp_21_33 - tmp_31_23) +
  m03 * (tmp_21_32 - tmp_31_22);
var n11 =
  m00 * (tmp_22_33 - tmp_32_23) -
  m02 * (tmp_20_33 - tmp_30_23) +
  m03 * (tmp_20_32 - tmp_30_22);
var n12 =
  m00 * (tmp_21_33 - tmp_31_23) -
  m01 * (tmp_20_33 - tmp_30_23) +
  m03 * (tmp_20_31 - tmp_30_21);
var n13 =
  m00 * (tmp_21_32 - tmp_31_22) -
  m01 * (tmp_20_32 - tmp_30_22) +
  m02 * (tmp_20_31 - tmp_30_21);

// 第三行
var n20 =
  m01 * (tmp_12_33 - tmp_32_13) -
  m02 * (tmp_11_33 - tmp_31_13) +
  m03 * (tmp_11_32 - tmp_31_12);
var n21 =
  m00 * (tmp_12_33 - tmp_32_13) -
  m02 * (tmp_10_33 - tmp_30_13) +
  m03 * (tmp_10_32 - tmp_30_12);
var n22 =
  m00 * (tmp_11_33 - tmp_31_13) -
  m01 * (tmp_10_33 - tmp_30_13) +
  m03 * (tmp_10_31 - tmp_30_11);
var n23 =
  m00 * (tmp_11_32 - tmp_31_12) -
  m01 * (tmp_10_32 - tmp_30_12) +
  m02 * (tmp_10_31 - tmp_30_11);

// 第四行
var n30 =
  m01 * (tmp_12_23 - tmp_22_13) -
  m02 * (tmp_21_33 - tmp_31_23) +
  m03 * (tmp_11_22 - tmp_21_12);
var n31 =
  m00 * (tmp_12_23 - tmp_22_13) -
  m02 * (tmp_10_23 - tmp_20_13) +
  m03 * (tmp_10_22 - tmp_20_12);
var n32 =
  m00 * (tmp_11_23 - tmp_21_13) -
  m01 * (tmp_10_23 - tmp_20_13) +
  m03 * (tmp_10_21 - tmp_20_11);
var n33 =
  m00 * (tmp_11_22 - tmp_21_12) -
  m01 * (tmp_10_22 - tmp_20_12) +
  m02 * (tmp_10_21 - tmp_20_11);

   // 变号
  n01 = -n01;
  n03 = -n03;
  n10 = -n10;
  n12 = -n12;
  n21 = -n21;
  n23 = -n23;
  n30 = -n30;
  n32 = -n32;

  target = target || new Float32Array(16);
  target[0] = n00;
  target[1] = n01;
  target[2] = n02;
  target[3] = n03;
  target[4] = n10;
  target[5] = n11;
  target[6] = n12;
  target[7] = n13;
  target[8] = n20;
  target[9] = n21;
  target[10] = n22;
  target[11] = n23;
  target[12] = n30;
  target[13] = n31;
  target[14] = n32;
  target[15] = n33;

for(var i = 0; i< target.length; i++){
    target[i] = target[i] * 1 / determinant;
}

return target;
}

// 转置矩阵
function transpose(m, target){
    target  = target || new Float32Array(16);
    //转置矩阵的第一列
    target[0] = m[0];
    target[1] = m[4];
    target[2] = m[8];
    target[3] = m[12];
    //转置矩阵的第二列
    target[4] = m[1];
    target[5] = m[5];
    target[6] = m[9];
    target[7] = m[13];
    //转置矩阵的第三列
    target[8] = m[2];
    target[9] = m[6];
    target[10] = m[10];
    target[11] = m[14];
    //转置矩阵的第四列
    target[12] = m[3];
    target[13] = m[7];
    target[14] = m[11];
    target[15] = m[15];
    
    return target;
}

// 矩阵和标量相乘
function multiplyScalar(m, scalar){
    if(scalar === undefined || scalar === null){
        return m;
    }
    for(var i = 0; i < m.length; i++){
        m[i] *= scalar;
    }
    return m;
}