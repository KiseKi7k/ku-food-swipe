<<<<<<< HEAD
# 🍛 KU FOOD SWIPE

**KU Food Swipe** เป็นเว็บแอปพลิเคชันที่ออกแบบมาเพื่อแก้ปัญหา "เที่ยงนี้กินอะไรดี?" สำหรับนิสิต บุคลากร เจ้าหน้าที่ และบุคคลภายนอกในมหาวิทยาลัยเกษตรศาสตร์ โดยใช้ระบบการปัด (Swipe) ที่ช่วยให้การค้นหาเมนูอาหารเป็นเรื่องสนุก พร้อมทำความรู้จักร้านค้าและโรงอาหาร (บาร์) ต่างๆ ภายในมหาวิทยาลัยเพิ่มขึ้น

---

## ✨ Features
* **Interactive Swiping:** ปัดเพื่อเลือกเมนูที่น่าสนใจ
* **Food Discovery:** แนะนำร้านอาหารภายในมหาวิทยาลัยเกษตรศาสตร์
* **Quick Decision:** ช่วยตัดสินใจเลือกเมนูอาหารที่ถูกใจที่สุด
* **User Friendly:** หน้าตาสวยงาม ใช้งานง่าย เหมาะกับนิสิตทุกชั้นปี

---

## 📸 Screenshots

### 🏠 Main Interface
หน้าแรกสำหรับเริ่มต้นการใช้งาน
<br>
<img src="https://raw.githubusercontent.com/KiseKi7k/ku-food-swipe/refs/heads/assets/assets/main-screen.png" width="400" height="500" alt="Main Screen">

---

### 👆 Swipe Actions
ระบบการตัดสินใจเลือกอาหาร (ชอบ, ไม่ชอบ)

| **หน้า: ชอบ** | **หน้า: ไม่ชอบ** | **หน้า: เลือกอันนี้แหละ** |
|:---:|:---:|:---:|
| <img src="https://raw.githubusercontent.com/KiseKi7k/ku-food-swipe/refs/heads/assets/assets/like-swipe.png" width="250"> | <img src="https://raw.githubusercontent.com/KiseKi7k/ku-food-swipe/refs/heads/assets/assets/dislike-swipe.png" width="250"> | <img src="https://raw.githubusercontent.com/KiseKi7k/ku-food-swipe/refs/heads/assets/assets/eat-swipe.png" width="250"> |

---

### 🗂️ Food Cards
แสดงรายละเอียดเมนูอาหารและร้านค้า

<img src="https://raw.githubusercontent.com/KiseKi7k/ku-food-swipe/refs/heads/assets/assets/swipe-1.png" width="350" height='450'> 
<img src="https://raw.githubusercontent.com/KiseKi7k/ku-food-swipe/refs/heads/assets/assets/swipe-2.png" width="350" height='450'> 

---

### 🏁 Summary
หน้าสรุปรายการอาหารที่คุณสนใจ
<br>
<img src="https://raw.githubusercontent.com/KiseKi7k/ku-food-swipe/refs/heads/assets/assets/result.png" width="600" alt="Summary Screen">

---

## 🛠️ Tech Stack
* **Website:** NextJs
* **AI/ML Frameworks:** Scikit-learn(KNN),Typhoon API
* **Cloud/API Services:** Vercel,Render,PostgreSQL
* **Other Tools:** Prisma(ORM)


---

## 🚀 วิธีการใช้งาน
1. เปิดเว็บไซต์ **KU Food Swipe**
2. ในหน้าหลัก กดเริ่มต้นเพื่อเข้าสู่ระบบเลือกอาหาร
3. **ปัดขวา** หากคุณสนใจเมนูนั้น
4. **ปัดซ้าย** หากยังไม่ถูกใจเมนูนั้น
5. **ปัดขึ้น** **"เลือกอันนี้แหละ"** หากต้องการเลือกเมนูนั้นทันที
6. ตรวจสอบเมนูที่เลือกทั้งหมดได้ใน **หน้าสรุปผล**

---
=======
# KU Food Swipe
Swipe through foods around Kasetsart University to quickly decide what to eat.
KU Food Swipe helps you discover nearby food options using a swipe-based interface and AI-powered recommendations.

**This project is for KU AI Pioneer by กินอะไรดี Team**

### Features
- Swipe through food options around Kasetsart University

- Swipe right to Like

- Swipe left to Dislike

- Swipe up to Eat this

- AI-powered food recommendation system

- Fast and simple decision-making experience

## Built with
- Bun
- Nextjs
- BetterAuth
- Prisma
- Postgresql

## Development
### .env
```bash
// Postgresql
DATABASE_URL=

BETTER_AUTH_SECRET=<openssl rand -base64 32>
BETTER_AUTH_URL=<Base URL of your app>

// Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

RECOMMEND_SERVICE_URL=
```
**For AI Recommend service please checkout this [repository](https://github.com/zawedut/ai-food-service) (by zawedut)**
```bash
bun install
bunx prisma generate
bun dev
```

## Deployment
### Build
```bash
bunx prisma generate && bun run build
```
### Install
```bash
bun install
```
>>>>>>> 6eb8ded69d261a9b9992f855499b01b119201b9b
