# KU Food Swipe

เว็ปเเอฟที่ใช้ปัดอาหารที่กอยากกิน
ปัดขวาคือชอบ ปัดซ้ายคือไม่ชอบ ปัดบนคือกินอันนี้

## Tech

- Next.js
- TypeScript
- Shadcn UI
- Bun

## Page

- Home
  User เข้ามาเเล้วจะมีให้ปรับ filter อาหารต่าๆ

- Swipe
  User เข้ามาเเล้วจะเจอหน้าปัดอาหาร
  โดยวิธีการทำงานคือ

      1. เก็บอาหารไว้เป็น Array เเสดงเป็น FoodCardCard ทีละอัน เเละมีอันที่เหลืออยู่ข้างหลัง
      2. เขียนโค้ดให้สมารถเเยกออกว่าเป็นการปัดรูปแบบไหน เเล้วเเสดง UI ตาม state นั้น (ชอบ / ไม่ชอบ / กินอันนี้) จะต้องมีเเค่ 1 state เท่านั้น
      3. เเต่ละ FoodCard จะมีปุ่มให้กดเพื่อปัดได้เช่นกัน โดยจะอยู่บริเวณด้านล่างของ FoodCard
      4. ปัด
        - ปัดขวา/ปัดซ้าย จะไป FoodCard ถัดไปเเละเก็บข้อมูลไว้ใน Array เป็น
          - id: string
          - name: string
          - status: 'like' | 'dislike' | 'eat'
        - ปัดบน จบเกมเเล้วไปหน้าสรุปผล
        - card หมด จบเกมเเล้วไปหน้าสรุปผล

      หน้าสรุปผลจะเเสดงข้อมูลว่าสุดท้ายเรากินอะไร โดยเเสดงข้อมูลทั้งหมด เเละมีปุ่มให้กดเพื่อไปหน้า Home

- Admin/cms
  - ยังไม่ต้องทำ auth
  - เป็นหน้าสำหรับจัดการข้อมูลอาหาร
  - สามารถเพิ่ม/ลบ/แก้ไขข้อมูลอาหารได้
  - สามารถเพิ่ม/ลบ/แก้ไขข้อมูลหมวดหมู่อาหารได้

## UI/Component

Mobile first เเต่ต้อง responsive
ทำให้ UI สวยงามเเละเข้าถึงง่าย ใช้สีเขียวกลางๆ เป็น primary color ใช้สีขาวเป็น background color
พยายามใช้ shadcn ui ให้เยอะที่สุด เเละใช้ flex ยกเว้นบาง component ที่ต้องใช้ absolute เช่น FoodCard ตอนปัด

- FoodCard
  - เเสดงรูปภาพ
  - เเสดงชื่ออาหาร
  - เเสดงราคา
  - เเสดงหมวดหมู่ (ใช้ tag)
  - เเสดงร้านค้า

- Filter
  - เป็น component ในหน้า Home สำหรับกรองอาหาร
  - มีให้เลือก tag เป็น dropdown multiselect
  - มีให้เลือก ร้านค้าเป็น dropdown multiselect
  - มีให้เลือก ราคาเป็น range slider
  - มีปุ่ม reset

- CMS
  - มีให้ใส่รูป เป็น input file แบบ drag and drop zone
  - มีให้ใส่ชื่ออาหาร
  - มีให้ใส่ราคา (ต้องเป็นตัวเลข)
  - มีให้เลือก tag เป็น dropdown multiselect
  - มีให้เลือก ร้านค้าเป็น dropdown single select

- Header
  - มี logo
  - มี button login/register

## Model

- Food
  - id: string
  - name: string
  - price: number
  - image: string
  - tags: string[]
  - shop: string

tags เช่น ข้าว ปลา หมู ไก่ ผัก น้ำ ของหวาน
ให้ mock data เป็น array ของ Food จำนวน 100 รายการ ใน utils/food/mock.ts
