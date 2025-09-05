import Header from "./header";
import Sidebar from "./sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles/settings.css";

const RenderSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Header />
      <Sidebar />
      <div className="settings_main_page_container">
        <div className="settings_header_container">
          <div className="settings_main_title">
            <h1>Settings</h1>
          </div>
        </div>

        <div className="header_divider_container">
          <hr />
        </div>

        <div className="settings_select_section">
          <p onClick={() => navigate("/settings")} className={location.pathname === "/settings" ? "active" : ""}>
            Polisa
          </p>
          <p onClick={() => navigate("/settings_categories")} className={location.pathname === "/settings_categories" ? "active" : ""}>
            Kategorije
          </p>
          <p onClick={() => navigate("/settings_genres")} className={location.pathname === "/settings_genres" ? "active" : ""}>
            Zanrovi
          </p>
          <p onClick={() => navigate("/settings_publishers")} className={location.pathname === "/settings_publishers" ? "active" : ""}>
            Izdavac
          </p>
          <p onClick={() => navigate("/settings_cover")} className={location.pathname === "/settings_cover" ? "active" : ""}>
            Povez
          </p>
          <p onClick={() => navigate("/settings_format")} className={location.pathname === "/settings_format" ? "active" : ""}>
            Format
          </p>
          <p onClick={() => navigate("/settings_letter_format")} className={location.pathname === "/settings_letter_format" ? "active" : ""}>
            Pismo
          </p>
        </div>

        <div className="main_info_section">
          <div className="reservation_due_section">
            <div className="reservation_content_wrapper">
              <div className="reservation_text_section">
                <div className="reservation_due_title_placeholder">
                  <h3>Rok za rezervaciju</h3>
                </div>
                <div className="reservation_section_due_content">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolores, veritatis veniam commodi mollitia repudiandae sunt id
                    a molestias incidunt repellat corrupti doloremque quibusdam
                    temporibus soluta! Veritatis impedit saepe rem reprehenderit?
                  </p>
                </div>
              </div>
              <div className="reservation_input_section">
                <div className="input_field_input">
                  <input type="text"></input>
                </div>
                <div className="day_section_placeholder">
                  <p>dana</p>
                </div>
              </div>
            </div>
          </div>

          <div className="due_date_section">
            <div className="due_content_wrapper">
              <div className="due_text_section">
                <div className="due_date_section_placeholder">
                  <h3>Rok vracanja</h3>
                </div>
                <div className="due_date_section_content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatem dolorum architecto ex exercitationem. Fugit beatae
                    esse nemo recusandae illum ab, nihil, in, magni obcaecati
                    exercitationem eaque aut facere sit libero!
                  </p>
                </div>
              </div>
              <div className="due_input_section">
                <div className="input_field_input">
                  <input type="text"></input>
                </div>
                <div className="day_section_placeholder">
                  <p>dana</p>
                </div>
              </div>
            </div>
          </div>

          <div className="conflict_due_date_section">
            <div className="conflict_content_wrapper">
              <div className="conflict_text_section">
                <div className="conflict_due_date_section_placeholder">
                  <h3>Rok konflikta</h3>
                </div>
                <div className="conflict_due_date_section_content">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure
                    ad aliquid possimus at libero facilis sint molestiae. Illum
                    delectus fugit quaerat ipsam aperiam reprehenderit numquam, a
                    atque dolorem sit ea?
                  </p>
                </div>
              </div>
              <div className="conflict_input_section">
                <div className="input_field_input">
                  <input type="text"></input>
                </div>
                <div className="day_section_placeholder">
                  <p>dana</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenderSettings;
