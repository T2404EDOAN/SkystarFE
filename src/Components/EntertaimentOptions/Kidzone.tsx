import React from "react";
import "./Kidzone.css";

const Kidzone = () => {
  return (
    <div className="box">
      <div className="img_main">
        <img
          src="https://skystarimages.s3.us-east-1.amazonaws.com/products/kidz.jpg"
          alt="kidzone"
          className="img"
        />
      </div>
      <div className="content">
        <h2 className="title" style={{ fontFamily: "Anton, sans-serif" }}>KIDZONE</h2>
        <div className="description">
          <div className="des1">
            Giải phóng trí tưởng tượng của con bạn tại Kidzone, sân chơi trong
            nhà tuyệt đỉnh.
          </div>
          <div className="des1">
            Hãy để các bé khám phá một thế giới vui nhộn và khám phá tại
            Kidzone, khu vui chơi trong nhà rộng rãi được thiết kế dành cho trẻ
            em ở mọi lứa tuổi.
          </div>
          <div className="des1">
            S’Kidzone cung cấp hơn 25 trò chơi đa dạng và hấp dẫn, bao gồm các
            hồ banh kết hợp chướng ngại vật đầy thử thách và mảng tường leo núi
            thú vị. Tất cả các thiết bị đều được chọn lọc kỹ và cẩn thận để đảm
            bảo môi trường vui chơi an toàn cho các bé.
          </div>
          <div className="des1">
            S’Kidzone không chỉ là một không gian vui chơi giải trí, chúng tôi
            còn cung cấp một không gian sôi động, nơi các bé có thể kết bạn mới,
            phát triển các kỹ năng thể chất và khơi dậy khả năng sáng tạo.
          </div>
          <div className="des1">
            S’Kidzone có thêm dịch vụ trọn gói nhận tổ chức tiệc, sự kiện cho
            các bé
          </div>
          <div className="des1">
            Hãy để bé yêu của bạn tận hưởng những trải nghiệm tuyệt vời tại đây!
          </div>
        </div>
      </div>
      <div className="address">
        <div className="location-list">
          <div className="location-card">
            <h3 className="title_address" style={{ fontFamily: "Anton, sans-serif" }}>SKYSTAR HUẾ</h3>
            <div>
              <a href="https://www.google.com/maps?sca_esv=0cea375fb25910d8&rlz=1C5MACD_enVN1068VN1069&biw=1440&bih=716&sxsrf=AHTn8zqmsDZlpd44O9SgiJmBYOe0mfl_mQ:1741770881075&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXNreXN0YXIgY2luZW0qAggAMgcQIxiwAhgnMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yCBAAGAgYDRgeMggQABgIGA0YHjIFEAAY7wUyBRAAGO8FMgUQABjvBUiyKlCmC1joHHABeAGQAQCYAeABoAHMBqoBBTEuNC4xuAEByAEA-AEBmAIHoAL1BsICChAAGLADGNYEGEfCAg0QABiABBiwAxhDGIoFwgILEAAYgAQYsAMY5wTCAhMQLhiABBiwAxhDGMgDGIoF2AEBwgIZEC4YgAQYsAMY0QMYQxjHARjIAxiKBdgBAcICBxAAGIAEGBPCAgcQLhiABBgTwgIIEAAYExgWGB7CAgoQABgTGBYYChgewgIIEAAYgAQYogTCAgYQABgNGB7CAggQABgWGAoYHpgDAIgGAZAGCboGBAgBGAiSBwUyLjQuMaAH0Sw&um=1&ie=UTF-8&fb=1&gl=vn&sa=X&geocode=Ka9yvHAtqzUxMUSrYmTdXoMB&daddr=Y%C3%AAn+Ho%C3%A0,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i">
                📍 25 Hai Bà Trưng, Phường Vĩnh Ninh, TP.Huế
              </a>
            </div>
            <div>
              <a
                href="https://www.facebook.com/CinestarHue"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 https://www.facebook.com/SkyStarHue
              </a>
            </div>
          </div>
          <div className="location-card">
            <h3 className="title_address" style={{ fontFamily: "Anton, sans-serif" }}>SKYSTAR ĐÀ LẠT</h3>
            <div>
              <a href="https://www.google.com/maps?sca_esv=0cea375fb25910d8&rlz=1C5MACD_enVN1068VN1069&biw=1440&bih=716&sxsrf=AHTn8zqmsDZlpd44O9SgiJmBYOe0mfl_mQ:1741770881075&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXNreXN0YXIgY2luZW0qAggAMgcQIxiwAhgnMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yCBAAGAgYDRgeMggQABgIGA0YHjIFEAAY7wUyBRAAGO8FMgUQABjvBUiyKlCmC1joHHABeAGQAQCYAeABoAHMBqoBBTEuNC4xuAEByAEA-AEBmAIHoAL1BsICChAAGLADGNYEGEfCAg0QABiABBiwAxhDGIoFwgILEAAYgAQYsAMY5wTCAhMQLhiABBiwAxhDGMgDGIoF2AEBwgIZEC4YgAQYsAMY0QMYQxjHARjIAxiKBdgBAcICBxAAGIAEGBPCAgcQLhiABBgTwgIIEAAYExgWGB7CAgoQABgTGBYYChgewgIIEAAYgAQYogTCAgYQABgNGB7CAggQABgWGAoYHpgDAIgGAZAGCboGBAgBGAiSBwUyLjQuMaAH0Sw&um=1&ie=UTF-8&fb=1&gl=vn&sa=X&geocode=Ka9yvHAtqzUxMUSrYmTdXoMB&daddr=Y%C3%AAn+Ho%C3%A0,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i">
                📍 Quảng trường Lâm Viên, Thành phố Đà Lạt
              </a>
            </div>
            <div>
              <a
                href="https://www.facebook.com/CinestarDaLat"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 https://www.facebook.com/SkyStarDaLat
              </a>
            </div>
          </div>
          <div className="location-card">
            <h3 className="title_address" style={{ fontFamily: "Anton, sans-serif" }}>SKYSTAR TÂY NINH</h3>
            <div>
              <a href="https://www.google.com/maps?sca_esv=0cea375fb25910d8&rlz=1C5MACD_enVN1068VN1069&biw=1440&bih=716&sxsrf=AHTn8zqmsDZlpd44O9SgiJmBYOe0mfl_mQ:1741770881075&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXNreXN0YXIgY2luZW0qAggAMgcQIxiwAhgnMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yCBAAGAgYDRgeMggQABgIGA0YHjIFEAAY7wUyBRAAGO8FMgUQABjvBUiyKlCmC1joHHABeAGQAQCYAeABoAHMBqoBBTEuNC4xuAEByAEA-AEBmAIHoAL1BsICChAAGLADGNYEGEfCAg0QABiABBiwAxhDGIoFwgILEAAYgAQYsAMY5wTCAhMQLhiABBiwAxhDGMgDGIoF2AEBwgIZEC4YgAQYsAMY0QMYQxjHARjIAxiKBdgBAcICBxAAGIAEGBPCAgcQLhiABBgTwgIIEAAYExgWGB7CAgoQABgTGBYYChgewgIIEAAYgAQYogTCAgYQABgNGB7CAggQABgWGAoYHpgDAIgGAZAGCboGBAgBGAiSBwUyLjQuMaAH0Sw&um=1&ie=UTF-8&fb=1&gl=vn&sa=X&geocode=Ka9yvHAtqzUxMUSrYmTdXoMB&daddr=Y%C3%AAn+Ho%C3%A0,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i">
                📍 TTC Plaza Tây Ninh, 217 - 219 đường 30/4, phường 2, Tây Ninh
              </a>
            </div>
            <div>
              <a
                href="https://www.facebook.com/CKidzoneTayNinh"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 https://www.facebook.com/SKidzoneTayNinh
              </a>
            </div>
          </div>
          <div className="location-card">
            <h3 className="title_address" style={{ fontFamily: "Anton, sans-serif" }}>SKYSTAR MỸ THO</h3>
            <div>
              <a href="https://www.google.com/maps?sca_esv=0cea375fb25910d8&rlz=1C5MACD_enVN1068VN1069&biw=1440&bih=716&sxsrf=AHTn8zqmsDZlpd44O9SgiJmBYOe0mfl_mQ:1741770881075&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXNreXN0YXIgY2luZW0qAggAMgcQIxiwAhgnMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yCBAAGAgYDRgeMggQABgIGA0YHjIFEAAY7wUyBRAAGO8FMgUQABjvBUiyKlCmC1joHHABeAGQAQCYAeABoAHMBqoBBTEuNC4xuAEByAEA-AEBmAIHoAL1BsICChAAGLADGNYEGEfCAg0QABiABBiwAxhDGIoFwgILEAAYgAQYsAMY5wTCAhMQLhiABBiwAxhDGMgDGIoF2AEBwgIZEC4YgAQYsAMY0QMYQxjHARjIAxiKBdgBAcICBxAAGIAEGBPCAgcQLhiABBgTwgIIEAAYExgWGB7CAgoQABgTGBYYChgewgIIEAAYgAQYogTCAgYQABgNGB7CAggQABgWGAoYHpgDAIgGAZAGCboGBAgBGAiSBwUyLjQuMaAH0Sw&um=1&ie=UTF-8&fb=1&gl=vn&sa=X&geocode=Ka9yvHAtqzUxMUSrYmTdXoMB&daddr=Y%C3%AAn+Ho%C3%A0,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i">
                📍 52 Đinh Bộ Lĩnh, Phường 3, Thành phố Mỹ Tho
              </a>
            </div>
            <div>
              <a
                href="https://www.facebook.com/CinestarMyTho"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 https://www.facebook.com/SkyStarMyTho
              </a>
            </div>
          </div>
          <div className="location-card">
            <h3 className="title_address" style={{ fontFamily: "Anton, sans-serif" }}>SKYSTAR KIÊN GIANG</h3>
            <div>
              <a href="https://www.google.com/maps?sca_esv=0cea375fb25910d8&rlz=1C5MACD_enVN1068VN1069&biw=1440&bih=716&sxsrf=AHTn8zqmsDZlpd44O9SgiJmBYOe0mfl_mQ:1741770881075&gs_lp=Egxnd3Mtd2l6LXNlcnAiDXNreXN0YXIgY2luZW0qAggAMgcQIxiwAhgnMgYQABgWGB4yBhAAGBYYHjIGEAAYFhgeMgYQABgWGB4yCBAAGAgYDRgeMggQABgIGA0YHjIFEAAY7wUyBRAAGO8FMgUQABjvBUiyKlCmC1joHHABeAGQAQCYAeABoAHMBqoBBTEuNC4xuAEByAEA-AEBmAIHoAL1BsICChAAGLADGNYEGEfCAg0QABiABBiwAxhDGIoFwgILEAAYgAQYsAMY5wTCAhMQLhiABBiwAxhDGMgDGIoF2AEBwgIZEC4YgAQYsAMY0QMYQxjHARjIAxiKBdgBAcICBxAAGIAEGBPCAgcQLhiABBgTwgIIEAAYExgWGB7CAgoQABgTGBYYChgewgIIEAAYgAQYogTCAgYQABgNGB7CAggQABgWGAoYHpgDAIgGAZAGCboGBAgBGAiSBwUyLjQuMaAH0Sw&um=1&ie=UTF-8&fb=1&gl=vn&sa=X&geocode=Ka9yvHAtqzUxMUSrYmTdXoMB&daddr=Y%C3%AAn+Ho%C3%A0,+C%E1%BA%A7u+Gi%E1%BA%A5y,+H%C3%A0+N%E1%BB%99i">
                📍 TTTM Rạch Sỏi, Phường Rạch Sỏi, TP. Rạch Giá
              </a>
            </div>
            <div>
              <a
                href="https://www.facebook.com/CinestarKienGiang"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 https://www.facebook.com/SkyStarKienGiang
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kidzone;
