# Avant-Garde Layout Upgrade

Màu sắc (Dark + Lime-green) đã chốt, nhưng để ra đúng chất **Graphic Designer**, chúng ta cần đập bỏ layout dạng Grid/Section dọc truyền thống. 

Dưới đây là 2 concept **cực đoan, phá cách**, thoát khỏi vùng an toàn để bạn chọn:

---

## Mẫu A: The Horizontal Exhibition (Cuộn Ngang)

Thay vì cuộn dọc (scroll down), khi người dùng lăn chuột, website sẽ **trôi ngang từ trái qua phải**, giống như đang đi dọc một hành lang phòng tranh triển lãm.

![Horizontal Concept](file:///C:/Users/Cuong%20Huynh/.gemini/antigravity/brain/f6a5782c-7afc-4832-8cbe-83f4251eb083/concept_horizontal_filmstrip_1773862850609.png)

**Đặc điểm:**
1. **Vertical Navbar**: Thanh menu không nằm ở trên, mà chốt dọc (fixed-left) như gáy một cuốn sách.
2. **Horizontal Scroll**: Scroll chuột dọc sẽ được map sang scroll ngang toàn bộ site (Dùng GSAP ScrollTrigger hoặc Lenis mapping).
3. **Filmstrip Projects**: Các project không xếp lưới gọn gàng mà xếp rải rác đè lên nhau, nghiêng ngả như ảnh rải trên bàn nghệ sĩ.
4. **Giant numbers**: Số `01`, `02` các section bị cắt cúp (bleed) tràn ra khỏi mép màn hình.

---

## Mẫu B: Brutalist / Anti-Design (Phi Cấu Trúc)

Website đập bỏ mọi quy tắc lưới ngang/dọc (anti-grid). Các thành phần đè lên nhau, chữ chạy dọc, chữ lộn ngược, chữ làm mask (mặt nạ) cho ảnh. Rất "punk" và editorial tạp chí thời trang.

![Brutalist Concept](file:///C:/Users/Cuong%20Huynh/.gemini/antigravity/brain/f6a5782c-7afc-4832-8cbe-83f4251eb083/concept_brutalist_overlap_1773862868689.png)

**Đặc điểm:**
1. **Maximalist Typography**: Chữ chồng chữ. Title bự che lấp một phần ảnh chân dung.
2. **Absolute Positioning Chaos**: Hình ảnh và text dường như đặt ngẫu nhiên, không thẳng hàng, nhưng lại có tính toán tỷ lệ vàng.
3. **Kinetic Hovers**: Khi rê chuột, hình ảnh đằng sau lớp text mới chịu lộ ra, hoặc chữ bị bóp méo (distortion).
4. **Marquee đa hướng**: Dải chữ chạy không chỉ chạy ngang, mà chạy xổ dọc xuống hoặc chạy xiên 45 độ chia cắt màn hình.

---

> [!IMPORTANT]
> Cả 2 plan này đều đập đi xây lại gần như cấu trúc HTML hiện tại, chỉ thay đổi CSS và Component là chưa đủ.
> **Bạn muốn portfolio của mình giống Option A (Triển lãm cuộn ngang) hay Option B (Tạp chí Brutalist nổi loạn)?**
