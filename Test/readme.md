# 🍁 Test 

### ⭐ /location and /register
1. ได้ status 200

### ⭐ /getdata
1. ได้ status 200 เมื่อกรอกข้อมูลครบ
2. ได้ status 500 เมื่อ id ไม่ถูกต้อง
3. ได้ status 501 เมืาอข้อมูลไม่ครบ หรือ ไม่มีข้อมูล

ผลการเทส


  Testing unit 1
    GET method /location
      ✔ it status 200 (86ms)
    GET method /register
      ✔ it status 200
    POST method /getdata
getdata
{ id: 'U08f0bbbec3cc9ea46afb87366a82763f', name: 'Mudang' }
      ✔ it status 200 (738ms)
getdata
{ id: 'wrong id', name: 'Mudang' }
      ✔ it status 500 wrong id (460ms)
getdata
{ id: undefined, name: undefined }
      ✔ it status 501 no data
getdata
{ id: undefined, name: 'Mudang' }
      ✔ it status 501 no id
getdata
{ id: 'U08f0bbbec3cc9ea46afb87366a82763f', name: undefined }
      ✔ it status 501 no name


  7 passing (1s)
