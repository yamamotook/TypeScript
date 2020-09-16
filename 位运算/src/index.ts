// Access 权限枚举
enum Access {
    // 每一位上的1（true）分别代表某一个权限
    Read = 1,  //0001
    Write = 2,  //0010
    Create = 4, //0100
    Remove = 8  //1000
}


//1. 权限的组合(使用或运算 | ， 只要有一位为1 则取1，否则取0)
// 读写
let ReadAndWrite : Access = Access.Read | Access.Write; // => 3 : 0011

//创建和删除
let CreateAndRemove : Access = Access.Create | Access.Write; // => 12 : 1100

//2. 查看是否有某个权限（且运算 &， 2位都位 1 则 取1 ， 否则取0 ）
function hasAccess( targetAccess : Access , nowAccess : Access ) : boolean {
    return ( targetAccess & nowAccess ) == targetAccess;
}

console.log("检查创建和删除权限是否有读取的权限：",hasAccess(Access.Read, CreateAndRemove));
console.log("检查读写权限是否有读取的权限：",hasAccess(Access.Read, ReadAndWrite));




console.log('删除读写权限中的读权限....');
ReadAndWrite = ReadAndWrite ^ Access.Read;
console.log("检查读写权限是否有读取的权限：",hasAccess(Access.Read, ReadAndWrite));










