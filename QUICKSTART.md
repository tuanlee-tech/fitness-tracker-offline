# Fitness & Nutrition Tracker - Quick Start Guide

## 🚀 Chạy ứng dụng

Ứng dụng đang chạy tại: **http://localhost:5173**

## ✨ Tính năng chính

### 1. **Tab Hồ sơ (Profile)**
- Điền thông tin cá nhân: tên, tuổi, giới tính, chiều cao, cân nặng
- Xem chỉ số BMI tự động
- Tính toán TDEE và calories cần ăn để giảm cân
- Theo dõi uống nước hàng ngày
- **MỚI**: Xuất/Nhập dữ liệu để sao lưu

### 2. **Tab Lịch tập (Workout)**
- Lịch tập 12 tuần từ newbie đến advanced
- Click vào ngày để xem chi tiết bài tập
- Đánh dấu hoàn thành sau khi tập
- Xem tiến độ hoàn thành theo tuần

### 3. **Tab Cân nặng (Body Tracker)**
- Nhập cân nặng hàng ngày
- Xem biểu đồ tiến triển
- Thống kê: thay đổi trung bình, dự đoán đạt mục tiêu

### 4. **Tab Thực đơn (Meal Planner)**
- Tìm kiếm thực phẩm Việt Nam (16 loại)
- Thêm vào bữa sáng/trưa/tối/vặt
- Theo dõi calories và macros
- Vòng tròn tiến độ calories tự động

## 💡 Mẹo sử dụng

1. **Bắt đầu**: Điền thông tin ở tab Hồ sơ trước
2. **Dark Mode**: Click icon mặt trăng/mặt trời ở góc trên
3. **Sao lưu**: Dùng nút "Xuất dữ liệu" ở tab Hồ sơ
4. **Offline**: App hoạt động khi mất mạng

## 🎯 Test các tính năng

✅ **Profile Tab**
- Nhập thông tin → xem BMI và TDEE tính tự động
- Thêm nước → xem progress bar
- Xuất dữ liệu → tải file JSON

✅ **Workout Tab**
- Chuyển tuần → xem các bài tập khác nhau
- Click ngày → xem modal chi tiết
- Đánh dấu hoàn thành → xem % tiến độ

✅ **Body Tracker Tab**
- Thêm vài entry cân nặng → xem biểu đồ xuất hiện
- Xem thống kê tự động tính

✅ **Meal Planner Tab**
- Tìm "gà" → chọn ức gà → nhập gram
- Thêm vào bữa → xem vòng tròn calories tăng
- Thêm nhiều món → xem tổng macros

## 🚀 Deployment

```bash
# Build production
npm run build

# Deploy to Vercel
vercel

# Or Netlify
netlify deploy --prod --dir=dist
```

## 📦 Built With

- React 19 + Vite
- Tailwind CSS v4
- Recharts
- Lucide Icons
- Supabase (ready)

---

**Tất cả task đã hoàn thành! App sẵn sàng test và deploy! 🎉**
