// let areYouOk: boolean = true;
// console.log('hello world', areYouOk)

// function hello<T> (arg: T): T {
//     return arg;
//   }

//   let output = hello<string>("hello, ts");
//   let output2 = hello("hello, ts"); // 智能进行类型推断

// const f = new Set(['a', 'b', 'c']);
// f['d'] = '123';

// for (let i in f) {
//     console.log(i);
// }

// function *infiniteList() {
//     let i = 0;
//     while(true) {
//       yield i++;
//     }
//   }


//   let ite = infiniteList();
//   let i = 0;
//   while(i < 10) {
//     console.log(ite.next());
//     i ++;
//   }


// interface Teacher {
//     teach(): void
//   }
  
//   interface Stu {
//     teach(): void
//   }

//   function getPerson(): Teacher | Stu { // 返回类型已经定义，导致后续只能调用类型交集的方法
//     return {} as Teacher;
//   }

//   const person = getPerson();
//   person.teach();
//   (<Teacher>person).teach();
//   (<Stu>person).learn();

// interface M {
//   a: string;
//   b: number;
// }

// let c: M = {
//   a: '123',
//   b: 123,
// }

// console.log(c);

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error， 只读
// ro.push(12); // error， 只读

// a = ro; // error, 把只读数组赋值给普通数组也是不可以，需要类型断言

// 类型断言,可以赋值
a = ro as number[];
console.log(a);
a.push(2);
console.log(a);
