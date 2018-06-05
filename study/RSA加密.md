# 加密——RSA前端与后台的加密与解密

## 什么是RSA加密

RSA加密算法是一种非对称加密算法，所谓非对称，就是指该算法需要一对密钥，使用其中一个加密，则需要肜另一个才能解密，利用对极大整数做因数分解的难度决定了RSA算法的可靠性

RSA的算法涉及三个参数，n、e1、e2

其中，n是两个大质数 p、q的积，n的二进制表示所占用的位数，就是所谓的密钥长度

e1和e2是一对相关的值，e1可以任意取，但要求与(p-1) * (q-1)互质；再选择e2，要求(e2 * e1) = 1 (mod(p-1) * (q-1))

(n,e1),(n,e2)就是密钥对，其中(n,e1)为公钥，(n,e2为公钥)

RSA加密解密算法完全相同，设A为明文，B为密文，则：A = B ^ e2 (mod n) ;B = A ^ e1 (mod n)

e2和e1可以互换使用，即:

A = B ^ e1 (mod n); B = A ^ e2 (mod n)

RSA算法原理可见：
[阮一峰RSA加密算法一](http://www.ruanyifeng.com/blog/2013/06/rsa_algorithm_part_one.html)
[阮一峰RSA加密算法二](http://www.ruanyifeng.com/blog/2013/07/rsa_algorithm_part_two.html)


## RSA流程

1.后端生成publicKey与privateKey
2.后端返回publicKey给前端
3.前台使用publicKey给敏感字段加密
4.使用post方式发送数据给后端
5.后端使用publicKey与pvivateKey进行解密。

### 使用加密库cryptico为数据加密

1.需要加密时先请求后台的getrsa接口，后台会返回加密公钥
```
api.js 管理接口地址
// 获取 rsa
'getrsa': '/api/safe/getrsa',

```
2.定义加密方法
```
// services.js 配置请求方式与请求函数名称
export function getRsa() {
  return http.get(apis.getrsa)
}
// 判断是生产环境才进行加密
export function encrypt(val) {
  if (process.env.NODE_ENV === 'production') {
    return getRsa().then( res => {
      // 定义公钥为接口返回结果
      const publicKey = res
      // 实例化加密系数
      const rsakey = new RSAKey()
      // 根据 rsa加密公式 m^e = c (mod n)，使用公钥(n,e)对m进行加密，m即为加密指数'10001'
      rsakey.setPublic(publicKey, '10001')
      // 返回加密后的数据
      return rsakey.encrypt(val)
      })
  } else {
    // 如果不是生产环境，直接把promise状态变为已完成，返回成功状态（即不加密但会对执行加密成功后的函数）。
    return Promise.resolve(val)
  }
}

```
3.为数据加密
```
// 引入加密函数
import { encrypt, postLoginInfo } from 'services'
// 登录
login() {
  const params = {}
  // 使用Promise.all()方法给数据加密，promise.all()访求提供了并行执行异步操作的能力，并且在所有异步操作执行完毕后才执行回调。all接收一个数组参数，里边的值最终都返回promise对象。然后放进一个数组中传给then,用values接收
  Promise.all([
    encrypt(this.password),
    encrypt(this.phoneNum)
    ]).then(values => {
      params.pwd = vlaues[0]
      params.mobile = values[1]
      postLoginInfo(params).then((res) => {
        this.$router.push('/')
        }).catch((err) => {
          console.log(err)
        })
    }).catch((err) => {
      console.log(err)
    })
}
```
