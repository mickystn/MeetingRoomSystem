# Meeting Room System
Web Application สำหรับจองห้องพัฒนาด้วย React.js / Node.js สามารถจองเวลาได้ตั้งแต่ 09:00 น. - 18:00 น.
โดยสามารถจองได้แค่ 1 ชั่วโมงต่อหนึ่งครั้งและเวลาห้ามทับซ้อนกัน


## ขั้นตอนการติดตั้ง
````bash

	git clone https://github.com/mickystn/MeetingRoomSystem.git
	
	cd MeetingRoomSystem

	- Frontend
		cd frontend
		npm install
		
	- Backend
		cd backend
		npm install
		
	
`````




## การตั้งค่า Database โดยใช้ XAMPP

หลังจากติดตั้งโปรแกรม xampp ทำการเปิด Apache,MySQL และ Import [Database](https://github.com/mickystn/MeetingRoomSystem/tree/main/backend/database)  ขึ้น localhost/phpmyadmin

**ตั้งค่าการเชื่อมต่อระหว่าง Nodejs และ Database**
1. สร้างไฟล์ .env ใน root-directory ของโปรเจ็ค
2. ทำการคัดลอกจาก [.env-example](https://github.com/mickystn/MeetingRoomSystem/blob/main/backend/.env-example) ไปใส่ไว้ที่ .env




## ขั้นตอนการใช้งาน
````bash

	Frontend : npm run dev เว็บเริ่มทำงานที่ http://localhost:5173/

	Backend : npm start เว็บเริ่มทำงานที่ http://localhost:3001/
	
````
## Credit
Sittinan Phattananun ( Software Developer )
Tools :
	 - readme editor : https://stackedit.io
	- UI Framework : https://ant.design	
