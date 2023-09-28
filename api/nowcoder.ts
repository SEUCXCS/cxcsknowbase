

/**
 * 
 */
export interface resdata {
    data: nowcoderData,
    status: number,
    msg: string
}

/**
 * 
 */

export interface nowcoderData {
    data: {
        niukeID: string,
        name: string,
        user_id: string,
        challenge: number,
        submit: number,
        pass: number,
        rank: number,
    }[],
    update: string
}


const baseUrl = 'http://cxcs.truraly.fun/api/nowcoder/'
// const baseUrl = 'http://localhost:3002/api/'

/**
 * 获取所有用户的做题数据
 */
export async function getNowcoderDataGetInfoAll(): Promise<nowcoderData> {
    let res = await fetch(baseUrl + 'getInfoAll')
    // console.log(res)
    let data: resdata = await res.json()
    // console.log(data)
    if (data.status !== 200) {
        throw new Error(data.msg)
    }
    data.data.update = timeFomate(data.data.update)
    return data.data
}

/**
 * 获取月榜
 */
export async function getNowcoderDataGetInfoMonth(): Promise<nowcoderData> {
    let res = await fetch(baseUrl + 'getInfoMonth')
    let data: resdata = await res.json()
    if (data.status !== 200) {
        throw new Error(data.msg)
    }
    data.data.update = timeFomate(data.data.update)
    return data.data

}
/**
 * 获取72小时榜
 */
export async function getNowcoderDataGetInfo72(): Promise<nowcoderData> {
    let res = await fetch(baseUrl + 'getInfo72')
    let data: resdata = await res.json()
    if (data.status !== 200) {
        throw new Error(data.msg)
    }
    data.data.update = timeFomate(data.data.update)
    return data.data
}

/**
 * 
 */
function timeFomate(time: string) {
    let d = new Date(time)
    return `${d.getFullYear()
        }-${d.getMonth() + 1}-${d.getDate()}
        ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}