const axios = require('axios')
const fs = require('fs') //fs -> 파일로 저장 동기 비동기 상관없다 , -> 동기가 편하다.

const a = []

const json = { //json은 마지막에 객체 형태이기 때문에 이렇게 작성해줬다.
    data: a
}

//정의 부분
const paik = async(paged) => {
    const map = await axios.get('http://theborndb.theborn.co.kr/wp-json/api/get_store', {
        params: {
            state: 9,
            paged: paged  //바꿔야 돼
        } //객체 고정
    })
    if (map.data) {
        if(map.data.results) {
                if(map.data.results.length) {
                a.push(...map.data.results)
            } else {
                console.log('error')
            }
        }else {
            console.log('error')
        }
    } else {
        console.log('error')
    }

    console.log(a.length)
}

//실행부분
const result = async() => {
    for (let i=1; i<189; i++){
        await paik(i)
    }
    const mapJSON = JSON.stringify(json)
    fs.writeFileSync('mapData-json.json',mapJSON, console.log('파일 저장')) //동기 : 순서대로 처리
}
result()