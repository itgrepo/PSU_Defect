const decode = (data) => {
  try {
    // ตรวจสอบว่าข้อมูลที่ได้รับเป็น Base64 ที่ถูกต้องหรือไม่
    const reversedData = reverse(data.slice(0, -5)); // ลบ 5 ตัวท้ายแล้ว reverse
    const base64Decoded = atob(reversedData); // ทำการ decode base64
    return decodeURIComponent(escape(base64Decoded)); // แปลงจาก URI encoding
  } catch (error) {
    console.error("Error decoding data:", error);
    return null; // คืนค่า null หากเกิดข้อผิดพลาด
  }
};

function reverse(s) {
  return s.split('').reverse().join(''); // ทำการ reverse string
}

export default {
  decode
};
