const fs = require('fs')

var data = Buffer.from(fs.readFileSync('d2.txt')).toString()
data = data.split("\n")

function stringCount(string){
    let counter = {}

    for (const ch of string.split('')){
        if (ch in counter){
            counter[ch] += 1
        } else {
            counter[ch] = 1
        }
    }

    let retobj = {t2: false, t3: false}

    for (const key in counter){
        if (counter[key] === 2){
            retobj.t2 = true
        }
        if (counter[key] === 3){
            retobj.t3 = true
        }
    }

    return retobj
}

t2 = 0
t3 = 0
for (const st of data){
    let ret = stringCount(st)
    if (ret.t2){
        t2+=1
    }
    if (ret.t3){
        t3+=1
    }
}
console.log(t3*t2)

function difference(s1, s2){
    let diff = 0
    for (let i = 0; i < s1.length; i++){
        if (s1[i] !== s2[i]){
            diff += 1
        }
    }
    return diff
}

for (const s1 of data){
    for (const s2 of data){
        if (difference(s1, s2) === 1){
            let estr = ''
            for (let i = 0; i < s1.length; i++){
                if (s1[i] === s2[i]){
                    estr = estr + s2[i]
                }
            }
            console.log(estr)
            break;
        }
    }
}