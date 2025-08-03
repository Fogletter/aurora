import Mock from 'mockjs'
import jwt from 'jsonwebtoken'

const secret = 'fogletter'

const getImages = (page, pageSize = 10) => {
    return Array.from({ length: pageSize }, (_, i) => ({
        // 索引唯一
        id: `${page}-${i}`,
        height: Mock.Random.integer(300, 600),
        url: Mock.Random.image('300x400', Mock.Random.color(), '#fff', 'img'),
        context: Mock.Random.cparagraph(10, 30)
    }))
}

export default [
    {
        url: '/api/articles',
        method: 'get',
        response: ({ query }) => {
            const page = Number(query.page) || 1;
            return {
                code: 0,
                data: getImages(page)
            }
        }
    },
    {
        url: '/api/mall',
        method: 'get',
        response: (req, res) => {
            return {
                code: 0,
                data: [
                    {
                        id: 1,
                        name: 'Taylor 814ce 电箱吉他',
                        price: '28999',
                        image: 'https://ai-public.mastergo.com/ai/img_res/84957209fd6f9a814bf29aee5781adec.jpg'
                    },
                    {
                        id: 2,
                        name: 'The Beatles 全程珍藏黑胶唱片套装',
                        price: '3999',
                        image: 'https://ai-public.mastergo.com/ai/img_res/1abac53e0a74863b6037b9bb5ec99fdf.jpg'
                    },
                    {
                        id: 3,
                        name: '限量版乐队签名T恤',
                        price: '399',
                        image: 'https://ai-public.mastergo.com/ai/img_res/00e12c00a4ee1d414ab510e8623bee1a.jpg'
                    }
                ]
            }
        }
    },
    {
        url: "/api/detail/:id",
        method: 'get',
        timeout: 1000,
        response: (req, res) => {
            const randomData = Mock.mock({
                title: '@ctitle(5,10)',
                price: '@integer(60, 100)',
                desc: '@cparagraph(10,30)',
                images: [
                    {
                        url: '@image(300x200,@color,#fff,图片)',
                        alt: '@ctitle(5,10)'
                    },
                    {
                        url: '@image(300x200,@color,#fff,图片)',
                        alt: '@ctitle(5,10)'
                    },
                    {
                        url: '@image(300x200,@color,#fff,图片)',
                        alt: '@ctitle(5,10)'
                    }
                ]
            })
            return {
                code: 0,
                data: randomData
            }
        }
    },
    {
        url: '/api/search',
        method: 'get',
        timeout: 1000,
        response: (req, res) => {
            // ?keyword=xxx
            const keyword = req.query.keyword
            let num = Math.floor(Math.random() * 10);
            let list = [];
            for (let i = 0; i < num; i++) {
                // 随机内容
                const randomData = Mock.mock({
                    title: '@ctitle(3,6)'
                })
                list.push(`${randomData.title}${keyword}`)
            }
            return {
                code: 0,
                data: list
            }
        }
    },
    {
        url: '/api/hotlist',
        method: 'get',
        timeout: 1000,
        response: (req, res) => {
            return {
                code: 0,
                data: [
                    {
                        id: '101',
                        city: '吉他'
                    },
                    {
                        id: '102',
                        city: '钢琴'
                    },
                    {
                        id: '103',
                        city: '二胡'
                    }
                ]
            }
        }
    },
    {
        url: '/api/login',
        method: 'post',
        timeout: 2000, // 请求耗时
        response: ( req, res ) => {
            // req, username,password
            const { username, password } = req.body
            if (username === 'admin' && password === '123456') {
                // 生成token 颁发令牌  pnpm i jsonwebtoken
                // json 用户数据
                const token = jwt.sign({
                    user: {
                        id: '001',
                        username: 'admin',
                    }
                },secret,{
                    expiresIn: 86400,
                })
                return {
                    code: 0,
                    msg: '登录成功',
                    token,
                    data: {
                        id: '001',
                        username: 'admin',
                    }
                }
            }
            return {
                code: 1,
                msg: '登录失败',
            }
        },
    },
    {
        url: '/api/user',
        method: 'get',
        timeout: 2000, // 请求耗时
        response: ( req, res ) => {
            // 用户端 token headers
            const token = req.headers['authorization'].split(' ')[1];
            console.log(token)
            try{
                const decode = jwt.decode(token, secret)
                return {
                    code: 0,
                    msg: '获取用户信息成功',
                    data: decode.user,
                }
            }catch(err){
                return {
                    code: 1,
                    msg: 'token 无效',
                }
            }
        },
    }
]