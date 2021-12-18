# Server (app.js)

1. ทำหน้าที่ webhook ให้ line-bot <br />
- <i><b>line-bot</b></i> จะทำการข้อมูลให้ user แบบ auto และ แบบ user ส่งมาสอบถาม แบบ auto จะตั้งให้ส่งตอน 7 โมงเช้าของทุกวัน และ สามารถสอบเพิ่มเติมในภายหลังได้ โดยจะมีผลการทำนายไปให้ด้วย
2. predict ข้อมูล ในการทำ AI ใช้เป็น tensorflowjs
3. เชื่อมกับ Database ใช้เป็น realtime ของ google-cloud
4. back-end ให้หน้า site ของ register และ getLocation
5. รับข้อมูลจากตัว board cucumber
6. ทำการเปลี่ยน rich menu เมื่อ user ทำการสมัครสมาชิก

### โฟลเดอร /templates ทำการเก็บไฟล์ html ต่างๆ
1. ไฟล์ register จะช่องให้กรอก name และปุ่ม sign upจะทำการส่งข้อมูลไปให้ server โดยจะส่งไปพร้อมกับ userId และ email
2. ไฟล์ getLocation จะทำเชื่อม api  2 ตัว มี  geolocation และ openweathermap อันแรกจะทำให้ข้อมูลต่ำแหน่งของอุปกรณ์ user แบบละติจูด กับ ลองจิจูด และ นำข้อมูล 2 อย่างนี้ไปทำใช้เพื่อข้อมูลสภาพอากาศกับ openweathermap  มีปุ่ม ให้ user กด 2 อันอันแรกเพื่อเอาข้อมูลพื้นที่ อันสองเพื่อโชวข้อมูลอื่นๆ
