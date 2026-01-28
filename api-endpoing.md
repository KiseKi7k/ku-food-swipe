* GET /api/list/{user_play_id}
```
{
  "id": int,
  "Name": string,
  "ShopName": string,
  "PriceMin": float,
  "PriceMax": float,
  "tags": ["string",...]
}
```
* GET /api/records/get/{user_play_id}
```
ถ้าถูกสร้างแล้ว --> 200
ถ้ายังไม่มี --> 404
```

* POST /api/records/create
```
{
  "user_id": int,
  0 --> guest, 1...n --> login user
  "tags": []
}
```
```
return {user_play_id}
```

* POST /api/records/save
```
{
  "id":int,
  "user_play_id': int, 
  "user_id": int, 
   0 --> guest, 1...n --> login user
}
201

